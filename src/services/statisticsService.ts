
import { 
  PatientStatsCalculator, 
  PersonnelStatsCalculator, 
  AppointmentStatsCalculator, 
  FinancialStatsCalculator 
} from './statistics';

export type { PatientStats, PersonnelStats, AppointmentStats, FinancialStats } from './statistics';

export const getPatientStatistics = () => PatientStatsCalculator.calculate();
export const getPersonnelStatistics = () => PersonnelStatsCalculator.calculate();
export const getAppointmentStatistics = () => AppointmentStatsCalculator.calculate();
export const getFinancialStatistics = () => FinancialStatsCalculator.calculate();
