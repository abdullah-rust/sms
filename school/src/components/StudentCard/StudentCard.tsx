import {
  FaUserGraduate,
  FaEdit,
  FaTrash,
  FaPhone,
  FaCalendarAlt,
} from "react-icons/fa";
import styles from "./StudentCard.module.css";
import type { Student } from "../../utils/types";
import { studentEditAtom, StudentEditData } from "../../utils/atom";
import { useSetAtom } from "jotai";

interface StudentCardProps {
  student: Student;
  onDelete: (roll_number: number, class_id: number) => void;
}

const StudentCard = ({ student, onDelete }: StudentCardProps) => {
  // Calculate age from date of birth
  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const setStudentAtom = useSetAtom(studentEditAtom);
  const setStudentEditData = useSetAtom(StudentEditData);

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const age = calculateAge(student.dob);

  return (
    <div className={styles.card}>
      {/* Card Header */}
      <div className={styles.cardHeader}>
        <div className={styles.avatar}>
          <FaUserGraduate className={styles.avatarIcon} />
        </div>
        <div className={styles.studentInfo}>
          <h3 className={styles.name}>{student.name}</h3>
          <div className={styles.idSection}>
            <span className={styles.rollNumber}>
              Roll No: {student.roll_number}
            </span>
            <span className={styles.classBadge}>
              {student.classname || `Class ${student.classname}`}
            </span>
          </div>
        </div>
      </div>

      {/* Card Details */}
      <div className={styles.cardDetails}>
        <div className={styles.detailItem}>
          <FaPhone className={styles.detailIcon} />
          <span className={styles.detailText}>{student.contact}</span>
        </div>
        <div className={styles.detailItem}>
          <FaCalendarAlt className={styles.detailIcon} />
          <span className={styles.detailText}>{formatDate(student.dob)}</span>
        </div>
        <div className={styles.infoBadges}>
          <div className={styles.ageBadge}>Age: {age}</div>
          <div className={styles.classIdBadge}>
            Class Name: {student.classname}
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className={styles.cardActions}>
        <button
          className={styles.editButton}
          onClick={() => {
            setStudentAtom(true);
            setStudentEditData(student);
          }}
        >
          <FaEdit className={styles.actionIcon} />
          Edit
        </button>
        <button
          className={styles.deleteButton}
          onClick={() => onDelete(student.roll_number, student.class_id)}
        >
          <FaTrash className={styles.actionIcon} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
