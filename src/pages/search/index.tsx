import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 12;

const SearchPage = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { keyword } = router.query;
  const searchParams = useSearchParams();
  const sortBy = searchParams.get("sort_by") || "featured";
  const currentPage = Number(searchParams.get("page")) || 1;

  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data, isLoading } = useQuery({
    queryKey: ["searchProducts", keyword, currentPage],
    queryFn: () =>
      keyword
        ? searchProducts(
            keyword as string,
            currentPage,
            ITEMS_PER_PAGE,
          )
        : null,
    enabled: !!keyword,
  });

  const products = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;

  const handleSort = (value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("sort_by", value);
    current.set("page", "1");
    router.replace(`${pathname}?${current.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("page", page.toString());
    router.replace(`${pathname}?${current.toString()}`);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?keyword=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      items.push(
        <PaginationItem key="1">
          <PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink>
        </PaginationItem>,
      );
      if (startPage > 2) {
        items.push(
          <PaginationItem key="start-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={currentPage === i}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="end-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink onClick={() => handlePageChange(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return items;
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
              <BreadcrumbPage className="normal-case">
                Search results for:{" "}
                {keyword?.toString() === "undefined" ? "" : keyword}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {!keyword && (
          <div className="flex items-center justify-center my-8">
            <Input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-lg mr-4"
            />
            <Button onClick={handleSearch}>Search</Button>
          </div>
        )}
        {keyword && <Title title={`Search results for: ${keyword}`} />}
        {keyword && <FilterSort onSort={handleSort} sortBy={sortBy} />}
        <div
          className={`${
            products.length > 0
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6"
              : ""
          }`}
        >
          {isLoading &&
            [1, 2, 3, 4].map((item) => (
              <Skeleton key={item} className="h-[300px] w-full" />
            ))}
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {!isLoading && products.length === 0 && keyword && (
          <ProductNotFoundCard onButtonClick={() => router.push("/")} />
        )}
        {keyword && totalPages > 1 && (
          <Pagination className="my-6">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    handlePageChange(Math.max(1, currentPage - 1))
                  }
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
              {renderPaginationItems()}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, currentPage + 1))
                  }
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
