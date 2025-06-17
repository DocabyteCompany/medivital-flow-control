
import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'Admin' | 'Doctor';

interface RoleContextType {
  selectedRole: UserRole;
  setRole: (role: UserRole) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('Doctor');

  const setRole = (role: UserRole) => {
    setSelectedRole(role);
    console.log('Role changed to:', role);
  };

  return (
    <RoleContext.Provider value={{ selectedRole, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
