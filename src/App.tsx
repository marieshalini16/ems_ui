import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import './index.css'
import Login from "./pages/Login";
import Register from './pages/Register';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import EmployeeDashboardPage from './pages/employee/EmployeeDashboardPage';
import EmployeeListPage from "./pages/admin/EmployeeListPage";
import DepartmentListPage from "./pages/admin/DepartmentListPage";
import TaskListPage from "./pages/admin/TaskListPage";
import ProfilePage from "./pages/ProfilePage";
import MyTasksPage from "./pages/employee/MyTaskPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/employee/dashboard" element={<EmployeeDashboardPage />} />
        <Route path='/admin/employees' element={<EmployeeListPage />} />
        <Route path='/admin/departments' element={<DepartmentListPage />} />
        <Route path='/admin/tasks' element={<TaskListPage />} />
        <Route path='/admin/profile' element={<ProfilePage/>} />
        <Route path='/employee/profile' element={<ProfilePage/>} />
        <Route path='/employee/tasks' element={<MyTasksPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
