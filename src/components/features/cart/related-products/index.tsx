"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { banner } from "../../../../../image-config";
import { Skeleton } from "@/components/ui/skeleton";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const productPairs = [
  {
    id: "1",
    name: "Muzzi",
    description: "Pannetoncino Classino (Mini panettone) 100g",
    price: 5.99,
    imageUrl: banner,
  },
  {
    id: "1",
    name: "Muzzi",
    description: "Pannetoncino Classino (Mini panettone) 100g",
    price: 5.99,
    imageUrl: banner,
  },
  {
    id: "1",
    name: "Muzzi",
    description: "Pannetoncino Classino (Mini panettone) 100g",
    price: 5.99,
    imageUrl: banner,
  },
  {
    id: "1",
    name: "Muzzi",
    description: "Pannetoncino Classino (Mini panettone) 100g",
    price: 5.99,
    imageUrl: banner,
  },
  {
    id: "1",
    name: "Muzzi",
    description: "Pannetoncino Classino (Mini panettone) 100g",
    price: 5.99,
    imageUrl: banner,
  },
  {
    id: "1",
    name: "Muzzi",
    description: "Pannetoncino Classino (Mini panettone) 100g",
    price: 5.99,
    imageUrl: banner,
  },
  // Add more product pairs here for additional carousel items
];

function ProductCardSkeleton() {
  return (
    <Card className="mx-1 border-none">
      <CardContent className="p-1">
        <Skeleton className="rounded-lg w-full h-[100px] mb-3" />
        <Skeleton className="h-4 w-16 mb-1" />
        <Skeleton className="h-5 w-24 mb-2" />
        <Skeleton className="h-4 w-full" />
      </CardContent>
    </Card>
  );
}

export default function RelatedProducts({
  rows = 2,
  isLoading = false,
}: {
  rows?: number;
  isLoading?: boolean;
}) {
  return (
    <div className="mb-[60px] p-6 pb-3">
      <h2 className="text-lg font-medium mb-4">Often bought together</h2>
      <Carousel className="relative">
        <CarouselContent>
          {isLoading
            ? // Show 6 skeleton items while loading
              Array.from({ length: 6 }).map((_, index) => (
                <CarouselItem key={index} className={`basis-1/${rows}`}>
                  <div className="flex space-x-4">
                    <ProductCardSkeleton />
                  </div>
                </CarouselItem>
              ))
            : // Show actual products when loaded
              productPairs.map((pair, index) => (
                <CarouselItem key={index} className={`basis-1/${rows}`}>
                  <div className="flex space-x-4">
                    <ProductCard product={pair} />
                  </div>
                </CarouselItem>
              ))}
        </CarouselContent>
        <div className="absolute -bottom-10 right-[50%] translate-x-1/2 flex items-center justify-center gap-4 mx-auto">
          <CarouselPrevious className="w-10 h-10" />
          <CarouselNext className="w-10 h-10" />
        </div>
      </Carousel>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="mx-1 border-none">
      <CardContent className="p-1">
        <div className="border rounded-lg flex justify-center items-center mb-3 p-1 w-full h-[100px]">
          <Image
            src={product.imageUrl}
            alt={product.name}
            objectFit="contain"
            // className="hover:"
            height={150}
            width={150}
          />
        </div>
        <div className="text-sm font-light mb-1">
          ${product.price.toFixed(2)}
        </div>
        <h3 className="font-medium mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600">{product.description}</p>
      </CardContent>
    </Card>
  );
}
