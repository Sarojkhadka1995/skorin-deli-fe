import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Sheet, SheetTrigger } from "@/components/ui/sheet";

import { logo } from "../../../../../image-config";
import CartSheet from "../../cart/cart-sheet";
import AccountAndCart from "./AccountAndCart";
import SlidingMenu from "./header-slider-sidebar/header-slider-sidebar";
import Search from "./Search";
import { useEffect } from "react";
import { useState } from "react";
import { COOKIE_CONFIG } from "@/config/app";
import { getCookie } from "cookies-next";

export default function MainHeader() {
  const [isMounted, setIsMounted] = useState(false);
  const isLoggedIn = getCookie(COOKIE_CONFIG.loggedIn);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="flex flex-wrap lg:flex-nowrap justify-between items-center gap-3 lg:py-4 py-3 container mx-auto">
      {/* <Sheet>
        <SheetTrigger className="lg:hidden hover:text-primary">
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="p-0 sm:min-w-[300px] min-w-full">
          <SheetHeader className="p-6">
            <SheetTitle className="">Menu</SheetTitle>
          </SheetHeader>
          <HeaderSidebar />
        </SheetContent>
      </Sheet> */}
      <SlidingMenu />
      <div className="flex items-center justify-center lg:justify-start  lg:me-[130px]">
        <Link href="/">
          <Image src={logo} alt="Skorin Deli" width={100} height={50} />
        </Link>
      </div>
      {isLoggedIn ? (
        <Sheet>
          <SheetTrigger className="lg:hidden flex justify-end items-center h-full hover:text-primary">
            <ShoppingCart strokeWidth={2} />
          </SheetTrigger>
          <CartSheet />
        </Sheet>
      ) : (
        <div></div>
      )}

      <Search />
      <AccountAndCart />
    </div>
  );
}
