import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Roberto",
    role: "Customer",
    content:
      "As regular customer I can just say how amazing this store is, where you can find a lot of typical imported italian products, otherwise very rare to find, that brings me back to the past when I was living in Italy. Outstanding customer service and very efficient delivery system. Definitely recommended!!",
  },
  {
    name: "Sophia",
    role: "Regular Shopper",
    content:
      "The selection of authentic Italian products is unparalleled. It's like taking a culinary trip to Italy every time I shop here!",
  },
  {
    name: "Marco",
    role: "Food Enthusiast",
    content:
      "I've been searching for genuine Italian ingredients for years, and this store has it all. The quality and variety are exceptional.",
  },
  {
    name: "Isabella",
    role: "Chef",
    content:
      "As a professional chef, I rely on high-quality ingredients. This store never disappoints with its authentic Italian selections.",
  },
  {
    name: "Luca",
    role: "Italian Expat",
    content:
      "Finding a taste of home is so important when you're living abroad. This store brings Italy to my doorstep with every order.",
  },
];

export default function TestimonialCarousel() {
  return (
    <div className="w-full container mx-auto pb-[20px]">
      <h2 className="text-3xl font-bold mb-2">Testimonials</h2>
      <p className="text-lg text-muted-foreground mb-6">What our clients say</p>
      <div className="px-10">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="h-full">
                <div className="p-1 h-full">
                  <Card className="h-full">
                    <CardContent className="flex flex-col items-center justify-center p-6 h-full">
                      <blockquote className="text-center italic mb-4">
                        {testimonial.content}
                      </blockquote>
                      <div className="text-center">
                        <h3 className="text-lg font-semibold">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
