// import toast, { Toast } from "react-hot-toast";

import toast, { Toast } from "react-hot-toast";

export enum TOAST_TYPES {
  info,
  success,
  error,
  warning,
}

export const showToast = (type: TOAST_TYPES, data: string) => {
  // Dismiss any existing toasts
  toast.dismiss();

  const options: Partial<Pick<Toast, "duration" | "position">> = {
    duration: 4000,
    position: "top-center" as const,
  };

  switch (type) {
    case TOAST_TYPES.info:
      toast(data, {
        ...options,
      });
      break;
    case TOAST_TYPES.error:
      toast.error(data || "Something Went Wrong", options);
      break;
    case TOAST_TYPES.success:
      toast.success(data, options);
      break;
    case TOAST_TYPES.warning:
      toast(data, {
        ...options,
        icon: "⚠️",
      });
      break;
    default:
      toast(data, options);
  }
};
