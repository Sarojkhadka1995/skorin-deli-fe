import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  imageUrl: string;
  price: number;
  name: string;
  description: string;
  weight: string;
  onRemove: () => void;
}

export default function CartProductCard(
  { imageUrl, price, name, description, weight, onRemove }: ProductCardProps = {
    imageUrl: "/placeholder.svg?height=200&width=200",
    price: 37.99,
    name: "Tre Marie Panettone",
    description: "Tuttuvetta (rasins only)",
    weight: "1Kg",
    onRemove: () => console.log("Remove clicked"),
  }
) {
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <Card className="w-full max-w-sm border-0 group">
      <CardContent className="p-0">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4 border border-[#e5e5e5] rounded-xl !p-3 h-full flex justify-center items-center">
            <Image
              src={imageUrl}
              alt={name}
              height={100}
              width={100}
              objectFit="contain"
              className="group-hover:scale-105 transition-all duration-300"
            />
          </div>
          <div className="col-span-8">
            <p className="text-2xl font-bold">${price.toFixed(2)}</p>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-gray-600">
              {description} {weight}
            </p>
            <div className="flex items-center mt-2">
              <Button
                variant="outline"
                size="icon"
                onClick={decreaseQuantity}
                className="h-8 w-8"
              >
                -
              </Button>
              <span className="mx-2 text-lg">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={increaseQuantity}
                className="h-8 w-8"
              >
                +
              </Button>
              <Button
                variant="ghost"
                onClick={onRemove}
                className="ml-4 text-sm"
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
