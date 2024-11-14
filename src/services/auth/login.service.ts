import axiosInstance from "@/axios/axiosinstance";
import {
  ForgotPasswordCredentials,
  ILoginRes,
  LoginCredentials,
  ResetPasswordCredentials,
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

export const resetPassword = async (data: ResetPasswordCredentials) => {
  try {
    const response = await axiosInstance.post(`/auth/reset-password`, data);
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async (data: ForgotPasswordCredentials) => {
  try {
    const response = await axiosInstance.post(`/auth/forgot-password`, data);
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const response = await axiosInstance.get("/profile");
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};
