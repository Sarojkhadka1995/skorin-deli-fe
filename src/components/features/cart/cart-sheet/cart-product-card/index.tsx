// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { getImageUrl } from "@/lib/utils";
// import { checkStock } from "@/services/cart/cart.service";
// import { useQuery } from "@tanstack/react-query";
// import { TOAST_TYPES } from "@/utils/toast-utils/toast-util";
// import { showToast } from "@/utils/toast-utils/toast-util";

// interface ProductCardProps {
//   id: number;
//   imageUrl: string;
//   price: number;
//   name: string;
//   description: string;
//   weight: string;
//   quantity: number;
//   onRemove: () => void;
//   updateQuantity: (quantity: number) => void;
// }

// export default function CartProductCard({
//   id,
//   imageUrl,
//   price,
//   name,
//   description,
//   weight,
//   quantity,
//   onRemove,
//   updateQuantity,
// }: ProductCardProps) {
//   const { data: stockData, isLoading: checkStockLoading } = useQuery({
//     queryKey: ["stock", id],
//     queryFn: () => checkStock(id),
//   });

//   const decreaseQuantity = () => {
//     if (quantity > 1 && stockData && stockData > 0) {
//       updateQuantity(quantity - 1);
//     } else {
//       showToast(TOAST_TYPES.error, `${name} is out of stock`);
//     }
//   };

//   const increaseQuantity = () => {
//     const newQuantity = quantity + 1;
//     if (stockData && newQuantity <= stockData) {
//       updateQuantity(newQuantity);
//     } else {
//       showToast(TOAST_TYPES.error, `${name} is out of stock`);
//     }
//   };

//   return (
//     <Card className="w-full border-0 group mb-2">
//       <CardContent className="p-0">
//         <div className="grid grid-cols-12 gap-4">
//           <div className="col-span-4 border border-[#e5e5e5] rounded-xl !p-3 h-full flex justify-center items-center">
//             <Image
//               src={getImageUrl(imageUrl)}
//               alt={name}
//               height={100}
//               width={100}
//               objectFit="contain"
//               className="group-hover:scale-105 transition-all duration-300"
//             />
//           </div>
//           <div className="col-span-8">
//             <p className="text-2xl font-bold">${price.toFixed(2)}</p>
//             <h3 className="text-lg font-semibold">{name}</h3>
//             <p className="text-sm text-gray-600 line-clamp-2">
//               {description} {weight}
//             </p>
//             <div className="flex items-center mt-2">
//               <Button
//                 variant="outline"
//                 size="icon"
//                 onClick={decreaseQuantity}
//                 className="h-8 w-8 disabled:cursor-not-allowed"
//                 disabled={quantity === 1 || checkStockLoading}
//               >
//                 -
//               </Button>
//               <span className="mx-2 text-lg">{quantity}</span>
//               <Button
//                 variant="outline"
//                 size="icon"
//                 onClick={increaseQuantity}
//                 className="h-8 w-8"
//                 disabled={
//                   checkStockLoading || stockData === 0 || stockData < quantity
//                 }
//               >
//                 +
//               </Button>
//               <Button
//                 variant="ghost"
//                 onClick={onRemove}
//                 className="ml-4 text-sm"
//               >
//                 Remove
//               </Button>
//             </div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

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
    <Card className="w-full border border-border rounded-xl overflow-hidden group transition-shadow hover:shadow-md">
      <CardContent className="p-0">
        <div className="flex gap-4 p-4">
          {/* Product Image */}
          <div className="w-24 h-24 flex-shrink-0 bg-muted/50 rounded-lg overflow-hidden flex items-center justify-center">
            <Image
              src={getImageUrl(imageUrl)}
              alt={name}
              height={80}
              width={80}
              className="object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-foreground leading-tight line-clamp-1">
                  {name}
                </h3>
                <p className="text-lg font-bold text-foreground flex-shrink-0">
                  ${price.toFixed(2)}
                </p>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                {description} {weight && `• ${weight}`}
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-0.5">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={decreaseQuantity}
                  className="h-7 w-7 rounded-md hover:bg-background disabled:cursor-not-allowed"
                  disabled={quantity === 1 || checkStockLoading}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                  </svg>
                </Button>
                <span className="w-8 text-center text-sm font-medium">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={increaseQuantity}
                  className="h-7 w-7 rounded-md hover:bg-background"
                  disabled={
                    checkStockLoading || stockData === 0 || stockData < quantity
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                </Button>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={onRemove}
                className="text-muted-foreground hover:text-destructive text-xs h-7 px-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
                Remove
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
