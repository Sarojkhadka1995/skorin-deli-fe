import { ChevronDown, Store, TruckIcon } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { ShopMenu } from "./ShopMenu";
import PickupLocation from "./pickup-location";

const NavigationDiv = () => {
  return (
    <div className="border-y border-gray-200">
      <nav className="container mx-auto my-4 flex justify-between items-center gap-3">
        <div className="hidden lg:flex justify-between items-center gap-3 text-base">
          <Link href="/">
            <Button variant="link" className="font-medium text-base ps-0">
              Home
            </Button>
          </Link>
          <ShopMenu />

          <Link href="/contact">
            <Button variant="link" className="font-medium text-base">
              Contact
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="link" className="font-medium text-base">
              About Us
            </Button>
          </Link>
        </div>
        <div className="flex items-center justify-between gap-6 w-full lg:w-auto">
          <Dialog>
            <DialogTrigger>
              <div className="flex items-center gap-2 group ">
                <Store
                  className="lg:w-[38px] lg:h-[38px] w-[28px] h-[28px]"
                  strokeWidth={0.5}
                />
                <div className="flex flex-col gap-1 justify-center items-start text-primary">
                  <span className=" text-xs font-normal leading-3">
                    My store
                  </span>
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
              <TruckIcon
                className="lg:w-[38px] lg:h-[38px] w-[28px] h-[28px]"
                strokeWidth={0.5}
              />
              <div className="flex flex-col gap-1 justify-center items-start text-primary">
                <p className=" lg:text-base text-sm font-medium leading-4 group-hover:underline underline-offset-4 flex items-center gap-1">
                  Delivery Info
                </p>
              </div>
            </div>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default function Navigation() {
  const [showBottomNav, setShowBottomNav] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const headerHeight = 190; // Adjust this value to match your header's height
    const currentScrollY = window.scrollY;

    if (currentScrollY > headerHeight) {
      setShowBottomNav(currentScrollY < lastScrollY);
    } else {
      setShowBottomNav(false);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <div className="">
        <NavigationDiv />
      </div>
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-lg transition-transform duration-300 ease-in-out transform ${
          showBottomNav ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <NavigationDiv />
      </div>
    </>
  );
}
