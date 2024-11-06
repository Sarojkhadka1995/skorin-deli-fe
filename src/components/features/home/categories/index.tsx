import React, { useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import CategoryCard from "./category-card";
import { logo } from "../../../../../image-config";
import { ICategory } from "@/types/category.types";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Title from "../../shared/title";

const categories = [
  {
    id: 1,
    title: "Category 1",
    image: logo,
    link: "/categories/1",
    slug: "category-1",
  },
  {
    id: 1,
    title: "Category 1",
    image: logo,
    link: "/categories/1",
    slug: "category-1",
  },
  {
    id: 1,
    title: "Category 1",
    image: logo,
    link: "/categories/1",
    slug: "category-1",
  },
  {
    id: 1,
    title: "Category 1",
    image: logo,
    link: "/categories/1",
    slug: "category-1",
  },
  {
    id: 1,
    title: "Category 1",
    image: logo,
    link: "/categories/1",
    slug: "category-1",
  },
  {
    id: 1,
    title: "Category 1",
    image: logo,
    link: "/categories/1",
    slug: "category-1",
  },
  {
    id: 1,
    title: "Category 1",
    image: logo,
    link: "/categories/1",
    slug: "category-1",
  },
  {
    id: 1,
    title: "Category 1",
    image: logo,
    link: "/categories/1",
    slug: "category-1",
  },
];
const Categories = () => {
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();
  return (
    <div className="container">
      <Title
        title="Categories"
        subtitle="Explore our wide range of categories"
        viewAllLink="/products"
      />

      <Swiper
        loop={true}
        pagination={false}
        // modules={[Grid]}
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
        {categories?.map((item: ICategory, index: number) => (
          <SwiperSlide
            className="hover:scale-105 transition-all duration-300 p-3"
            key={`categories-${index}`}
          >
            <CategoryCard key={`categories-${index}`} category={item} />
          </SwiperSlide>
        ))}
      </Swiper>
      {categories.length > 3 && (
        <div className={`flex justify-center space-x-4 pt-2 pb-4 `}>
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
