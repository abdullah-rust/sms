import { Request, Response } from "express";
import logger from "../../logger";
import pool from "../../client/pg";

interface EditStudentBody {
  name: string;
  class_id: number;
  contact: string;
  roll_number: number;
  old_class_id: number;
}

export default async function editStudent(req: Request, res: Response) {
  const client = await pool.connect();

  try {
    const {
      name,
      class_id,
      contact,
      roll_number,
      old_class_id,
    }: EditStudentBody = (req as any).body;

    // Basic validation
    if (
      typeof name !== "string" ||
      typeof contact !== "string" ||
      typeof class_id !== "number" ||
      typeof roll_number !== "number" ||
      typeof old_class_id !== "number"
    ) {
      return res.status(400).json({ message: "Form data is invalid" });
    }

    await client.query("BEGIN"); // Start transaction

    // Check if student exists
    const studentCheck = await client.query(
      "SELECT * FROM students WHERE roll_number = $1",
      [roll_number]
    );
    if (studentCheck.rowCount === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ message: "Student does not exist" });
    }

    // Check if new class exists
    const classCheck = await client.query(
      "SELECT id, class_name, section FROM classes WHERE id = $1",
      [class_id]
    );
    if (classCheck.rowCount === 0) {
      await client.query("ROLLBACK");
      return res
        .status(404)
        .json({ message: `Class with ID ${class_id} not found` });
    }
    const classData = classCheck.rows[0];

    // Update student
    const updateResult = await client.query(
      "UPDATE students SET name = $1, class_id = $2, contact = $3 WHERE roll_number = $4 RETURNING *",
      [name, class_id, contact, roll_number]
    );

    // Adjust student_count only if class actually changed
    if (class_id !== old_class_id) {
      await client.query(
        "UPDATE classes SET student_count = student_count + 1 WHERE id = $1",
        [class_id]
      );
      await client.query(
        "UPDATE classes SET student_count = student_count - 1 WHERE id = $1 AND student_count > 0",
        [old_class_id]
      );
    }

    await client.query("COMMIT"); // Commit transaction

    // Return updated student with class info (same style as AddStudent)
    return res.status(200).json({
      message: "Student update successful",
      data: {
        roll_number: updateResult.rows[0].roll_number,
        name: updateResult.rows[0].name,
        contact: updateResult.rows[0].contact,
        dob: updateResult.rows[0].dob,
        class_id: classData.id,
        classname: `${classData.class_name} - ${classData.section}`,
      },
    });
  } catch (error) {
    await client.query("ROLLBACK");
    logger.error("Edit Student Error: " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    client.release();
  }
}
