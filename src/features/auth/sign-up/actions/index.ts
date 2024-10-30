"use server";

import { db } from "@/db";
import { SignUpSchema } from "@/features/auth/sign-up/schemas";
import { hashPassword } from "@/features/auth/utils";
import { createServerAction } from "zsa";

export const signUp = createServerAction()
  .input(SignUpSchema)
  .handler(async ({ input }) => {
    const { name, email, password } = input;

    const hashedPassword = await hashPassword(password);

    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw "An account with that email already exists.";
    }

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return { message: "Account created successfully." };
  });
