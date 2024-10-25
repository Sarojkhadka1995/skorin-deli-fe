import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import React from "react";
import CartProductCard from "./cart-product-card";
import { banner } from "../../../../../image-config";
import RelatedProducts from "../related-products";
import { Textarea } from "@/components/ui/textarea";
import CartCheckoutButtons from "./cart-checkout-buttons";

const fakeProducts = [
  {
    imageUrl: banner,
    price: 29.99,
    name: "Product 1",
    description: "Description for product 1",
    weight: "1kg",
    onRemove: () => console.log("Removed Product 1"),
  },
  {
    imageUrl: banner,
    price: 49.99,
    name: "Product 2",
    description: "Description for product 2",
    weight: "2kg",
    onRemove: () => console.log("Removed Product 2"),
  },
  {
    imageUrl: banner,
    price: 19.99,
    name: "Product 3",
    description: "Description for product 3",
    weight: "0.5kg",
    onRemove: () => console.log("Removed Product 3"),
  },
];

const CartSheet = () => {
  return (
    <SheetContent className="p-0">
      <SheetHeader className="border-b border-b-[#e5e5e5] p-5 px-6">
        <SheetTitle className="font-medium text-xl">
          Shopping Cart (3)
        </SheetTitle>
      </SheetHeader>
      <div className="max-h-[calc(100vh-69px)] overflow-y-auto">
        <div className="p-6 grid gap-4 border-b border-b-[#e5e5e5]">
          {fakeProducts.map((product) => (
            <CartProductCard
              key={product.name}
              imageUrl={product.imageUrl}
              price={product.price}
              name={product.name}
              description={product.description}
              weight={product.weight}
              onRemove={product.onRemove}
            />
          ))}
        </div>
        <div>
          <RelatedProducts />
        </div>
        <div className="p-6 border-y border-y-[#e5e5e5]">
          <p className="text-lg font-medium mb-2">Order instructions</p>
          <Textarea className="min-h-[100px]" />
        </div>
        <div className="">
          <CartCheckoutButtons
            total={238.92}
            onViewCart={() => console.log("View Cart clicked")}
            onCheckout={() => console.log("Checkout clicked")}
          />
        </div>
      </div>
    </SheetContent>
  );
};

export default CartSheet;
