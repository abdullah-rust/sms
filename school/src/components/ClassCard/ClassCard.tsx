import {
  FaUsers,
  FaEdit,
  FaTrash,
  // FaChalkboardTeacher,
  FaUserGraduate,
} from "react-icons/fa";
import styles from "./ClassCard.module.css";
import type { ClassItem } from "../../utils/types";

interface ClassCardProps {
  classItem: ClassItem;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const ClassCard = ({ classItem, onEdit, onDelete }: ClassCardProps) => {
  return (
    <div className={styles.card}>
      {/* Card Header */}
      <div className={styles.cardHeader}>
        <div className={styles.avatar}>
          <FaUsers className={styles.avatarIcon} />
        </div>
        <div className={styles.classInfo}>
          <h3 className={styles.name}>{classItem.class_name}</h3>
          <div className={styles.sectionBadge}>Section {classItem.section}</div>
        </div>
      </div>
      Class Details
      <div className={styles.cardDetails}>
        {/* <div className={styles.detailItem}>
          <FaChalkboardTeacher className={styles.detailIcon} />
          <span className={styles.detailText}>
            {classItem.teacher_name || `Teacher ID: ${classItem.teacher_id}`}
          </span>
        </div> */}

        <div className={styles.detailItem}>
          <FaUserGraduate className={styles.detailIcon} />
          <span className={styles.detailText}>
            {classItem.student_count || 0} Students
          </span>
        </div>

        {/* Teachers List */}
        {classItem.teachers && classItem.teachers.length > 0 && (
          <div className={styles.teachersSection}>
            <h4 className={styles.teachersTitle}>Assigned Teachers:</h4>
            <div className={styles.teachersList}>
              {classItem.teachers.map((teacher, index) => (
                <span key={index} className={styles.teacherTag}>
                  {teacher}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Card Actions */}
      <div className={styles.cardActions}>
        <button
          className={styles.editButton}
          onClick={() => onEdit(classItem.class_id)}
        >
          <FaEdit className={styles.actionIcon} />
          Edit
        </button>
        <button
          className={styles.deleteButton}
          onClick={() => onDelete(classItem.class_id)}
        >
          <FaTrash className={styles.actionIcon} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default ClassCard;
