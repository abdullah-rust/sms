import styles from "./AddClassModal.module.css";
import { addclassAtom, ClaasesDataAtom } from "../../utils/atom";
import { useSetAtom } from "jotai";
import type React from "react";
import { api } from "../../utils/api";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";

const AddClassModal = () => {
  const setaddclass = useSetAtom(addclassAtom);
  const setClassData = useSetAtom(ClaasesDataAtom);
  const [class_name, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.post("/add-class", {
        class_name,
        section,
      });
      console.log(res.data.data);
      setClassData((prev) => [...(prev || []), res.data.data]);
      setaddclass(false); // Success hone pe modal close karo
    } catch (e: any) {
      console.log(e);
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
            <div className={styles.headerIcon}>🏫</div>
            <h2 className={styles.modalTitle}>Add New Class</h2>
          </div>
          <button
            className={styles.closeButton}
            onClick={() => setaddclass(false)}
            disabled={isLoading}
          >
            ×
          </button>
        </div>

        {/* Modal Body */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Class Name</label>
            <select
              className={styles.select}
              value={class_name}
              onChange={(e) => setClassName(e.target.value)}
              disabled={isLoading}
              required
            >
              <option value="">Select Class</option>
              <option value="6th">Class 6th</option>
              <option value="7th">Class 7th</option>
              <option value="8th">Class 8th</option>
              <option value="9th">Class 9th</option>
              <option value="10th">Class 10th</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Section</label>
            <select
              className={styles.select}
              value={section}
              onChange={(e) => setSection(e.target.value)}
              disabled={isLoading}
              required
            >
              <option value="">Select Section</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
              <option value="D">Section D</option>
              <option value="E">Section E</option>
            </select>
          </div>

          {/* Form Actions */}
          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => setaddclass(false)}
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
                "Add Class"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClassModal;
