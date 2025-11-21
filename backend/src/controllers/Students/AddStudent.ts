import { Request, Response } from "express";
import logger from "../../logger";
import pool from "../../client/pg";

interface AddStudentBody {
  name: string;
  class_id: number;
  contact: string;
  dob: string;
}

export default async function AddStudent(req: Request, res: Response) {
  try {
    const { name, class_id, contact, dob }: AddStudentBody = (req as any).body;

    if (!name || !class_id || !contact || !dob) {
      return res.status(400).json({ message: "Form Data Invalid" });
    }

    // Check if student already exists
    const checkStExit = await pool.query(
      "SELECT * FROM students WHERE name=$1 AND contact=$2",
      [name, contact]
    );
    if (checkStExit.rowCount !== 0) {
      return res.status(400).json({ message: "Student Already Exists" });
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

    const newStudent = await pool.query(
      "INSERT INTO students(name,class_id,contact,dob) VALUES ($1,$2,$3,$4) RETURNING *",
      [name, class_id, contact, dob]
    );

    await pool.query(
      "UPDATE classes SET student_count = student_count + 1 WHERE id = $1",
      [class_id]
    );

    const classData = checkClass.rows[0];

    return res.status(200).json({
      message: "Student Added Successfully",
      data: {
        roll_number: newStudent.rows[0].roll_number,
        name: newStudent.rows[0].name,
        contact: newStudent.rows[0].contact,
        dob: newStudent.rows[0].dob,
        class_id: classData.id,
        classname: `${classData.class_name} - ${classData.section}`,
      },
    });
  } catch (e: any) {
    logger.error("Add Student Error: " + e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
