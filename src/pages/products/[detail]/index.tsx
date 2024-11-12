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
import ProductIngredients from "@/components/features/product-detail/product-ingrediens";

const nutritionalData = [
  { nutrient: "Energy", per100g: "1040kJ", perServing: "980kJ", dv: "11%" },
  { nutrient: "Protein", per100g: "8.4g", perServing: "7.9g", dv: "16%" },
  {
    nutrient: "Carbohydrate",
    per100g: "42.7g",
    perServing: "40.1g",
    dv: "13%",
  },
  { nutrient: "Fat - Saturated", per100g: "1g", perServing: "1g", dv: "4%" },
  {
    nutrient: "Sugars - Total",
    per100g: "2.6g",
    perServing: "2.4g",
    dv: "3%",
  },
  { nutrient: "Sodium", per100g: "330mg", perServing: "310mg", dv: "14%" },
  { nutrient: "Dietary Fibre", per100g: "4g", perServing: "3.8g", dv: "13%" },
  { nutrient: "Fat - Total", per100g: "3.6g", perServing: "3.4g", dv: "5%" },
];

const ingredients = `<p>
  Wheat Flour, Water, Mixed Grains <b>(17%)</b> Purple Wheat, Kibbled Wheat, Kibbled Rye, 
  Kibbled Triticale <b>(Rye, Wheat)</b>, Oats, Linseeds, Kibbled Soy, Yeast, Vinegar, 
  Iodised Salt, Canola Oil, Cultured Wheat Flour, Wheat Gluten, Soy Flour, 
  Malted Barley Flour, Vegetable Emulsifiers <b>(471, 472e, 481)</b>, 
  Vitamins <b>(Thiamin, Folic Acid)</b>, Processing Aids <b>(Wheat)</b>
</p>`;

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
      <ProductIngredients
        nutritionalData={nutritionalData}
        ingredients={ingredients}
      />
      <RelatedProducts rows={6} />
    </div>
  );
};

export default ProductDetailPage;
