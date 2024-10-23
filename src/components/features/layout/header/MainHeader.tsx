import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Search from "./Search";
import AccountAndCart from "./AccountAndCart";
import { Menu, ShoppingCart } from "lucide-react";
import { logo } from "../../../../../image-config";

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
        <Image src={logo} alt="La Dispensa" width={100} height={50} />
      </div>
      <Sheet>
        <SheetTrigger className="lg:hidden flex justify-end">
          <ShoppingCart />
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
      <Search />
      <AccountAndCart />
    </div>
  );
}
