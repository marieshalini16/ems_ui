import type { ReactNode } from "react";

import Sidebar, {
  type SidebarItem,
} from "./Sidebar";

import Header from "./Header";

interface DashboardLayoutProps {
  children: ReactNode;
  sidebarItems: SidebarItem[];
  activePath: string;
  userName: string;
  roleName: string;
  onNavigate?: (path: string) => void;
  onLogout?: () => void;
}

export default function DashboardLayout({
  children,
  sidebarItems,
  activePath,
  userName,
  onNavigate,
  onLogout,
}: DashboardLayoutProps) {
    return(
        <div className="flex min-h-screen bg-background">
            <Sidebar
            items={sidebarItems}
            activePath={activePath}
            onNavigate={onNavigate}
            onLogout={onLogout}
            />       

        <div className="flex min-w-0 flex-1 flex-col">
            <Header
            userName={userName}
            />        

            <main className="flex-1">
                {children}
            </main>
        </div>
        </div>
    );
}