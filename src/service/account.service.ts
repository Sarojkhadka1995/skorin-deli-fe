import axiosInstance from "@/axios/axiosinstance";

interface PersonalDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  profileImage: string;
}

interface PasswordChange {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface Address {
  id: number;
  street: string;
  city: string;
  country: string;
}

interface ApiResponse<T> {
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
  data: PasswordChange
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
      "/account/profile"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
