"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  ChevronRight,
  Menu,
  Facebook,
  Instagram,
  User,
  ChevronDown,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getShops } from "@/service/shop.service";
import { IShop } from "@/interface/shop.types";

import storeIcon from "@/public/icons/shop.svg";
import truckIcon from "@/public/icons/truck.svg";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import PickupLocation from "../pickup-location";
import { useEffect } from "react";
import { useState } from "react";
import { COOKIE_CONFIG } from "@/config/app";
import { getCookie } from "cookies-next";

interface MenuItem {
  title: string;
  icon?: React.ReactNode;
  href?: string;
  items?: MenuItem[];
}

export default function SlidingMenu() {
  const [open, setOpen] = React.useState(false);
  const [history, setHistory] = React.useState<MenuItem[]>([]);

  const [isMounted, setIsMounted] = useState(false);
  const isLoggedIn = getCookie(COOKIE_CONFIG.loggedIn);

  const { data: shops } = useQuery<IShop[]>({
    queryKey: ["getShops"],
    queryFn: () => getShops(),
  });

  React.useEffect(() => {
    if (shops) {
      const shopMenuItems: MenuItem = {
        title: "Menu",
        items: [
          { title: "Home", href: "/" },
          {
            title: "Shop",
            items: shops.map((shop) => ({
              title: shop.name,
              items: shop.categories?.map((category) => ({
                title: category.name,
                href: `/categories/${category.slug}`,
              })),
            })),
          },
          { title: "Contact", href: "/contact" },
          { title: "About Us", href: "/about" },
          {
            title: "Account",
            icon: <User className="text-lg" />,
            href: isLoggedIn ? "/account/profile" : "/account/login",
          },
        ],
      };
      setHistory([shopMenuItems]);
    }
  }, [shops]);

  const currentMenu = history[history.length - 1];

  const handleBack = () => {
    setHistory((current) => current.slice(0, -1));
  };

  const handleNavigate = (item: MenuItem) => {
    if (item.items) {
      setHistory((current) => [...current, item]);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="lg:hidden">
        <Menu className="cursor-pointer" />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-full max-w-[400px] p-0 sm:max-w-[540px]"
      >
        <SheetHeader className="border-b px-4 py-3">
          <div className="flex items-center justify-between py-3">
            <SheetTitle className="text-lg">Menu</SheetTitle>
          </div>
        </SheetHeader>

        <div className="relative overflow-hidden">
          <div className="flex items-center justify-between gap-3 w-full lg:w-auto border-y py-3 px-6">
            <Dialog>
              <DialogTrigger>
                <div className="flex items-center gap-2 group ">
                  <Image src={storeIcon} alt="store" width={38} height={38} />

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
              <PickupLocation />
            </Dialog>
            <Link href="/policies/shipping-policy">
              <div className="flex items-center gap-2 group ">
                <Image src={truckIcon} alt="store" width={38} height={38} />
                <div className="flex flex-col gap-1 justify-center items-start ">
                  <p className=" lg:text-base text-sm font-medium leading-4 group-hover:underline underline-offset-4 flex items-center gap-1">
                    Delivery Info
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={history.length}
              initial={{ x: "100%", opacity: 1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 1 }}
              transition={{ type: "tween", duration: 0.3 }}
              className="relative"
            >
              {history.length > 1 && (
                <div className="sticky top-0 z-10 border-b bg-background">
                  <Button
                    variant="ghost"
                    className="h-14 w-full justify-start gap-2 rounded-none px-4 text-lg"
                    onClick={handleBack}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Button>
                </div>
              )}
              <ScrollArea className="h-[calc(100vh-7rem)]">
                <div className="flex flex-col">
                  {currentMenu?.items?.map((item, index) =>
                    item.href ? (
                      <Link
                        key={item.title + index}
                        href={item.href}
                        className="flex h-14 w-full items-center justify-start gap-2 rounded-none border-b px-4 transition-colors hover:bg-muted"
                        onClick={() => setOpen(false)}
                      >
                        {item.icon}
                        <span className="flex-1 text-left text-lg">
                          {item.title}
                        </span>
                      </Link>
                    ) : (
                      <Button
                        key={item.title + index}
                        variant="ghost"
                        className="h-14 w-full justify-start gap-2 rounded-none border-b px-4"
                        onClick={() => handleNavigate(item)}
                      >
                        {item.icon}
                        <span className="flex-1 text-left text-lg">
                          {item.title}
                        </span>
                        {item.items && <ChevronRight className="h-4 w-4" />}
                      </Button>
                    )
                  )}
                </div>

                {history.length === 1 && (
                  <>
                    <div className="flex gap-4 py-4 px-6 border-t">
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
                  </>
                )}
              </ScrollArea>
            </motion.div>
          </AnimatePresence>
        </div>
      </SheetContent>
    </Sheet>
  );
}
