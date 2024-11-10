"use client";

import { useQuery } from "@tanstack/react-query";
import ProductCard from "../../shared/product-card";
import Title from "../../shared/title";
import { getSpecialProducts } from "@/service/product.service";
import { Skeleton } from "@/components/ui/skeleton";

const SpecialProductList = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["getSpecialProducts"],
    queryFn: getSpecialProducts,
  });

  if (isLoading) {
    return (
      <div className="container">
        <Title
          title="Our Specials"
          subtitle="Discover our wide range of products"
          viewAllLink="/products"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="space-y-4">
              <Skeleton className="h-[300px] w-full" />
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!products?.length) {
    return null;
  }

  return (
    <div className="container">
      <Title
        title="Our Specials"
        subtitle="Discover our wide range of products"
        viewAllLink="/products"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SpecialProductList;
