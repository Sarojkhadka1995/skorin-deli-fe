import { ICartItem } from "@/interface/cart.types";

export const getTotal = (cartData: ICartItem[]) => {
  return cartData
    ?.reduce((acc: number, item: ICartItem) => acc + Number(item.total), 0)
    .toFixed(2);
};
