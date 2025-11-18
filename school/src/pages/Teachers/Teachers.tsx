import { useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import { mockTeachers } from "./mockData";
import styles from "./Teachers.module.css";
import { addteacherAtom } from "../../utils/atom";
import { useSetAtom } from "jotai";

const Teachers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [teachers, setTeachers] = useState(mockTeachers);
  const setaddteacher = useSetAtom(addteacherAtom);

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.className?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (employee_id: number) => {
    setTeachers(
      teachers.filter((teacher) => teacher.employee_id !== employee_id)
    );
  };

  const handleEdit = (employee_id: number) => {
    console.log("Edit teacher:", employee_id);
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
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {/* Teachers Grid */}
      <div className={styles.teachersGrid}>
        {filteredTeachers.map((teacher) => (
          <TeacherCard
            key={teacher.employee_id}
            teacher={teacher}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredTeachers.length === 0 && (
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
