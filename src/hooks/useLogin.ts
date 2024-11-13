import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { showToast, TOAST_TYPES } from "@/shared/utils/toast.utils";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { AxiosError } from "axios";
import { loginUser } from "@/services/auth/login.service";
import { ILoginRes } from "@/interface/auth.types";
import loginSchema from "@/schema/loginForm";
import { COOKIE_CONFIG } from "@/config/app";
import { useState } from "react";

type ErrorResponse = { message: string };

const useLogin = () => {
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: login, isPending: loginLoading } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data: ILoginRes) => {
      setCookie(COOKIE_CONFIG.loggedIn, "true");
      setCookie(COOKIE_CONFIG.accessToken, data.access_token);
      setCookie(COOKIE_CONFIG.refreshToken, data.refresh_token);

      showToast(TOAST_TYPES.success, "Login successful");
      window.location.href = "/";
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      showToast(
        TOAST_TYPES.error,
        (error.response?.data as ErrorResponse)?.message || "An error occurred"
      );
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    login(data);
  };

  return {
    form,
    onSubmit,
    login,
    loginLoading,
    passwordVisibility,
    setPasswordVisibility,
  };
};

export default useLogin;
