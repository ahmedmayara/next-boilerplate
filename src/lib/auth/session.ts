import { cache } from "react";

import { cookies } from "next/headers";
import { db } from "@/db";
import { sha256 } from "@oslojs/crypto/sha2";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { Session } from "@prisma/client";

import { SessionValidationResult } from "@/types/auth";

/**
 * Generates a session token.
 * @returns {string} The generated session token.
 */
export function generateSessionToken(): string {
  const bytes = new Uint8Array(64);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

/**
 * Creates a new session in the database.
 * @param {string} token - The session token.
 * @param {string} userId - The user ID associated with the session.
 * @returns {Promise<Session>} The created session.
 */
export async function createSession(
  token: string,
  userId: string,
): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  };

  await db.session.create({
    data: session,
  });

  return session;
}

/**
 * Validates a session token.
 * @param {string} token - The session token to validate.
 * @returns {Promise<SessionValidationResult>} The validation result.
 */
export async function validateSessionToken(
  token: string,
): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const result = await db.session.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  if (result === null) {
    return { session: null, user: null };
  }

  const { user, ...session } = result;

  if (Date.now() >= session.expiresAt.getTime()) {
    await db.session.delete({
      where: {
        id: sessionId,
      },
    });

    return { session: null, user: null };
  }

  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

    await db.session.update({
      where: {
        id: session.id,
      },
      data: {
        expiresAt: session.expiresAt,
      },
    });
  }

  return { session, user };
}

/**
 * Invalidates a session by deleting it from the database.
 * @param {string} sessionId - The ID of the session to invalidate.
 * @returns {Promise<void>} A promise that resolves when the session is invalidated.
 */
export async function invalidateSession(sessionId: string): Promise<void> {
  await db.session.delete({
    where: {
      id: sessionId,
    },
  });
}

/**
 * Sets a session token cookie.
 * @param {string} token - The session token.
 * @param {Date} expiresAt - The expiration date of the cookie.
 */
export async function setSessionTokenCookie(
  token: string,
  expiresAt: Date,
): Promise<void> {
  (await cookies()).set("session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });
}

/**
 * Deletes the session token cookie.
 */
export async function deleteSessionTokenCookie(): Promise<void> {
  (await cookies()).set("session", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
}

/**
 * Gets the current session from the cache.
 * @returns {Promise<SessionValidationResult>} The current session validation result.
 */
export const getCurrentSession = cache(
  async (): Promise<SessionValidationResult> => {
    const token = (await cookies()).get("session")?.value ?? null;
    if (token === null) {
      return { session: null, user: null };
    }
    const result = await validateSessionToken(token);
    return result;
  },
);
