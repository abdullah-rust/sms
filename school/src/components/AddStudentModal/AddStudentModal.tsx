import { useState } from "react";
import styles from "./AddStudentModal.module.css";
import { addstudentAtom } from "../../utils/atom";
import { useSetAtom } from "jotai";

const AddStudentModal = () => {
  const [name, setName] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [number, setNumber] = useState("");
  const [dob, setDob] = useState("");
  const setAddStudentAtom = useSetAtom(addstudentAtom);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        {/* Modal Header */}
        <div className={styles.modalHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.headerIcon}>👨‍🎓</div>
            <h2 className={styles.modalTitle}>Add New Student</h2>
          </div>
          <button
            className={styles.closeButton}
            onClick={() => setAddStudentAtom(false)}
          >
            ×
          </button>
        </div>

        {/* Modal Body */}
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Full Name</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Enter student's full name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Class</label>
            <select
              className={styles.select}
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="1">Grade 1</option>
              <option value="2">Grade 2</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Contact Number</label>
            <input
              type="tel"
              className={styles.input}
              placeholder="+92 300 1234567"
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Date of Birth</label>
            <input
              type="date"
              value={dob}
              className={styles.input}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

          {/* Form Actions */}
          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => setAddStudentAtom(false)}
            >
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentModal;
