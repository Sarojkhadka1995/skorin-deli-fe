import { VALIDATION_MESSAGE } from "@/constants/validation";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email()
    .min(1, {
      message: VALIDATION_MESSAGE.get("Email", "required"),
    }),
});

export default forgotPasswordSchema;
