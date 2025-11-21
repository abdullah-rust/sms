import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import styles from "./EditStudentModal.module.css";
import {
  StudentEditData,
  studentEditAtom,
  ClaasesDataAtom,
  StudentsDataAtom,
} from "../../utils/atom";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { api } from "../../utils/api";

const EditStudentModal: React.FC = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [classId, setClassId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const classData = useAtomValue(ClaasesDataAtom);
  const setStudentAtom = useSetAtom(studentEditAtom);
  const StudentData = useAtomValue(StudentEditData);
  const [StudentsData, setStudentsData] = useAtom(StudentsDataAtom);

  useEffect(() => {
    if (StudentData) {
      setName(StudentData.name || "");
      setContact(StudentData.contact || "");
      setClassId(StudentData.class_id?.toString() || "");
    }
  }, [StudentData]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!StudentData?.roll_number) {
      setError("Student data is missing");
      return;
    }

    if (!name || !contact || !classId) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/edit-student", {
        name,
        class_id: parseInt(classId),
        contact,
        roll_number: StudentData.roll_number,
        old_class_id: StudentData.class_id,
      });

      if (StudentsData) {
        const updatedStudents = [
          ...StudentsData.filter(
            (s) => s.roll_number !== StudentData.roll_number
          ),
          res.data.data,
        ];
        setStudentsData(updatedStudents);
      }

      setSuccess("Student updated successfully");
      console.log(res.data.data);
    } catch (e: any) {
      setError(e.response?.data?.message || "Something went wrong");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.headerIcon}>👨‍🎓</div>
            <h2 className={styles.modalTitle}>Edit Student</h2>
          </div>
          <button
            className={styles.closeButton}
            onClick={() => setStudentAtom(false)}
          >
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}

          {/* Name */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Full Name</label>
            <input
              type="text"
              className={styles.input}
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Contact */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Contact Number</label>
            <input
              type="tel"
              className={styles.input}
              value={contact}
              required
              onChange={(e) => setContact(e.target.value)}
            />
          </div>

          {/* Class */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Class</label>
            <select
              className={styles.select}
              value={classId}
              required
              onChange={(e) => setClassId(e.target.value)}
            >
              <option value="">Select Class</option>
              {classData?.map((c) => (
                <option value={c.class_id} key={c.class_id}>
                  {c.class_name} {c.section ? `- ${c.section}` : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => setStudentAtom(false)}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudentModal;
