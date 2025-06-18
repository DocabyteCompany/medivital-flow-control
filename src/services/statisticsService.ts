
import { patients } from '@/data/patients';
import { personnel } from '@/data/personnel';
import { appointments } from '@/data/appointments';

export interface PatientStats {
  total: number;
  healthy: number;
  inTreatment: number;
  critical: number;
  newThisMonth: number;
  byGender: { male: number; female: number };
  byInsurance: { [key: string]: number };
}

export interface PersonnelStats {
  total: number;
  doctors: number;
  nurses: number;
  technicians: number;
  administrative: number;
  radiologists: number;
  online: number;
  bySpecialty: { [key: string]: number };
}

export interface AppointmentStats {
  total: number;
  completed: number;
  scheduled: number;
  cancelled: number;
  rescheduled: number;
  completionRate: number;
  monthlyTrend: { month: string; count: number }[];
}

export interface FinancialStats {
  byInsurance: { type: string; patients: number; percentage: number }[];
  revenue: { month: string; amount: number }[];
}

export const getPatientStatistics = (): PatientStats => {
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
};

export const getPersonnelStatistics = (): PersonnelStats => {
  // Filtrar solo el personal médico para especialidades (Doctores y Radiólogos)
  const medicalPersonnel = personnel.filter(p => 
    (p.role === 'Doctor' || p.role === 'Radiólogo') && p.specialty
  );

  const bySpecialty = medicalPersonnel.reduce((acc, p) => {
    if (p.specialty) {
      acc[p.specialty] = (acc[p.specialty] || 0) + 1;
    }
    return acc;
  }, {} as { [key: string]: number });

  return {
    total: personnel.length,
    doctors: personnel.filter(p => p.role === 'Doctor').length,
    nurses: personnel.filter(p => p.role === 'Enfermera').length,
    technicians: personnel.filter(p => p.role === 'Técnico').length,
    administrative: personnel.filter(p => p.role === 'Administrativo').length,
    radiologists: personnel.filter(p => p.role === 'Radiólogo').length,
    online: personnel.filter(p => p.online).length,
    bySpecialty
  };
};

export const getAppointmentStatistics = (): AppointmentStats => {
  const completed = appointments.filter(a => a.status === 'Completed').length;
  const total = appointments.length;
  const completionRate = total > 0 ? (completed / total) * 100 : 0;

  // Generar tendencia mensual simulada
  const monthlyTrend = [
    { month: 'Ene', count: 45 },
    { month: 'Feb', count: 52 },
    { month: 'Mar', count: 48 },
    { month: 'Abr', count: 61 },
    { month: 'May', count: 58 },
    { month: 'Jun', count: appointments.length },
  ];

  return {
    total,
    completed,
    scheduled: appointments.filter(a => a.status === 'Scheduled').length,
    cancelled: appointments.filter(a => a.status === 'Cancelled').length,
    rescheduled: appointments.filter(a => a.status === 'Rescheduled').length,
    completionRate,
    monthlyTrend
  };
};

export const getFinancialStatistics = (): FinancialStats => {
  const patientStats = getPatientStatistics();
  const total = patientStats.total;

  const byInsurance = Object.entries(patientStats.byInsurance).map(([type, count]) => ({
    type: type === 'none' ? 'Sin seguro' : 
          type === 'public' ? 'IMSS/ISSSTE' :
          type === 'private' ? 'Seguro Privado' :
          type === 'mixed' ? 'Seguro Mixto' : 'Seguro Internacional',
    patients: count,
    percentage: (count / total) * 100
  }));

  // Datos actualizados a pesos mexicanos
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
};
