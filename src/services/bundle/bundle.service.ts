import axiosInstance from "@/axios/axiosinstance";
import { IGetAllBundleDeals } from "@/interface/bundle.types";

export const getBundleDeals = async (): Promise<IGetAllBundleDeals> => {
  try {
    const response = await axiosInstance.get("/bundles");
    const data = response?.data?.data ?? response?.data;
    return Array.isArray(data) ? { data } : data;
  } catch (error) {
    throw error;
  }
};
