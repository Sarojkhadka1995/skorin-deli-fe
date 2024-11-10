import axiosInstance from "@/axios/axiosinstance";
import { ICategory, ICategoryResponse } from "@/interface/category.types";

export const getCategories = async (): Promise<ICategory[]> => {
  try {
    const response = await axiosInstance.get<ICategoryResponse>("/categories");
    return response?.data?.data?.items;
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
