import { User, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import CartSheet from "../../cart/cart-sheet";
import Link from "next/link";
import useCartStore from "@/store/useCartStore";
import { deleteCookie, getCookie } from "cookies-next";
import { COOKIE_CONFIG } from "@/config/app";
import { useState } from "react";
import { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/router";
import { showToast, TOAST_TYPES } from "@/utils/toast-utils/toast-util";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AccountAndCart() {
  const { cartTotal, cartData } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const isLoggedIn = getCookie(COOKIE_CONFIG.loggedIn);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const logout = () => {
    deleteCookie(COOKIE_CONFIG.loggedIn);
    deleteCookie(COOKIE_CONFIG.accessToken);
    deleteCookie(COOKIE_CONFIG.refreshToken);
    router.replace("/account/login");
    showToast(TOAST_TYPES.success, "Logged out successfully");
  };

  return (
    <div className="lg:flex items-center gap-3 hidden">
      {!isLoggedIn ? (
        <Link href={"/account/login"}>
          <Button
            size="lg"
            variant="outline"
            className="flex items-center gap-2"
          >
            <User size={28} className="!h-[22px] !w-[22px]" />
            Account
          </Button>
        </Link>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={"/account/profile"}>
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  Log out
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to logout?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    You will be redirected to the login page.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={logout}>Logout</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {isLoggedIn && (
        <Sheet>
          <SheetTrigger
            className={`inline-flex items-center justify-center gap-2 whitespace-nowrap h-[50px] rounded-full px-7 text-[16px] bg-[#2b2b2b] text-white border-[2px] border-[#2b2b2b]  shadow-sm hover:bg-[#ffffff] hover:text-[#2b2b2b]`}
          >
            <ShoppingCart size={28} className="!h-[22px] !w-[22px]" />$
            {cartTotal} ({cartData?.length})
          </SheetTrigger>
          <CartSheet />
        </Sheet>
      )}
    </div>
  );
}
