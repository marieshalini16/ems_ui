import DashboardLayout from "../../../componenets/layout/DashboardLayout";
import { employeeSidebarItems } from "../../../componenets/layout/sidebar.config";
import Card from "../../../componenets/ui/Card";
import StatCard from "../../../componenets/dashboard/StatCard";
import StatusBadge from "../../../componenets/dashboard/StatusBadge";
import DataTable, { type TableColumn } from "../../../componenets/dashboard/DataTable";
import type { EmployeeDashboardData, EmployeeTask } from "./employee-dashboard.api";


interface EmployeeDashboardProps {
  userName: string;
  data: EmployeeDashboardData;
  onLogout?: () => void;
}

export default function EmployeeDashboard({
  userName,
  data,
  onLogout,
}: EmployeeDashboardProps) {
  return (
    <DashboardLayout
      sidebarItems={employeeSidebarItems}
      activePath="/employee/dashboard"
      userName={userName}
      roleName="Employee"
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

          <StatCard
            title="My Tasks"
            value={data.stats.myTasks}
            variant="primary"
          />

          <StatCard
            title="Completed Tasks"
            value={data.stats.completedTasks}
            variant="success"
          />

          <StatCard
            title="Announcements"
            value={data.stats.announcements}
            variant="purple"
          />

        </div>

        <div className="mt-5">
          <MyTasks tasks={data.tasks} />
        </div>

      </div>
    </DashboardLayout>
  );
}


// --------------------------------------------------
// My Tasks
// --------------------------------------------------

interface MyTasksProps {
  tasks: EmployeeTask[];
}

function MyTasks({ tasks }: MyTasksProps) {
  const columns: TableColumn<EmployeeTask>[] = [
    {
      key: "title",
      header: "Title",

      render: (task) => (
        <span className="font-medium text-text-primary">
          {task.title}
        </span>
      ),
    },

    {
      key: "priority",
      header: "Priority",

      render: (task) => (
        <StatusBadge
          label={task.priority}
          variant={getPriorityVariant(task.priority)}
        />
      ),
    },

    {
      key: "dueDate",
      header: "Due Date",

      render: (task) => (
        <span className="text-text-secondary">
          {formatDate(task.dueDate)}
        </span>
      ),
    },

    {
      key: "status",
      header: "Status",

      render: (task) => (
        <StatusBadge
          label={task.status}
          variant={getStatusVariant(task.status)}
        />
      ),
    },
  ];

  return (
    <Card className="overflow-hidden p-0">

      <div className="flex items-center justify-between border-b border-border-light px-5 py-4">

        <div>
          <h2 className="text-sm font-semibold text-text-primary">
            My Tasks
          </h2>

          <p className="mt-1 text-xs text-text-muted">
            Tasks assigned to you
          </p>
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
        data={tasks}
        emptyMessage="No tasks assigned to you"
      />

    </Card>
  );
}

// Priority

function getPriorityVariant(priority: string)
: "success" | "warning" | "danger" | "info" | "neutral" {

  switch (priority.toLowerCase()) {

    case "high":
      return "danger";

    case "medium":
      return "warning";

    case "low":
      return "success";

    default:
      return "neutral";
  }
}


// Status

function getStatusVariant(
  status: string,
): "success" | "warning" | "danger" | "info" | "neutral" {
  switch (status.toLowerCase()) {
    case "completed":
      return "success";

    case "pending":
      return "warning";

    case "in progress":
    case "in-progress":
      return "info";

    case "cancelled":
    case "canceled":
      return "danger";

    default:
      return "neutral";
  }
}

// Date

function formatDate(date: string | null) {
  if (!date) {
    return "N/A";
  }

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}