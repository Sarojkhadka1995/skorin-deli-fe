import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { showToast, TOAST_TYPES } from "@/shared/utils/toast.utils";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { signUpUser } from "@/services/auth/login.service";
import { GLOBAL_ERROR_MESSAGE } from "@/constants/validation";
import { signUpSchema } from "@/schema/signUpForm";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ErrorResponse = { message: string };

const useSignUp = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
    },
  });

  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    passwordConfirmation: false,
  });

  const togglePasswordVisibility = (
    field: "password" | "passwordConfirmation"
  ) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const { mutate: signUp, isPending: signUpLoading } = useMutation({
    mutationFn: signUpUser,
    onSuccess: () => {
      showToast(TOAST_TYPES.success, "Signup successful");
      form.reset();
      router.replace("/account/login");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      showToast(
        TOAST_TYPES.error,
        (error.response?.data as ErrorResponse)?.message || GLOBAL_ERROR_MESSAGE
      );
    },
  });

  const onSubmit = (data: z.infer<typeof signUpSchema>) => {
    const payload = {
      ...data,
      role: "user",
    };
    signUp(payload);
  };

  return {
    form,
    onSubmit,
    signUpLoading,
    togglePasswordVisibility,
    passwordVisibility,
  };
};

export default useSignUp;
