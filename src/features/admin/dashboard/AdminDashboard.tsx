import DashboardLayout from "../../../componenets/layout/DashboardLayout";
import { adminSidebarItems } from "../../../componenets/layout/Sidebar";
import Card from "../../../componenets/ui/Card";
import StatCard from "../../../componenets/dashboard/StatCard";
import StatusBadge from "../../../componenets/dashboard/StatusBadge";
import DataTable, {type TableColumn } from "../../../componenets/dashboard/DataTable";
import type { AdminDashboardData, RecentEmployee } from "./admin-dashboard.api";

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

//Recent Employees

interface RecentEmployeesProps {
  employees: RecentEmployee[];
}

function RecentEmployees({ employees }: RecentEmployeesProps) {
  const columns: TableColumn<RecentEmployee>[] = [
    {
      key: "name",
      header: "Name",

      render: (employee) => (
        <span className="font-medium text-text-primary">
          {employee.name}
        </span>
      ),
    },

    {
      key: "department",
      header: "Department",

      render: (employee) => (
        <span>
          {employee.department}
        </span>
      ),
    },

    {
      key: "status",
      header: "Status",

      render: (employee) => (
        <StatusBadge
          label={employee.status}
          variant={ employee.status === "Active" ? "success" : "danger" }
        />
      ),
    },
  ];

  return (
    <Card className="overflow-hidden p-0">
      <div className="flex items-center justify-between border-b border-border-light px-5 py-4">
        <div>
          <h2 className="text-sm font-semibold text-text-primary">
            Recent Employees
          </h2>
        </div>

        <button
          type="button"
          className="text-xs font-medium text-primary-600 transition duration-fast hover:text-primary-700"
        >
          View all
        </button>
      </div>

      <DataTable
        columns={columns}
        data={employees}
        emptyMessage="No recent employees"
      />
    </Card>
  );
}

//Task Statistics

function TaskStatistics({ statistics }: { statistics: AdminDashboardData["taskStatistics"];}) 
{
  const total = statistics.reduce((sum, item) => 
    sum + item.count,
    0,
  );

  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b border-border-light px-5 py-4">
        <h2 className="text-sm font-semibold text-text-primary">
          Task Statistics
        </h2>
      </div>

      <div className="flex min-h-[230px] items-center gap-8 p-6">
        <TaskDonut
          statistics={statistics}
          total={total}
        />

        <div className="flex-1 space-y-4">
          {statistics.map((item) => (
            <div
              key={item.status}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    item.variant === "warning"
                      ? "bg-warning-500"
                      : item.variant === "info"
                        ? "bg-info-500"
                        : "bg-success-500"
                  }`}
                />

                <span className="text-xs text-text-secondary">
                  {item.status}
                </span>
              </div>

              <span className="text-xs font-semibold text-text-primary">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

//Task Donut

function TaskDonut({ statistics, total }: {
  statistics: AdminDashboardData["taskStatistics"];
  total: number;
}) {
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  let accumulated = 0;

  return (
    <div className="relative h-36 w-36 shrink-0">
      <svg
        viewBox="0 0 120 120"
        className="h-full w-full -rotate-90"
      >
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          className="stroke-navy-100"
          strokeWidth="16"
        />

        {statistics.map((item) => {

          const percentage = total === 0 ? 0 : item.count / total;
          const segment = percentage * circumference;
          const offset = -accumulated;
          accumulated += segment;

          const strokeClass =
            item.variant === "warning"
              ? "stroke-warning-500"
              : item.variant === "info"
                ? "stroke-info-500"
                : "stroke-success-500";

          return (
            <circle
              key={item.status}
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              className={strokeClass}
              strokeWidth="20"
              strokeDasharray={`${segment} ${circumference}`}
              strokeDashoffset={offset}
            />
          );
        })}
      </svg>
    </div>
  );
}