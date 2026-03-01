import axiosInstance from "@/axios/axiosinstance";
import { ICategory, ICategoryResponse } from "@/interface/category.types";
import { ICompanyPaginationParams } from "@/interface/company.types";
import { ICompanyResponse } from "@/interface/company.types";

export const getCompanies = async (
  params?: ICompanyPaginationParams,
): Promise<ICompanyResponse> => {
  try {
    const response = await axiosInstance.get<ICategoryResponse>(`/companies`, {
      params,
    });

    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const getCompanyBySlug = async (slug: string): Promise<ICategory> => {
  try {
    const response = await axiosInstance.get(`/companies/${slug}`);
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};
