import { useEffect, useState } from "react";

import DepartmentList from "../../features/admin/departments/DepartmentList";

import type {
  Department,
  DepartmentFormData,
} from "../../features/admin/departments/departments.types";

import {
  getDepartments,
  createDepartment,
  updateDepartment,
  updateDepartmentStatus,
} from "../../features/admin/departments/departments.api";

export default function DepartmentListPage() {
  const [departments, setDepartments] =
    useState<Department[]>([]);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [selectedDepartment, setSelectedDepartment] = useState<Department | undefined>();

  // Load Departments

  const loadDepartments = async () => {
    try {
      setLoading(true);

      const response = await getDepartments({
        search: search.trim() || undefined,
        page,
        limit: 5,
      });

      setDepartments(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error(
        "Failed to load departments:",
        error,
      );
    } finally {
      setLoading(false);
    }
  };

  // Load when filters/page change

  useEffect(() => {
    loadDepartments();
  }, [search, page]);


  const handleAddDepartment = () => {
    setSelectedDepartment(undefined);
    setFormMode("create");
    setShowForm(true);
  };


  const handleEditDepartment = (
    department: Department,
  ) => {
    setSelectedDepartment(department);
    setFormMode("edit");
    setShowForm(true);
  };

  const handleSubmit = async (
    data: DepartmentFormData,
  ): Promise<void> => {
    setFormLoading(true);

    try {
      if (formMode === "create") {
        await createDepartment({
          dept_name: data.dept_name,
          description: data.description,
        });
      } 
      
      else if (selectedDepartment) {
        await updateDepartment(
          selectedDepartment.id,
          {
            dept_name: data.dept_name,
            description: data.description,
          },
        );
      }

      setShowForm(false);
      setSelectedDepartment(undefined);

      await loadDepartments();
    } 
    
    catch (error) {
      console.error(
        "Failed to save department:",
        error,
      );
    } 
    
    finally {
      setFormLoading(false);
    }
  };


  const handleToggleStatus = async (
    department: Department,
  ) => {
    try {
      await updateDepartmentStatus(
        department.id,
        {
          is_active:
            department.is_active === 1
              ? 0
              : 1,
        },
      );

      await loadDepartments();
    } catch (error) {
      console.error(
        "Failed to update department status:",
        error,
      );
    }
  };


  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  };


  return (
    <DepartmentList
      userName="Admin"
      departments={departments}
      search={search}
      page={page}
      totalPages={totalPages}
      loading={loading}
      formLoading={formLoading}
      showForm={showForm}
      formMode={formMode}
      selectedDepartment={selectedDepartment}
      onLogout={handleLogout}
      onAddDepartment={handleAddDepartment}
      onEditDepartment={handleEditDepartment}
      onSearchChange={(value) => {
        setSearch(value);
        setPage(1);
      }}

      onPageChange={setPage}
      onSubmit={handleSubmit}

      onCloseForm={() => {
        setShowForm(false);
        setSelectedDepartment(undefined);
      }}

      onToggleStatus={handleToggleStatus}
    />
  );
}