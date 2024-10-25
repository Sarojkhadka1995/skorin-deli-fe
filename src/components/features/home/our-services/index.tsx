import { Truck, Store, Coins, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Orders over $150 to Sydney Metro & $50 to Northern Beaches",
  },
  {
    icon: Store,
    title: "Click & Collect",
    description: "20 Dale Street, Brookvale NSW 2100",
  },
  {
    icon: Coins,
    title: "Value",
    description: "Your favourite Italian brands at accessible prices",
  },
];

export default function Services() {
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();
  return (
    <div className="container mx-auto px-4 py-8">
      <Swiper
        // slidesPerView={3}
        // grid={{
        //   rows: 2,
        //   fill: "row",
        // }}
        pagination={true}
        className="productSwiper"
        loop={true}
        onSwiper={setSwiperRef}
        // onSlideChange={() => {
        //   if (swiperRef) {
        //     const isAtBeginning = swiperRef.isBeginning;
        //     const isAtEnd = swiperRef.isEnd;

        //     setPrevDisable(isAtBeginning);
        //     setNextDisable(isAtEnd);
        //   }
        // }}
        breakpoints={{
          0: {
            slidesPerView: 2,

            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,

            spaceBetween: 10,
          },
          1050: {
            slidesPerView: 3,

            spaceBetween: 10,
          },
        }}
      >
        {features.map((feature, index) => (
          <SwiperSlide
            key={index}
            className="hover:scale-105 transition-all duration-300 p-3"
          >
            <div key={index} className="flex flex-col items-center text-center">
              <feature.icon
                strokeWidth={0.6}
                className="w-[100px] h-[100px] mb-4"
              />
              <h3 className="text-2xl font-medium mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          </SwiperSlide>
        ))}
        <div className={` justify-center space-x-4 pt-2 pb-4  flex md:hidden`}>
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
      </Swiper>
    </div>
  );
}
