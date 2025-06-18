
import { PatientStats } from '@/types';
import { patients } from '@/data/patients';

export class PatientStatsCalculator {
  static calculate(): PatientStats {
    const total = patients.length;
    
    // Status distribution
    const healthy = patients.filter(p => p.healthStatus === 'Saludable').length;
    const inTreatment = patients.filter(p => p.healthStatus === 'En tratamiento').length;
    const critical = patients.filter(p => p.healthStatus === 'Crítico').length;

    // Gender distribution
    const male = patients.filter(p => p.gender === 'Masculino').length;
    const female = patients.filter(p => p.gender === 'Femenino').length;

    // Insurance distribution
    const insuranceCounts = patients.reduce((acc, patient) => {
      const type = patient.insurance?.type || 'none';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // New patients this month (mock calculation)
    const newThisMonth = Math.floor(Math.random() * 100) + 50;

    return {
      total,
      healthy,
      inTreatment,
      critical,
      newThisMonth,
      byGender: { male, female },
      byInsurance: {
        none: insuranceCounts.none || 0,
        public: insuranceCounts.public || 0,
        private: insuranceCounts.private || 0,
        mixed: insuranceCounts.mixed || 0,
        international: insuranceCounts.international || 0
      }
    };
  }
}
