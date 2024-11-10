import axiosInstance from "@/axios/axiosinstance";
import {
  // IProduct,
  // IProductResponse,
  // IFeaturedProductResponse,
  // ISpecialProductResponse,
  IProductDetail,
} from "@/interface/product.types";

export const getProducts = async (
  sortBy?: string
): Promise<IProductDetail[]> => {
  try {
    const response = await axiosInstance.get(
      `/products${sortBy ? `?sortby=${sortBy}` : ""}`
    );
    return response?.data?.data?.items;
  } catch (error) {
    throw error;
  }
};

export const getProductBySlug = async (
  slug: string
): Promise<IProductDetail> => {
  try {
    const response = await axiosInstance.get(`/products/${slug}`);
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};

export const getFeaturedProducts = async (): Promise<IProductDetail[]> => {
  try {
    const response = await axiosInstance.get("/featured-products");
    return response?.data?.data?.items;
  } catch (error) {
    throw error;
  }
};

export const getSpecialProducts = async (): Promise<IProductDetail[]> => {
  try {
    const response = await axiosInstance.get("/special-products");
    return response?.data?.data?.items;
  } catch (error) {
    throw error;
  }
};

export const getProductsByCategory = async (
  categoryId: string,
  params?: { sort_by?: string }
): Promise<IProductDetail[]> => {
  try {
    const response = await axiosInstance.get(
      `/products/category/${categoryId}`,
      { params }
    );
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};
