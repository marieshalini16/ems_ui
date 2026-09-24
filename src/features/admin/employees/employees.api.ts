import { apiClient } from "../../../api/client";

import type {
  CreateEmployeeRequest,
  Employee,
  EmployeeListResponse,
  EmployeeQuery,
  EmployeeStatusRequest,
  UpdateEmployeeRequest,
} from "./employees.types";


export async function getEmployees(
  query: EmployeeQuery = {},
): Promise<EmployeeListResponse> {
  const params = new URLSearchParams();

  if (query.search) {
    params.append("search", query.search);
  }

  if (query.dept_id) {
    params.append("dept_id", String(query.dept_id));
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

  return apiClient<EmployeeListResponse>(
    `/employees${queryString ? `?${queryString}` : ""}`,
  );
}

export async function getEmployee(id: number): Promise<Employee> {
  return apiClient<Employee>(`/employees/${id}`);
}

export async function createEmployee(data: CreateEmployeeRequest): Promise<Employee> {
  return apiClient<Employee>("/employees", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateEmployee(
  id: number,
  data: UpdateEmployeeRequest,
): Promise<{ message: string; employee: Employee }> {
  return apiClient<{ message: string; employee: Employee }>(
    `/employees/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    },
  );
}

export async function updateEmployeeStatus(
  id: number,
  data: EmployeeStatusRequest,
) {
  return apiClient<{ message: string }>(
    `/employees/${id}/status`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    },
  );
}