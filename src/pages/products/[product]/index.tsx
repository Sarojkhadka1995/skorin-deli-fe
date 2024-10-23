import { useRouter } from "next/router";
import React from "react";

const ProductDetailPage = () => {
  const router = useRouter();
  const { product } = router.query;
  return <div>ProductDetailPage : {product}</div>;
};

export default ProductDetailPage;
