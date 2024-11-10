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

  const randomCategory = {
    id: Math.floor(Math.random() * 1000),
    name: "Oil",
    slug: "oil",
    imageUrl: "/uploads/category/Colavita_Extravirgin_olive_oil-91f0.jpeg",
    featured: true,
    shopId: 24,
  };

  const shopsWithRandomCategory = shops?.map((shop) => {
    if (Math.random() > 0.5) {
      return {
        ...shop,
        categories: [randomCategory],
      };
    }
    return shop;
  });

  console.log("shopsWithRandomCategory=====", shopsWithRandomCategory);

  if (isLoading) return null;

  return (
    <HoverCard openDelay={0} closeDelay={200}>
      <HoverCardTrigger asChild>
        <Link
          href="#"
          className="text-primary hover:underline underline-offset-4 flex items-center gap-1 font-medium transition-all duration-300"
        >
          Shop
          <ChevronDown strokeWidth={2.5} size={19} />
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="w-56">
        {shopsWithRandomCategory?.map((shop) => (
          <Link
            key={shop.id}
            href={`/categories/${shop.slug}`}
            className="text-primary hover:underline underline-offset-4 flex items-center justify-between font-medium transition-all duration-300 py-2"
          >
            {shop.name}
          </Link>
        ))}
      </HoverCardContent>
    </HoverCard>
  );
}
