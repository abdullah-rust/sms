import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./AnalyticsChart.module.css";

interface AnalyticsChartProps {
  data: any[];
  title: string;
}

const AnalyticsChart = ({ data, title }: AnalyticsChartProps) => {
  return (
    <div className={styles.chartContainer}>
      <h3 className={styles.chartTitle}>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
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
          <Line
            type="monotone"
            dataKey="students"
            stroke="#667eea"
            strokeWidth={3}
            dot={{ fill: "#667eea", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: "#764ba2" }}
          />
          <Line
            type="monotone"
            dataKey="teachers"
            stroke="#28a745"
            strokeWidth={3}
            dot={{ fill: "#28a745", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: "#20c997" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;
