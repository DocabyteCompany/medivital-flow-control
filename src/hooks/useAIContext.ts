
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useRole } from '@/contexts/RoleContext';
import { ActivityContext } from '@/components/ia/ActivityCard';

export const useAIContext = (patientId?: string, appointmentId?: string): ActivityContext => {
  const location = useLocation();
  const { selectedRole } = useRole();

  const context = useMemo(() => {
    const pathname = location.pathname;
    let currentPage = 'dashboard';

    // Detectar página actual basada en la ruta
    if (pathname.includes('/patients')) {
      currentPage = 'patients';
    } else if (pathname.includes('/agenda')) {
      currentPage = 'agenda';
    } else if (pathname.includes('/records')) {
      currentPage = 'records';
    } else if (pathname.includes('/ia-activities')) {
      currentPage = 'ia-activities';
    } else if (pathname.includes('/statistics')) {
      currentPage = 'statistics';
    } else if (pathname.includes('/messages')) {
      currentPage = 'messages';
    } else if (pathname.includes('/personnel')) {
      currentPage = 'personnel';
    } else if (pathname.includes('/configuration')) {
      currentPage = 'configuration';
    }

    // En una implementación real, podríamos extraer estos IDs de los parámetros de la URL
    // o del estado global de la aplicación
    const extractedPatientId = patientId || extractPatientIdFromUrl(pathname);
    const extractedAppointmentId = appointmentId || extractAppointmentIdFromUrl(pathname);

    return {
      currentPage,
      patientId: extractedPatientId,
      appointmentId: extractedAppointmentId,
      userRole: selectedRole,
      // En el futuro podríamos añadir más contexto como doctorId
      doctorId: selectedRole === 'Doctor' ? 'current-doctor-id' : undefined
    };
  }, [location.pathname, patientId, appointmentId, selectedRole]);

  return context;
};

// Funciones helper para extraer IDs de la URL
const extractPatientIdFromUrl = (pathname: string): string | undefined => {
  const match = pathname.match(/\/patients\/([^/]+)/);
  return match ? match[1] : undefined;
};

const extractAppointmentIdFromUrl = (pathname: string): string | undefined => {
  const match = pathname.match(/\/appointments\/([^/]+)/);
  return match ? match[1] : undefined;
};
