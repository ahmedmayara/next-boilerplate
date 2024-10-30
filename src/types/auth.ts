import { Session } from "@prisma/client";

export type SafeUser = {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * The result of session validation.
 * @typedef {Object} SessionValidationResult
 * @property {Session} session - The session object.
 * @property {User} user - The user object.
 * @property {null} session - Null if the session is invalid.
 * @property {null} user - Null if the user is invalid.
 */
export type SessionValidationResult =
  | { session: Session; user: SafeUser }
  | { session: null; user: null };
