import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

import Search from "./Search";
import AccountAndCart from "./AccountAndCart";
import { Menu, ShoppingCart } from "lucide-react";
import { logo } from "../../../../../image-config";
import CartSheet from "../../cart/cart-sheet";

export default function MainHeader() {
  return (
    <div className="grid grid-cols-3 lg:py-10 py-6 container mx-auto">
      <Sheet>
        <SheetTrigger className="lg:hidden">
          <Menu />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <div className="flex items-center justify-center lg:justify-start">
        <Link href="/">
          <Image src={logo} alt="Skorin Deli" width={100} height={50} />
        </Link>
      </div>
      <Sheet>
        <SheetTrigger className="lg:hidden flex justify-end">
          <ShoppingCart />
        </SheetTrigger>
        <CartSheet />
      </Sheet>
      <Search />
      <AccountAndCart />
    </div>
  );
}
