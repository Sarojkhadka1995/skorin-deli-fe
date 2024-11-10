import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { getShops } from "@/service/shop.service";
import { useQuery } from "@tanstack/react-query";
import { IShop } from "@/interface/shop.types";

export function ShopMenuAccordion() {
  const { data: shops, isLoading } = useQuery<IShop[]>({
    queryKey: ["getShops"],
    queryFn: () => getShops(),
  });

  if (isLoading) return null;

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="shops" className="border-none">
        <AccordionTrigger className="transition-colors hover:bg-muted hover:no-underline pe-3">
          <span className="flex items-center px-6 text-lg ">Shop</span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col py-1">
            {shops?.map((shop) => (
              <Link
                key={shop.id}
                href="#"
                className="flex items-center px-6 py-3 text-base transition-colors hover:bg-muted"
              >
                {shop.name}
              </Link>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
