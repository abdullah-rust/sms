import { Request, Response, NextFunction } from "express";

import { verifyAccessToken } from "../utils/jwt";

export async function CheckJwt(
  req: Request,

  res: Response,

  next: NextFunction
): Promise<any> {
  const accessToken = req.cookies["access_token"];

  if (!accessToken) {
    return res.status(401).json({ message: "Login again: Not have token." });
  }

  try {
    const decodeaccess = await verifyAccessToken(accessToken);

    if (decodeaccess) {
      return next();
    } else {
      return res.status(401).json({ message: "Login again: Invalid tokens." });
    }
  } catch (err) {
    console.error("JWT middleware Error: Both tokens invalid", err);

    return res.status(401).json({ message: "Login again: Invalid tokens." });
  }
}
