import {PieChart, Pie, ResponsiveContainer } from "recharts";
import type { AdminDashboardData } from "./admin-dashboard.api";

  const getColor = (variant: string) => {
    switch (variant) {
      case "warning":
        return "#f59e0b";

      case "info":
        return "#3b82f6";

      case "success":
        return "#22c55e";

      default:
        return "#94a3b8";
    }
  };
  
export default function TaskDonut({ statistics }: {

  statistics: AdminDashboardData["taskStatistics"];
}) {
  
  const chartData = statistics.map((item) => ({
    name: item.status,
    value: item.count,
    fill: getColor(item.variant),
  }));



  return (
    <div className="h-36 w-36 shrink-0">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={38}
            outerRadius={58}
            paddingAngle={2}
            stroke="none"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
