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

  if (isLoading) return null;

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="shops" className="border-none">
        <AccordionTrigger className="transition-colors hover:bg-muted hover:no-underline pe-3">
          {/* NOT USED */}
          <span className="flex items-center px-6 text-lg">Shop</span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col py-1">
            {shopsWithRandomCategory?.map(
              (shop) =>
                shop.categories?.length > 0 && (
                  <Accordion
                    type="single"
                    collapsible
                    key={shop.id}
                    className="w-full"
                  >
                    <AccordionItem
                      value={`shop-${shop.id}`}
                      className="border-none"
                    >
                      <AccordionTrigger className="hover:no-underline flex items-start text-start text-lg px-6 py-3 transition-colors hover:bg-muted">
                        <span className="flex-1 hover:no-underline">
                          {shop.name}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col py-1">
                          {shop.categories.map((category) => (
                            <Link
                              key={category.id}
                              href={`/categories/${category.slug}`}
                              className="flex items-center px-6 py-2 text-lg transition-colors hover:bg-muted"
                            >
                              {category.name}
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )
            )}
            {/* ) : (
                <Link
                  key={shop.id}
                  href={`/shops/${shop.slug}`}
                  className="flex items-center px-6 py-3 text-lg transition-colors hover:bg-muted"
                >
                  {shop.name}
                </Link>
              )
            )} */}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
