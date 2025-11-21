import { FaUserGraduate, FaChalkboardTeacher, FaUsers } from "react-icons/fa";
import Card from "../../components/Card/Card";
import AnalyticsChart from "../../components/AnalyticsChart/AnalyticsChart";
import CustomBarChart from "../../components/BarChart/BarChart";
import CustomPieChart from "../../components/PieChart/PieChart";
import styles from "./Dashboard.module.css";
import {
  TeachersDataAtom,
  StudentsDataAtom,
  ClaasesDataAtom,
} from "../../utils/atom";
import { useAtomValue } from "jotai";

const Dashboard = () => {
  const TeachersCount = useAtomValue(TeachersDataAtom);
  const StudentsCount = useAtomValue(StudentsDataAtom);
  const ClassesCount = useAtomValue(ClaasesDataAtom);

  // Sample data for charts
  const studentData = [
    { name: "Jan", students: 1000, teachers: 40 },
    { name: "Feb", students: 1050, teachers: 42 },
    { name: "Mar", students: 1100, teachers: 43 },
    { name: "Apr", students: 1150, teachers: 44 },
    { name: "May", students: 1200, teachers: 45 },
    { name: "Jun", students: 1250, teachers: 48 },
  ];

  const attendanceData = [
    { name: "Mon", present: 1200, absent: 50 },
    { name: "Tue", present: 1180, absent: 70 },
    { name: "Wed", present: 1220, absent: 30 },
    { name: "Thu", present: 1190, absent: 60 },
    { name: "Fri", present: 1210, absent: 40 },
  ];

  const classDistribution = [
    { name: "Grade 1", value: 200 },
    { name: "Grade 2", value: 180 },
    { name: "Grade 3", value: 220 },
    { name: "Grade 4", value: 190 },
    { name: "Grade 5", value: 210 },
  ];

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className={styles.cardsGrid}>
        <Card
          icon={FaUserGraduate}
          title="Total Students"
          value={StudentsCount?.length || 0}
          badgeType="success"
        />
        <Card
          icon={FaChalkboardTeacher}
          title="Total Teachers"
          value={TeachersCount?.length || 0}
          badgeType="info"
        />
        <Card
          icon={FaUsers}
          title="Total Classes"
          value={ClassesCount?.length || 0}
          badge="All active"
          badgeType="success"
        />
      </div>

      {/* Analytics Charts */}
      <div className={styles.analyticsSection}>
        <h2 className={styles.sectionTitle}>Analytics</h2>

        <div className={styles.chartsGrid}>
          <AnalyticsChart data={studentData} title="Student & Teacher Growth" />

          <CustomBarChart data={attendanceData} title="Weekly Attendance" />

          <div className={styles.fullWidth}>
            <CustomPieChart
              data={classDistribution}
              title="Class Distribution"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
