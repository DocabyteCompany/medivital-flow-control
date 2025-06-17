
import { usePermissions } from '@/hooks/usePermissions';

export const usePatientPermissions = () => {
  const { isAdmin, isDoctor } = usePermissions();

  const canCreatePatient = (): boolean => {
    return isAdmin();
  };

  const canEditPatientDemographics = (): boolean => {
    return isAdmin();
  };

  const canEditPatientBilling = (): boolean => {
    return isAdmin();
  };

  const canEditBasicContact = (): boolean => {
    return isAdmin() || isDoctor();
  };

  const canEditVitals = (): boolean => {
    return isAdmin() || isDoctor();
  };

  const canViewPatient = (): boolean => {
    return isAdmin() || isDoctor();
  };

  const canDeletePatient = (): boolean => {
    return isAdmin();
  };

  return {
    canCreatePatient,
    canEditPatientDemographics,
    canEditPatientBilling,
    canEditBasicContact,
    canEditVitals,
    canViewPatient,
    canDeletePatient,
    isAdmin: isAdmin(),
    isDoctor: isDoctor(),
  };
};
