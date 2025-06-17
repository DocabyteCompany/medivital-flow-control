
import { useRole, UserRole } from '@/contexts/RoleContext';

export const usePermissions = () => {
  const { selectedRole } = useRole();

  const hasAccess = (allowedRoles: UserRole[]): boolean => {
    return allowedRoles.includes(selectedRole);
  };

  const isAdmin = (): boolean => {
    return selectedRole === 'Admin';
  };

  const isDoctor = (): boolean => {
    return selectedRole === 'Doctor';
  };

  const canAccessPersonnel = (): boolean => {
    return hasAccess(['Admin']);
  };

  const canAccessStatistics = (): boolean => {
    return hasAccess(['Admin']);
  };

  const canAccessConfiguration = (): boolean => {
    return hasAccess(['Admin']);
  };

  const canManageUsers = (): boolean => {
    return hasAccess(['Admin']);
  };

  return {
    hasAccess,
    isAdmin,
    isDoctor,
    canAccessPersonnel,
    canAccessStatistics,
    canAccessConfiguration,
    canManageUsers,
    currentRole: selectedRole,
  };
};
