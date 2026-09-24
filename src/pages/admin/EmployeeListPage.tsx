import { useEffect, useState } from "react";

import EmployeeList from "../../features/admin/employees/EmployeeList";
import { getDepartments } from "../../features/admin/departments/departments.api";
import type {
  Department,
  Employee,
  EmployeeFormData,
} from "../../features/admin/employees/employees.types";

import {
  getEmployees,
  createEmployee,
  updateEmployee,
  updateEmployeeStatus,
} from "../../features/admin/employees/employees.api";

export default function EmployeeListPage() {

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [search, setSearch] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | undefined>();

  // Load Employees

  const loadEmployees = async () => {

    try {
      setLoading(true);

      const response = await getEmployees({
        search: search.trim() || undefined,

        dept_id: departmentId
          ? Number(departmentId)
          : undefined,

        is_active:
          status !== ""
            ? Number(status)
            : undefined,

        page,
        limit: 5,
      });

      setEmployees(response.data);
      setTotalPages(response.totalPages);
    } 
    
    catch (error) {
      console.error(
        "Failed to load employees:",
        error,
      );
    } 
    
    finally {
      setLoading(false);
    }
  };


  const loadDepartments = async () => {
  try {
    const response = await getDepartments({
      page: 1,
      limit: 100,
      is_active: 1,
    });

    setDepartments(response.data);
  } catch (error) {
    console.error(
      "Failed to load departments:",
      error,
    );
  }
};

  useEffect(() => {
    loadEmployees();
  }, [
    search,
    departmentId,
    status,
    page,
  ]);

  useEffect(() => {
    loadDepartments();
  }, []);

  const handleAddEmployee = () => {
    setSelectedEmployee(undefined);
    setFormMode("create");
    setShowForm(true);
  };


  const handleEditEmployee = (
    employee: Employee,
  ) => {
    setSelectedEmployee(employee);
    setFormMode("edit");
    setShowForm(true);
  };



  const handleSubmit = async (
  data: EmployeeFormData,
  ): Promise<void> => {
    setFormLoading(true);

  try {
    if (data.dept_id === "") {
      console.error("Department is required");
      return;
    }

    const employeeData = {
      full_name: data.full_name,
      user_name: data.user_name,
      email: data.email,
      phone: data.phone,
      dept_id: data.dept_id,
      designation: data.designation,
      doj: data.doj,
      ...(data.password
        ? { password: data.password }
        : {}),
    };

    if (formMode === "create") {
      await createEmployee({
        ...employeeData,
        password: data.password,
      });
    } 
    
    else if (selectedEmployee) {
      await updateEmployee(
        selectedEmployee.id,
        employeeData,
      );
    }

    setShowForm(false);
    setSelectedEmployee(undefined);

    await loadEmployees();
  } 
  
  catch (error) {
    console.error("FAILED TO SAVE EMPLOYEE:", error);
  } 
  
  finally {
    setFormLoading(false);
  }
};


  const handleToggleStatus = async (
    employee: Employee,
  ) => {
    try {
      await updateEmployeeStatus(
        employee.id,
        {
          is_active:
            employee.is_active === 1
              ? 0
              : 1,
        },
      );

      await loadEmployees();
    } catch (error) {
      console.error(
        "Failed to update status:",
        error,
      );
    }
  };


  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  };

 
  return (
    <EmployeeList
      userName="Admin"
      employees={employees}
      departments={departments}
      search={search}
      departmentId={departmentId}
      status={status}
      page={page}
      totalPages={totalPages}
      loading={loading}
      formLoading={formLoading}
      showForm={showForm}
      formMode={formMode}
      selectedEmployee={selectedEmployee}
      onLogout={handleLogout}
      onAddEmployee={handleAddEmployee}
      onEditEmployee={handleEditEmployee}

      onSearchChange={(value) => {
        setSearch(value);
        setPage(1);
      }}

      onDepartmentChange={(value) => {
        setDepartmentId(value);
        setPage(1);
      }}

      onStatusChange={(value) => {
        setStatus(value);
        setPage(1);
      }}

      onPageChange={setPage}

      onSubmit={handleSubmit}

      onCloseForm={() => {
        setShowForm(false);
        setSelectedEmployee(undefined);
      }}

      onToggleStatus={handleToggleStatus}
    />
  );
}