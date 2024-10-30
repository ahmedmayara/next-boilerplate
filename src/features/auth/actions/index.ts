"use server";

import { revalidatePath } from "next/cache";
import { createServerAction } from "zsa";

import {
  deleteSessionTokenCookie,
  getCurrentSession,
  invalidateSession,
} from "@/lib/auth/session";

export const signOut = createServerAction().handler(async () => {
  const { session } = await getCurrentSession();

  if (!session) {
    throw "You're not signed in.";
  }

  await invalidateSession(session.id);
  await deleteSessionTokenCookie();

  revalidatePath("/");
});
