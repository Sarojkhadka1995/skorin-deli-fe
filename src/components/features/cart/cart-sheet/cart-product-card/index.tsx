import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getImageUrl } from "@/lib/utils";
import { checkStock } from "@/services/cart/cart.service";
import { useQuery } from "@tanstack/react-query";
import { TOAST_TYPES } from "@/utils/toast-utils/toast-util";
import { showToast } from "@/utils/toast-utils/toast-util";

interface ProductCardProps {
  id: number;
  imageUrl: string;
  price: number;
  name: string;
  description: string;
  weight: string;
  quantity: number;
  onRemove: () => void;
  updateQuantity: (quantity: number) => void;
}

export default function CartProductCard({
  id,
  imageUrl,
  price,
  name,
  description,
  weight,
  quantity,
  onRemove,
  updateQuantity,
}: ProductCardProps) {
  const { data: stockData, isLoading: checkStockLoading } = useQuery({
    queryKey: ["stock", id],
    queryFn: () => checkStock(id),
  });

  const decreaseQuantity = () => {
    if (quantity > 1 && stockData && stockData > 0) {
      updateQuantity(quantity - 1);
    } else {
      showToast(TOAST_TYPES.error, `${name} is out of stock`);
    }
  };

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    if (stockData && newQuantity <= stockData) {
      updateQuantity(newQuantity);
    } else {
      showToast(TOAST_TYPES.error, `${name} is out of stock`);
    }
  };

  return (
    <Card className="w-full border-0 group">
      <CardContent className="p-0">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4 border border-[#e5e5e5] rounded-xl !p-3 h-full flex justify-center items-center">
            <Image
              src={getImageUrl(imageUrl)}
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
            <p className="text-sm text-gray-600 line-clamp-2">
              {description} {weight}
            </p>
            <div className="flex items-center mt-2">
              <Button
                variant="outline"
                size="icon"
                onClick={decreaseQuantity}
                className="h-8 w-8 disabled:cursor-not-allowed"
                disabled={quantity === 1 || checkStockLoading}
              >
                -
              </Button>
              <span className="mx-2 text-lg">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={increaseQuantity}
                className="h-8 w-8"
                disabled={
                  checkStockLoading || stockData === 0 || stockData < quantity
                }
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
