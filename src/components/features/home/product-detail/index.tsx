"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Minus, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { banner, logo } from "../../../../../image-config";

const productImages = [banner, logo, banner, banner];

export default function ProductDetail() {
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("Red");
  console.log(color);
  const nextImage = () =>
    setCurrentImage((prev) => (prev + 1) % productImages.length);
  const prevImage = () =>
    setCurrentImage(
      (prev) => (prev - 1 + productImages.length) % productImages.length
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            className="absolute top-2 right-2 z-10"
            aria-label="Zoom image"
          >
            <Search className="h-4 w-4" />
          </Button>
          <div className="relative aspect-square">
            <Image
              src={productImages[currentImage]}
              alt="Francis X7.1 iperEspresso Machine"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="flex justify-center mt-4 space-x-2">
            <Button variant="outline" size="icon" onClick={prevImage}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {productImages.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentImage ? "bg-primary" : "bg-gray-300"
                }`}
              />
            ))}
            <Button variant="outline" size="icon" onClick={nextImage}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Francis X7.1 iperEspresso Machine
          </h1>
          <p className="text-2xl font-semibold mb-4">$399.00</p>
          <div className="space-y-4 mb-6">
            <p>
              The beautifully-designed Francis Francis X7.1 iperEspresso machine
              features advanced technology including steel internal thermoblock,
              and a Pannarello steam wand that froths milk for creamy cappuccino
              and latte. Available in red or black, the X7.1 makes a striking
              statement in any kitchen.
            </p>
            <p>
              The uniquely eye catching X7.1&apos;s round yet slender shape was
              inspired by iconic Italian design of the 1960s, while seamlessly
              integrating a modern control panel featuring soft-touch buttons.
            </p>
            <p>
              Beauty is a notion that goes far beyond aesthetics, to essence.
              It&apos;s about filling your world with what&apos;s special -
              things that have stories, moments that have meaning, objects that
              inspire. The X7.1 features advanced technology to create beautiful
              coffees while making striking statement in any kitchen.
            </p>
            <p>
              The innovative iperEspresso capsule system makes café quality
              espresso with ease Unlike conventional one-stage systems, the
              iperEspresso capsule system uses a, patented two-stage process to
              create intensely aromatic, full-bodied espresso with rich,
              long-lasting crema. And the capsules make for quick and easy clean
              up.
            </p>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Color</h2>
            <RadioGroup defaultValue="Red" onValueChange={setColor}>
              <div className="flex space-x-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Red" id="Red" />
                  <Label htmlFor="Red">Red</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Black" id="Black" />
                  <Label htmlFor="Black">Black</Label>
                </div>
              </div>
            </RadioGroup>
          </div>
          <div className="flex items-center space-x-4 mb-6">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-xl font-semibold">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button className="w-full">Add to cart</Button>
        </div>
      </div>
    </div>
  );
}
