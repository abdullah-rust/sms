import type { IconType } from "react-icons";
import styles from "./Card.module.css";

interface CardProps {
  icon: IconType;
  title: string;
  value: string | number;
  subtitle?: string;
  badge?: string;
  badgeType?: "success" | "warning" | "danger" | "info";
}

const Card = ({
  icon: Icon,
  title,
  value,
  subtitle,
  badge,
  badgeType = "info",
}: CardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.iconContainer}>
          <Icon className={styles.icon} />
        </div>
        <div className={styles.cardContent}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.value}>{value}</p>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          {badge && (
            <span className={`${styles.badge} ${styles[badgeType]}`}>
              {badge}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
