import { ChevronDown } from "lucide-react";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

// Fake shop data
const shopItems = [
  { name: "Clothing", subitems: ["T-Shirts", "Jeans", "Dresses"] },
  { name: "Electronics", subitems: ["Phones", "Laptops", "Tablets"] },
  { name: "Home & Garden", subitems: ["Furniture", "Decor", "Plants"] },
  { name: "Others" },
];

export function ShopMenu() {
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
        {shopItems.map((item, index) =>
          item.subitems ? (
            <HoverCard key={index} openDelay={100} closeDelay={50}>
              <HoverCardTrigger className="w-full" asChild>
                <Link
                  href="#"
                  className="text-primary hover:underline underline-offset-4 flex items-center justify-between font-medium transition-all duration-300 py-2"
                >
                  {item.name}
                  <ChevronDown strokeWidth={2.5} size={19} />
                </Link>
              </HoverCardTrigger>
              <HoverCardContent
                align="start"
                alignOffset={1000}
                sideOffset={-40}
                className="w-32 translate-x-4"
              >
                <ul className="space-y-2">
                  {item.subitems.map((subitem, subIndex) => (
                    <li key={subIndex}>
                      <Link href="#" className="hover:underline">
                        {subitem}
                      </Link>
                    </li>
                  ))}
                </ul>
              </HoverCardContent>
            </HoverCard>
          ) : (
            <Link
              key={index}
              href="#"
              className="text-primary hover:underline underline-offset-4 flex items-center justify-between font-medium transition-all duration-300 py-2"
            >
              {item.name}
            </Link>
          )
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
