import React from "react";
import Title from "@/components/features/shared/title";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import ProductCard from "@/components/features/shared/product-card";

import FilterSort from "@/components/features/shared/product-filter";
import { getFeaturedProducts } from "@/service/product.service";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

const ProductListingPage = () => {
  // const products = [
  //   {
  //     id: 1,
  //     name: "1926 Caramelle Fondenti Assortite al Gusto Frutta",
  //     description: "(Fruit fondant lollies)",
  //     price: 7.99,
  //     weight: "175g",
  //     image: logo,
  //     discount: 14,
  //   },
  //   {
  //     id: 2,
  //     name: "1926 Caramelle Fondenti Assortite al Gusto Frutta",
  //     description: "(Fruit fondant lollies)",
  //     price: 7.99,
  //     weight: "175g",
  //     image: logo,
  //   },
  //   {
  //     id: 3,
  //     name: "1926 Caramelle Fondenti Assortite al Gusto Frutta",
  //     description: "(Fruit fondant lollies)",
  //     price: 7.99,
  //     weight: "175g",
  //     image: logo,
  //   },
  //   {
  //     id: 4,
  //     name: "1926 Caramelle Fondenti Assortite al Gusto Frutta",
  //     description: "(Fruit fondant lollies)",
  //     price: 7.99,
  //     weight: "175g",
  //     image: logo,
  //   },
  //   {
  //     id: 5,
  //     name: "1926 Caramelle Fondenti Assortite al Gusto Frutta",
  //     description: "(Fruit fondant lollies)",
  //     price: 7.99,
  //     weight: "175g",
  //     image: logo,
  //   },
  //   {
  //     id: 6,
  //     name: "1926 Caramelle Fondenti Assortite al Gusto Frutta",
  //     description: "(Fruit fondant lollies)",
  //     price: 7.99,
  //     weight: "175g",
  //     image: logo,
  //     discount: 14,
  //   },
  // ];
  const { data: products, isLoading } = useQuery({
    queryKey: ["getFeaturedProducts"],
    queryFn: getFeaturedProducts,
  });
  return (
    <div>
      <div className="container">
        <Breadcrumb className="mt-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Products</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Title title="Products" />
        <FilterSort />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6">
          {isLoading &&
            [1, 2, 3, 4].map((item) => (
              <Skeleton key={item} className="h-[300px] w-full" />
            ))}
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
