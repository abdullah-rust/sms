import pool from "../../client/pg";
import { Request, Response } from "express";
import logger from "../../logger";

interface AddClassBody {
  class_name: string;
  section: string;
}

export default async function AddClass(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { class_name, section }: AddClassBody = req.body;

    // Validation
    if (!class_name || !section) {
      return res.status(400).json({ message: "Invalid class name or section" });
    }

    // Check if class already exists
    const checkExist = await pool.query(
      "SELECT * FROM classes WHERE class_name = $1 AND section = $2",
      [class_name, section]
    );

    if (checkExist.rowCount !== 0) {
      return res.status(400).json({ message: "Class Already Exists" });
    }

    // Insert class
    const result = await pool.query(
      `INSERT INTO classes (class_name, section)
       VALUES ($1, $2)
       RETURNING *`,
      [class_name, section]
    );

    return res
      .status(200)
      .json({ message: "Class Added Successfully", data: result.rows[0] });
  } catch (e: any) {
    logger.error("Add Class Error: " + e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
