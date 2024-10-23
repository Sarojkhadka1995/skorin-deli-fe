import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { IProduct } from "@/types/product.types";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function ProductCard({ product }: { product: IProduct }) {
  return (
    <Card
      key={product.id}
      className="w-full max-w-sm mx-auto group  !transition-all !ease-in-out !duration-[1000ms]"
    >
      <CardContent className="p-4">
        <Link href={`/product/${product.id}`}>
          <div className="aspect-square relative mb-4">
            <Image
              src={product.image}
              alt={product.name}
              layout="fill"
              objectFit="contain"
              className="group-hover:scale-105 !transition-all !ease-in-out !duration-[1000ms]"
            />
            {product.discount && (
              <div className="absolute -top-2 -right-2 bg-[#D14545] text-white px-2 py-1 rounded-sm text-xs">
                -14%
              </div>
            )}
          </div>
          <div className="space-y-2">
            <p className="text-lg font-light">${product.price.toFixed(2)}</p>
            <h3 className="font-semibold text-lg leading-tight">
              {product.name}
            </h3>
            {/* <p className="text-lg font-light">{product.description}</p> */}
            <p className="text-lg font-light">{product.weight}</p>
          </div>
        </Link>
      </CardContent>
      <CardFooter>
        <Sheet>
          <SheetTrigger className="h-[50px] rounded-full px-7 text-[16px] w-full bg-[#ffffff] text-[#2b2b2b] border-[2px] border-[#2b2b2b]  shadow-sm hover:bg-[#2b2b2b] hover:text-[#ffffff]">
            Buy now
            {/* <ShoppingCart /> */}
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Cart</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </CardFooter>
    </Card>
  );
}
