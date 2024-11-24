import { ICartItem } from "@/interface/cart.types";
import { getTotal } from "@/lib/helper";
import { create } from "zustand";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

const COOKIE_KEY = "cart-instructions";
const COOKIE_OPTIONS = {
  maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
  path: "/",
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
};

interface CartState {
  cartData: ICartItem[];
  setCartData: (cart: ICartItem[]) => void;
  cartTotal: number;
  setCartTotal: (total: number) => void;
  orderInstructions: string;
  setOrderInstructions: (instructions: string) => void;
  clearOrderInstructions: () => void;
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
  orderInstructions:
    typeof window !== "undefined"
      ? (getCookie(COOKIE_KEY) as string) || ""
      : "",
  setOrderInstructions: (instructions) => {
    setCookie(COOKIE_KEY, instructions, COOKIE_OPTIONS);
    set({ orderInstructions: instructions });
  },
  clearOrderInstructions: () => {
    deleteCookie(COOKIE_KEY);
    set({ orderInstructions: "" });
  },
}));

export default useCartStore;
