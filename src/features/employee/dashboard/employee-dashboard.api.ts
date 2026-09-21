const API_URL = import.meta.env.VITE_API_URL;

export interface EmployeeDashboardStats {
  myTasks: number;
  completedTasks: number;
  announcements: number;
}

export interface EmployeeTask {
  id: number;
  title: string;
  priority: string;
  dueDate: string | null;
  status: string;
}

export interface EmployeeDashboardData {
  stats: EmployeeDashboardStats;
  tasks: EmployeeTask[];
}

interface EmployeeDashboardResponse {
  myTasks: number;
  completedTasks: number;
  announcements: number;
  tasks: {
    id: number;
    title: string;
    priority: string;
    dueDate: string | null;
    status: string;
  }[];
}

export async function getEmployeeDashboard(): Promise<EmployeeDashboardData> {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("Authentication token not found");
  }

  const response = await fetch(`${API_URL}/employee/dashboard`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Session expired. Please login again.");
    }

    if (response.status === 403) {
      throw new Error("You are not authorized to access this page.");
    }

    throw new Error("Failed to load employee dashboard");
  }

  const data: EmployeeDashboardResponse = await response.json();

  return {
    stats: {
      myTasks: data.myTasks,
      completedTasks: data.completedTasks,
      announcements: data.announcements,
    },
    tasks: data.tasks,
  };
}