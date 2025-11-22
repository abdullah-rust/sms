import { useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import styles from "./Teachers.module.css";
import {
  addteacherAtom,
  TeachersDataAtom,
  errorPopupAtom,
  errorPopupVisible,
} from "../../utils/atom";
import { useAtom, useSetAtom } from "jotai";
import { api } from "../../utils/api";

const Teachers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [teachers, setTeachers] = useAtom(TeachersDataAtom || []);
  const setaddteacher = useSetAtom(addteacherAtom);
  const seterrorPopupAtom = useSetAtom(errorPopupAtom);
  const seterrorPopupVisible = useSetAtom(errorPopupVisible);
  const filteredTeachers = teachers?.filter(
    (teacher) =>
      teacher.teacher_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.classes.some((cls) =>
        `${cls.class_name} ${cls.section}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
  );

  const handleDelete = async (employee_id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Teacher?"
    );
    if (!confirmed) return;
    try {
      const res = await api.post("/delete-teacher", {
        employee_id,
      });
      setTeachers(
        teachers?.filter((teacher) => teacher.employee_id !== employee_id)
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
    <div className={styles.teachersPage}>
      {/* Header Section */}
      <div className={styles.header}>
        <h1 className={styles.title}>Teachers Management</h1>
        <button
          className={styles.addButton}
          onClick={() => setaddteacher(true)}
        >
          <FaPlus className={styles.buttonIcon} />
          Add New Teacher
        </button>
      </div>

      {/* Search Bar */}
      <div className={styles.searchContainer}>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placHolder="Search by teachers name"
        />
      </div>

      {/* Teachers Grid */}
      <div className={styles.teachersGrid}>
        {filteredTeachers &&
          filteredTeachers.map((teacher) => (
            <TeacherCard
              key={teacher.employee_id}
              teacher={teacher}
              onDelete={handleDelete}
            />
          ))}
      </div>

      {/* Empty State */}
      {filteredTeachers && filteredTeachers.length === 0 && (
        <div className={styles.emptyState}>
          <FaSearch className={styles.emptyIcon} />
          <h3>No teachers found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default Teachers;
