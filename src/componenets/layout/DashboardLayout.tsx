import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar, { type SidebarItem } from "./Sidebar";
import Header from "./Header";

interface DashboardLayoutProps {
  children: ReactNode;
  sidebarItems: SidebarItem[];
  activePath: string;
  userName: string;
  roleName: string;
  onLogout?: () => void;
}

export default function DashboardLayout({
  children,
  sidebarItems,
  activePath,
  userName,
  onLogout,
}: DashboardLayoutProps) {

  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-background">

      <Sidebar
        items={sidebarItems}
        activePath={activePath}
        onNavigate={navigate}
        onLogout={onLogout}
      />

      <div className="flex min-w-0 flex-1 flex-col">

        <Header userName={userName} />

        <main className="flex-1"> {children} </main>

      </div>
    </div>
  );
}