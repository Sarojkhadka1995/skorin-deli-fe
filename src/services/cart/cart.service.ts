import axiosInstance from "@/axios/axiosinstance";
import { ICart } from "@/interface/cart.types";

export const createCart = async (data: ICart) => {
  try {
    const response = await axiosInstance.post(`/carts`, data);
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};

export const getCartItems = async (userId: number) => {
  try {
    const response = await axiosInstance.get(`/carts/${userId}`);
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCartItem = async (userId: number, id: number) => {
  try {
    const response = await axiosInstance.delete(`/carts/${userId}/${id}`);
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};

export const updateCartItem = async (data: ICart) => {
  try {
    const response = await axiosInstance.put(`/carts/update-quantity`, data);
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};

export const checkoutCart = async (userId: number) => {
  try {
    const response = await axiosInstance.post(`/carts/checkout/${userId}`);
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};
