export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ILoginRes {
  access_token: string;
  refresh_token: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: ILoginRes;
}
export interface SignupCredentials {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface Profile {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}
