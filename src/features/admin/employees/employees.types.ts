export interface Department {
  id: number;
  dept_name: string;
  description?: string | null;
  is_active: number;
}

export interface Employee {
  id: number;
  full_name: string;
  user_name: string;
  email: string;
  phone?: string | null;
  doj?: string | null;
  designation?: string | null;
  dept_id: number;
  is_active: number;

  department?: Department | null;
}

/* -----------------------------
   Create Employee
----------------------------- */

export interface CreateEmployeeRequest {
  full_name: string;
  user_name: string;
  email: string;
  phone?: string;
  password: string;
  dept_id: number;
  designation?: string;
  doj?: string;
}

/* -----------------------------
   Update Employee
----------------------------- */

export interface UpdateEmployeeRequest {
  full_name?: string;
  user_name?: string;
  email?: string;
  phone?: string;
  password?: string;
  dept_id?: number;
  designation?: string;
  doj?: string;
}

/* -----------------------------
   Employee Status
----------------------------- */

export interface EmployeeStatusRequest {
  is_active: number;
}

/* -----------------------------
   Employee Query
----------------------------- */

export interface EmployeeQuery {
  search?: string;
  dept_id?: number;
  page?: number;
  limit?: number;
  is_active?: number;
}

/* -----------------------------
   Employee List Response
----------------------------- */

export interface EmployeeListResponse {
  data: Employee[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/* -----------------------------
   Form Data
----------------------------- */

export interface EmployeeFormData {
  full_name: string;
  user_name: string;
  email: string;
  phone: string;
  password: string;
  dept_id: number;
  designation: string;
  doj: string;
}