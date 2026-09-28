import { apiClient } from "../../../api/client";
import type { CreateTaskRequest, Task, TaskListResponse, TaskPriority, TaskQuery, TaskStatus, UpdateTaskRequest, UpdateTaskStatusRequest, } from "./tasks.types";

export async function getTasks( query: TaskQuery = {}, ): Promise<TaskListResponse> {
  
  const params = new URLSearchParams();

  if (query.search) {
    params.append("search", query.search);
  }

  if (query.priority_id !== undefined) {
    params.append( "priority_id", String(query.priority_id));
  }

  if (query.status_id !== undefined) {
    params.append( "status_id", String(query.status_id));
  }

  if (query.assign_to !== undefined) {
    params.append( "assign_to", String(query.assign_to));
  }

  if (query.page !== undefined) {
    params.append( "page", String(query.page));
  }

  if (query.limit !== undefined) {
    params.append( "limit", String(query.limit));
  }

  const queryString = params.toString();
  const url = queryString ? `/tasks?${queryString}` : "/tasks";

  return apiClient<TaskListResponse>(
    url,
    {
      method: "GET",
    },
  );
}


export async function getTask( id: number, ): Promise<Task> {
  
  return apiClient<Task>( `/tasks/${id}`,
    {
      method: "GET",
    },
  );
}


export async function createTask( data: CreateTaskRequest, ): Promise<Task> {
  
  return apiClient<Task>( "/tasks",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
}


export async function updateTask( id: number, data: UpdateTaskRequest, ): Promise<Task> {
  
  return apiClient<Task>( `/tasks/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    },
  );
}


export async function updateTaskStatus( id: number, data: UpdateTaskStatusRequest, ): Promise<Task> {
  
  return apiClient<Task>( `/tasks/${id}/status`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    },
  );
}


export async function deleteTask( id: number, ): Promise<void> {
  
  await apiClient<unknown>( `/tasks/${id}`,
    {
      method: "DELETE",
    },
  );
}


export async function getTaskPriorities(): Promise<TaskPriority[]> {

  return apiClient<TaskPriority[]>( "/tasks/priorities",
    {
      method: "GET",
    },
  );
}


export async function getTaskStatuses(): Promise<TaskStatus[]> {
 
  return apiClient<TaskStatus[]>( "/tasks/statuses",
    {
      method: "GET",
    },
  );
}