import {
  FaSchool,
  FaBook,
  FaGraduationCap,
  FaPen,
  FaChalkboardTeacher,
} from "react-icons/fa";
import styles from "./LoadingPage.module.css";

const LoadingPage = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingContent}>
        {/* Animated Logo */}
        <div className={styles.logo}>
          <FaSchool className={styles.logoIcon} />
          <h1 className={styles.logoText}>School Management</h1>
        </div>

        {/* Animated Spinner */}
        <div className={styles.spinnerContainer}>
          <div className={styles.spinner}></div>
          <div className={styles.spinnerRing}></div>
        </div>

        {/* Loading Text */}
        <div className={styles.loadingText}>
          <h2 className={styles.loadingTitle}>Loading...</h2>
          <p className={styles.loadingSubtitle}>
            Please wait while we prepare your dashboard
          </p>
        </div>

        {/* Progress Bar */}
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill}></div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className={styles.floatingElements}>
          <div className={styles.floatingElement1}>
            <FaBook />
          </div>
          <div className={styles.floatingElement2}>
            <FaPen />
          </div>
          <div className={styles.floatingElement3}>
            <FaGraduationCap />
          </div>
          <div className={styles.floatingElement4}>
            <FaChalkboardTeacher />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
