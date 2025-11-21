import { useState } from "react";
import { FaPlus, FaSearch, FaSyncAlt } from "react-icons/fa";
import ClassCard from "../../components/ClassCard/ClassCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import styles from "./Classes.module.css";
import { addclassAtom } from "../../utils/atom";
import { useSetAtom, useAtom } from "jotai";
import { ClaasesDataAtom, trigerAtom } from "../../utils/atom";

const Classes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [classes, setClasses] = useAtom(ClaasesDataAtom || []);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const setaddclass = useSetAtom(addclassAtom);
  const setRefresAtom = useSetAtom(trigerAtom);

  const filteredClasses = classes?.filter(
    (classItem) =>
      classItem.class_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.section.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    setClasses(classes?.filter((classItem) => classItem.class_id !== id));
  };

  const handleEdit = (id: number) => {
    console.log("Edit class:", id);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Yahan aap API call kar sakte hain ya data refresh kar sakte hain
    try {
      setRefresAtom((prev) => prev + 1);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className={styles.classesPage}>
      {/* Header Section */}
      <div className={styles.header}>
        <h1 className={styles.title}>Classes Management</h1>
        <div className={styles.headerButtons}>
          <button
            className={styles.refreshButton}
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <FaSyncAlt
              className={`${styles.refreshIcon} ${
                isRefreshing ? styles.spinning : ""
              }`}
            />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </button>
          <button
            className={styles.addButton}
            onClick={() => setaddclass(true)}
          >
            <FaPlus className={styles.buttonIcon} />
            Add New Class
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placHolder="Search by classes name"
      />

      {/* Classes Grid */}
      <div className={styles.classesGrid}>
        {filteredClasses &&
          filteredClasses.map((classItem) => (
            <ClassCard
              key={classItem.class_id}
              classItem={classItem}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
      </div>

      {/* Empty State */}
      {filteredClasses && filteredClasses.length === 0 && (
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
