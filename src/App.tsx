import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import './index.css'
import Login from "./pages/Login";
import Register from './pages/Register';
import AdminDashboardPage from './pages/AdminDashboardPage';
import EmployeeDashboardPage from './pages/EmployeeDashboardPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login"replace/>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/employee/dashboard" element={<EmployeeDashboardPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
