import * as z from "zod";

export const SignUpSchema = z
  .object({
    name: z
      .string({ required_error: "Name is required." })
      .min(3, {
        message: "Name must be at least 3 characters.",
      })
      .max(50, {
        message: "Name must be at most 50 characters.",
      }),
    email: z
      .string({ required_error: "Email is required." })
      .email({ message: "Invalid email address." }),
    password: z.string({ required_error: "Password is required." }).min(8, {
      message: "Password must be at least 8 characters.",
    }),
    passwordConfirmation: z
      .string({ required_error: "Password confirmation is required." })
      .min(8, {
        message: "Password confirmation must be at least 8 characters.",
      }),
  })
  .superRefine(({ password, passwordConfirmation }, ctx) => {
    if (password !== passwordConfirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match.",
        path: ["passwordConfirmation"],
      });
    }
  });

export type SignUpInput = z.infer<typeof SignUpSchema>;
