"use client";

import { useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Title from "@/components/features/shared/title";
import { Skeleton } from "@/components/ui/skeleton";
import { getCompanies } from "@/service/company.service";
import CompanyCard from "../company-card";

const FavouriteCompanies = () => {
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();

  const { data: companies, isLoading } = useQuery({
    queryKey: ["getCompanies"],
    queryFn: () => getCompanies(1, 6),
  });

  if (isLoading) {
    return (
      <div className="container">
        <Title
          title="Favorite Companies"
          subtitle="Explore our wide range of companies"
          viewAllLink="/companies"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="space-y-4">
              <Skeleton className="h-[150px] w-full" />
              <Skeleton className="h-4 w-[100px] mx-auto" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!companies?.data?.items?.length) {
    return null;
  }

  return (
    <div className="container">
      <Title
        title="Favorite Companies"
        subtitle="Explore our wide range of companies"
        viewAllLink="/companies"
      />

      <Swiper
        loop={true}
        pagination={false}
        className="productSwiper"
        onSwiper={setSwiperRef}
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 5,
          },
          1050: {
            slidesPerView: 6,
            spaceBetween: 5,
          },
        }}
      >
        {companies?.data?.items?.map((company) => (
          <SwiperSlide
            className="hover:scale-105 transition-all duration-300 p-3"
            key={company.id}
          >
            <CompanyCard company={company} />
          </SwiperSlide>
        ))}
      </Swiper>
      {companies?.data?.items?.length > 3 && (
        <div className="flex justify-center space-x-4 pt-2 pb-4">
          <Button
            variant="outline"
            className="!rounded-full aspect-square p-0"
            title="Previous"
            onClick={() => swiperRef?.slidePrev()}
          >
            <ChevronLeft strokeWidth={1.5} className="!h-[24px] !w-[24px]" />
            <span className="sr-only">Previous</span>
          </Button>
          <Button
            variant="outline"
            className="!rounded-full aspect-square p-0"
            title="Next"
            onClick={() => swiperRef?.slideNext()}
          >
            <ChevronRight strokeWidth={1.5} className="!h-[24px] !w-[24px]" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default FavouriteCompanies;
