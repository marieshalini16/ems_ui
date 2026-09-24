import { apiClient } from "../../../api/client";

import type { CreateDepartmentRequest, Department, DepartmentListResponse, DepartmentQuery, DepartmentStatusRequest, UpdateDepartmentRequest } from "./departments.types";

export async function getDepartments(
  query: DepartmentQuery = {},
): Promise<DepartmentListResponse> {
    
  const params = new URLSearchParams();

  if (query.search) {
    params.append("search", query.search);
  }

  if (query.page) {
    params.append("page", String(query.page));
  }

  if (query.limit) {
    params.append("limit", String(query.limit));
  }

  if (query.is_active !== undefined) {
    params.append("is_active", String(query.is_active));
  }

  const queryString = params.toString();

  return apiClient<DepartmentListResponse>(
    `/departments${queryString ? `?${queryString}` : ""}`,
  );
}

export async function createDepartment(
  data: CreateDepartmentRequest,
): Promise<Department> {

  return apiClient<Department>("/departments", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateDepartment(
  id: number,
  data: UpdateDepartmentRequest,
): Promise<Department> {

  return apiClient<Department>(`/departments/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function updateDepartmentStatus(
  id: number,
  data: DepartmentStatusRequest,
): Promise<{ message: string }> {
  
  return apiClient<{ message: string }>(
    `/departments/${id}/status`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    },
  );
}