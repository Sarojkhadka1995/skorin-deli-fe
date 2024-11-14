"use client";

import { Minus, Plus, Search, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import CartSheet from "../../cart/cart-sheet";
import { getImageUrl } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { IProductDetail } from "@/interface/product.types";
import ProductIngredients from "../../product-detail/product-ingrediens";
import { getCookie } from "cookies-next";
import { COOKIE_CONFIG } from "@/config/app";
import { useMutation } from "@tanstack/react-query";
import { createCart } from "@/services/cart/cart.service";
import { showToast, TOAST_TYPES } from "@/utils/toast-utils/toast-util";
import useProfileStore from "@/store/useProfileStore";

export default function ProductDetail({
  product,
  isLoading,
  isError,
}: {
  product?: IProductDetail;
  isLoading: boolean;
  isError: boolean;
}) {
  const { profileData } = useProfileStore();
  const [quantity, setQuantity] = useState(1);
  const [color] = useState("Black");
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const isLoggedIn = getCookie(COOKIE_CONFIG.loggedIn);

  const { mutate: addToCart } = useMutation({
    mutationFn: createCart,
    onSuccess: () => {
      showToast(TOAST_TYPES.success, "Product added to cart");
    },
    onError: () => {
      showToast(TOAST_TYPES.error, "Failed to add product to cart");
    },
  });

  if (isLoading) {
    return (
      <div className="py-3">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image skeleton */}
          <div className="relative">
            <Skeleton className="aspect-square w-full rounded-lg" />
          </div>

          {/* Content skeleton */}
          <div>
            <Skeleton className="h-10 w-3/4 mb-2" />
            <div className="space-y-4 mb-6">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
            <Skeleton className="h-10 w-32 mb-4" />

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-[50px] w-[50px]" />
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-[50px] w-[50px]" />
              </div>
              <Skeleton className="h-[50px] w-[200px]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return <div>Error loading product details</div>;
  }
  const { id, name, price, description, imageUrl } = product;

  const handleZoom = (image: string) => {
    setZoomedImage(image);
  };

  const closeZoom = () => {
    setZoomedImage(null);
  };

  const handleAddToCart = () => {
    console.log({
      id,
      name,
      price,
      color,
      quantity,
    });

    const cartData = {
      userId: profileData?.id || 1,
      productId: id,
      quantity,
    };
    addToCart(cartData);
  };

  return (
    <div className=" py-3">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative">
          {/* <Carousel className="w-full mx-auto relative mb-[30px]">
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}> */}
          <div className="relative aspect-square">
            <Image
              src={getImageUrl(imageUrl)}
              alt={`${name} - Image`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg cursor-pointer"
              onClick={() => handleZoom(imageUrl)}
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute top-2 right-2 z-10"
              aria-label="Zoom image"
              onClick={() => handleZoom(imageUrl)}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
          {/* </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute -bottom-10 right-[50%] translate-x-1/2 flex items-center justify-center gap-4 mx-auto">
              <CarouselPrevious className="w-10 h-10" />
              <CarouselNext className="w-10 h-10" />
            </div> */}
          {/* </Carousel> */}
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{name}</h1>
          <div
            className="space-y-4 mb-6"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          {/* <div className="mb-3">
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
          </div> */}

          {isLoggedIn && (
            <p className="text-3xl font-medium mb-4">
              ${Number(price).toFixed(2)}
            </p>
          )}

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
          <div className="my-6">
            <ProductIngredients
              nutritionInfo={product?.nutritionInfo}
              ingredients={product?.ingredients}
            />
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
              src={getImageUrl(zoomedImage)}
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
