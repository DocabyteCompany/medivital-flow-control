
// Common interfaces for the application
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt?: string;
}

export interface PatientStats {
  total: number;
  healthy: number;
  inTreatment: number;
  critical: number;
  newThisMonth: number;
  byGender: {
    male: number;
    female: number;
  };
  byInsurance: {
    none: number;
    public: number;
    private: number;
    mixed: number;
    international: number;
  };
}

export interface PersonnelStats {
  total: number;
  doctors: number;
  nurses: number;
  technicians: number;
  administrative: number;
  radiologists: number;
  online: number;
  bySpecialty: Record<string, number>;
}

export interface AppointmentStats {
  total: number;
  completed: number;
  scheduled: number;
  cancelled: number;
  rescheduled: number;
  completionRate: number;
  monthlyTrend: Array<{ month: string; count: number }>;
}

export interface FinancialStats {
  revenue: Array<{ month: string; amount: number }>;
  byInsurance: Array<{
    type: string;
    patients: number;
    percentage: number;
  }>;
}

export interface MetricItem {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'orange';
}

export interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}
