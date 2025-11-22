import { useState } from "react";
import { FaPlus, FaSearch, FaSyncAlt } from "react-icons/fa";
import ClassCard from "../../components/ClassCard/ClassCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import styles from "./Classes.module.css";
import { addclassAtom } from "../../utils/atom";
import { useSetAtom, useAtom } from "jotai";
import {
  ClaasesDataAtom,
  trigerAtom,
  errorPopupAtom,
  errorPopupVisible,
} from "../../utils/atom";
import { api } from "../../utils/api";

const Classes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [classes, setClasses] = useAtom(ClaasesDataAtom || []);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const setaddclass = useSetAtom(addclassAtom);
  const setRefresAtom = useSetAtom(trigerAtom);
  const seterrorPopupAtom = useSetAtom(errorPopupAtom);
  const seterrorPopupVisible = useSetAtom(errorPopupVisible);

  const filteredClasses = classes?.filter(
    (classItem) =>
      classItem.class_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.section.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Class?"
    );
    if (!confirmed) return;
    try {
      const res = await api.post("/delete-class", {
        class_id: id,
      });
      setClasses(classes?.filter((classItem) => classItem.class_id !== id));

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

  const handleRefresh = async () => {
    setIsRefreshing(true);
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
