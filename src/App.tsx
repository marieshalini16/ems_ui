import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import './index.css'
import Login from "./pages/Login";
import Register from './pages/Register';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import EmployeeDashboardPage from './pages/EmployeeDashboardPage';
import EmployeeListPage from "./pages/admin/EmployeeListPage";
import DepartmentListPage from "./pages/admin/DepartmentListPage";

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
      </Routes>
    </BrowserRouter>
  )
}

export default App;
