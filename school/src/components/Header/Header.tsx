import {
  FaTachometerAlt,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUsers,
} from "react-icons/fa";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleNavigation = (section: string) => {
    navigate(section);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h2>School Management</h2>
      </div>
      <nav className={styles.nav}>
        <button
          className={styles.navButton}
          onClick={() => handleNavigation("/")}
        >
          <FaTachometerAlt className={styles.icon} />
          <span>Dashboard</span>
        </button>
        <button
          className={styles.navButton}
          onClick={() => handleNavigation("students")}
        >
          <FaUserGraduate className={styles.icon} />
          <span>Students</span>
        </button>
        <button
          className={styles.navButton}
          onClick={() => handleNavigation("teachers")}
        >
          <FaChalkboardTeacher className={styles.icon} />
          <span>Teachers</span>
        </button>
        <button
          className={styles.navButton}
          onClick={() => handleNavigation("classes")}
        >
          <FaUsers className={styles.icon} />
          <span>Classes</span>
        </button>
      </nav>
    </header>
  );
};

export default Header;
