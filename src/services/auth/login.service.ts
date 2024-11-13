import axiosInstance from "@/axios/axiosinstance";
import {
  ILoginRes,
  LoginCredentials,
  SignupCredentials,
} from "@/interface/auth.types";

export const loginUser = async (data: LoginCredentials): Promise<ILoginRes> => {
  try {
    const response = await axiosInstance.post(`/auth/login`, data);
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};

export const signUpUser = async (data: SignupCredentials) => {
  try {
    const response = await axiosInstance.post(`/auth/register`, data);
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};
