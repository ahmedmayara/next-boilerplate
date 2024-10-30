import { SALT_ROUNDS } from "@/features/auth/config";
import { compare, hash } from "bcryptjs";

/**
 * Hashes a password using bcrypt
 * @param password - The password to hash.
 * @returns The hashed password.
 */
export async function hashPassword(password: string) {
  return hash(password, SALT_ROUNDS);
}

/**
 * Compares a plain text password with a hashed password.
 * @param plainTextPassword - The plain text password.
 * @param hashedPassword - The hashed password.
 * @returns Whether the passwords match.
 */
export async function comparePasswords(
  plainTextPassword: string,
  hashedPassword: string,
) {
  return compare(plainTextPassword, hashedPassword);
}
