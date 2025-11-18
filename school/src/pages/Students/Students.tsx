import { useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import StudentCard from "../../components/StudentCard/StudentCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import { mockStudents } from "./mockData";
import styles from "./Students.module.css";
import { addstudentAtom } from "../../utils/atom";
import { useSetAtom } from "jotai";

const Students = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState(mockStudents);
  const setAddstudent = useSetAtom(addstudentAtom);

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.className?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.roll_number.toString().includes(searchTerm)
  );

  const handleDelete = (roll_number: number) => {
    setStudents(
      students.filter((student) => student.roll_number !== roll_number)
    );
  };

  const handleEdit = (roll_number: number) => {
    console.log("Edit student:", roll_number);
    // Edit logic here
  };

  return (
    <div className={styles.studentsPage}>
      {/* Header Section */}
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

      {/* Search Bar */}
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {/* Students Grid */}
      <div className={styles.studentsGrid}>
        {filteredStudents.map((student) => (
          <StudentCard
            key={student.roll_number}
            student={student}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredStudents.length === 0 && (
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
