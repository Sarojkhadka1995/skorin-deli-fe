import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { showToast, TOAST_TYPES } from "@/utils/toast-utils/toast-util";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { AxiosError } from "axios";
import { loginUser } from "@/services/auth/login.service";
import { ILoginRes } from "@/interface/auth.types";
import loginSchema from "@/schema/loginForm";
import { COOKIE_CONFIG } from "@/config/app";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

type ErrorResponse = { message: string };

const useLogin = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

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
    onSuccess: async (data: ILoginRes) => {
      setCookie(COOKIE_CONFIG.loggedIn, "true");
      setCookie(COOKIE_CONFIG.accessToken, data.access_token);
      setCookie(COOKIE_CONFIG.refreshToken, data.refresh_token);

      showToast(TOAST_TYPES.success, "Login successful");

      const returnUrl = searchParams.get("returnUrl");

      if (returnUrl) {
        // Decode the URL and ensure it's a relative path for security
        const decodedUrl = decodeURIComponent(returnUrl);
        // Only redirect to internal paths
        if (decodedUrl.startsWith("/")) {
          router.push(decodedUrl);
          return;
        }
      }
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
