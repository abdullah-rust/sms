import { Request, Response } from "express";
import pool from "../../client/pg";
import logger from "../../logger";

export default async function deleteClass(req: Request, res: Response) {
  const client = await pool.connect();

  try {
    const { class_id } = (req as any).body;
    if (typeof class_id !== "number")
      return res.status(400).json({ message: "Invalid Form Data" });

    await client.query("DELETE FROM classes WHERE id = $1", [class_id]);

    return res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    logger.error("Delete Class Error: " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    client.release();
  }
}
