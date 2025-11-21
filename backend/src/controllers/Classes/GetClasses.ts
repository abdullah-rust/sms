import { Request, Response } from "express";
import logger from "../../logger";
import pool from "../../client/pg";

export default async function GetClasses(_req: Request, res: Response) {
  try {
    const data = await pool.query(`
      SELECT 
        c.id AS class_id,
        c.class_name,
        c.section,
        c.student_count,
        COALESCE(
          json_agg(t.name) FILTER (WHERE t.employee_id IS NOT NULL), '[]'
        ) AS teachers
      FROM classes c
      LEFT JOIN teacher_classes tc ON c.id = tc.class_id
      LEFT JOIN teachers t ON tc.teacher_id = t.employee_id
      GROUP BY c.id
      ORDER BY c.id ASC;
    `);

    return res.status(200).json({ message: "success", data: data.rows });
  } catch (e: any) {
    logger.error("Get Classes Error: " + e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
