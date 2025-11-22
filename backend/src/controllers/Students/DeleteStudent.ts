import { Request, Response } from "express";
import pool from "../../client/pg";
import logger from "../../logger";

export default async function deleteStudent(req: Request, res: Response) {
  const client = await pool.connect();

  try {
    const { roll_number, class_id } = (req as any).body;

    if (!roll_number || !class_id) {
      return res.status(400).json({ message: "Invalid Form Data" });
    }

    await client.query("BEGIN");

    // Check if student exists
    const studentCheck = await client.query(
      "SELECT * FROM students WHERE roll_number=$1 AND class_id=$2",
      [roll_number, class_id]
    );

    if (studentCheck.rowCount === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ message: "Student not found" });
    }

    // Delete student
    await client.query(
      "DELETE FROM students WHERE roll_number=$1 AND class_id=$2",
      [roll_number, class_id]
    );

    // Optionally update student count in classes table
    await client.query(
      "UPDATE classes SET student_count = student_count - 1 WHERE id=$1 AND student_count > 0",
      [class_id]
    );

    await client.query("COMMIT");

    return res.status(200).json({ message: "Student deleted successfully" });
  } catch (e: any) {
    await client.query("ROLLBACK");
    logger.error("Delete Student Error: " + e);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    client.release();
  }
}
