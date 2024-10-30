import * as z from "zod";

export const SignInSchema = z.object({
  email: z.string({ required_error: "Email is required." }).email({
    message: "Email is invalid.",
  }),
  password: z.string({ required_error: "Password is required." }).min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export type SignInInput = z.infer<typeof SignInSchema>;
