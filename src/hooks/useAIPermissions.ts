
import { useContext } from 'react';
import { RoleContext } from '@/contexts/RoleContext';
import { AIContext } from '@/hooks/useAIContext';

export type AIRole = 'admin' | 'doctor' | 'nurse' | 'receptionist';

interface AIPermissions {
  canCreatePatients: boolean;
  canModifySchedules: boolean;
  canAccessRecords: boolean;
  canGenerateReports: boolean;
  canManagePersonnel: boolean;
  canConfigureSystem: boolean;
  canUseAIActions: boolean;
  canApproveAIActions: boolean;
}

export const useAIPermissions = (context: AIContext) => {
  const { role } = useContext(RoleContext);
  const currentRole = role as AIRole;

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

  const canPerformAction = (actionType: string): boolean => {
    // Mapear tipos de acciones a permisos específicos
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

    const permissionKey = actionPermissionMap[actionType];
    return permissionKey ? permissions[permissionKey] : false;
  };

  return {
    ...permissions,
    role: currentRole,
    canPerformAction,
  };
};
