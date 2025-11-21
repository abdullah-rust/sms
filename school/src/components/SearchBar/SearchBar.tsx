import { FaSearch } from "react-icons/fa";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  placHolder: string;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const SearchBar = ({
  searchTerm,
  onSearchChange,
  placHolder,
}: SearchBarProps) => {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBox}>
        <FaSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder={placHolder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className={styles.searchInput}
        />
      </div>
    </div>
  );
};

export default SearchBar;
