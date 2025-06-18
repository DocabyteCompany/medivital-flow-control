
import { PatientStatsCalculator } from './PatientStatsCalculator';

export interface FinancialStats {
  byInsurance: { type: string; patients: number; percentage: number }[];
  revenue: { month: string; amount: number }[];
}

export class FinancialStatsCalculator {
  static calculate(): FinancialStats {
    const patientStats = PatientStatsCalculator.calculate();
    const total = patientStats.total;

    const byInsurance = Object.entries(patientStats.byInsurance).map(([type, count]) => ({
      type: type === 'none' ? 'Sin seguro' : 
            type === 'public' ? 'IMSS/ISSSTE' :
            type === 'private' ? 'Seguro Privado' :
            type === 'mixed' ? 'Seguro Mixto' : 'Seguro Internacional',
      patients: count,
      percentage: (count / total) * 100
    }));

    const revenue = [
      { month: 'Ene', amount: 2500000 },
      { month: 'Feb', amount: 2640000 },
      { month: 'Mar', amount: 2560000 },
      { month: 'Abr', amount: 2900000 },
      { month: 'May', amount: 2760000 },
      { month: 'Jun', amount: 3020000 },
    ];

    return {
      byInsurance,
      revenue
    };
  }
}
