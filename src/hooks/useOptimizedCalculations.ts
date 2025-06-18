
import { useMemo, useCallback } from 'react';
import { PatientStats, PersonnelStats, AppointmentStats } from '@/types';

// Hook para optimizar cálculos complejos con memoización
export const useOptimizedCalculations = () => {
  
  // Memoizar cálculo de porcentajes de pacientes
  const calculatePatientPercentages = useCallback((stats: PatientStats) => {
    return useMemo(() => {
      if (!stats || stats.total === 0) return { healthy: 0, treatment: 0, critical: 0 };
      
      return {
        healthy: (stats.healthy / stats.total) * 100,
        treatment: (stats.inTreatment / stats.total) * 100,
        critical: (stats.critical / stats.total) * 100
      };
    }, [stats]);
  }, []);

  // Memoizar cálculo de eficiencia del personal
  const calculatePersonnelEfficiency = useCallback((stats: PersonnelStats) => {
    return useMemo(() => {
      if (!stats || stats.total === 0) return 0;
      
      return (stats.online / stats.total) * 100;
    }, [stats]);
  }, []);

  // Memoizar cálculo de tendencias de citas
  const calculateAppointmentTrends = useCallback((stats: AppointmentStats) => {
    return useMemo(() => {
      if (!stats || !stats.monthlyTrend) return [];
      
      return stats.monthlyTrend.map((item, index, array) => {
        const prevItem = array[index - 1];
        const growth = prevItem ? ((item.count - prevItem.count) / prevItem.count) * 100 : 0;
        
        return {
          ...item,
          growth: Math.round(growth * 100) / 100
        };
      });
    }, [stats]);
  }, []);

  // Memoizar filtrado optimizado
  const createOptimizedFilter = useCallback(<T>(
    items: T[],
    filterFn: (item: T) => boolean,
    dependencies: any[]
  ) => {
    return useMemo(() => {
      return items.filter(filterFn);
    }, [items, ...dependencies]);
  }, []);

  return {
    calculatePatientPercentages,
    calculatePersonnelEfficiency,
    calculateAppointmentTrends,
    createOptimizedFilter
  };
};
