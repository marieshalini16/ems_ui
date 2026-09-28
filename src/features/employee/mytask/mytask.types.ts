export interface MyTaskPriority {
  id: number;
  priority_name: string;
}

export interface MyTaskStatus {
  id: number;
  status_name: string;
}

export interface MyTaskEmployee {
  id: number;
  full_name: string;
}

export interface MyTask {
  id: number;
  title: string;
  description: string | null;
  assign_to: number;
  created_by: number;
  due_date: string | null;
  priority_id: number;
  status_id: number;
  comments: string | null;
  is_active: number;
  created_at: string | null;
  updated_at: string | null;

  priority: MyTaskPriority | null;
  status: MyTaskStatus | null;
  assigned_employee: MyTaskEmployee | null;
}

export interface UpdateMyTaskRequest {
  status_id: number;
  comments?: string;
}

export interface UpdateMyTaskResponse {
  message: string;
  task: MyTask;
}