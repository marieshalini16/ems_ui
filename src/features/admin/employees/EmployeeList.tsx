import DashboardLayout from "../../../componenets/layout/DashboardLayout";
import { adminSidebarItems } from "../../../componenets/layout/sidebar.config";

import PageHeader from "../../../componenets/common/PageHeader";
import DataTable, {
  type TableColumn,
} from "../../../componenets/common/DataTable";
import Pagination from "../../../componenets/common/Pagination";
import StatusBadge from "../../../componenets/common/StatusBadge";

import EmployeeFilters from "./components/EmployeeFilters";
import EmployeeActions from "./components/EmployeeActions";
import EmployeeForm from "./components/EmployeeForm";

import type {
  Department,
  Employee,
  EmployeeFormData,
} from "./employees.types";

interface EmployeeListProps {
  userName: string;
  employees: Employee[];
  departments: Department[];

  search: string;
  departmentId: string;
  status: string;

  page: number;
  totalPages: number;

  loading: boolean;
  formLoading: boolean;

  showForm: boolean;
  formMode: "create" | "edit";
  selectedEmployee?: Employee;

  onLogout: () => void;

  onAddEmployee: () => void;
  onEditEmployee: (employee: Employee) => void;

  onSearchChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onStatusChange: (value: string) => void;

  onPageChange: (page: number) => void;

  onSubmit: (data: EmployeeFormData) => Promise<void>;  onCloseForm: () => void;

  onToggleStatus: (employee: Employee) => void;
}

export default function EmployeeList({
  userName,
  employees,
  departments,
  search,
  departmentId,
  status,
  page,
  totalPages,
  loading,
  formLoading,
  showForm,
  formMode,
  selectedEmployee,
  onLogout,
  onAddEmployee,
  onEditEmployee,
  onSearchChange,
  onDepartmentChange,
  onStatusChange,
  onPageChange,
  onSubmit,
  onCloseForm,
  onToggleStatus,
}: EmployeeListProps) {
  const columns: TableColumn<Employee>[] = [
    {
      key: "name",
      header: "Name",

      render: (employee) => (
        <div>
          <p className="font-medium text-text-primary">
            {employee.full_name}
          </p>

          <p className="mt-0.5 text-xs text-text-muted">
            @{employee.user_name}
          </p>
        </div>
      ),
    },

    {
      key: "email",
      header: "Email",

      render: (employee) => employee.email,
    },

    {
      key: "department",
      header: "Department",

      render: (employee) =>
        employee.department?.dept_name ?? "-",
    },

    {
      key: "status",
      header: "Status",

      render: (employee) => (
        <StatusBadge
          active={employee.is_active === 1}
        />
      ),
    },

    {
      key: "actions",
      header: "Actions",

      render: (employee) => (
        <EmployeeActions
          employee={employee}
          onEdit={onEditEmployee}
          onToggleStatus={onToggleStatus}
        />
      ),
    },
  ];

  return (
    <DashboardLayout
      sidebarItems={adminSidebarItems}
      activePath="/admin/employees"
      userName={userName}
      roleName="Administrator"
      onLogout={onLogout}
    >
      {/* Middle content only */}

      <div className="min-h-[calc(100vh-4rem)] bg-background px-5 py-6 lg:px-7">

        <PageHeader
          title="Employees"
          actionLabel="Add Employee"
          onAction={onAddEmployee}
        />

        {/* Filters */}

        <EmployeeFilters
          search={search}
          departmentId={departmentId}
          status={status}
          departments={departments}
          onSearchChange={onSearchChange}
          onDepartmentChange={onDepartmentChange}
          onStatusChange={onStatusChange}
        />

        {/* Table */}

        <DataTable
          columns={columns}
          data={employees}
          loading={loading}
          emptyMessage="No employees found."
        />

        {/* Pagination */}

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />

        {/* Add / Edit Form */}

        {showForm && (
          <EmployeeForm
            mode={formMode}
            employee={selectedEmployee}
            departments={departments}
            loading={formLoading}
            onSubmit={onSubmit}
            onClose={onCloseForm}
          />
        )}
      </div>
    </DashboardLayout>
  );
}