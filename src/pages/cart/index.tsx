"use client";

import { useCallback, useMemo, useState } from "react";
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
import { Loader2, Minus, Plus, Tag } from "lucide-react";
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

import { useMutation, useQuery } from "@tanstack/react-query";
import { getImageUrl } from "@/lib/utils";
import { ICartItem } from "@/interface/cart.types";
import { ICreateOrder } from "@/interface/order.types";
import { orderCreate } from "@/services/order/order.service";
import NoProducts from "@/components/features/shared/no-products";
import { getBundleDeals } from "@/services/bundle/bundle.service";
import { computeBundleDiscount } from "@/lib/bundle-discount";

export default function ShoppingCart() {
  const {
    cartData,
    cartTotal,
    orderInstructions,
    setOrderInstructions,
    clearOrderInstructions,
    setCartData,
  } = useCartStore();

  const { profileData } = useProfileStore();

  // Track pending operations per item
  const [pendingOperations, setPendingOperations] = useState<{
    [itemId: number]: "update" | "delete";
  }>({});
  // Keep loader visible until we actually redirect to payment (standard ecommerce UX)
  const [checkoutInProgress, setCheckoutInProgress] = useState(false);

  const { data: bundleDealsData } = useQuery({
    queryKey: ["bundle-deals"],
    queryFn: getBundleDeals,
    enabled: cartData.length > 0,
  });

  const sortedCartData = useMemo(
    () => [...cartData].sort((a, b) => a.id - b.id),
    [cartData],
  );

  const { totalBundleDiscount, appliedDeals } = useMemo(
    () => computeBundleDiscount(sortedCartData, bundleDealsData?.data),
    [sortedCartData, bundleDealsData?.data],
  );

  const finalTotal = useMemo(
    () => Math.max(0, Number((cartTotal - totalBundleDiscount).toFixed(2))),
    [cartTotal, totalBundleDiscount],
  );

  const productIdsInDeals = useMemo(
    () => new Set(appliedDeals.flatMap((d) => d.productIds)),
    [appliedDeals],
  );

  const { mutate: deleteItem } = useMutation({
    mutationFn: (data: {
      userId: number;
      id: number;
      originalItem?: ICartItem;
    }) => deleteCartItem(data.userId, data.id),
    onSuccess: (_, variables) => {
      // Remove from pending operations
      setPendingOperations((prev) => {
        const newState = { ...prev };
        delete newState[variables.id];
        return newState;
      });
      showToast(TOAST_TYPES.success, "Cart item deleted successfully");
    },
    onError: (_, variables) => {
      // Revert the optimistic update
      if (variables.originalItem) {
        setCartData(
          [...cartData, variables.originalItem].sort((a, b) => a.id - b.id),
        );
      }
      setPendingOperations((prev) => {
        const newState = { ...prev };
        delete newState[variables.id];
        return newState;
      });
      showToast(TOAST_TYPES.error, "Failed to delete cart item");
    },
  });

  const { mutate: updateCart } = useMutation({
    mutationFn: (data: {
      userId: number;
      cartId: number;
      quantity: number;
      originalQuantity?: number;
    }) =>
      updateCartItem({
        userId: data.userId,
        cartId: data.cartId,
        quantity: data.quantity,
      }),
    onSuccess: (_, variables) => {
      // Remove from pending operations
      setPendingOperations((prev) => {
        const newState = { ...prev };
        delete newState[variables.cartId];
        return newState;
      });
      showToast(TOAST_TYPES.success, "Cart item updated successfully");
    },
    onError: (_, variables) => {
      // Revert the optimistic update (quantity + total)
      if (variables.originalQuantity !== undefined) {
        setCartData(
          cartData.map((item) => {
            if (item.id !== variables.cartId) return item;
            const unitPrice = Number(item.price);
            const revertedTotal = (
              variables.originalQuantity! * unitPrice
            ).toFixed(2);
            return {
              ...item,
              quantity: variables.originalQuantity!,
              total: revertedTotal,
            };
          }),
        );
      }
      setPendingOperations((prev) => {
        const newState = { ...prev };
        delete newState[variables.cartId];
        return newState;
      });
      showToast(TOAST_TYPES.error, "Failed to update cart item");
    },
  });

  const { mutateAsync: orderCreateMutation, isPending: orderPending } =
    useMutation({
      mutationFn: (payload: ICreateOrder) => orderCreate(payload),
      onError: () => {
        showToast(TOAST_TYPES.error, "Failed to create order");
      },
    });

  const redirectToPayment = useCallback(
    async (amountDollars: number, invoiceNumber: string) => {
      const paymentData = {
        Payment: {
          TotalAmount: Math.round(amountDollars * 100),
          InvoiceNumber: invoiceNumber,
          InvoiceDescription: "Skorin Deli order",
          CurrencyCode: "AUD",
        },
        RedirectUrl: `${typeof window !== "undefined" ? window.location.origin : ""}/checkout/payment-return`,
        CancelUrl: `${typeof window !== "undefined" ? window.location.origin : ""}/cart`,
        Method: "ProcessPayment",
        TransactionType: "Purchase",
      };

      const response = await fetch("/api/payment/create-shared-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();
      if (data.SharedPaymentUrl) {
        window.location.href = data.SharedPaymentUrl;
      } else {
        setCheckoutInProgress(false);
        showToast(
          TOAST_TYPES.error,
          data.error || "Payment initialization failed",
        );
      }
    },
    [],
  );

  const order = useCallback(async () => {
    if (!profileData?.id) return;
    setCheckoutInProgress(true);
    const payload: ICreateOrder = {
      userId: profileData.id,
      items: sortedCartData.map((item: ICartItem) => ({
        productId: item.product.id,
        quantity: item.quantity,
        productName: item.product.name,
        productPrice: Number(item.product.price),
      })),
      orderInstructions,
    };
    try {
      const created = await orderCreateMutation(payload);
      const invoiceNumber =
        created?.id != null ? `INV-${created.id}` : `INV-${Date.now()}`;
      await redirectToPayment(finalTotal, invoiceNumber);
    } catch {
      setCheckoutInProgress(false);
      // onError already shows toast
    }
  }, [
    orderCreateMutation,
    profileData,
    orderInstructions,
    sortedCartData,
    finalTotal,
    redirectToPayment,
  ]);

  const removeItem = (id: number) => {
    if (!profileData?.id) return;

    // Find the item to remove for potential rollback
    const itemToRemove = sortedCartData.find((item) => item.id === id);
    if (!itemToRemove) return;

    // Optimistic update: remove item immediately
    setCartData(cartData.filter((item) => item.id !== id));
    setPendingOperations((prev) => ({ ...prev, [id]: "delete" }));

    // Clear instructions if this was the last item
    if (sortedCartData.length === 1) {
      clearOrderInstructions();
    }

    deleteItem({
      userId: profileData.id,
      id,
      originalItem: itemToRemove,
    });
  };

  const updateQuantity = useCallback(
    (id: number, quantity: number) => {
      if (!profileData?.id) return;

      // Find current item for potential rollback
      const currentItem = sortedCartData.find((item) => item.id === id);
      if (!currentItem) return;

      // Optimistic update: update quantity and recalc total so subtotal updates
      const unitPrice = Number(currentItem.price);
      const newTotal = (quantity * unitPrice).toFixed(2);
      setCartData(
        cartData.map((item) =>
          item.id === id ? { ...item, quantity, total: newTotal } : item,
        ),
      );
      setPendingOperations((prev) => ({ ...prev, [id]: "update" }));

      const payload = {
        userId: profileData.id,
        quantity,
        cartId: id,
        originalQuantity: currentItem.quantity,
      };
      updateCart(payload);
    },
    [updateCart, profileData, sortedCartData, cartData, setCartData],
  );

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
          {sortedCartData.length === 0 ? (
            <div className="text-center text-lg font-medium">
              <NoProducts
                title="No Products in Cart"
                description="It looks like there are no products in your cart yet."
              />
            </div>
          ) : (
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
                {sortedCartData.map((item) => (
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
                            {productIdsInDeals.has(item.product.id) && (
                              <span className="inline-flex items-center gap-1 ml-2 text-xs font-normal text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                                <Tag className="h-3 w-3" />
                                Deal applied
                              </span>
                            )}
                          </div>
                          {/* <div className="font-medium">{item.quantity}</div> */}
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
                              updateQuantity(
                                item.id,
                                Math.max(1, item.quantity - 1),
                              )
                            }
                            disabled={
                              pendingOperations[item.id] === "update" ||
                              item.quantity <= 1
                            }
                          >
                            <Minus className="h-4 w-4" />
                            <span className="sr-only">Decrease quantity</span>
                          </Button>
                          <Input
                            type="number"
                            min={1}
                            value={item.quantity}
                            onChange={(e) => {
                              const val = parseInt(e.target.value, 10);
                              if (!Number.isNaN(val) && val >= 1)
                                updateQuantity(item.id, val);
                            }}
                            onBlur={(e) => {
                              const val = parseInt(e.target.value, 10);
                              if (Number.isNaN(val) || val < 1)
                                updateQuantity(item.id, 1);
                            }}
                            className="w-16 h-8 text-center"
                            disabled={pendingOperations[item.id] === "update"}
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            disabled={pendingOperations[item.id] === "update"}
                          >
                            <Plus className="h-4 w-4" />
                            <span className="sr-only">Increase quantity</span>
                          </Button>
                        </div>
                        <Button
                          variant="link"
                          className="text-slate-600"
                          onClick={() => removeItem(item.id)}
                          disabled={pendingOperations[item.id] === "delete"}
                        >
                          Remove{" "}
                          {pendingOperations[item.id] === "delete" && (
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
          )}
        </Card>

        {sortedCartData.length > 0 && (
          <Card className="p-6 h-fit">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Order summary</h2>
                <div className="space-y-2 text-base">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  {totalBundleDiscount > 0 && (
                    <>
                      <div className="flex justify-between text-green-600 font-medium">
                        <span>Bundle discount</span>
                        <span>-${totalBundleDiscount.toFixed(2)}</span>
                      </div>
                      {appliedDeals.map((deal) => (
                        <div
                          key={deal.dealId}
                          className="flex items-center gap-1.5 text-sm text-muted-foreground pl-2 border-l-2 border-green-200"
                        >
                          <Tag className="h-3.5 w-3.5 shrink-0" />
                          <span>
                            {deal.dealName}: {deal.applications}x ( -$
                            {deal.discountAmount.toFixed(2)})
                          </span>
                        </div>
                      ))}
                    </>
                  )}
                  <div className="flex justify-between pt-2 border-t text-lg font-semibold">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="instructions" className="text-lg font-medium">
                  Order instructions
                </label>
                <Textarea
                  id="instructions"
                  className="mt-2 min-h-[100px]"
                  value={orderInstructions}
                  onChange={(e) => setOrderInstructions(e.target.value)}
                />
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
                disabled={orderPending || checkoutInProgress}
              >
                Check Out{" "}
                {(orderPending || checkoutInProgress) && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
