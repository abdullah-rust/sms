import { Request, Response } from "express";
import pool from "../../client/pg";
import logger from "../../logger";

export default async function deleteTeacher(req: Request, res: Response) {
  const client = await pool.connect();

  try {
    const { employee_id } = (req as any).body;

    if (!employee_id) {
      return res.status(400).json({ message: "Invalid Form Data" });
    }

    // Check if teacher exists
    const teacherCheck = await client.query(
      "SELECT * FROM teachers WHERE employee_id=$1",
      [employee_id]
    );

    if (teacherCheck.rowCount === 0) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    await client.query("DELETE FROM teachers WHERE employee_id=$1", [
      employee_id,
    ]);

    return res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (e: any) {
    logger.error("Delete Teacher Error: " + e);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    client.release();
  }
}
