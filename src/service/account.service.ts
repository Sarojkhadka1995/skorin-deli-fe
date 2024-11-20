import axiosInstance from "@/axios/axiosinstance";

export type PersonalDetails = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
};

export interface IPasswordChange {
  currentPassword: string;
  newPassword: string;
}

interface Address {
  id: number;
  street: string;
  city: string;
  country: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export const updatePersonalDetails = async (
  data: PersonalDetails
): Promise<ApiResponse<PersonalDetails>> => {
  try {
    const response = await axiosInstance.put<ApiResponse<PersonalDetails>>(
      "/account/personal-details",
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changePassword = async (
  data: IPasswordChange
): Promise<ApiResponse<null>> => {
  try {
    const response = await axiosInstance.put<ApiResponse<null>>(
      "/account/change-password",
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateAddresses = async (
  addresses: Address[]
): Promise<ApiResponse<Address[]>> => {
  try {
    const response = await axiosInstance.put<ApiResponse<Address[]>>(
      "/account/addresses",
      addresses
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAccount = async (): Promise<ApiResponse<null>> => {
  try {
    const response = await axiosInstance.delete<ApiResponse<null>>("/account");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProfile = async (): Promise<ApiResponse<PersonalDetails>> => {
  try {
    const response = await axiosInstance.get<ApiResponse<PersonalDetails>>(
      "/profile"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
