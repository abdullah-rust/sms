import styles from "./EditTeacherModal.module.css";
import {
  teacherEditAtom,
  ClaasesDataAtom,
  TeacherEditData,
  TeachersDataAtom,
} from "../../utils/atom";
import { useAtomValue, useSetAtom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import type { ClassInfo } from "../../utils/types";
import { FaTimes } from "react-icons/fa";
import { api } from "../../utils/api";
import { errorPopupAtom, errorPopupVisible } from "../../utils/atom";

const EditTeacherModal = () => {
  const setEditTeacher = useSetAtom(teacherEditAtom);
  const classData = useAtomValue(ClaasesDataAtom || []);
  const teacherEditData = useAtomValue(TeacherEditData);
  const [TeachersData, setTeachersData] = useAtom(TeachersDataAtom);

  // form data
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [contact, setContact] = useState("");
  const [currentClasses, setCurrentClasses] = useState<ClassInfo[]>([]);
  const [newClass, setNewClass] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const seterrorPopupAtom = useSetAtom(errorPopupAtom);
  const seterrorPopupVisible = useSetAtom(errorPopupVisible);

  useEffect(() => {
    setName(teacherEditData?.teacher_name || "");
    setSubject(teacherEditData?.subject || "");
    setContact(teacherEditData?.contact || "");
    setCurrentClasses(teacherEditData?.classes || []);
  }, [teacherEditData]);

  const handleRemoveClass = (classId: number) => {
    setCurrentClasses((prev) => prev.filter((c) => c.class_id !== classId));
  };

  const handleAddClass = () => {
    if (newClass && classData) {
      const selectedClass = classData.find(
        (c) => c.class_id.toString() === newClass
      );
      if (
        selectedClass &&
        !currentClasses.some((c) => c.class_id === selectedClass.class_id)
      ) {
        setCurrentClasses((prev) => [...prev, selectedClass]);
        setNewClass("");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!teacherEditData?.employee_id) {
      setError("Teacher data missing");
      return;
    }

    if (!name || !subject || !contact) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/edit-teacher", {
        employee_id: teacherEditData.employee_id,
        name,
        subject,
        contact,
        classes: currentClasses.map((c) => c.class_id),
      });
      console.log(res.data.data);

      // Update TeachersData atom
      if (TeachersData) {
        const updatedTeachers = TeachersData.map((t) =>
          t.employee_id === teacherEditData.employee_id ? res.data.data : t
        );
        setTeachersData(updatedTeachers);
      }
      seterrorPopupAtom({
        type: "success",
        message: res.data.message || "upadted",
      });
      seterrorPopupVisible(true);

      setSuccess("Teacher updated successfully");
      setEditTeacher(false);
    } catch (e: any) {
      setError(e.response?.data?.message || "Something went wrong");
      console.error(e);
      seterrorPopupAtom({
        type: "error",
        message: e.response.data.message || e.response.data.error,
      });
      seterrorPopupVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        {/* Modal Header */}
        <div className={styles.modalHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.headerIcon}>✏️</div>
            <h2 className={styles.modalTitle}>Edit Teacher</h2>
          </div>
          <button
            className={styles.closeButton}
            onClick={() => setEditTeacher(false)}
          >
            ×
          </button>
        </div>

        {/* Modal Body */}
        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}

          {/* Name */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Full Name</label>
            <input
              type="text"
              className={styles.input}
              required
              value={name}
              placeholder="Enter teacher's full name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Subject */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Subject</label>
            <select
              className={styles.select}
              required
              value={subject}
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

          {/* Contact */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Contact Number</label>
            <input
              type="tel"
              required
              className={styles.input}
              placeholder="+92 300 1234567"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>

          {/* Current Classes List */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Current Classes</label>
            <div className={styles.classesList}>
              {currentClasses.length > 0 ? (
                currentClasses.map((classItem) => (
                  <div key={classItem.class_id} className={styles.classItem}>
                    <span className={styles.className}>
                      {classItem.class_name}{" "}
                      {classItem.section && `- ${classItem.section}`}
                    </span>
                    <button
                      type="button"
                      className={styles.removeClassButton}
                      onClick={() => handleRemoveClass(classItem.class_id)}
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))
              ) : (
                <p className={styles.noClasses}>No classes assigned</p>
              )}
            </div>
          </div>

          {/* Assign New Classes */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Assign New Class</label>
            <div className={styles.addClassSection}>
              <select
                className={styles.select}
                value={newClass}
                onChange={(e) => setNewClass(e.target.value)}
              >
                <option value="">Select Class</option>
                {classData &&
                  classData
                    .filter(
                      (c) =>
                        !currentClasses?.some(
                          (cc) => cc.class_id === c.class_id
                        )
                    )
                    .map((c) => (
                      <option value={c.class_id} key={c.class_id}>
                        {c.class_name} {c.section && `- ${c.section}`}
                      </option>
                    ))}
              </select>
              <button
                type="button"
                className={styles.addClassButton}
                onClick={handleAddClass}
                disabled={!newClass}
              >
                Add Class
              </button>
            </div>
          </div>

          {/* Form Actions */}
          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => setEditTeacher(false)}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Teacher"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTeacherModal;
