export interface TaskEmployee {
  id: number;
  full_name: string;
  email?: string | null;
}

export interface TaskPriority {
  id: number;
  priority_name: string;
  is_active?: number;
}

export interface TaskStatus {
  id: number;
  status_name: string;
  is_active?: number;
}

export interface Task {
  id: number;
  title: string;
  description?: string | null;
  assign_to: number;
  created_by: number;
  priority_id: number;
  status_id: number;
  due_date?: string | null;
  comments?: string | null;
  is_active: number;

  assigned_employee?: TaskEmployee | null;
  creator?: TaskEmployee | null;
  priority?: TaskPriority | null;
  status?: TaskStatus | null;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
  assign_to: number;
  priority_id: number;
  status_id: number;
  due_date?: string;
  comments?: string;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  assign_to?: number;
  priority_id?: number;
  status_id?: number;
  due_date?: string;
  comments?: string;
}

export interface UpdateTaskStatusRequest {
  status_id: number;
}

export interface TaskQuery {
  search?: string;
  priority_id?: number;
  status_id?: number;
  assign_to?: number;
  page?: number;
  limit?: number;
}

export interface TaskListResponse {
  data: Task[];

  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface TaskFormData {
  title: string;
  description: string;
  assign_to: number | "";
  priority_id: number | "";
  status_id: number | "";
  due_date: string;
  comments: string;
}