import { ChevronDown, Store, TruckIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState, useCallback } from "react";

const NavigationDiv = () => {
  return (
    <div className="border-y border-gray-200">
      <nav className="container mx-auto my-4 flex justify-between items-center gap-3">
        <div className="hidden lg:flex justify-between items-center gap-3 text-base">
          <Link href="#">
            <Button variant="link" className="font-medium text-base">
              Home
            </Button>
          </Link>
          <HoverCard openDelay={0} closeDelay={200}>
            <HoverCardTrigger asChild>
              <Link
                href="#"
                className=" text-base hover:underline underline-offset-4 flex items-center gap-1 font-medium transition-all duration-300"
              >
                Shop
                <ChevronDown strokeWidth={2.5} size={19} />
              </Link>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Item 1</AccordionTrigger>
                  <AccordionContent>
                    <p>Item 1 content</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </HoverCardContent>
          </HoverCard>
          <Link href="#">
            <Button variant="link" className="font-medium text-base">
              Gift Cards
            </Button>
          </Link>
          <Link href="#">
            <Button variant="link" className="font-medium text-base">
              Cafe
            </Button>
          </Link>
          <Link href="#">
            <Button variant="link" className="font-medium text-base">
              Contact
            </Button>
          </Link>
          <Link href="#">
            <Button variant="link" className="font-medium text-base">
              About Us
            </Button>
          </Link>
        </div>
        <div className="flex items-center justify-between gap-3 w-full lg:w-auto">
          <Dialog>
            <DialogTrigger>
              <div className="flex items-center gap-2 group">
                <Store
                  className="lg:w-[38px] lg:h-[38px] w-[28px] h-[28px]"
                  strokeWidth={0.5}
                />
                <div className="flex flex-col gap-1 justify-center items-start">
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
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Link href="#">
            <div className="flex items-center gap-2 group">
              <TruckIcon
                className="lg:w-[38px] lg:h-[38px] w-[28px] h-[28px]"
                strokeWidth={0.5}
              />
              <div className="flex flex-col gap-1 justify-center items-start">
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
