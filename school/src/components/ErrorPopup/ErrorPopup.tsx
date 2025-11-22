import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaTimesCircle,
  FaTimes,
} from "react-icons/fa";
import styles from "./ErrorPopup.module.css";
import { errorPopupAtom, errorPopupVisible } from "../../utils/atom";
import { useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";

const ErrorPopup = () => {
  const [errorValue, _] = useAtom(errorPopupAtom);
  const setErrorPopupVisible = useSetAtom(errorPopupVisible);

  const onClose = () => {
    setErrorPopupVisible(false);
  };
  useEffect(() => {
    if (!errorValue) return;

    const timer = setTimeout(() => {
      setErrorPopupVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [errorValue]);

  if (!errorValue) return null;

  const getIcon = () => {
    switch (errorValue.type) {
      case "success":
        return <FaCheckCircle className={styles.icon} />;
      case "warning":
        return <FaExclamationTriangle className={styles.icon} />;
      case "info":
        return <FaInfoCircle className={styles.icon} />;
      default:
        return <FaTimesCircle className={styles.icon} />;
    }
  };

  const getTitle = () => {
    switch (errorValue.type) {
      case "success":
        return "Success!";
      case "warning":
        return "Warning!";
      case "info":
        return "Information";
      default:
        return "Error!";
    }
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={`${styles.popup} ${styles[errorValue.type]}`}>
        <div className={styles.popupHeader}>
          <div className={styles.iconContainer}>{getIcon()}</div>
          <h3 className={styles.title}>{getTitle()}</h3>
          <button className={styles.closeButton} onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div className={styles.popupBody}>
          <p className={styles.message}>{errorValue.message}</p>
        </div>
        <div className={styles.popupFooter}>
          <button className={styles.okButton} onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPopup;
