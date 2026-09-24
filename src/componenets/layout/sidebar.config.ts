import { LayoutDashboard, Users, Building2, ClipboardList, Megaphone, UserCircle } from "lucide-react";

import type { SidebarItem } from "./Sidebar";


export const adminSidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    label: "Employees",
    icon: Users,
    path: "/admin/employees",
  },
  {
    label: "Departments",
    icon: Building2,
    path: "/admin/departments",
  },
  {
    label: "Tasks",
    icon: ClipboardList,
    path: "/admin/tasks",
  },
  {
    label: "Announcements",
    icon: Megaphone,
    path: "/admin/announcements",
  },
  {
    label: "Profile",
    icon: UserCircle,
    path: "/admin/profile",
  },
];

export const employeeSidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/employee/dashboard",
  },
  {
    label: "My Tasks",
    icon: ClipboardList,
    path: "/employee/tasks",
  },
  {
    label: "Announcements",
    icon: Megaphone,
    path: "/employee/announcements",
  },
  {
    label: "Profile",
    icon: UserCircle,
    path: "/employee/profile",
  },
];