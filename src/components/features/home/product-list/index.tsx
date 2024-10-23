import React from "react";
import { logo } from "../../../../../image-config";
import ProductCard from "../../shared/product-card";
import Title from "../../shared/title";

const ProductList = () => {
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
      id: 1,
      name: "1926 Caramelle Fondenti Assortite al Gusto Frutta",
      description: "(Fruit fondant lollies)",
      price: 7.99,
      weight: "175g",
      image: logo,
    },
    {
      id: 1,
      name: "1926 Caramelle Fondenti Assortite al Gusto Frutta",
      description: "(Fruit fondant lollies)",
      price: 7.99,
      weight: "175g",
      image: logo,
    },
    {
      id: 1,
      name: "1926 Caramelle Fondenti Assortite al Gusto Frutta",
      description: "(Fruit fondant lollies)",
      price: 7.99,
      weight: "175g",
      image: logo,
    },
    {
      id: 1,
      name: "1926 Caramelle Fondenti Assortite al Gusto Frutta",
      description: "(Fruit fondant lollies)",
      price: 7.99,
      weight: "175g",
      image: logo,
    },
    {
      id: 1,
      name: "1926 Caramelle Fondenti Assortite al Gusto Frutta",
      description: "(Fruit fondant lollies)",
      price: 7.99,
      weight: "175g",
      image: logo,
      discount: 14,
    },
  ];
  return (
    <div className="container">
      <Title
        title="Our Products"
        subtitle="Discover our wide range of products"
        viewAllLink="/products"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
