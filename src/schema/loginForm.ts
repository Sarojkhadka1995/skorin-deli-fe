import { VALIDATION_MESSAGE } from "@/constants/validation";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .email()
    .min(1, {
      message: VALIDATION_MESSAGE.get("Email", "required"),
    }),
  password: z.string().min(1, {
    message: VALIDATION_MESSAGE.get("Password", "required"),
  }),
});

export default loginSchema;
