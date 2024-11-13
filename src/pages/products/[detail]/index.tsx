import { useRouter } from "next/router";

import RelatedProducts from "@/components/features/cart/related-products";
import ProductDetail from "@/components/features/home/product-detail";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { IProductDetail } from "@/interface/product.types";
import { getProductBySlug } from "@/service/product.service";
import { useQuery } from "@tanstack/react-query";

const ProductDetailPage = () => {
  const router = useRouter();
  const { detail } = router.query;

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery<IProductDetail>({
    queryKey: ["getProductDetail", detail],
    queryFn: async () => {
      const response = await getProductBySlug(detail as string);
      return response;
    },
    refetchOnWindowFocus: false,
    gcTime: 0,
  });

  return (
    <div className="container py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/categories/${product?.category.slug}`}>
              {product?.category.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Product Detail </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ProductDetail
        product={product}
        isLoading={isLoading}
        isError={isError}
      />

      {/* Related Products */}
      <RelatedProducts rows={6} />
      {/* Related Products */}
    </div>
  );
};

export default ProductDetailPage;
