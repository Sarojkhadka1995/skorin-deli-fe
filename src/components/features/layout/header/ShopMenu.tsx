import { ChevronDown, ChevronRight } from "lucide-react";
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

  return (
    <HoverCard openDelay={0} closeDelay={600}>
      <HoverCardTrigger asChild>
        <Link
          href="#"
          className="text-primary hover:underline underline-offset-4 flex items-center gap-1 font-medium transition-all duration-300"
        >
          Shop
          <ChevronDown strokeWidth={2.5} size={19} />
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <ul className="space-y-2 text-sm">
            {shops?.map((shop) => (
              <li key={shop.id}>
                <HoverCard openDelay={10}>
                  <HoverCardTrigger asChild>
                    <div className="flex items-center text-sm font-medium text-primary hover:text-accent-foreground">
                      {/* <Link
                        href={`/categories/${shop.slug}`}
                        className="flex items-center text-sm font-medium text-primary hover:text-accent-foreground"
                      > */}
                      {shop.name}
                      {shop.categories?.length > 0 && (
                        <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                      )}
                      {/* </Link> */}
                    </div>
                  </HoverCardTrigger>
                  {shop.categories?.length > 0 && (
                    <HoverCardContent side="right" className="w-72">
                      <div className="space-y-2">
                        <ul className="space-y-2">
                          {shop.categories.map((category) => (
                            <li key={category.id}>
                              <Link
                                href={`/categories/${category.slug}`}
                                className="block text-sm text-primary hover:text-accent-foreground"
                              >
                                {category.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </HoverCardContent>
                  )}
                </HoverCard>
              </li>
            ))}
          </ul>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
