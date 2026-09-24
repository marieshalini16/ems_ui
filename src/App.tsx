import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import './index.css'
import Login from "./pages/Login";
import Register from './pages/Register';
import AdminDashboardPage from './pages/admin/dashboard/AdminDashboardPage';
import EmployeeDashboardPage from './pages/EmployeeDashboardPage';
import EmployeeListPage from "./pages/admin/employees/EmployeeListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/employee/dashboard" element={<EmployeeDashboardPage />} />
        <Route path='/admin/employees' element={<EmployeeListPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
