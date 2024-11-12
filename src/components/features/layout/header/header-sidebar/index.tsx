import { ChevronDown, Facebook, Instagram, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import storeIcon from "@/public/icons/shop.svg";
import truckIcon from "@/public/icons/truck.svg";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import PickupLocation from "../pickup-location";

import { ShopMenuAccordion } from "../ShopMenuAccordion";

export default function HeaderSidebar() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="flex items-center justify-between gap-3 w-full lg:w-auto border-y py-3 bg-gray-100 px-6">
        <Dialog>
          <DialogTrigger>
            <div className="flex items-center gap-2 group ">
              {/* <Store
                className="lg:w-[38px] lg:h-[38px] w-[28px] h-[28px]"
                strokeWidth={0.5}
              /> */}
              <Image src={storeIcon} alt="store" width={38} height={38} />

              <div className="flex flex-col gap-1 justify-center items-start">
                <span className=" text-xs font-normal leading-3">My store</span>
                <p className=" lg:text-base text-sm font-medium leading-4 group-hover:underline underline-offset-4 flex items-center gap-1">
                  Find Us
                  <ChevronDown size={16} />
                </p>
              </div>
            </div>
          </DialogTrigger>
          <PickupLocation />
        </Dialog>
        <Link href="/policies/shipping-policy">
          <div className="flex items-center gap-2 group ">
            {/* <TruckIcon
              className="lg:w-[38px] lg:h-[38px] w-[28px] h-[28px]"
              strokeWidth={0.5}
            /> */}
            <Image src={truckIcon} alt="store" width={38} height={38} />
            <div className="flex flex-col gap-1 justify-center items-start ">
              <p className=" lg:text-base text-sm font-medium leading-4 group-hover:underline underline-offset-4 flex items-center gap-1">
                Delivery Info
              </p>
            </div>
          </div>
        </Link>
      </div>

      <nav className="border-b ">
        <Link
          href="/"
          className="flex items-center px-6 py-3 text-lg transition-colors hover:bg-muted"
        >
          Home
        </Link>
        {/* <Link
          href="/categories"
          className="flex items-center justify-between px-6 py-3 text-lg transition-colors hover:bg-muted"
        >
          Shop
          <ChevronRight className="w-5 h-5" />
        </Link> */}
        <ShopMenuAccordion />

        <Link
          href="/contact"
          className="flex items-center px-6 py-3 text-lg transition-colors hover:bg-muted"
        >
          Contact
        </Link>
        <Link
          href="/about"
          className="flex items-center px-6 py-3 text-lg transition-colors hover:bg-muted"
        >
          About Us
        </Link>
      </nav>

      <div className="p-4 border-b px-6 transition-colors hover:bg-muted">
        <Link href="/account" className="flex items-center gap-2 text-lg ">
          <User className="w-5 h-5" />
          Account
        </Link>
      </div>

      <div className="flex gap-4 py-4 px-6">
        <Link
          href="https://facebook.com"
          className="text-muted-foreground hover:text-foreground"
        >
          <Facebook className="w-6 h-6" />
          <span className="sr-only">Facebook</span>
        </Link>
        <Link
          href="https://instagram.com"
          className="text-muted-foreground hover:text-foreground"
        >
          <Instagram className="w-6 h-6" />
          <span className="sr-only">Instagram</span>
        </Link>
      </div>
    </div>
  );
}
