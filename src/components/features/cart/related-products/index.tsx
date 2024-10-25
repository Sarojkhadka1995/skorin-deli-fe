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

export default function RelatedProducts() {
  return (
    <div className="mb-[60px] p-6 pb-3 ">
      <h2 className="text-lg font-medium mb-4">Often bought together</h2>
      <Carousel className="relative">
        <CarouselContent>
          {productPairs.map((pair, index) => (
            <CarouselItem key={index} className="basis-1/2">
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
            height={200}
            width={200}
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
