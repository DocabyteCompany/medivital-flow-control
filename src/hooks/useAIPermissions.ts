
import { useRole, UserRole } from '@/contexts/RoleContext';
import { ActivityContext } from '@/components/ia/ActivityCard';

export type AIRole = 'admin' | 'doctor' | 'nurse' | 'receptionist';

export interface AIPermissions {
  canCreatePatients: boolean;
  canModifySchedules: boolean;
  canAccessRecords: boolean;
  canGenerateReports: boolean;
  canManagePersonnel: boolean;
  canConfigureSystem: boolean;
  canUseAIActions: boolean;
  canApproveAIActions: boolean;
}

export type BooleanPermissionKeys = {
  [K in keyof AIPermissions]: AIPermissions[K] extends boolean ? K : never;
}[keyof AIPermissions];

export const useAIPermissions = (context?: ActivityContext) => {
  const { selectedRole } = useRole();
  
  // Convert UserRole to AIRole
  const currentRole: AIRole = selectedRole === 'Admin' ? 'admin' : 'doctor';

  const getPermissions = (userRole: AIRole): AIPermissions => {
    const basePermissions = {
      canCreatePatients: false,
      canModifySchedules: false,
      canAccessRecords: false,
      canGenerateReports: false,
      canManagePersonnel: false,
      canConfigureSystem: false,
      canUseAIActions: false,
      canApproveAIActions: false,
    };

    switch (userRole) {
      case 'admin':
        return {
          ...basePermissions,
          canCreatePatients: true,
          canModifySchedules: true,
          canAccessRecords: true,
          canGenerateReports: true,
          canManagePersonnel: true,
          canConfigureSystem: true,
          canUseAIActions: true,
          canApproveAIActions: true,
        };
      case 'doctor':
        return {
          ...basePermissions,
          canCreatePatients: true,
          canModifySchedules: true,
          canAccessRecords: true,
          canGenerateReports: true,
          canUseAIActions: true,
        };
      case 'nurse':
        return {
          ...basePermissions,
          canCreatePatients: true,
          canAccessRecords: true,
          canUseAIActions: true,
        };
      case 'receptionist':
        return {
          ...basePermissions,
          canCreatePatients: true,
          canModifySchedules: true,
          canUseAIActions: true,
        };
      default:
        return basePermissions;
    }
  };

  const permissions = getPermissions(currentRole);

  const canPerformAction = (permissionKey: BooleanPermissionKeys | string, actionType?: string): boolean => {
    // Si se pasa un permissionKey directo, usarlo
    if (permissionKey in permissions) {
      return permissions[permissionKey as BooleanPermissionKeys];
    }
    
    // Mapear tipos de acciones a permisos específicos (fallback)
    const actionPermissionMap: Record<string, keyof AIPermissions> = {
      'create_patient': 'canCreatePatients',
      'modify_schedule': 'canModifySchedules',
      'access_records': 'canAccessRecords',
      'generate_reports': 'canGenerateReports',
      'manage_personnel': 'canManagePersonnel',
      'configure_system': 'canConfigureSystem',
      'use_ai': 'canUseAIActions',
      'approve_ai': 'canApproveAIActions',
    };

    const mappedPermissionKey = actionPermissionMap[permissionKey];
    return mappedPermissionKey ? permissions[mappedPermissionKey] : false;
  };

  return {
    ...permissions,
    role: currentRole,
    canPerformAction,
  };
};
