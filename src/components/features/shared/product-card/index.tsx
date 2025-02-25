import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { IProductDetail } from "@/interface/product.types";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import CartSheet from "../../cart/cart-sheet";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils";
import { getCookie } from "cookies-next";
import { COOKIE_CONFIG } from "@/config/app";
// import { TOAST_TYPES } from "@/utils/toast-utils/toast-util";
// import useProfileStore from "@/store/useProfileStore";
// import { createCart } from "@/services/cart/cart.service";
import { useRouter } from "next/navigation";
// import { showToast } from "@/utils/toast-utils/toast-util";
import { useRef } from "react";
import { COMMON_IMAGES } from "@/config/image";

export default function ProductCard({ product }: { product: IProductDetail }) {
  // const pathname = usePathname();
  // const searchParams = useSearchParams();
  // const currentProductId = searchParams.get("id");
  const router = useRouter();

  const isLoggedIn = getCookie(COOKIE_CONFIG.loggedIn);

  // const { profileData } = useProfileStore();

  const sheetTrigger = useRef<HTMLButtonElement>(null);

  const buyNow = async () => {
    if (!isLoggedIn) {
      // Set returnUrl to the product's specific page
      const returnUrl = encodeURIComponent(`/products/${product.slug}`);
      router.push(`/account/login?returnUrl=${returnUrl}`);
    } else {
      router.push(`/products/${product.slug}`);
      // if (!profileData?.id) return;
      // const payload = {
      //   userId: profileData?.id,
      //   productId,
      //   quantity: 1,
      // };

      // const response = await createCart(payload);
      // if (response) {
      //   showToast(TOAST_TYPES.success, "Product added to cart");
      // }
    }
  };
  return (
    <Card
      key={product.id}
      className="w-full max-w-sm mx-auto group !transition-all !ease-in-out !duration-[1000ms]"
    >
      <CardContent className="p-4">
        {/* {product ? ( */}
        <Link href={`/products/${product.slug}`}>
          <div>
            <div className="aspect-square relative mb-4">
              {/* {product.imageUrl ? ( */}
              <Image
                src={getImageUrl(product.imageUrl)}
                onError={(e) => {
                  e.currentTarget.src = COMMON_IMAGES.noImage;
                }}
                alt={product.name}
                layout="fill"
                objectFit="contain"
                className="group-hover:scale-105 !transition-all !ease-in-out !duration-[1000ms]"
              />
              {/* ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  No Image
                </div>
              )} */}
              {/* <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${product.image}`} /> */}
              {/* {product.special && (
                <div className="absolute -top-2 -right-2 bg-[#D14545] text-white px-2 py-1 rounded-sm text-xs">
                  Special
                </div>
              )} */}
            </div>
            <div className="space-y-2">
              {isLoggedIn && (
                <p className="text-lg font-light">
                  ${Number(product.price).toFixed(2)}
                </p>
              )}
              <h3 className="font-semibold text-lg leading-tight line-clamp-2 h-[49px] capitalize">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {product.description}
              </p>
              {product.quantity === 0 && (
                <p className="text-red-500 text-sm">Out of stock</p>
              )}
            </div>
          </div>
        </Link>
      </CardContent>
      <CardFooter>
        <Sheet>
          <SheetTrigger
            ref={sheetTrigger}
            className="h-[50px] rounded-full px-7 text-[16px] w-full bg-[#ffffff] text-[#2b2b2b] border-[2px] border-[#2b2b2b] shadow-sm hover:bg-[#2b2b2b] hover:text-[#ffffff]"
            disabled={product.quantity === 0}
            onClick={(e) => {
              e.preventDefault();
              buyNow();
            }}
          >
            {product.quantity === 0 ? "Out of Stock" : "Buy now"}
          </SheetTrigger>
          <CartSheet />
        </Sheet>
      </CardFooter>
    </Card>
  );
}
