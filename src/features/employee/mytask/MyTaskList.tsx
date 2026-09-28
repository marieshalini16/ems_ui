import DashboardLayout from "../../../componenets/layout/DashboardLayout";
import { employeeSidebarItems} from "../../../componenets/layout/sidebar.config";
import PageHeader from "../../../componenets/common/PageHeader";
import DataTable, { type TableColumn } from "../../../componenets/common/DataTable";
import type { MyTask} from "./mytask.types";

interface MyTaskListProps {
  userName: string;
  tasks: MyTask[];
  loading: boolean;
  onUpdateTask: ( task: MyTask) => void;
  onLogout: () => void;
}

export default function MyTaskList({
  userName,
  tasks,
  loading,
  onUpdateTask,
  onLogout,
}: MyTaskListProps) {

  const columns: TableColumn<MyTask>[] = [
 
    {
      key: "title",
      header: "Task",

      render: (task) => (
        <div>
          <p className=" font-medium text-text-primary ">
            {task.title}
          </p>
        </div>
      ),
    },

    {
      key: "priority",
      header: "Priority",

      render: (task) => {
        
        const priorityName = task.priority?.priority_name ?? "-";
        const normalizedPriority = priorityName.toLowerCase();

        let priorityClass = "bg-gray-100 text-gray-700";

        if (normalizedPriority === "high" ) {
          priorityClass = "bg-danger-50 text-danger-700";
        } 
        
        else if (normalizedPriority === "medium") {
          priorityClass = "bg-warning-50 text-warning-700";
        } 
        
        else if (normalizedPriority === "low") {
          priorityClass = "bg-success-50 text-success-700";
        }

        return (
          <span
            className={` inline-flex rounded-full px-2.5 py-1 text-xs font-medium
              ${priorityClass}
            `}
          >
            {priorityName}
          </span>
        );
      },
    },

    {
      key: "status",
      header: "Status",

      render: (task) => {

        const statusName = task.status?.status_name ?? "-";
        const normalizedStatus = statusName.toLowerCase();

        let statusClass = "bg-gray-100 text-gray-700";

        if (normalizedStatus.includes("completed") || normalizedStatus.includes("complete")) {
          statusClass = "bg-success-50 text-success-700";
        } 
        
        else if (normalizedStatus.includes("pending")) {
          statusClass = "bg-warning-50 text-warning-700";
        } 
        
        else if (normalizedStatus.includes("progress")) {
          statusClass = "bg-info-50 text-info-700";
        }

        return (
          <span className={` inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusClass} `} >
            {statusName}
          </span>
        );
      },
    },

    {
      key: "dueDate",
      header: "Due Date",

      render: (task) => {
        if (!task.due_date) {
          return "-";
        }

        const date = task.due_date.split("T")[0];

        return new Date(`${date}T00:00:00`).toLocaleDateString();
      },
    },

    {
      key: "actions",
      header: "Action",

      render: (task) => (
        <button
          type="button"
          onClick={() =>onUpdateTask(task)}
          className=" rounded-md px-3 py-1.5 text-xs font-medium text-primary-600 transition hover:bg-primary-50 "
        >
          Update
        </button>
      ),
    },
  ];

  return (
    <DashboardLayout
      sidebarItems={employeeSidebarItems}
      activePath="/employee/my-tasks"
      userName={userName}
      roleName="Employee"
      onLogout={onLogout}
    >
      <div className=" min-h-[calc(100vh-4rem)] bg-background px-5 py-6 lg:px-7 " >
        <PageHeader
          title="My Tasks"
        />

        <DataTable
          columns={columns}
          data={tasks}
          loading={loading}
          emptyMessage="No tasks assigned to you."
        />
      </div>
    </DashboardLayout>
  );
}