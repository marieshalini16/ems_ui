export interface Department {
  id: number;
  dept_name: string;
  description?: string | null;
  is_active: number;
  employee_count: number;
}

export interface CreateDepartmentRequest {
  dept_name: string;
  description?: string;
}

export interface UpdateDepartmentRequest {
  dept_name?: string;
  description?: string;
}

export interface DepartmentStatusRequest {
  is_active: number;
}

export interface DepartmentQuery {
  search?: string;
  page?: number;
  limit?: number;
  is_active?: number;
}

export interface DepartmentListResponse {
  data: Department[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface DepartmentFormData {
  dept_name: string;
  description: string;
}