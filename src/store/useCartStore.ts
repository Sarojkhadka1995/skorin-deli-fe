import { ICartItem } from "@/interface/cart.types";
import { getTotal } from "@/lib/helper";
import { create } from "zustand";

interface CartState {
  cartData: ICartItem[];
  setCartData: (cart: ICartItem[]) => void;
  cartTotal: number;
  setCartTotal: (total: number) => void;
}

const useCartStore = create<CartState>((set) => ({
  cartData: [],
  setCartData: (cart) =>
    set(() => ({
      cartData: cart,
      cartTotal: Number(getTotal(cart)),
    })),
  cartTotal: 0,
  setCartTotal: (total) => set({ cartTotal: Number(total) }),
}));

export default useCartStore;
