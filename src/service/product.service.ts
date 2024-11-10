import axiosInstance from "@/axios/axiosinstance";
import {
  IProduct,
  IProductResponse,
  IFeaturedProductResponse,
  ISpecialProductResponse,
  IProductDetail,
} from "@/interface/product.types";

export const getProducts = async (): Promise<IProduct[]> => {
  try {
    const response = await axiosInstance.get<IProductResponse>("/products");
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
