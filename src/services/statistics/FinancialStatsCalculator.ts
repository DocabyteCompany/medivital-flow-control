
import { FinancialStats } from '@/types';
import { patients } from '@/data/patients';

export class FinancialStatsCalculator {
  static calculate(): FinancialStats {
    // Mock revenue data
    const revenue = [
      { month: 'Ene', amount: 1850000 },
      { month: 'Feb', amount: 1920000 },
      { month: 'Mar', amount: 2100000 },
      { month: 'Abr', amount: 1980000 },
      { month: 'May', amount: 2250000 },
      { month: 'Jun', amount: 2340000 }
    ];

    // Calculate insurance distribution
    const insuranceCounts = patients.reduce((acc, patient) => {
      const type = patient.insurance?.type || 'none';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const total = patients.length;
    const byInsurance = Object.entries(insuranceCounts).map(([type, count]) => ({
      type: type === 'none' ? 'Sin seguro' :
            type === 'public' ? 'Público' :
            type === 'private' ? 'Privado' :
            type === 'mixed' ? 'Mixto' : 'Internacional',
      patients: count,
      percentage: (count / total) * 100
    }));

    return {
      revenue,
      byInsurance
    };
  }
}
