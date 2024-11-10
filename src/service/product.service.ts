import axiosInstance from "@/axios/axiosinstance";
import {
  IProduct,
  IProductResponse,
  IFeaturedProductResponse,
  ISpecialProductResponse,
} from "@/interface/product.types";

export const getProducts = async (sortBy?: string): Promise<IProduct[]> => {
  try {
    const response = await axiosInstance.get<IProductResponse>(
      `/products${sortBy ? `?sortby=${sortBy}` : ""}`
    );
    return response?.data?.data?.items;
  } catch (error) {
    throw error;
  }
};

export const getProductBySlug = async (slug: string): Promise<IProduct> => {
  try {
    const response = await axiosInstance.get<IProductResponse>(
      `/products/${slug}`
    );
    return response?.data?.data?.items[0];
  } catch (error) {
    throw error;
  }
};

export const getFeaturedProducts = async (): Promise<IProduct[]> => {
  try {
    const response = await axiosInstance.get<IFeaturedProductResponse>(
      "/featured-products"
    );
    return response?.data?.data?.items;
  } catch (error) {
    throw error;
  }
};

export const getSpecialProducts = async (): Promise<IProduct[]> => {
  try {
    const response = await axiosInstance.get<ISpecialProductResponse>(
      "/special-products"
    );
    return response?.data?.data?.items;
  } catch (error) {
    throw error;
  }
};

export const getProductsByCategory = async (
  categoryId: string
): Promise<IProduct[]> => {
  try {
    const response = await axiosInstance.get<IProductResponse>(
      `/products/category/${categoryId}`
    );
    return response?.data?.data?.items;
  } catch (error) {
    throw error;
  }
};
