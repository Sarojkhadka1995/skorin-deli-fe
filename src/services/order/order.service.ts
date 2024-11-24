import axiosInstance from "@/axios/axiosinstance";
import { ICreateOrder, IOrderHistory } from "@/interface/order.types";

export const orderCreate = async (payload: ICreateOrder) => {
  try {
    const response = await axiosInstance.post(`/orders`, payload);
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};

export const getOrders = async (): Promise<IOrderHistory[]> => {
  try {
    const response = await axiosInstance.get(`/orders/user/my-orders`);
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};
