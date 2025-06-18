
import { PatientStats, PersonnelStats, AppointmentStats, FinancialStats } from '@/types';

export class StatisticsFactory {
  static createEmptyPatientStats(): PatientStats {
    return {
      total: 0,
      healthy: 0,
      inTreatment: 0,
      critical: 0,
      newThisMonth: 0,
      byGender: {
        male: 0,
        female: 0
      },
      byInsurance: {
        none: 0,
        public: 0,
        private: 0,
        mixed: 0,
        international: 0
      }
    };
  }

  static createEmptyPersonnelStats(): PersonnelStats {
    return {
      total: 0,
      doctors: 0,
      nurses: 0,
      technicians: 0,
      administrative: 0,
      radiologists: 0,
      online: 0,
      bySpecialty: {}
    };
  }

  static createEmptyAppointmentStats(): AppointmentStats {
    return {
      total: 0,
      completed: 0,
      scheduled: 0,
      cancelled: 0,
      rescheduled: 0,
      completionRate: 0,
      monthlyTrend: []
    };
  }

  static createEmptyFinancialStats(): FinancialStats {
    return {
      revenue: [],
      byInsurance: []
    };
  }

  // Mock data generators for development
  static generateMockPatientStats(): PatientStats {
    return {
      total: 1247,
      healthy: 892,
      inTreatment: 298,
      critical: 57,
      newThisMonth: 89,
      byGender: {
        male: 523,
        female: 724
      },
      byInsurance: {
        none: 178,
        public: 445,
        private: 389,
        mixed: 156,
        international: 79
      }
    };
  }

  static generateMockPersonnelStats(): PersonnelStats {
    return {
      total: 156,
      doctors: 45,
      nurses: 78,
      technicians: 23,
      administrative: 8,
      radiologists: 2,
      online: 134,
      bySpecialty: {
        'Cardiología': 8,
        'Pediatría': 12,
        'Neurología': 6,
        'Ortopedia': 9,
        'Ginecología': 7,
        'Medicina General': 15
      }
    };
  }

  static generateMockAppointmentStats(): AppointmentStats {
    return {
      total: 2847,
      completed: 2134,
      scheduled: 456,
      cancelled: 167,
      rescheduled: 90,
      completionRate: 75.0,
      monthlyTrend: [
        { month: 'Ene', count: 245 },
        { month: 'Feb', count: 289 },
        { month: 'Mar', count: 312 },
        { month: 'Abr', count: 298 },
        { month: 'May', count: 334 },
        { month: 'Jun', count: 367 }
      ]
    };
  }

  static generateMockFinancialStats(): FinancialStats {
    return {
      revenue: [
        { month: 'Ene', amount: 1850000 },
        { month: 'Feb', amount: 1920000 },
        { month: 'Mar', amount: 2100000 },
        { month: 'Abr', amount: 1980000 },
        { month: 'May', amount: 2250000 },
        { month: 'Jun', amount: 2340000 }
      ],
      byInsurance: [
        { type: 'Privado', patients: 389, percentage: 31.2 },
        { type: 'Público', patients: 445, percentage: 35.7 },
        { type: 'Sin seguro', patients: 178, percentage: 14.3 },
        { type: 'Mixto', patients: 156, percentage: 12.5 },
        { type: 'Internacional', patients: 79, percentage: 6.3 }
      ]
    };
  }
}
