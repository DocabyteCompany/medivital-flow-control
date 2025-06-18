
import { useMemo } from 'react';
import { useRole, UserRole } from '@/contexts/RoleContext';

interface UnifiedPermissions {
  // Roles básicos
  isAdmin: boolean;
  isDoctor: boolean;
  currentRole: UserRole;
  
  // Permisos de pacientes
  canViewPatients: boolean;
  canCreatePatients: boolean;
  canEditPatientBasicInfo: boolean;
  canEditPatientDemographics: boolean;
  canEditPatientBilling: boolean;
  canEditPatientVitals: boolean;
  canDeletePatients: boolean;
  
  // Permisos de personal
  canViewPersonnel: boolean;
  canManagePersonnel: boolean;
  canViewPersonnelSchedules: boolean;
  
  // Permisos de estadísticas
  canViewStatistics: boolean;
  canExportReports: boolean;
  canConfigureStatistics: boolean;
  
  // Permisos de expedientes médicos
  canViewMedicalRecords: boolean;
  canEditMedicalRecords: boolean;
  canCreateReferrals: boolean;
  canManageReferrals: boolean;
  canGenerateSummaries: boolean;
  canViewPatientHistory: boolean;
  canCancelReferrals: boolean;
  canUploadExternalStudies: boolean;
  canViewExternalStudies: boolean;
  canViewClinicalData: boolean;
  canViewAdministrativeData: boolean;
  
  // Permisos de mensajes
  canSendMessages: boolean;
  canViewAllConversations: boolean;
  
  // Permisos de configuración
  canAccessConfiguration: boolean;
  canAccessSystemSettings: boolean;
  canModifySystemSettings: boolean;
  canManageUsers: boolean;
  
  // Helper functions
  hasAccess: (allowedRoles: UserRole[]) => boolean;
  isLimitedView: boolean;
}

export const useUnifiedPermissions = (): UnifiedPermissions => {
  const { selectedRole } = useRole();

  const permissions = useMemo((): UnifiedPermissions => {
    const isAdmin = selectedRole === 'Admin';
    const isDoctor = selectedRole === 'Doctor';

    const hasAccess = (allowedRoles: UserRole[]): boolean => {
      return allowedRoles.includes(selectedRole);
    };

    return {
      // Roles básicos
      isAdmin,
      isDoctor,
      currentRole: selectedRole,
      
      // Permisos de pacientes
      canViewPatients: true,
      canCreatePatients: isAdmin || isDoctor,
      canEditPatientBasicInfo: isAdmin || isDoctor,
      canEditPatientDemographics: isAdmin,
      canEditPatientBilling: isAdmin,
      canEditPatientVitals: isAdmin || isDoctor,
      canDeletePatients: isAdmin,
      
      // Permisos de personal
      canViewPersonnel: isAdmin,
      canManagePersonnel: isAdmin,
      canViewPersonnelSchedules: isAdmin,
      
      // Permisos de estadísticas
      canViewStatistics: isAdmin,
      canExportReports: isAdmin,
      canConfigureStatistics: isAdmin,
      
      // Permisos de expedientes médicos
      canViewMedicalRecords: true,
      canEditMedicalRecords: isDoctor,
      canCreateReferrals: isDoctor,
      canManageReferrals: isDoctor,
      canGenerateSummaries: isDoctor,
      canViewPatientHistory: isDoctor,
      canCancelReferrals: isDoctor,
      canUploadExternalStudies: isDoctor,
      canViewExternalStudies: isDoctor,
      canViewClinicalData: isDoctor,
      canViewAdministrativeData: isAdmin || isDoctor,
      
      // Permisos de mensajes
      canSendMessages: true,
      canViewAllConversations: isAdmin,
      
      // Permisos de configuración
      canAccessConfiguration: isAdmin || isDoctor,
      canAccessSystemSettings: isAdmin,
      canModifySystemSettings: isAdmin,
      canManageUsers: isAdmin,
      
      // Helper functions
      hasAccess,
      isLimitedView: isAdmin && !isDoctor
    };
  }, [selectedRole]);

  return permissions;
};
