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
import { getProductsByCategory } from "@/service/product.service";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import NoProducts from "@/components/features/shared/no-products";

const CategoryDetailPage = () => {
  const params = useParams();
  const categorySlug = params?.detail as string;

  const { data: products, isLoading } = useQuery({
    queryKey: ["getProductsByCategory", categorySlug],
    queryFn: () => getProductsByCategory(categorySlug),
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
              <BreadcrumbPage>{categorySlug}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Title title={categorySlug} />
        <FilterSort onSort={() => {}} sortBy={""} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6">
          {isLoading &&
            [1, 2, 3, 4].map((item) => (
              <Skeleton key={item} className="h-[300px] w-full" />
            ))}
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {products?.length === 0 && <NoProducts />}
        </div>
      </div>
    </div>
  );
};

export default CategoryDetailPage;
