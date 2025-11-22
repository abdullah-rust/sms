import {
  FaChalkboardTeacher,
  FaEdit,
  FaTrash,
  FaPhone,
  FaBook,
  FaUsers,
} from "react-icons/fa";
import styles from "./TeacherCard.module.css";
import type { Teacher } from "../../utils/types";
import { teacherEditAtom, TeacherEditData } from "../../utils/atom";
import { useSetAtom } from "jotai";

interface TeacherCardProps {
  teacher: Teacher;
  onDelete: (employee_id: number) => void;
}

const TeacherCard = ({ teacher, onDelete }: TeacherCardProps) => {
  const setEditTEacher = useSetAtom(teacherEditAtom);
  const setEditTeacherData = useSetAtom(TeacherEditData);

  return (
    <div className={styles.card}>
      {/* Card Header */}
      <div className={styles.cardHeader}>
        <div className={styles.avatar}>
          <FaChalkboardTeacher className={styles.avatarIcon} />
        </div>
        <div className={styles.teacherInfo}>
          <h3 className={styles.name}>{teacher.teacher_name}</h3>
          <div className={styles.idSection}>
            <span className={styles.employeeId}>
              EMP ID: {teacher.employee_id}
            </span>
            <span className={styles.subjectBadge}>{teacher.subject}</span>
          </div>
        </div>
      </div>

      {/* Card Details */}
      <div className={styles.cardDetails}>
        <div className={styles.detailItem}>
          <FaPhone className={styles.detailIcon} />
          <span className={styles.detailText}>{teacher.contact}</span>
        </div>
        <div className={styles.detailItem}>
          <FaBook className={styles.detailIcon} />
          <span className={styles.detailText}>{teacher.subject}</span>
        </div>
        <div className={styles.detailItem}>
          <FaUsers className={styles.detailIcon} />
          <span className={styles.detailText}>
            {teacher.classes.length > 0
              ? teacher.classes
                  .map((c) => `${c.class_name} ${c.section}`)
                  .join(", ")
              : "No Class Assigned"}
          </span>
        </div>
      </div>

      {/* Card Actions */}
      <div className={styles.cardActions}>
        <button
          className={styles.editButton}
          onClick={() => {
            setEditTeacherData(teacher);
            setEditTEacher(true);
          }}
        >
          <FaEdit className={styles.actionIcon} />
          Edit
        </button>
        <button
          className={styles.deleteButton}
          onClick={() => onDelete(teacher.employee_id)}
        >
          <FaTrash className={styles.actionIcon} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default TeacherCard;
