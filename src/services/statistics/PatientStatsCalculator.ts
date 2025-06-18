
import { patients } from '@/data/patients';

export interface PatientStats {
  total: number;
  healthy: number;
  inTreatment: number;
  critical: number;
  newThisMonth: number;
  byGender: { male: number; female: number };
  byInsurance: { [key: string]: number };
}

export class PatientStatsCalculator {
  static calculate(): PatientStats {
    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

    const newThisMonth = patients.filter(p => 
      new Date(p.createdAt) >= oneMonthAgo
    ).length;

    const byGender = patients.reduce((acc, p) => {
      if (p.gender === 'Masculino') acc.male++;
      else acc.female++;
      return acc;
    }, { male: 0, female: 0 });

    const byInsurance = patients.reduce((acc, p) => {
      const type = p.insuranceType || 'none';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    return {
      total: patients.length,
      healthy: patients.filter(p => p.status === 'Saludable').length,
      inTreatment: patients.filter(p => p.status === 'En tratamiento').length,
      critical: patients.filter(p => p.status === 'Crítico').length,
      newThisMonth,
      byGender,
      byInsurance
    };
  }
}
