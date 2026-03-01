import axiosInstance from "@/axios/axiosinstance";
import {
  ICategory,
  ICategoryPaginationParams,
  ICategoryResponse,
} from "@/interface/category.types";

export const getCategories = async (
  params: ICategoryPaginationParams,
): Promise<ICategoryResponse> => {
  try {
    const response = await axiosInstance.get<ICategoryResponse>(`/categories`, {
      params,
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const getCategoryBySlug = async (slug: string): Promise<ICategory> => {
  try {
    const response = await axiosInstance.get(`/categories/${slug}`);
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};
