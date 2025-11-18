import { useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import ClassCard from "../../components/ClassCard/ClassCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import styles from "./Classes.module.css";
import { addclassAtom } from "../../utils/atom";
import { useAtomValue, useSetAtom } from "jotai";
import { ClaasesDataAtom } from "../../utils/atom";

const Classes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const classesData = useAtomValue(ClaasesDataAtom);
  const [classes, setClasses] = useState(classesData || []);
  const setaddclass = useSetAtom(addclassAtom);

  const filteredClasses = classes.filter(
    (classItem) =>
      classItem.class_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.section.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    setClasses(classes.filter((classItem) => classItem.class_id !== id));
  };

  const handleEdit = (id: number) => {
    console.log("Edit class:", id);
  };

  return (
    <div className={styles.classesPage}>
      {/* Header Section */}
      <div className={styles.header}>
        <h1 className={styles.title}>Classes Management</h1>
        <button className={styles.addButton} onClick={() => setaddclass(true)}>
          <FaPlus className={styles.buttonIcon} />
          Add New Class
        </button>
      </div>

      {/* Search Bar */}
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {/* Classes Grid */}
      <div className={styles.classesGrid}>
        {filteredClasses.map((classItem) => (
          <ClassCard
            key={classItem.class_id}
            classItem={classItem}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredClasses.length === 0 && (
        <div className={styles.emptyState}>
          <FaSearch className={styles.emptyIcon} />
          <h3>No classes found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default Classes;
