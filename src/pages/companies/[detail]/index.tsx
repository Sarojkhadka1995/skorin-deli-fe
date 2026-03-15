// import React from "react";
// import Title from "@/components/features/shared/title";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";

// import ProductCard from "@/components/features/shared/product-card";

// import FilterSort from "@/components/features/shared/product-filter";
// import { getProductsByCompany } from "@/service/product.service";
// import { useQuery } from "@tanstack/react-query";
// import { Skeleton } from "@/components/ui/skeleton";
// import {
//   useParams,
//   usePathname,
//   useRouter,
//   useSearchParams,
// } from "next/navigation";
// import { getSortValue } from "@/lib/utils";
// import NoProducts from "@/components/features/shared/no-products";
// import { getProductsByShop } from "@/service/shop.service";

// const CompanyDetailPage = () => {
//   const params = useParams();
//   const companySlug = params?.detail as string;

//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const sortBy = searchParams.get("sort_by") || "featured";
//   const router = useRouter();
//   const type = searchParams.get("type") || "";
//   const { data: products, isLoading } = useQuery({
//     queryKey: ["getProductsByCompany", companySlug, sortBy],
//     queryFn: () =>
//       type === "shop"
//         ? getProductsByShop(companySlug, {
//             status: "active",
//             sort_by: getSortValue(sortBy),
//           })
//         : getProductsByCompany(companySlug, {
//             status: "active",
//             sort_by: getSortValue(sortBy),
//           }),
//   });

//   const handleSort = (value: string) => {
//     const current = new URLSearchParams(Array.from(searchParams.entries()));
//     current.set("sort_by", value);
//     router.replace(`${pathname}?${current.toString()}`, { scroll: false });
//   };

//   return (
//     <div>
//       <div className="container">
//         <Breadcrumb className="mt-6">
//           <BreadcrumbList>
//             <BreadcrumbItem>
//               <BreadcrumbLink href="/">Home</BreadcrumbLink>
//             </BreadcrumbItem>
//             <BreadcrumbSeparator />
//             <BreadcrumbItem>
//               <BreadcrumbPage>{companySlug}</BreadcrumbPage>
//             </BreadcrumbItem>
//           </BreadcrumbList>
//         </Breadcrumb>
//         <Title title={companySlug} className="capitalize" />
//         <FilterSort onSort={handleSort} sortBy={sortBy} />
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6">
//           {isLoading &&
//             [1, 2, 3, 4].map((item) => (
//               <Skeleton key={item} className="h-[300px] w-full" />
//             ))}
//           {products?.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//         {products?.length === 0 && <NoProducts />}
//       </div>
//     </div>
//   );
// };

// export default CompanyDetailPage;

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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PaginationItem, PaginationLink } from "@/components/ui/pagination";

import ProductCard from "@/components/features/shared/product-card";

import FilterSort from "@/components/features/shared/product-filter";
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
import { IProductDetail } from "@/interface/product.types";
import { getProductsByCompany } from "@/service/product.service";

const ITEMS_PER_PAGE = 12;

const CompanyDetailPage = () => {
  const params = useParams();
  const companySlug = params?.detail as string;

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sortBy = searchParams.get("sort_by") || "featured";
  const currentPage = Number(searchParams.get("page")) || 1;
  const router = useRouter();
  const type = searchParams.get("type") || "";
  const { data: products, isLoading } = useQuery({
    queryKey: ["getProductsByCompany", companySlug, sortBy, currentPage, type],
    queryFn: () =>
      type === "shop"
        ? getProductsByShop(companySlug, {
            status: "active",
            sort_by: getSortValue(sortBy),
            pageNumber: currentPage,
            limit: 12,
          })
        : getProductsByCompany(companySlug, {
            status: "active",
            sort_by: getSortValue(sortBy),
            pageNumber: currentPage,
            limit: 12,
          }),
    enabled: !!companySlug,
  });

  const handleSort = (value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("sort_by", value);
    current.set("page", "1"); // Reset to first page on sort
    router.replace(`${pathname}?${current.toString()}`, { scroll: false });
  };

  const handlePageChange = (page: number) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("page", page.toString());
    router.replace(`${pathname}?${current.toString()}`, { scroll: true });
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);
    const totalPages = products?.data?.totalPages || 1;

    let startPage = Math.max(1, currentPage - halfVisible);
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // First page
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

    // Page numbers
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

    // Last page
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
              <BreadcrumbPage>{companySlug}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Title title={companySlug} className="capitalize" />
        <FilterSort onSort={handleSort} sortBy={sortBy} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6">
          {isLoading &&
            Array.from({ length: ITEMS_PER_PAGE }, (_, i) => i + 1).map(
              (item) => <Skeleton key={item} className="h-[300px] w-full" />,
            )}
          {products?.data?.items?.map((product: IProductDetail) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {products?.data?.items?.length === 0 && <NoProducts />}
        {products?.data?.totalPages && products?.data?.totalPages > 1 && (
          <Pagination className="my-6">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
              {renderPaginationItems()}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    handlePageChange(
                      Math.min(
                        products?.data?.totalPages || 1,
                        currentPage + 1,
                      ),
                    )
                  }
                  className={
                    currentPage === (products?.data?.totalPages || 1)
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

export default CompanyDetailPage;
