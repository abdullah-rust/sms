// File: path/to/jwt.ts (Updated)

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env["JWT_SECRET"]!;

/**
 * Checks if the ID is valid for token creation.
 * @param id User ID
 */
function isIdValid(id: any): boolean {
  // ID maujood honi chahiye aur empty string ya 0 nahi honi chahiye
  return id !== null && id !== undefined && id !== "" && id !== 0;
}

// Access Token
export async function createAccessToken(id: string | number): Promise<string> {
  // 🎯 SAFETY CHECK YAHAN LAGA DIYA
  if (!isIdValid(id)) {
    throw new Error(
      "Cannot create Access Token: User ID is invalid or missing."
    );
  }

  return jwt.sign({ userId: id }, JWT_SECRET, {
    expiresIn: "1h",
  });
}

// Verify Access Token
export async function verifyAccessToken(token: string): Promise<any | null> {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}
