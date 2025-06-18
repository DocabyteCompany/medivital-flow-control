
import { useQuery } from '@tanstack/react-query';
import { PatientStats, PersonnelStats, AppointmentStats, FinancialStats } from '@/types';
import { StatisticsFactory } from '@/factories/statisticsFactory';
import {
  getPatientStatistics,
  getPersonnelStatistics,
  getAppointmentStatistics,
  getFinancialStatistics
} from '@/services/statisticsService';

// Custom hooks for statistics data fetching
export const usePatientStatistics = () => {
  return useQuery({
    queryKey: ['patient-statistics'],
    queryFn: (): PatientStats => getPatientStatistics(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    initialData: StatisticsFactory.createEmptyPatientStats
  });
};

export const usePersonnelStatistics = () => {
  return useQuery({
    queryKey: ['personnel-statistics'],
    queryFn: (): PersonnelStats => getPersonnelStatistics(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    initialData: StatisticsFactory.createEmptyPersonnelStats
  });
};

export const useAppointmentStatistics = () => {
  return useQuery({
    queryKey: ['appointment-statistics'],
    queryFn: (): AppointmentStats => getAppointmentStatistics(),
    staleTime: 2 * 60 * 1000, // 2 minutes (more frequent updates)
    gcTime: 5 * 60 * 1000,
    initialData: StatisticsFactory.createEmptyAppointmentStats
  });
};

export const useFinancialStatistics = () => {
  return useQuery({
    queryKey: ['financial-statistics'],
    queryFn: (): FinancialStats => getFinancialStatistics(),
    staleTime: 10 * 60 * 1000, // 10 minutes (less frequent updates)
    gcTime: 15 * 60 * 1000,
    initialData: StatisticsFactory.createEmptyFinancialStats
  });
};

// Combined hook for dashboard overview
export const useStatisticsOverview = () => {
  const patientStats = usePatientStatistics();
  const personnelStats = usePersonnelStatistics();
  const appointmentStats = useAppointmentStatistics();
  
  return {
    patient: patientStats,
    personnel: personnelStats,
    appointment: appointmentStats,
    isLoading: patientStats.isLoading || personnelStats.isLoading || appointmentStats.isLoading,
    error: patientStats.error || personnelStats.error || appointmentStats.error
  };
};
