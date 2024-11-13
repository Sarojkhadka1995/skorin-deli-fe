import { PASSWORD_REGEX } from "@/constants/regex";
import { VALIDATION_MESSAGE } from "@/constants/validation";
import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(1, { message: VALIDATION_MESSAGE.get("Password", "required") })
      .regex(PASSWORD_REGEX, {
        message:
          "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character",
      }),
    password_confirmation: z.string().min(1, {
      message: VALIDATION_MESSAGE.get("Confirm Password", "required"),
    }),
    first_name: z
      .string()
      .min(1, { message: VALIDATION_MESSAGE.get("First Name", "required") })
      .max(30, {
        message: VALIDATION_MESSAGE.get("First Name", "max_number", 30),
      }),
    last_name: z
      .string()
      .min(1, { message: VALIDATION_MESSAGE.get("Last Name", "required") })
      .max(30, {
        message: VALIDATION_MESSAGE.get("Last Name", "max_number", 30),
      }),
  })
  .refine(
    (data) => {
      if (!data.password && !data.password_confirmation) return true;
      return data.password === data.password_confirmation;
    },
    {
      message: "Passwords do not match.",
      path: ["password_confirmation"],
    }
  );
