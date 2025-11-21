import { Request, Response } from "express";
import logger from "../../logger";
import pool from "../../client/pg";

export default async function GetStudents(_req: Request, res: Response) {
  try {
    const result = await pool.query(`
      SELECT 
        s.roll_number,
        s.name,
        s.contact,
        s.dob,
        c.id AS class_id,
        CONCAT(c.class_name, ' - ', c.section) AS className
      FROM students s
      LEFT JOIN classes c ON s.class_id = c.id
      ORDER BY s.roll_number ASC
    `);

    return res.status(200).json({
      message: "success",
      data: result.rows,
    });
  } catch (e: any) {
    logger.error("Get Students Error: " + e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
