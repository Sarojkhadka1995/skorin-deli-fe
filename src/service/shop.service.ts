import axiosInstance from "@/axios/axiosinstance";
import { IBaseProductResponse } from "@/interface/product.types";
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

export const getProductsByShop = async (
  shopId: string,
  params?: {
    status: string;
    sort_by?: string;
    pageNumber?: number;
    limit?: number;
  },
): Promise<IBaseProductResponse> => {
  try {
    const response = await axiosInstance.get(`/products/shop/${shopId}`, {
      params,
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
};
