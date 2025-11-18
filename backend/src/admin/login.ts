import { Response, Request } from "express";
import logger from "../logger";
import { createAccessToken } from "../utils/jwt";
import pool from "../client/pg";

export default async function adminLogin(
  req: Request,
  res: Response
): Promise<any> {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ message: "Please insert form data" });
    }

    const admin = await pool.query(
      "SELECT * FROM admin WHERE name=$1 AND password=$2",
      [name, password]
    );

    if (admin.rowCount === 0) {
      return res.status(400).json({ message: "Invalid name or password" });
    }

    const token = await createAccessToken(name);
    if (!token) {
      logger.error("JWT creation error");
      return res.status(500).json({ message: "Internal Server Error" });
    }

    const cookieOptions = {
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 1 hour
      path: "/",
      secure: process.env["NODE_ENV"] === "production",
    };

    res.cookie("access_token", token, cookieOptions);
    res.status(200).json({ message: "Admin login successful" });
  } catch (e: any) {
    logger.error("Admin login error: " + e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
