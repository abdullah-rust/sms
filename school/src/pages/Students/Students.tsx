import { useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import StudentCard from "../../components/StudentCard/StudentCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import styles from "./Students.module.css";
import { addstudentAtom } from "../../utils/atom";
import { useAtom, useSetAtom } from "jotai";
import {
  StudentsDataAtom,
  errorPopupAtom,
  errorPopupVisible,
} from "../../utils/atom";
import { api } from "../../utils/api";

const Students = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useAtom(StudentsDataAtom || []);
  const setAddstudent = useSetAtom(addstudentAtom);
  const seterrorPopupAtom = useSetAtom(errorPopupAtom);
  const seterrorPopupVisible = useSetAtom(errorPopupVisible);

  const filteredStudents = students?.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.classname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.roll_number.toString().includes(searchTerm)
  );

  const handleDelete = async (roll_number: number, class_id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (!confirmed) return;
    try {
      const res = await api.post("/delete-student", {
        roll_number,
        class_id,
      });
      setStudents(
        students?.filter((student) => student.roll_number !== roll_number)
      );
      seterrorPopupAtom({
        type: "success",
        message: res.data.message || "deleted",
      });
      seterrorPopupVisible(true);
    } catch (e: any) {
      seterrorPopupAtom({
        type: "error",
        message: e.response.data.message || e.response.data.error,
      });
      seterrorPopupVisible(true);
    }
  };

  return (
    <div className={styles.studentsPage}>
      {/* Header Section - Fixed */}
      <div className={styles.header}>
        <h1 className={styles.title}>Students Management</h1>
        <button
          className={styles.addButton}
          onClick={() => setAddstudent(true)}
        >
          <FaPlus className={styles.buttonIcon} />
          Add New Student
        </button>
      </div>

      {/* Search Bar - Fixed */}
      <div className={styles.searchContainer}>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placHolder="Search by student id.."
        />
      </div>

      {/* Students Grid - Scrollable Content */}
      <div className={styles.studentsGrid}>
        {filteredStudents &&
          filteredStudents.map((student) => (
            <StudentCard
              key={student.roll_number}
              student={student}
              onDelete={handleDelete}
            />
          ))}
      </div>

      {/* Empty State */}
      {filteredStudents && filteredStudents.length === 0 && (
        <div className={styles.emptyState}>
          <FaSearch className={styles.emptyIcon} />
          <h3>No students found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default Students;
