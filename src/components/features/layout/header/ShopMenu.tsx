import { ChevronDown } from "lucide-react";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { getShops } from "@/service/shop.service";
import { useQuery } from "@tanstack/react-query";
import { IShop } from "@/interface/shop.types";

export function ShopMenu() {
  const { data: shops, isLoading } = useQuery<IShop[]>({
    queryKey: ["getShops"],
    queryFn: () => getShops(),
  });

  if (isLoading) return null;

  // Get categories from the first shop
  const categories = shops?.[0]?.categories || [];

  return (
    <HoverCard openDelay={0} closeDelay={600}>
      {/* <HoverCardTrigger asChild>
        <Link
          href="#"
          className="text-primary hover:underline underline-offset-4 flex items-center gap-1 font-medium transition-all duration-300"
        >
          Shop
          <ChevronDown strokeWidth={2.5} size={19} />
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-0">
        <ul className=" text-sm">
          {shops?.map((shop) => (
            <li key={shop.id}>
              {shop.categories?.length > 0 && (
                <HoverCard openDelay={100} closeDelay={100}>
                  <HoverCardTrigger asChild>
                    <div className="data-[state=open]:bg-accent flex items-center text-sm font-medium text-primary hover:text-accent-foreground hover:bg-accent p-2 py-3">
                      <Link
                        href={`/categories/${shop.slug}?type=shop`}
                        className="flex items-center text-sm font-medium text-primary hover:text-accent-foreground capitalize"
                      >
                        {shop.name}
                        {shop.categories?.length > 0 && (
                          <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                        )}
                      </Link>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent
                    side="right"
                    align="start"
                    className="w-72 p-0 -ml-1"
                  >
                    <ul className="">
                      {shop.categories.map((category) => (
                        <li key={category.id}>
                          <Link
                            href={`/categories/${category.slug}?type=category`}
                            className="block text-sm text-primary hover:text-accent-foreground hover:bg-accent p-2 py-3"
                          >
                            {category.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </HoverCardContent>
                </HoverCard>
              )}
            </li>
          ))}
        </ul>
      </HoverCardContent> */}

      <HoverCardTrigger asChild>
        <Link
          href="#"
          className="text-primary hover:underline underline-offset-4 flex items-center gap-1 font-medium transition-all duration-300"
        >
          Categories
          <ChevronDown strokeWidth={2.5} size={19} />
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-0">
        <ul className="text-sm max-h-[300px] overflow-y-auto">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/categories/${category.slug}?type=category`}
                className="block text-sm text-primary hover:text-accent-foreground hover:bg-accent p-2 py-3 capitalize"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </HoverCardContent>
    </HoverCard>
  );
}
