import React from "react";

import ProductCard from "../../shared/product-card";
import Title from "../../shared/title";
import { getFeaturedProducts } from "@/service/product.service";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

const ProductList = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["getFeaturedProducts"],
    queryFn: getFeaturedProducts,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container">
      <Title
        title="Our Products"
        subtitle="Discover our wide range of products"
        viewAllLink="/products"
      />
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
  );
};

export default ProductList;
