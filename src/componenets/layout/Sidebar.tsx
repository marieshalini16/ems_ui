import type { LucideIcon } from "lucide-react";
import { LayoutDashboard, Users, Building2, ClipboardList, Megaphone, UserCircle, LogOut } from "lucide-react";

export interface SidebarItem {
  label: string;
  icon: LucideIcon;
  path: string;
}

interface SidebarProps {
  items: SidebarItem[];
  activePath: string;
  onNavigate?: (path: string) => void;
  onLogout?: () => void;
}

export default function Sidebar({
  items,
  activePath,
  onNavigate,
  onLogout,
}: SidebarProps) {
    
  return (
    <aside className="flex min-h-screen w-sidebar shrink-0 flex-col bg-navy-900">
    
      <div className="flex h-header items-center gap-3 border-b border-white/10 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary-600">
          <Users
            size={17}
            className="text-white"
          />
        </div>

        <span className="text-base font-semibold text-white">
          EMS
        </span>
      </div>

     
      <nav className="flex-1 px-3 py-5">
        <div className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon;

            const isActive =
              activePath === item.path;

            return (
              <button
                key={item.path}
                type="button"
                onClick={() =>
                  onNavigate?.(item.path)
                }
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition duration-fast ${
                  isActive
                    ? "bg-primary-600 text-white"
                    : "text-navy-300 hover:bg-navy-800 hover:text-white"
                }`}
              >
                <Icon size={17} />

                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>


      <div className="border-t border-white/10 p-3">
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-navy-300 transition duration-fast hover:bg-navy-800 hover:text-white"
        >
          <LogOut size={17} />

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}



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