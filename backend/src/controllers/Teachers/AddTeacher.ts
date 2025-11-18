import { Request, Response } from "express";
import logger from "../../logger";
import pool from "../../client/pg";

interface AddTeacherBody {
  name: string;
  subject: string;
  class_id: number | string;
  contact: string;
}

export default async function AddTeacher(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { name, subject, class_id, contact }: AddTeacherBody = req.body;

    // Validation
    if (!name || !subject || !class_id || !contact) {
      return res.status(400).json({ message: "Form Data Invalid" });
    }

    const classIdNum = Number(class_id);
    if (isNaN(classIdNum)) {
      return res.status(400).json({ message: "Class ID must be a number" });
    }

    // Check if teacher with same contact exists
    const checkTeacher = await pool.query(
      "SELECT * FROM teachers WHERE contact = $1",
      [contact]
    );
    if (checkTeacher.rowCount !== 0) {
      return res.status(400).json({ message: "Teacher Already Exists" });
    }

    // Check if class exists
    const checkClass = await pool.query(
      "SELECT id FROM classes WHERE id = $1",
      [classIdNum]
    );
    if (checkClass.rowCount === 0) {
      return res.status(400).json({ message: "Class Not Found" });
    }

    // Insert teacher
    const result = await pool.query(
      "INSERT INTO teachers(name, subject, contact, class_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, subject, contact, classIdNum]
    );

    return res
      .status(200)
      .json({ message: "Teacher Added Successfully", data: result.rows[0] });
  } catch (e: any) {
    logger.error("Add Teacher Error: " + e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
