import axiosInstance from "@/axios/axiosinstance";
import { ICategory, ICategoryResponse } from "@/interface/category.types";

export const getCategories = async (
  pageNumber: number = 1,
  limit: number = 12
): Promise<ICategoryResponse> => {
  try {
    const response = await axiosInstance.get<ICategoryResponse>(
      `/categories?pageNumber=${pageNumber}&limit=${limit}`
    );
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
