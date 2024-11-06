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
import { logo } from "../../../image-config";
import ProductCard from "@/components/features/shared/product-card";

import FilterSort from "@/components/features/shared/product-filter";

const ProductListingPage = () => {
  const products = [
    {
      id: 1,
      name: "1926 Caramelle Fondenti Assortite al Gusto Frutta",
      description: "(Fruit fondant lollies)",
      price: 7.99,
      weight: "175g",
      image: logo,
      discount: 14,
    },
    {
      id: 2,
      name: "1926 Caramelle Fondenti Assortite al Gusto Frutta",
      description: "(Fruit fondant lollies)",
      price: 7.99,
      weight: "175g",
      image: logo,
    },
    {
      id: 3,
      name: "1926 Caramelle Fondenti Assortite al Gusto Frutta",
      description: "(Fruit fondant lollies)",
      price: 7.99,
      weight: "175g",
      image: logo,
    },
    {
      id: 4,
      name: "1926 Caramelle Fondenti Assortite al Gusto Frutta",
      description: "(Fruit fondant lollies)",
      price: 7.99,
      weight: "175g",
      image: logo,
    },
    {
      id: 5,
      name: "1926 Caramelle Fondenti Assortite al Gusto Frutta",
      description: "(Fruit fondant lollies)",
      price: 7.99,
      weight: "175g",
      image: logo,
    },
    {
      id: 6,
      name: "1926 Caramelle Fondenti Assortite al Gusto Frutta",
      description: "(Fruit fondant lollies)",
      price: 7.99,
      weight: "175g",
      image: logo,
      discount: 14,
    },
  ];
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
              <BreadcrumbPage>Products</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Title
          title="Category"
          subtitle="Discover our wide range of products"
          viewAllLink="/products"
        />
        <FilterSort />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
