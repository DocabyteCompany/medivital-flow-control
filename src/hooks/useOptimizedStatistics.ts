
import { useMemo } from 'react';
import { useStatisticsOverview } from './useStatistics';
import { MetricItem } from '@/types';

export const useOptimizedStatistics = () => {
  const { patient, personnel, appointment, isLoading, error } = useStatisticsOverview();

  // Memoized derived data to prevent unnecessary recalculations
  const dashboardMetrics = useMemo((): MetricItem[] => {
    if (!patient.data || !personnel.data || !appointment.data) return [];

    return [
      {
        title: 'Total Pacientes',
        value: patient.data.total.toLocaleString(),
        color: 'blue'
      },
      {
        title: 'Personal Activo',
        value: personnel.data.online.toString(),
        color: 'green'
      },
      {
        title: 'Citas Completadas',
        value: appointment.data.completed.toString(),
        color: 'purple'
      },
      {
        title: 'Tasa de Completitud',
        value: `${appointment.data.completionRate.toFixed(1)}%`,
        color: 'orange'
      }
    ];
  }, [patient.data, personnel.data, appointment.data]);

  const criticalAlerts = useMemo(() => {
    if (!patient.data || !personnel.data) return [];

    const alerts = [];
    
    if (patient.data.critical > 50) {
      alerts.push({
        type: 'critical',
        message: `${patient.data.critical} pacientes en estado crítico`,
        priority: 'high'
      });
    }

    if (personnel.data.online / personnel.data.total < 0.7) {
      alerts.push({
        type: 'personnel',
        message: 'Disponibilidad de personal baja',
        priority: 'medium'
      });
    }

    return alerts;
  }, [patient.data, personnel.data]);

  return {
    metrics: dashboardMetrics,
    alerts: criticalAlerts,
    isLoading,
    error,
    patient: patient.data,
    personnel: personnel.data,
    appointment: appointment.data
  };
};
