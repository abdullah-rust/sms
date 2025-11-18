import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "../AnalyticsChart/AnalyticsChart.module.css";

interface BarChartProps {
  data: any[];
  title: string;
}

const CustomBarChart = ({ data, title }: BarChartProps) => {
  return (
    <div className={styles.chartContainer}>
      <h3 className={styles.chartTitle}>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" stroke="#6c757d" fontSize={12} />
          <YAxis stroke="#6c757d" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e9ecef",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />
          <Legend />
          <Bar
            dataKey="present"
            fill="#28a745"
            radius={[4, 4, 0, 0]}
            name="Present"
          />
          <Bar
            dataKey="absent"
            fill="#dc3545"
            radius={[4, 4, 0, 0]}
            name="Absent"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
