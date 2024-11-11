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
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getProductBySlug } from "@/service/product.service";
import { IProductDetail } from "@/interface/product.types";

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
  console.log("product", product);
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
      <RelatedProducts rows={6} />
    </div>
  );
};

export default ProductDetailPage;
