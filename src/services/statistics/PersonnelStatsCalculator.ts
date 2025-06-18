
import { personnel } from '@/data/personnel';

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

export class PersonnelStatsCalculator {
  static calculate(): PersonnelStats {
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
  }
}
