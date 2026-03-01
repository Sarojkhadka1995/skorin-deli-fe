"use client";

import { Search, X } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
// import CartSheet from "../../cart/cart-sheet";
import { getImageUrl } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { IProductDetail } from "@/interface/product.types";
// import ProductIngredients from "../../product-detail/product-ingrediens";
import { getCookie } from "cookies-next";
import { COOKIE_CONFIG } from "@/config/app";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { checkStock, createCart } from "@/services/cart/cart.service";
import { showToast, TOAST_TYPES } from "@/utils/toast-utils/toast-util";
import useProfileStore from "@/store/useProfileStore";
import { useRouter } from "next/navigation";

export default function ProductDetail({
  product,
  isLoading,
  isError,
}: {
  product?: IProductDetail;
  isLoading: boolean;
  isError: boolean;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  //Ref
  const { profileData } = useProfileStore();
  const [quantity] = useState<number>(1);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const isLoggedIn = getCookie(COOKIE_CONFIG.loggedIn);

  const { mutate: addToCart } = useMutation({
    mutationFn: createCart,
    onSuccess: () => {
      showToast(
        TOAST_TYPES.success,
        <div className="flex items-center gap-2">
          <span>Product added to cart</span>
          <button
            onClick={() => router.push("/cart")}
            className="underline text-black hover:text-black"
          >
            View cart
          </button>
        </div>,
      );
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      setIsSheetOpen(true);
    },
    onError: () => {
      showToast(TOAST_TYPES.error, "Failed to add product to cart");
    },
  });

  const { data: stockData } = useQuery({
    queryKey: ["stock", product?.id],
    queryFn: () => {
      if (!product?.id) return 0;
      return checkStock(product?.id);
    },
  });

  useEffect(() => {
    // Check if we're returning from login with pending cart addition
    const shouldAddToCart = searchParams.get("addToCart");
    const pendingQuantity = searchParams.get("quantity");

    if (
      shouldAddToCart === product?.id?.toString() &&
      pendingQuantity &&
      isLoggedIn &&
      profileData?.id
    ) {
      const cartData = {
        userId: profileData.id,
        productId: product.id,
        quantity: parseInt(pendingQuantity, 10),
      };
      addToCart(cartData);
      // Clear URL parameters after adding to cart
      router.replace(window.location.pathname);
    }
  }, [isLoggedIn, profileData, searchParams]);

  if (isLoading || (isLoggedIn && profileData === null)) {
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

  // const updateQuantity = (value: number) => {
  //   setQuantity(value);
  // };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      const returnUrl = encodeURIComponent(
        `${window.location.pathname}?addToCart=${id}&quantity=${quantity}`,
      );
      showToast(TOAST_TYPES.warning, "Please login to add to cart");
      router.push(`/account/login?returnUrl=${returnUrl}`);
      return;
    }
    if (!profileData?.id) return;
    const cartData = {
      userId: profileData.id,
      productId: id,
      quantity: quantity,
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
              objectFit="contain"
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
            {/* <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => updateQuantity(quantity - 1)}
                disabled={quantity === 1 || checkStockLoading}
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
                onClick={() => updateQuantity(quantity + 1)}
                disabled={
                  checkStockLoading || stockData === 0 || stockData < quantity
                }
                aria-label="Increase quantity"
                className="p-4"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div> */}

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger
                disabled={stockData === 0 || stockData < quantity}
                onClick={(e) => {
                  e.preventDefault();
                  handleAddToCart();
                }}
                className="h-[50px] rounded-full px-7 text-lg w-full hover:bg-[#ffffff] hover:text-[#2b2b2b] border-[2px] border-[#2b2b2b]  shadow-sm bg-[#2b2b2b] text-[#ffffff]"
              >
                Add to cart
              </SheetTrigger>
              {/* <CartSheet /> */}
            </Sheet>
          </div>
          {/* Out of stock */}
          {(stockData === 0 || stockData < quantity) && (
            <div>
              <p className="text-red-500">Out of stock</p>
            </div>
          )}
          {/* <div className="my-6">
            <ProductIngredients
              nutritionInfo={product?.nutritionInfo}
              ingredients={product?.ingredients}
            />
          </div> */}
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
