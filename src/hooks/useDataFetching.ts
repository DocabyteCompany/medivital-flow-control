
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useCallback } from 'react';
import { useGlobalState } from '@/stores/globalState';
import { useNotificationState } from '@/stores/notificationState';

// Tipo temporal para Patient hasta que se corrija la exportación
interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialty?: string;
  status?: string;
}

// Función temporal de servicio hasta que se corrija la exportación
const getPatients = async (): Promise<Patient[]> => {
  // Simulación temporal - reemplazar con servicio real
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [];
};

// Hook específico para obtener pacientes con cache optimizado
export const usePatients = (filters?: {
  searchTerm?: string;
  specialty?: string;
  status?: string;
}) => {
  const { setLoading } = useGlobalState();
  const { addNotification } = useNotificationState();

  return useQuery({
    queryKey: ['patients', filters],
    queryFn: async () => {
      setLoading(true);
      try {
        const result = await getPatients();
        return result;
      } finally {
        setLoading(false);
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
    retry: 3
  });
};

// Hook para mutar datos de pacientes
export const usePatientMutations = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationState();
  const { refreshData } = useGlobalState();

  const updatePatient = useMutation({
    mutationFn: async (patient: Partial<Patient>) => {
      // Simulación de actualización - reemplazar con API real
      await new Promise(resolve => setTimeout(resolve, 1000));
      return patient;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      refreshData();
      addNotification({
        type: 'success',
        title: 'Paciente actualizado',
        message: 'Los datos del paciente se actualizaron correctamente',
        priority: 'medium'
      });
    },
    onError: () => {
      addNotification({
        type: 'error',
        title: 'Error al actualizar',
        message: 'No se pudo actualizar el paciente',
        priority: 'high'
      });
    }
  });

  const createPatient = useMutation({
    mutationFn: async (patient: Omit<Patient, 'id'>) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { ...patient, id: Date.now().toString() };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      refreshData();
      addNotification({
        type: 'success',
        title: 'Paciente creado',
        message: 'El nuevo paciente se creó correctamente',
        priority: 'medium'
      });
    }
  });

  return {
    updatePatient,
    createPatient
  };
};

// Hook para estado local común de filtros
export const useLocalFilters = <T>(initialFilters: T) => {
  const [filters, setFilters] = useState<T>(initialFilters);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const updateFilter = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const clearFilter = useCallback(<K extends keyof T>(key: K) => {
    setFilters(prev => ({ ...prev, [key]: undefined }));
  }, []);

  return {
    filters,
    setFilters,
    updateFilter,
    resetFilters,
    clearFilter,
    isFiltersOpen,
    setIsFiltersOpen
  };
};
