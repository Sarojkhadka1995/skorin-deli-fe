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
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { getSortValue } from "@/lib/utils";
import NoProducts from "@/components/features/shared/no-products";
import { getProductsByShop } from "@/service/shop.service";

const CategoryDetailPage = () => {
  const params = useParams();
  const categorySlug = params?.detail as string;

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sortBy = searchParams.get("sort_by") || "featured";
  const router = useRouter();
  const type = searchParams.get("type") || "";
  const { data: products, isLoading } = useQuery({
    queryKey: ["getProductsByCategory", categorySlug, sortBy],
    queryFn: () =>
      type === "shop"
        ? getProductsByShop(categorySlug, {
            sort_by: getSortValue(sortBy),
          })
        : getProductsByCategory(categorySlug, {
            sort_by: getSortValue(sortBy),
          }),
  });

  const handleSort = (value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("sort_by", value);
    router.replace(`${pathname}?${current.toString()}`, { scroll: false });
  };

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
        <Title title={categorySlug} className="capitalize" />
        <FilterSort onSort={handleSort} sortBy={sortBy} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6">
          {isLoading &&
            [1, 2, 3, 4].map((item) => (
              <Skeleton key={item} className="h-[300px] w-full" />
            ))}
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {products?.length === 0 && <NoProducts />}
      </div>
    </div>
  );
};

export default CategoryDetailPage;
