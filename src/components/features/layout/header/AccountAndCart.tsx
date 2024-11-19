"use client";
import { User, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import CartSheet from "../../cart/cart-sheet";
import Link from "next/link";
import useCartStore from "@/store/useCartStore";
import { getCookie } from "cookies-next";
import { COOKIE_CONFIG } from "@/config/app";

export default function AccountAndCart() {
  const { cartTotal, cartData } = useCartStore();

  const isLoggedIn = getCookie(COOKIE_CONFIG.loggedIn);

  return (
    <div className="lg:flex items-center gap-3 hidden">
      <Link href={isLoggedIn ? "/account/profile" : "/account/login"}>
        <Button size="lg" variant="outline" className="flex items-center gap-2">
          <User size={28} className="!h-[22px] !w-[22px]" />
          Account
        </Button>
      </Link>

      <Sheet>
        <SheetTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap h-[50px] rounded-full px-7 text-[16px] bg-[#2b2b2b] text-white border-[2px] border-[#2b2b2b]  shadow-sm hover:bg-[#ffffff] hover:text-[#2b2b2b]">
          <ShoppingCart size={28} className="!h-[22px] !w-[22px]" />${cartTotal}{" "}
          ({cartData?.length})
        </SheetTrigger>
        <CartSheet />
      </Sheet>
    </div>
  );
}
