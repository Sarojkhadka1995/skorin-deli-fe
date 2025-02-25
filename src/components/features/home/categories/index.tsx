"use client";

import { useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useInfiniteQuery } from "@tanstack/react-query";

import CategoryCard from "./category-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Title from "../../shared/title";
import { getCategories } from "@/service/category.service";
import { Skeleton } from "@/components/ui/skeleton";

const Categories = () => {
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();
  // const [page, setPage] = useState<number>(1);

  const {
    data: categories,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["getCategories"],
    queryFn: ({ pageParam = 1 }) => getCategories(pageParam, 6),
    getNextPageParam: (lastPage) => {
      if (Number(lastPage.data.pageNumber) < Number(lastPage.data.totalPages)) {
        return Number(lastPage.data.pageNumber) + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  // Flatten all items from different pages
  const allCategories =
    categories?.pages.flatMap((page) => page.data.items) ?? [];

  // Load next page when near end
  const handleSlideChange = (swiper: SwiperClass) => {
    const isNearEnd =
      swiper.isEnd ||
      (swiper.activeIndex + 2 >= allCategories.length && hasNextPage);

    if (isNearEnd && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return (
      <div className="container">
        <Title
          title="Categories"
          subtitle="Explore our wide range of categories"
          viewAllLink="/categories"
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

  if (!allCategories.length) {
    return null;
  }

  return (
    <div className="container">
      <Title
        title="Categories"
        subtitle="Explore our wide range of categories"
        viewAllLink="/categories"
      />

      <Swiper
        loop={false}
        pagination={false}
        className="productSwiper"
        onSwiper={setSwiperRef}
        onSlideChange={handleSlideChange}
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
        {allCategories.map((category) => (
          <SwiperSlide
            className="hover:scale-105 transition-all duration-300 p-3"
            key={category.id}
          >
            <CategoryCard category={category} />
          </SwiperSlide>
        ))}

        {isFetchingNextPage && (
          <SwiperSlide>
            <div className="space-y-4">
              <Skeleton className="h-[150px] w-full" />
              <Skeleton className="h-4 w-[100px] mx-auto" />
            </div>
          </SwiperSlide>
        )}
      </Swiper>
      {allCategories.length > 3 && (
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

export default Categories;
