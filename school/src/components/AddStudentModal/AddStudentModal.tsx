import React, { useState } from "react";
import styles from "./AddStudentModal.module.css";
import {
  addstudentAtom,
  ClaasesDataAtom,
  StudentsDataAtom,
} from "../../utils/atom";
import { useAtomValue, useSetAtom } from "jotai";
import { api } from "../../utils/api";
import { FaSpinner } from "react-icons/fa";
import { errorPopupAtom, errorPopupVisible } from "../../utils/atom";

const AddStudentModal = () => {
  const [name, setName] = useState("");
  const [Class, setSelectedClass] = useState("");
  const [number, setNumber] = useState("");
  const [dob, setDob] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const setAddStudentAtom = useSetAtom(addstudentAtom);
  const classData = useAtomValue(ClaasesDataAtom);
  const setStudentData = useSetAtom(StudentsDataAtom);
  const seterrorPopupAtom = useSetAtom(errorPopupAtom);
  const seterrorPopupVisible = useSetAtom(errorPopupVisible);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.post("/add-student", {
        name,
        class_id: parseInt(Class),
        contact: number,
        dob,
      });
      console.log(res.data.data);
      setStudentData((prev) => [...(prev || []), res.data.data]);

      seterrorPopupAtom({
        type: "success",
        message: res.data.message || "created",
      });
      seterrorPopupVisible(true);
      setAddStudentAtom(false);
    } catch (e: any) {
      console.log(e);
      seterrorPopupAtom({
        type: "error",
        message: e.response.data.message || e.response.data.error,
      });
      seterrorPopupVisible(true);
    } finally {
      setIsLoading(false);
    }
  }

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
            disabled={isLoading}
          >
            ×
          </button>
        </div>

        {/* Modal Body */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Full Name</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Enter student's full name"
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Class</label>
            <select
              className={styles.select}
              value={Class}
              onChange={(e) => setSelectedClass(e.target.value)}
              disabled={isLoading}
              required
            >
              <option value="">Select Class</option>
              {classData &&
                classData.map((c) => (
                  <option value={c.class_id} key={c.class_id}>
                    {c.class_name + "-" + c.section}
                  </option>
                ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Contact Number</label>
            <input
              type="tel"
              className={styles.input}
              placeholder="+92 300 1234567"
              onChange={(e) => setNumber(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Date of Birth</label>
            <input
              type="date"
              value={dob}
              className={styles.input}
              onChange={(e) => setDob(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          {/* Form Actions */}
          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => setAddStudentAtom(false)}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${styles.submitButton} ${
                isLoading ? styles.loading : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <FaSpinner className={styles.spinner} />
                  Adding...
                </>
              ) : (
                "Add Student"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentModal;
