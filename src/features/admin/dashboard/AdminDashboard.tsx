import DashboardLayout from "../../../componenets/layout/DashboardLayout";
import { adminSidebarItems } from "../../../componenets/layout/sidebar.config";
import StatCard from "../../../componenets/dashboard/StatCard";
import type { AdminDashboardData } from "./admin-dashboard.api";
import RecentEmployees from "./RecentEmployees";
import TaskStatistics from "./TaskStatistics";


interface AdminDashboardProps {
  userName: string;
  data: AdminDashboardData;
  onLogout?: () => void;
}

export default function AdminDashboard({
  userName,
  data,
  onLogout,
}: AdminDashboardProps) {
  
  return (
    <DashboardLayout
      sidebarItems={adminSidebarItems}
      activePath="/admin/dashboard"
      userName={userName}
      roleName="Administrator"
      onLogout={onLogout}
    >
      <div className="min-h-[calc(100vh-4rem)] bg-background p-5 lg:p-7">
       
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-text-primary">
            Dashboard
          </h1>

          <p className="mt-1 text-xs text-text-muted">
            Welcome back, {userName}!
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <StatCard
            title="Total Employees"
            value={data.stats.totalEmployees}
            variant="primary"
          />

          <StatCard
            title="Total Departments"
            value={data.stats.totalDepartments}
            variant="success"
          />

          <StatCard
            title="Pending Tasks"
            value={data.stats.pendingTasks}
            variant="warning"
          />

          <StatCard
            title="Completed Tasks"
            value={data.stats.completedTasks}
            variant="purple"
          />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
         
          <RecentEmployees
            employees={data.recentEmployees}
          />

          <TaskStatistics
            statistics={data.taskStatistics}
          />

        </div>
      </div>
    </DashboardLayout>
  );
}
