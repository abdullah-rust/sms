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
    const newClass = result.rows[0];

    // Fetch teachers for this new class (jo abhi likely empty array hoga)
    const teachersResult = await pool.query(
      `
      SELECT t.name
      FROM teacher_classes tc
      LEFT JOIN teachers t ON tc.teacher_id = t.employee_id
      WHERE tc.class_id = $1
      `,
      [newClass.id]
    );

    return res.status(200).json({
      message: "Class Added Successfully",
      data: {
        class_id: newClass.id,
        class_name: newClass.class_name,
        section: newClass.section,
        student_count: 0, // nayi class pe default 0
        teachers: teachersResult.rows.map((t) => t.name), // teachers array
      },
    });
  } catch (e: any) {
    logger.error("Add Class Error: " + e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
