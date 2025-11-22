import { Request, Response } from "express";
import pool from "../../client/pg";
import logger from "../../logger";

interface EditTeacherBody {
  employee_id: number;
  name: string;
  subject: string;
  contact: string;
  classes: number[];
}

export default async function editTeacher(req: Request, res: Response) {
  const client = await pool.connect();

  try {
    const { employee_id, name, subject, contact, classes }: EditTeacherBody = (
      req as any
    ).body;

    // Basic validation
    if (
      !employee_id ||
      !name ||
      !subject ||
      !contact ||
      !Array.isArray(classes)
    ) {
      return res.status(400).json({ message: "Form data is invalid" });
    }

    await client.query("BEGIN");

    // Check if teacher exists
    const teacherCheck = await client.query(
      "SELECT * FROM teachers WHERE employee_id = $1",
      [employee_id]
    );
    if (teacherCheck.rowCount === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ message: "Teacher does not exist" });
    }

    // Update teacher info
    await client.query(
      "UPDATE teachers SET name=$1, subject=$2, contact=$3 WHERE employee_id=$4",
      [name, subject, contact, employee_id]
    );

    // Get current assigned classes
    const currentClasses = await client.query(
      "SELECT class_id FROM teacher_classes WHERE teacher_id=$1",
      [employee_id]
    );
    const currentClassIds = currentClasses.rows.map((r) => r.class_id);

    // Classes to remove
    const removeClasses = currentClassIds.filter((id) => !classes.includes(id));
    if (removeClasses.length > 0) {
      await client.query(
        "DELETE FROM teacher_classes WHERE teacher_id=$1 AND class_id = ANY($2::int[])",
        [employee_id, removeClasses]
      );
    }

    // Classes to add
    const addClasses = classes.filter((id) => !currentClassIds.includes(id));
    for (const classId of addClasses) {
      await client.query(
        "INSERT INTO teacher_classes (teacher_id, class_id) VALUES ($1, $2)",
        [employee_id, classId]
      );
    }

    // Commit all changes
    await client.query("COMMIT");

    // Fetch updated teacher data with classes details (like getTeachers)
    const updatedTeacher = await client.query(
      `
      SELECT t.employee_id, t.name AS teacher_name, t.subject, t.contact,
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
      WHERE t.employee_id = $1
      GROUP BY t.employee_id
      `,
      [employee_id]
    );

    return res.status(200).json({
      message: "Teacher updated successfully",
      data: updatedTeacher.rows[0],
    });
  } catch (error) {
    await client.query("ROLLBACK");
    logger.error("Edit Teacher Error: " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    client.release();
  }
}
