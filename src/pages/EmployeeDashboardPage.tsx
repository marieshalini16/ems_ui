import { useEffect, useState } from "react";

import EmployeeDashboard from "../features/employee/dashboard/EmployeeDashboard";
import { getEmployeeDashboard,type EmployeeDashboardData } from "../features/employee/dashboard/employee-dashboard.api";

export default function EmployeeDashboardPage() {
  const [dashboardData, setDashboardData] = useState<EmployeeDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);
      setError(null);
      const data = await getEmployeeDashboard();
      setDashboardData(data);
    } 
    
    catch (error) {
      console.error("Employee dashboard error:", error);

      if (error instanceof Error) {
        setError(error.message);
      } 
      else {
        setError("Failed to load dashboard");
      }
    } 
    
    finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role_id");

    window.location.href = "/login";
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-sm text-text-secondary">
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="rounded-lg border border-danger-200 bg-danger-50 px-6 py-4 text-sm text-danger-700">
          {error}
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return null;
  }

  return (
    <EmployeeDashboard data={dashboardData}  userName="Employee"  onLogout={handleLogout} />
  );
}