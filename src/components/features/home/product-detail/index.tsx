"use client";

import { Minus, Plus, Search, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { banner, logo } from "../../../../../image-config";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import CartSheet from "../../cart/cart-sheet";

// Mock product data
const mockProduct = {
  id: 1,
  name: "Francis X7.1 iperEspresso Machine",
  price: 399.0,
  description: `
    <p>The beautifully-designed Francis Francis X7.1 iperEspresso machine features advanced technology including steel internal thermoblock, and a Pannarello steam wand that froths milk for creamy cappuccino and latte. Available in red or black, the X7.1 makes a striking statement in any kitchen.</p>
    <p>The uniquely eye catching X7.1's round yet slender shape was inspired by iconic Italian design of the 1960s, while seamlessly integrating a modern control panel featuring soft-touch buttons.</p>
    <p>Beauty is a notion that goes far beyond aesthetics, to essence. It's about filling your world with what's special - things that have stories, moments that have meaning, objects that inspire. The X7.1 features advanced technology to create beautiful coffees while making striking statement in any kitchen.</p>
  `,
  colors: ["Red", "Black"],
  images: [banner, logo, banner, banner],
};

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(mockProduct.colors[0]);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const handleZoom = (image: string) => {
    setZoomedImage(image);
  };

  const closeZoom = () => {
    setZoomedImage(null);
  };

  const handleAddToCart = () => {
    console.log({
      id: mockProduct.id,
      name: mockProduct.name,
      price: mockProduct.price,
      color: color,
      quantity: quantity,
    });
  };

  return (
    <div className=" py-3">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative">
          <Carousel className="w-full mx-auto relative mb-[30px]">
            <CarouselContent>
              {mockProduct.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-square">
                    <Image
                      src={image}
                      alt={`${mockProduct.name} - Image ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg cursor-pointer"
                      onClick={() => handleZoom(image)}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute top-2 right-2 z-10"
                      aria-label="Zoom image"
                      onClick={() => handleZoom(image)}
                    >
                      <Search className="h-4 w-4" />
                    </Button>
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
        <div>
          <p className="text-xl font-normal mb-2">
            ${mockProduct.price.toFixed(2)}
          </p>
          <h1 className="text-3xl font-bold mb-2">{mockProduct.name}</h1>
          <div
            className="space-y-4 mb-6"
            dangerouslySetInnerHTML={{ __html: mockProduct.description }}
          />
          <div className="mb-3">
            <h2 className="text-lg font-semibold mb-2">Color</h2>
            <RadioGroup
              defaultValue={color}
              onValueChange={setColor}
              className="flex space-x-2"
            >
              {mockProduct.colors.map((colorOption) => (
                <div
                  key={colorOption}
                  className="flex items-center justify-between gap-2"
                >
                  <RadioGroupItem
                    value={colorOption}
                    id={colorOption}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={colorOption}
                    className="h-[50px] px-6 flex items-center justify-center text-lg font-medium rounded-full border border-[#ddd] peer-data-[state=checked]:border-[2px] peer-data-[state=checked]:border-black peer-data-[state=checked]:text-black  hover:text-gray-900 cursor-pointer transition-colors"
                  >
                    {colorOption}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <p className="text-3xl font-medium mb-4">
            ${mockProduct.price.toFixed(2)}
          </p>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="p-4"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-2xl font-semibold min-w-[26px] text-center">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="p-4"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Sheet>
              <SheetTrigger
                onClick={handleAddToCart}
                className="h-[50px] rounded-full px-7 text-lg w-full hover:bg-[#ffffff] hover:text-[#2b2b2b] border-[2px] border-[#2b2b2b]  shadow-sm bg-[#2b2b2b] text-[#ffffff]"
              >
                Add to cart
              </SheetTrigger>
              <CartSheet />
            </Sheet>
          </div>
        </div>
      </div>

      {zoomedImage && (
        <div
          onClick={closeZoom}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="relative max-w-[calc(100vw-100px)] max-h-[calc(100vh-100px)] w-full h-full">
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 right-0 z-10"
              onClick={closeZoom}
            >
              <X className="h-4 w-4" />
            </Button>
            <Image
              src={zoomedImage}
              alt="Zoomed product image"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
