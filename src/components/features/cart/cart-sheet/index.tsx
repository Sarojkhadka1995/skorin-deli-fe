import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import React, { useCallback } from "react";
import CartProductCard from "./cart-product-card";
// import RelatedProducts from "../related-products";
import { Textarea } from "@/components/ui/textarea";
import CartCheckoutButtons from "./cart-checkout-buttons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useProfileStore from "@/store/useProfileStore";
import { useQuery } from "@tanstack/react-query";
import {
  // checkoutCart,
  deleteCartItem,
  getCartItems,
  updateCartItem,
} from "@/services/cart/cart.service";
import { ICartItem } from "@/interface/cart.types";
import { showToast, TOAST_TYPES } from "@/utils/toast-utils/toast-util";
import { ICreateOrder } from "@/interface/order.types";
import { orderCreate } from "@/services/order/order.service";
import useCartStore from "@/store/useCartStore";
import { cn } from "@/lib/utils";

const CartSheet = () => {
  const queryClient = useQueryClient();
  const { profileData } = useProfileStore();
  const {
    setCartData,
    cartTotal,
    orderInstructions,
    setOrderInstructions,
    clearOrderInstructions,
  } = useCartStore();

  const { data: cartData, isLoading: cartLoading } = useQuery({
    queryKey: ["cart", profileData?.id],
    queryFn: async () => {
      if (!profileData?.id) return;
      const response = await getCartItems(profileData?.id);
      setCartData(response);
      return response;
    },
  });

  const { mutate: deleteItem } = useMutation({
    mutationFn: (data: { userId: number; id: number }) =>
      deleteCartItem(data.userId, data.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      if (cartData?.length === 1) {
        clearOrderInstructions();
      }
      showToast(TOAST_TYPES.success, "Cart item deleted successfully");
    },
    onError: () => {
      showToast(TOAST_TYPES.error, "Failed to delete cart item");
    },
  });

  const { mutate: updateCart, isPending: updateCartPending } = useMutation({
    mutationFn: updateCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      showToast(TOAST_TYPES.success, "Cart item updated successfully");
    },
  });

  const { mutate: orderMutation, isPending: orderPending } = useMutation({
    mutationFn: (payload: ICreateOrder) => orderCreate(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      clearOrderInstructions();
      showToast(TOAST_TYPES.success, "Order created successfully");
    },
    onError: () => {
      showToast(TOAST_TYPES.error, "Failed to create order");
    },
  });

  const updateQuantity = useCallback(
    (id: number, quantity: number) => {
      if (!profileData?.id) return;
      const payload = {
        userId: profileData?.id,
        quantity,
        cartId: id,
      };
      updateCart(payload);
    },
    [updateCart, profileData],
  );

  const removeFromCart = useCallback(
    (id: number) => {
      if (!profileData?.id) return;
      deleteItem({ userId: profileData?.id, id });
    },
    [deleteItem, profileData],
  );

  const order = useCallback(() => {
    const payload: ICreateOrder = {
      userId: profileData?.id || 1,
      items: cartData?.map((item: ICartItem) => ({
        productId: item.product.id,
        quantity: item.quantity,
        productPrice: item.product.price,
        productName: item.product.name,
      })),
      orderInstructions,
    };
    orderMutation(payload);
  }, [orderMutation, profileData, orderInstructions, cartData]);

  return (
    <SheetContent className="p-0 sm:min-w-[480px] min-w-full flex flex-col h-full">
      {/* Fixed Header */}
      <SheetHeader className="border-b border-border bg-background px-6 py-5 flex-shrink-0">
        <SheetTitle className="font-semibold text-xl tracking-tight">
          Shopping Cart
          {cartData?.length ? (
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              ({cartData.length} {cartData.length === 1 ? "item" : "items"})
            </span>
          ) : null}
        </SheetTitle>
      </SheetHeader>

      {/* Scrollable Products Section */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="p-6">
          {cartLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
            </div>
          ) : cartData?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                >
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
              </div>
              <p className="text-muted-foreground font-medium">
                Your cart is empty
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Add items to get started
              </p>
            </div>
          ) : (
            <div
              className={cn(
                "relative space-y-3",
                updateCartPending && "opacity-50 pointer-events-none",
              )}
            >
              {cartData?.map((item: ICartItem) => (
                <CartProductCard
                  key={item.id}
                  id={item.product.id}
                  imageUrl={item.product.imageUrl}
                  price={Number(item.product.price)}
                  name={item.product.name}
                  description={item.product.description}
                  weight={item.product.weight}
                  quantity={item.quantity}
                  onRemove={() => removeFromCart(item.id)}
                  updateQuantity={(quantity: number) =>
                    updateQuantity(item.id, quantity)
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Fixed Bottom Section */}
      <div className="flex-shrink-0 border-t border-border bg-background">
        <div className="p-6 pb-4">
          <p className="text-sm font-medium text-foreground mb-2">
            Order instructions
          </p>
          <Textarea
            className="min-h-[80px] resize-none text-sm"
            placeholder="Add any special instructions for your order..."
            value={orderInstructions}
            onChange={(e) => setOrderInstructions(e.target.value)}
          />
        </div>
        <CartCheckoutButtons
          total={cartTotal}
          onCheckout={order}
          checkoutLoading={orderPending}
        />
      </div>
    </SheetContent>
  );
};

export default CartSheet;
