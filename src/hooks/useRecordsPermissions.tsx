
import { useRole } from '@/contexts/RoleContext';

export const useRecordsPermissions = () => {
  const { selectedRole } = useRole();

  const canViewClinicalData = (): boolean => {
    return selectedRole === 'Doctor';
  };

  const canViewAdministrativeData = (): boolean => {
    return selectedRole === 'Admin' || selectedRole === 'Doctor';
  };

  const canCreateReferrals = (): boolean => {
    return selectedRole === 'Doctor';
  };

  const canManageReferrals = (): boolean => {
    return selectedRole === 'Doctor';
  };

  const canGenerateSummaries = (): boolean => {
    return selectedRole === 'Doctor';
  };

  const canViewPatientHistory = (): boolean => {
    return selectedRole === 'Doctor';
  };

  const canCancelReferrals = (): boolean => {
    return selectedRole === 'Doctor';
  };

  const isLimitedView = (): boolean => {
    return selectedRole === 'Admin';
  };

  return {
    canViewClinicalData,
    canViewAdministrativeData,
    canCreateReferrals,
    canManageReferrals,
    canGenerateSummaries,
    canViewPatientHistory,
    canCancelReferrals,
    isLimitedView,
    currentRole: selectedRole,
  };
};
