import axiosInstance from "@/axios/axiosinstance";
import { IShop, IShopResponse } from "@/interface/shop.types";

export const getShops = async (): Promise<IShop[]> => {
  try {
    const response = await axiosInstance.get<IShopResponse>("/shops");
    return response?.data?.data?.items;
  } catch (error) {
    throw error;
  }
};

export const getShopBySlug = async (slug: string): Promise<IShop> => {
  try {
    const response = await axiosInstance.get<IShopResponse>(`/shops/${slug}`);
    return response?.data?.data?.items[0];
  } catch (error) {
    throw error;
  }
};
