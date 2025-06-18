
import { AppointmentStats } from '@/types';
import { appointments } from '@/data/appointments';

export class AppointmentStatsCalculator {
  static calculate(): AppointmentStats {
    const total = appointments.length;
    
    // Status distribution
    const completed = appointments.filter(a => a.status === 'Completada').length;
    const scheduled = appointments.filter(a => a.status === 'Programada').length;
    const cancelled = appointments.filter(a => a.status === 'Cancelada').length;
    const rescheduled = appointments.filter(a => a.status === 'Reprogramada').length;

    // Completion rate
    const completionRate = total > 0 ? (completed / total) * 100 : 0;

    // Monthly trend (mock data)
    const monthlyTrend = [
      { month: 'Ene', count: 245 },
      { month: 'Feb', count: 289 },
      { month: 'Mar', count: 312 },
      { month: 'Abr', count: 298 },
      { month: 'May', count: 334 },
      { month: 'Jun', count: 367 }
    ];

    return {
      total,
      completed,
      scheduled,
      cancelled,
      rescheduled,
      completionRate,
      monthlyTrend
    };
  }
}
