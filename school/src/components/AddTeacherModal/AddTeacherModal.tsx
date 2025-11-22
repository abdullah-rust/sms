import styles from "./AddTeacherModal.module.css";
import {
  addteacherAtom,
  ClaasesDataAtom,
  TeachersDataAtom,
} from "../../utils/atom";
import { useAtomValue, useSetAtom } from "jotai";
import React, { useState } from "react";
import { api } from "../../utils/api";
import { errorPopupAtom, errorPopupVisible } from "../../utils/atom";

const AddTeacherModal = () => {
  const setaddteacher = useSetAtom(addteacherAtom);
  const classData = useAtomValue(ClaasesDataAtom);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [contact, setContact] = useState("");
  const [class_id, setClass_id] = useState("");
  const setteachersData = useSetAtom(TeachersDataAtom);
  const seterrorPopupAtom = useSetAtom(errorPopupAtom);
  const seterrorPopupVisible = useSetAtom(errorPopupVisible);

  async function handleSubmit(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();

    try {
      const res = await api.post("/add-teacher", {
        name,
        subject,
        contact: parseInt(contact),
        class_id,
      });

      setteachersData((prev) => [...(prev || []), res.data.data]);

      seterrorPopupAtom({
        type: "success",
        message: res.data.message || "created",
      });
      seterrorPopupVisible(true);
      setaddteacher(false);
    } catch (e: any) {
      console.log(e);
      seterrorPopupAtom({
        type: "error",
        message: e.response.data.message || e.response.data.error,
      });
      seterrorPopupVisible(true);
    }
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        {/* Modal Header */}
        <div className={styles.modalHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.headerIcon}>👨‍🏫</div>
            <h2 className={styles.modalTitle}>Add New Teacher</h2>
          </div>
          <button
            className={styles.closeButton}
            onClick={() => setaddteacher(false)}
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
              required
              placeholder="Enter teacher's full name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Subject</label>
            <select
              className={styles.select}
              required
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="">Select Subject</option>
              <option value="mathematics">Mathematics</option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
              <option value="biology">Biology</option>
              <option value="english">English</option>
              <option value="urdu">Urdu</option>
              <option value="islamiat">Islamiat</option>
              <option value="computer">Computer Science</option>
              <option value="history">History</option>
              <option value="geography">Geography</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Contact Number</label>
            <input
              type="tel"
              required
              className={styles.input}
              placeholder="+92 300 1234567"
              onChange={(e) => setContact(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Assigned Class</label>
            <select
              className={styles.select}
              onChange={(e) => setClass_id(e.target.value)}
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

          {/* Form Actions */}
          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => setaddteacher(false)}
            >
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              Add Teacher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeacherModal;
