import React from "react";

import ProductCard from "../../shared/product-card";
import Title from "../../shared/title";
import { getProducts } from "@/service/product.service";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

const LatestArrivals = () => {
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
  //     id: 1,
  //     name: "1926 Caramelle Fondenti Assortite al Gusto Frutta",
  //     description: "(Fruit fondant lollies)",
  //     price: 7.99,
  //     weight: "175g",
  //     image: logo,
  //   },
  //   {
  //     id: 1,
  //     name: "1926 Caramelle Fondenti Assortite al Gusto Frutta",
  //     description: "(Fruit fondant lollies)",
  //     price: 7.99,
  //     weight: "175g",
  //     image: logo,
  //   },
  //   {
  //     id: 1,
  //     name: "1926 Caramelle Fondenti Assortite al Gusto Frutta",
  //     description: "(Fruit fondant lollies)",
  //     price: 7.99,
  //     weight: "175g",
  //     image: logo,
  //   },
  // ];

  const { data: products, isLoading } = useQuery({
    queryKey: ["getProducts"],
    queryFn: () => getProducts(),
  });
  return (
    <div className="container">
      <Title
        title="Latest Arrivals"
        // subtitle="Discover our wide range of products"
        viewAllLink="/products"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6">
        {isLoading &&
          [1, 2, 3, 4].map((item) => (
            <Skeleton key={item} className="h-[300px] w-full" />
          ))}
        {products?.items?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default LatestArrivals;
