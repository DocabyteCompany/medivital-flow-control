
import { PersonnelStats } from '@/types';
import { personnel } from '@/data/personnel';

export class PersonnelStatsCalculator {
  static calculate(): PersonnelStats {
    const total = personnel.length;
    
    // Role distribution
    const doctors = personnel.filter(p => p.role === 'Doctor').length;
    const nurses = personnel.filter(p => p.role === 'Nurse').length;
    const technicians = personnel.filter(p => p.role === 'Technician').length;
    const administrative = personnel.filter(p => p.role === 'Administrative').length;
    const radiologists = personnel.filter(p => p.specialty === 'Radiología').length;

    // Online status (simulated)
    const online = Math.floor(total * 0.85);

    // Specialty distribution
    const bySpecialty = personnel.reduce((acc, person) => {
      if (person.specialty) {
        acc[person.specialty] = (acc[person.specialty] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return {
      total,
      doctors,
      nurses,
      technicians,
      administrative,
      radiologists,
      online,
      bySpecialty
    };
  }
}
