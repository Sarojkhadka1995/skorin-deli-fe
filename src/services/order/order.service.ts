import axiosInstance from "@/axios/axiosinstance";
import { ICreateOrder } from "@/interface/order.types";

export const orderCreate = async (payload: ICreateOrder) => {
  try {
    debugger;
    const response = await axiosInstance.post(`/orders`, payload);
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};
