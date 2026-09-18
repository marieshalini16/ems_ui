import { createContext, useState, type ReactNode } from "react";

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

  return (
    <UserContext.Provider value={{ userName, setUserName, role, setRole }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;

