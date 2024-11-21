"use client";

import { useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Minus, Plus } from "lucide-react";
import Link from "next/link";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import useCartStore from "@/store/useCartStore";
import { showToast } from "@/utils/toast-utils/toast-util";
import { TOAST_TYPES } from "@/utils/toast-utils/toast-util";
import { deleteCartItem, updateCartItem } from "@/services/cart/cart.service";
import useProfileStore from "@/store/useProfileStore";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getImageUrl } from "@/lib/utils";
import { ICartItem } from "@/interface/cart.types";
import { ICreateOrder } from "@/interface/order.types";
import { orderCreate } from "@/services/order/order.service";

export default function ShoppingCart() {
  const queryClient = useQueryClient();
  const { cartData, cartTotal } = useCartStore();

  const { profileData } = useProfileStore();

  const { mutate: deleteItem, isPending: deleteCartPending } = useMutation({
    mutationFn: (data: { userId: number; id: number }) =>
      deleteCartItem(data.userId, data.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      showToast(TOAST_TYPES.success, "Cart item deleted successfully");
    },
    onError: () => {
      showToast(TOAST_TYPES.error, "Failed to delete cart item");
    },
  });

  const { mutate: updateCart, isPending: updateCartPending } = useMutation({
    mutationFn: updateCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      showToast(TOAST_TYPES.success, "Cart item updated successfully");
    },
    onError: () => {
      showToast(TOAST_TYPES.error, "Failed to update cart item");
    },
  });

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

  const order = useCallback(() => {
    if (!profileData?.id) return;
    const payload: ICreateOrder = {
      userId: profileData?.id,
      items: cartData?.map((item: ICartItem) => ({
        productId: item.product.id,
        quantity: item.quantity,
        productName: item.product.name,
        productPrice: Number(item.product.price),
      })),
    };
    orderMutation(payload);
  }, [orderMutation, profileData]);

  const removeItem = (id: number) => {
    if (!profileData?.id) return;
    deleteItem({ userId: profileData?.id, id });
  };

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

  console.log("====", cartData);
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Cart</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-[1fr,400px] gap-8">
        <Card className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="text-xl">
                <TableHead className="w-[50%] text-slate-900 px-9 py-4 min-w-[300px]">
                  Product
                </TableHead>
                <TableHead className="text-start text-slate-900 px-9 py-4 min-w-[200px]">
                  Quantity
                </TableHead>
                <TableHead className="text-right text-slate-900 px-9 py-4 min-w-[150px]">
                  Total
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartData.map((item) => (
                <TableRow key={item.id} className="text-slate-900">
                  <TableCell className="min-w-[300px]">
                    <div className="flex items-center space-x-4 py-4 px-6">
                      <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex justify-center items-center group shrink-0 border">
                        <Image
                          src={getImageUrl(item.product.imageUrl)}
                          alt={item.product.name}
                          height={100}
                          width={100}
                          className="object-contain group-hover:scale-110 transition-all duration-300"
                        />
                      </div>
                      <div className="text-base sm:text-[17px]">
                        <div className="font-light mb-1">${item.price}</div>
                        <div className="font-medium line-clamp-2">
                          {item.product.name}
                        </div>
                        <div className="font-medium">{item.quantity}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="min-w-[200px]">
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={updateCartPending}
                        >
                          <Minus className="h-4 w-4" />
                          <span className="sr-only">Decrease quantity</span>
                        </Button>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.id, parseInt(e.target.value))
                          }
                          disabled={true}
                          className="w-16 h-8 text-center"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          disabled={updateCartPending}
                        >
                          <Plus className="h-4 w-4" />
                          <span className="sr-only">Increase quantity</span>
                        </Button>
                      </div>
                      <Button
                        variant="link"
                        className="text-slate-600"
                        onClick={() => removeItem(item.id)}
                        disabled={deleteCartPending}
                      >
                        Remove{" "}
                        {deleteCartPending && (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-lg font-medium px-9 py-4 min-w-[150px]">
                    ${item.total}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <Card className="p-6 h-fit">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Total</h2>
              <div className="text-4xl font-bold">${cartTotal}</div>
            </div>

            <div>
              <label htmlFor="instructions" className="text-lg font-medium">
                Order instructions
              </label>
              <Textarea id="instructions" className="mt-2 min-h-[100px]" />
            </div>

            <div className="text-sm text-muted-foreground">
              Tax included.{" "}
              <Link href="/policies/shipping-policy">
                <Button variant="link" className="p-0 h-auto font-normal">
                  Shipping
                </Button>{" "}
              </Link>
              calculated at checkout.
            </div>

            <Button
              variant="outline-black"
              className="w-full"
              size="lg"
              onClick={order}
              disabled={orderPending}
            >
              Check Out{" "}
              {orderPending && <Loader2 className="h-4 w-4 animate-spin" />}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
