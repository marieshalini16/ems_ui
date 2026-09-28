import DashboardLayout from "../../../componenets/layout/DashboardLayout";
import { adminSidebarItems } from "../../../componenets/layout/sidebar.config";
import PageHeader from "../../../componenets/common/PageHeader";
import DataTable, { type TableColumn, } from "../../../componenets/common/DataTable";
import Pagination from "../../../componenets/common/Pagination";
import TaskFilters from "./components/TaskFilters";
import TaskActions from "./components/TaskActions";
import TaskForm from "./components/TaskForm";
import type { Task, TaskEmployee, TaskFormData, TaskPriority, TaskStatus, } from "./tasks.types";

interface TaskListProps {
  userName: string;
  tasks: Task[];
  employees: TaskEmployee[];
  priorities: TaskPriority[];
  statuses: TaskStatus[];
  search: string;
  priorityId: string;
  statusId: string;
  assignTo: string;
  page: number;
  totalPages: number;
  loading: boolean;
  formLoading: boolean;
  showForm: boolean;
  formMode: "create" | "edit";
  selectedTask?: Task;

  onLogout: () => void;
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
  onSearchChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onAssignToChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onSubmit: ( data: TaskFormData, ) => Promise<void>;
  onCloseForm: () => void;
}


export default function TaskList({
  userName,
  tasks,
  employees,
  priorities,
  statuses,
  search,
  statusId,
  page,
  totalPages,
  loading,
  formLoading,
  showForm,
  formMode,
  selectedTask,

  onLogout,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onSearchChange,
  onStatusChange,
  onPageChange,
  onSubmit,
  onCloseForm,
}: TaskListProps) {


  const columns: TableColumn<Task>[] = [
    {
      key: "title",
      header: "Task",

      render: (task) => (
        <div>
          <p className="font-medium text-text-primary">
            {task.title}
          </p>

        </div>
      ),
    },


    {
      key: "assignedTo",
      header: "Assigned To",

      render: (task) =>
        task.assigned_employee?.full_name ?? "-",
    },


    {
      key: "priority",
      header: "Priority",

      render: (task) => {
        const priorityName = task.priority?.priority_name ?? "-";
        const normalizedPriority = priorityName.toLowerCase();

        let priorityClass = "bg-gray-100 text-gray-700";

        if (normalizedPriority === "high") {
          priorityClass = "bg-danger-50 text-danger-700";
        } 
        
        else if (normalizedPriority === "medium") {
          priorityClass = "bg-warning-50 text-warning-700";
        } 
        
        else if (normalizedPriority === "low") {
          priorityClass = "bg-success-50 text-success-700";
        }

        return (
          <span className={` inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${priorityClass} `}
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

    if ( normalizedStatus.includes("completed") || normalizedStatus.includes("complete") ) {
      statusClass = "bg-success-50 text-success-700";
    } 
    
    else if ( normalizedStatus.includes("pending") ) {
      statusClass = "bg-warning-50 text-warning-700";
    } 
    
    else if ( normalizedStatus.includes("progress") ) {
      statusClass = "bg-info-50 text-info-700";
    }

    return (
      <span className={` inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusClass} `}
      >
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
        return new Date( `${date}T00:00:00`, ).toLocaleDateString();
      },
    },


    {
      key: "actions",
      header: "Actions",

      render: (task) => (
        <TaskActions
          task={task}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
        />
      ),
    },
  ];


  return (
    <DashboardLayout
      sidebarItems={adminSidebarItems}
      activePath="/admin/tasks"
      userName={userName}
      roleName="Administrator"
      onLogout={onLogout}
    >

      <div className=" min-h-[calc(100vh-4rem)] bg-background px-5 py-6 lg:px-7 " >

        <PageHeader
          title="Tasks"
          actionLabel="Add Task"
          onAction={onAddTask}
        />


        <TaskFilters
          search={search}
          statusId={statusId}
          statuses={statuses}
          onSearchChange={onSearchChange}
          onStatusChange={onStatusChange}
        />


        <DataTable
          columns={columns}
          data={tasks}
          loading={loading}
          emptyMessage="No tasks found."
        />


        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />


        {showForm && (
          <TaskForm
            mode={formMode}
            task={selectedTask}
            employees={employees}
            priorities={priorities}
            statuses={statuses}
            loading={formLoading}
            onSubmit={onSubmit}
            onClose={onCloseForm}
          />
        )}

      </div>

    </DashboardLayout>
  );
}