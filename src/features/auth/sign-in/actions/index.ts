"use server";

import { db } from "@/db";
import { SignInSchema } from "@/features/auth/sign-in/schemas";
import { comparePasswords } from "@/features/auth/utils";
import { createServerAction } from "zsa";

import {
  createSession,
  generateSessionToken,
  setSessionTokenCookie,
} from "@/lib/auth/session";

export const signIn = createServerAction()
  .input(SignInSchema)
  .handler(async ({ input }) => {
    const { email, password } = input;

    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
      throw "Invalid email or password. Please try again.";
    }

    const isValidPassword = await comparePasswords(
      password,
      existingUser.password,
    );

    if (!isValidPassword) {
      throw "Invalid email or password. Please try again.";
    }

    const token = await generateSessionToken();

    const session = await createSession(token, existingUser.id);

    await setSessionTokenCookie(token, session.expiresAt);

    return { signedIn: true };
  });
