
import { appointments } from '@/data/appointments';

export interface AppointmentStats {
  total: number;
  completed: number;
  scheduled: number;
  cancelled: number;
  rescheduled: number;
  completionRate: number;
  monthlyTrend: { month: string; count: number }[];
}

export class AppointmentStatsCalculator {
  static calculate(): AppointmentStats {
    const completed = appointments.filter(a => a.status === 'Completed').length;
    const total = appointments.length;
    const completionRate = total > 0 ? (completed / total) * 100 : 0;

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
  }
}
