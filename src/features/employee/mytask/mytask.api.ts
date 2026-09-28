import { apiClient } from "../../../api/client";

import type { MyTask, MyTaskStatus, UpdateMyTaskRequest, UpdateMyTaskResponse } from "./mytask.types";

export async function getMyTasks(): Promise<MyTask[]> {
  return apiClient<MyTask[]>("/mytask", {
    method: "GET",
  });
}

export async function updateMyTask( taskId: number, data: UpdateMyTaskRequest): Promise<UpdateMyTaskResponse> {
  return apiClient<UpdateMyTaskResponse>(`/mytask/${taskId}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    },
  );
}

export async function getMyTaskStatuses(): Promise<MyTaskStatus[]> {
  return apiClient<MyTaskStatus[]>("/mytask/statuses", {
    method: "GET",
  });
}