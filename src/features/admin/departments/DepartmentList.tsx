import DashboardLayout from "../../../componenets/layout/DashboardLayout";
import { adminSidebarItems } from "../../../componenets/layout/sidebar.config";

import PageHeader from "../../../componenets/common/PageHeader";
import DataTable, {
  type TableColumn,
} from "../../../componenets/common/DataTable";
import Pagination from "../../../componenets/common/Pagination";
import StatusBadge from "../../../componenets/common/StatusBadge";

import DepartmentFilters from "./components/DepartmentFilters";
import DepartmentActions from "./components/DepartmentActions";
import DepartmentForm from "./components/DepartmentForm";

import type {
  Department,
  DepartmentFormData,
} from "./departments.types";

interface DepartmentListProps {
  userName: string;

  departments: Department[];

  search: string;

  page: number;
  totalPages: number;

  loading: boolean;
  formLoading: boolean;

  showForm: boolean;
  formMode: "create" | "edit";

  selectedDepartment?: Department;

  onLogout: () => void;

  onAddDepartment: () => void;
  onEditDepartment: (
    department: Department,
  ) => void;

  onSearchChange: (value: string) => void;

  onPageChange: (page: number) => void;

  onSubmit: (
    data: DepartmentFormData,
  ) => Promise<void>;

  onCloseForm: () => void;

  onToggleStatus: (
    department: Department,
  ) => void;
}

export default function DepartmentList({
  userName,
  departments,
  search,
  page,
  totalPages,
  loading,
  formLoading,
  showForm,
  formMode,
  selectedDepartment,
  onLogout,
  onAddDepartment,
  onEditDepartment,
  onSearchChange,
  onPageChange,
  onSubmit,
  onCloseForm,
  onToggleStatus,
}: DepartmentListProps) {
  const columns: TableColumn<Department>[] = [
    {
      key: "name",
      header: "Name",

      render: (department) => (
        <p className="font-medium text-text-primary">
          {department.dept_name}
        </p>
      ),
    },

    {
      key: "description",
      header: "Description",

      render: (department) =>
        department.description ?? "-",
    },

    {
      key: "employees",
      header: "Employees",

      render: (department) => (
        <span className="font-medium text-text-primary">
          {department.employee_count}
        </span>
      ),
    },

    {
      key: "status",
      header: "Status",

      render: (department) => (
        <StatusBadge
          active={department.is_active === 1}
        />
      ),
    },

    {
      key: "actions",
      header: "Actions",

      render: (department) => (
        <DepartmentActions
          department={department}
          onEdit={onEditDepartment}
          onToggleStatus={onToggleStatus}
        />
      ),
    },
  ];

  return (
    <DashboardLayout
      sidebarItems={adminSidebarItems}
      activePath="/admin/departments"
      userName={userName}
      roleName="Administrator"
      onLogout={onLogout}
    >
      <div className="min-h-[calc(100vh-4rem)] bg-background px-5 py-6 lg:px-7">

        <PageHeader
          title="Departments"
          actionLabel="Add Department"
          onAction={onAddDepartment}
        />

        <DepartmentFilters
          search={search}
          onSearchChange={onSearchChange}
        />

        <DataTable
          columns={columns}
          data={departments}
          loading={loading}
          emptyMessage="No departments found."
        />

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />

        {showForm && (
          <DepartmentForm
            mode={formMode}
            department={selectedDepartment}
            loading={formLoading}
            onSubmit={onSubmit}
            onClose={onCloseForm}
          />
        )}
      </div>
    </DashboardLayout>
  );
}