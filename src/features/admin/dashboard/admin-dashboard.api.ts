const API_URL = import.meta.env.VITE_API_URL;

export interface AdminDashboardStats {
  totalEmployees: number;
  totalDepartments: number;
  pendingTasks: number;
  completedTasks: number;
}

export interface RecentEmployee {
  id: number;
  name: string;
  department: string;
  status: "Active" | "Inactive";
}

export interface TaskStatistic {
  status: string;
  count: number;
  variant: "warning" | "info" | "success";
}

export interface AdminDashboardData {
  stats: AdminDashboardStats;
  recentEmployees: RecentEmployee[];
  taskStatistics: TaskStatistic[];
}

interface AdminDashboardApiResponse {
  totalEmployees: number;
  totalDepartments: number;
  totalTasks: number;
  activeEmployees: number;
  pendingTasks: number;
  completedTasks: number;

  recentEmployees: {
    id: number;
    fullName: string;
    email: string;
    designation: string | null;
    department: string;
    createdAt: string | null;
  }[];

  taskStatistics: {
    statusId: number;
    status: string;
    count: number;
  }[];
}


export async function getAdminDashboard(): Promise<AdminDashboardData> {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("Authentication token not found");
  }

  const response = await fetch(`${API_URL}/admin/dashboard`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized. Please login again.");
    }

    if (response.status === 403) {
      throw new Error(
        "You do not have permission to access the admin dashboard.",
      );
    }

    throw new Error("Failed to fetch admin dashboard");
  }

  const data: AdminDashboardApiResponse = await response.json();

  return {
    stats: {
      totalEmployees: data.totalEmployees,
      totalDepartments: data.totalDepartments,
      pendingTasks: data.pendingTasks,
      completedTasks: data.completedTasks,
    },

    recentEmployees: data.recentEmployees.map((employee) => ({
      id: employee.id,
      name: employee.fullName,
      department: employee.department,
      status: "Active",
    })),

    taskStatistics: data.taskStatistics.map((task) => ({
      status: task.status,
      count: task.count,
      variant: getTaskVariant(task.status),
    })),
  };
}


function getTaskVariant( status: string ): "warning" | "info" | "success" {
    
  switch (status.toLowerCase()) {
    case "pending":
      return "warning";

    case "completed":
      return "success";

    default:
      return "info";
  }
}