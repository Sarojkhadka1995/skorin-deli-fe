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
import { searchProducts } from "@/service/product.service";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { usePathname, useSearchParams } from "next/navigation";

import { useRouter } from "next/router";
import ProductNotFoundCard from "@/components/features/shared/product-not-found";

const SearchPage = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { keyword } = router.query;
  const searchParams = useSearchParams();
  const sortBy = searchParams.get("sort_by") || "featured";

  const { data: products, isLoading } = useQuery({
    queryKey: ["searchProducts", keyword],
    queryFn: () => (keyword ? searchProducts(keyword as string) : null),
    enabled: !!keyword,
  });

  const handleSort = (value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("sort_by", value);
    router.replace(`${pathname}?${current.toString()}`);
  };
  console.log("products:", products);
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
              <BreadcrumbPage className="normal-case">
                Search results for: {keyword}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Title title={`Search results for: ${keyword}`} />
        <FilterSort onSort={handleSort} sortBy={sortBy} />
        <div
          className={`${
            products && products?.length > 0
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6"
              : ""
          }`}
        >
          {isLoading &&
            [1, 2, 3, 4].map((item) => (
              <Skeleton key={item} className="h-[300px] w-full" />
            ))}
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {(!products || products?.length === 0) && (
          <ProductNotFoundCard onButtonClick={() => router.push("/")} />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
