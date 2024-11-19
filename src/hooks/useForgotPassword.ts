import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { showToast, TOAST_TYPES } from "@/utils/toast-utils/toast-util";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import forgotPasswordSchema from "@/schema/forgotPassword";
import { forgotPassword } from "@/services/auth/login.service";
import { useRouter } from "next/navigation";

type ErrorResponse = { message: string };

const useForgotPassword = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate: forgotPasswordMutation, isPending: forgotPasswordLoading } =
    useMutation({
      mutationFn: forgotPassword,
      onSuccess: () => {
        showToast(
          TOAST_TYPES.success,
          "Reset link will be sent to your email."
        );
        router.push("/account/login");
      },
      onError: (error: AxiosError<ErrorResponse>) => {
        showToast(
          TOAST_TYPES.error,
          (error.response?.data as ErrorResponse)?.message ||
            "An error occurred"
        );
      },
    });

  const onSubmit = (data: z.infer<typeof forgotPasswordSchema>) => {
    forgotPasswordMutation(data);
  };

  const handleCancel = () => {
    router.replace("/");
  };

  return {
    form,
    onSubmit,
    forgotPasswordLoading,
    handleCancel,
  };
};

export default useForgotPassword;
