import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import React, { useCallback } from "react";
import CartProductCard from "./cart-product-card";
import RelatedProducts from "../related-products";
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

const CartSheet = () => {
  const queryClient = useQueryClient();
  const { profileData } = useProfileStore();
  const { setCartData, cartTotal } = useCartStore();

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

  // const { mutate: checkoutMutation, isPending: checkoutPending } = useMutation({
  //   mutationFn: ({ userId }: { userId: number }) => checkoutCart(userId),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["cart", profileData?.id] });
  //     showToast(TOAST_TYPES.success, "Checkout successful");
  //   },
  //   onError: () => {
  //     showToast(TOAST_TYPES.error, "Failed to checkout");
  //   },
  // });

  const { mutate: orderMutation, isPending: orderPending } = useMutation({
    mutationFn: (payload: ICreateOrder) => orderCreate(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
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
    [updateCart, profileData]
  );

  const removeFromCart = useCallback(
    (id: number) => {
      if (!profileData?.id) return;
      deleteItem({ userId: profileData?.id, id });
    },
    [deleteItem, profileData]
  );

  const order = useCallback(() => {
    const payload: ICreateOrder = {
      userId: profileData?.id || 1,
      items: cartData?.map((item: ICartItem) => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
        productName: item.product.name,
      })),
    };
    orderMutation(payload);
  }, [orderMutation, profileData]);

  // const checkout = useCallback(() => {
  //   checkoutMutation({ userId: profileData?.id || 1 });
  // }, [checkoutMutation]);

  return (
    <SheetContent className="p-0 sm:min-w-[500px] min-w-full">
      <SheetHeader className="border-b border-b-[#e5e5e5] p-5 px-6">
        <SheetTitle className="font-medium text-xl">
          Shopping Cart ({cartData?.length})
        </SheetTitle>
      </SheetHeader>
      <div className="max-h-[calc(100vh-69px)] overflow-y-auto">
        <div className="p-6 grid gap-4 border-b border-b-[#e5e5e5]">
          {cartLoading || updateCartPending ? (
            <div>Loading...</div>
          ) : (
            cartData?.map((item: ICartItem) => (
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
            ))
          )}
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
            total={cartTotal}
            onCheckout={order}
            checkoutLoading={orderPending}
          />
        </div>
      </div>
    </SheetContent>
  );
};

export default CartSheet;
