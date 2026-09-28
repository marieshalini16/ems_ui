import { createContext, useEffect, useState, type ReactNode } from "react";

import { getProfile } from "./features/profile/profile.api";

export interface UserContextType {
  userName: string;
  setUserName: (userName: string) => void;
  role: string;
  setRole: (role: string) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

function UserProvider({ children }: UserProviderProps) {
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");

    useEffect(() => {
    if (!localStorage.getItem("access_token")) return;

    getProfile()
      .then((profile) => {
        setUserName(profile.full_name);
        setRole(profile.role?.role ?? "");
      })
      .catch((error) => console.error("Failed to load user:", error));
  }, []);
  
  return (
    <UserContext.Provider value={{ userName, setUserName, role, setRole }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;

