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
import HeaderSidebar from "./header-sidebar";

export default function MainHeader() {
  return (
    <div className="flex flex-wrap lg:flex-nowrap justify-between items-center gap-3 lg:py-4 py-3 container mx-auto">
      <Sheet>
        <SheetTrigger className="lg:hidden hover:text-primary">
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <SheetHeader className="p-6">
            <SheetTitle className="">Menu</SheetTitle>
          </SheetHeader>
          <HeaderSidebar />
        </SheetContent>
      </Sheet>
      <div className="flex items-center justify-center lg:justify-start me-10 md:me-[130px]">
        <Link href="/">
          <Image src={logo} alt="Skorin Deli" width={100} height={50} />
        </Link>
      </div>
      <Sheet>
        <SheetTrigger className="lg:hidden flex justify-end items-center h-full hover:text-primary">
          <ShoppingCart strokeWidth={2} />
        </SheetTrigger>
        <CartSheet />
      </Sheet>

      <Search />
      <AccountAndCart />
    </div>
  );
}
