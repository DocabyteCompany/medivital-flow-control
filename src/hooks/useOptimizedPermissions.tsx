
import { useMemo } from 'react';
import { useRole } from '@/contexts/RoleContext';

export const useOptimizedPermissions = () => {
  const { selectedRole } = useRole();

  const permissions = useMemo(() => {
    const isAdmin = selectedRole === 'Admin';
    const isDoctor = selectedRole === 'Doctor';

    return {
      // Pacientes
      canViewPatients: true,
      canCreatePatients: true,
      canEditPatientBasicInfo: true,
      canEditPatientDemographics: isAdmin,
      canDeletePatients: isAdmin,
      
      // Personal
      canViewPersonnel: isAdmin,
      canManagePersonnel: isAdmin,
      canViewPersonnelSchedules: isAdmin,
      
      // Estadísticas
      canViewStatistics: isAdmin,
      canExportReports: isAdmin,
      canConfigureStatistics: isAdmin,
      
      // Expedientes
      canViewMedicalRecords: true,
      canEditMedicalRecords: isDoctor,
      canCreateReferrals: isDoctor,
      canUploadStudies: isDoctor,
      
      // Mensajes
      canSendMessages: true,
      canViewAllConversations: isAdmin,
      
      // Configuración
      canAccessConfiguration: isAdmin,
      canModifySystemSettings: isAdmin,
      
      // Roles
      isAdmin,
      isDoctor
    };
  }, [selectedRole]);

  return permissions;
};
