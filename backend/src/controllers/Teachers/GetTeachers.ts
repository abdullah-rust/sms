import { Request, Response } from "express";
import logger from "../../logger";
import pool from "../../client/pg";

export default async function GetTeachers(_req: Request, res: Response) {
  try {
    const data = await pool.query(`
      SELECT 
        t.employee_id,
        t.name AS teacher_name,
        t.subject,
        t.contact,
        COALESCE(
          json_agg(
            json_build_object(
              'class_id', c.id,
              'class_name', c.class_name,
              'section', c.section
            )
          ) FILTER (WHERE c.id IS NOT NULL), '[]'
        ) AS classes
      FROM teachers t
      LEFT JOIN teacher_classes tc ON t.employee_id = tc.teacher_id
      LEFT JOIN classes c ON tc.class_id = c.id
      GROUP BY t.employee_id
      ORDER BY t.employee_id ASC;
    `);

    return res.status(200).json({ message: "success", data: data.rows });
  } catch (e: any) {
    logger.error("Get Teachers Error: " + e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
