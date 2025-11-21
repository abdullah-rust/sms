import { Request, Response } from "express";
import logger from "../../logger";
import pool from "../../client/pg";

interface AddTeacherBody {
  name: string;
  subject: string;
  contact: string;
  class_id: number;
}

export default async function AddTeacher(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { name, subject, contact, class_id }: AddTeacherBody = req.body;

    // Validation
    if (!name || !subject || !contact || !class_id) {
      return res.status(400).json({ message: "Form Data Invalid" });
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
      "SELECT id, class_name, section FROM classes WHERE id = $1",
      [class_id]
    );
    if (checkClass.rowCount === 0) {
      return res
        .status(400)
        .json({ message: `Class ID ${class_id} Not Found` });
    }

    // Insert teacher
    const insertTeacher = await pool.query(
      "INSERT INTO teachers(name, subject, contact) VALUES ($1, $2, $3) RETURNING *",
      [name, subject, contact]
    );
    const teacherId = insertTeacher.rows[0].employee_id;

    // Assign teacher to single class
    await pool.query(
      "INSERT INTO teacher_classes(teacher_id, class_id) VALUES ($1, $2)",
      [teacherId, class_id]
    );

    const classData = checkClass.rows[0];

    return res.status(200).json({
      message: "Teacher Added Successfully",
      data: {
        employee_id: teacherId,
        teacher_name: insertTeacher.rows[0].name,
        subject: insertTeacher.rows[0].subject,
        contact: insertTeacher.rows[0].contact,
        classes: [
          {
            class_id: classData.id,
            class_name: classData.class_name,
            section: classData.section,
          },
        ],
      },
    });
  } catch (e: any) {
    logger.error("Add Teacher Error: " + e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
