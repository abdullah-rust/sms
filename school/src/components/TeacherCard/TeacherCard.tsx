import {
  FaChalkboardTeacher,
  FaEdit,
  FaTrash,
  FaPhone,
  FaBook,
  FaUsers,
} from "react-icons/fa";
import styles from "./TeacherCard.module.css";

interface Teacher {
  employee_id: number;
  name: string;
  subject: string;
  contact: string;
  class_id: number;
  className?: string;
}

interface TeacherCardProps {
  teacher: Teacher;
  onEdit: (employee_id: number) => void;
  onDelete: (employee_id: number) => void;
}

const TeacherCard = ({ teacher, onEdit, onDelete }: TeacherCardProps) => {
  return (
    <div className={styles.card}>
      {/* Card Header */}
      <div className={styles.cardHeader}>
        <div className={styles.avatar}>
          <FaChalkboardTeacher className={styles.avatarIcon} />
        </div>
        <div className={styles.teacherInfo}>
          <h3 className={styles.name}>{teacher.name}</h3>
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
            {teacher.className || `Class ${teacher.class_id}`}
          </span>
        </div>
      </div>

      {/* Card Actions */}
      <div className={styles.cardActions}>
        <button
          className={styles.editButton}
          onClick={() => onEdit(teacher.employee_id)}
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
