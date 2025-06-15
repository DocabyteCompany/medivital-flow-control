
export type PersonnelRole = 'Doctor' | 'Enfermera' | 'Técnico' | 'Administrativo' | 'Radiólogo';

export interface Personnel {
  id: string;
  name: string;
  role: PersonnelRole;
  specialty?: string;
  avatar: string;
  online: boolean;
  phone: string;
  email: string;
}

export const personnel: Personnel[] = [
  {
    id: '1',
    name: 'Dr. Elian Villegas',
    role: 'Doctor',
    specialty: 'Cardiologist',
    avatar: `https://i.pravatar.cc/150?u=elian`,
    online: true,
    phone: '555-0101',
    email: 'elian.villegas@example.com',
  },
  {
    id: '2',
    name: 'Dra. María García',
    role: 'Doctor',
    specialty: 'Pediatrician',
    avatar: `https://i.pravatar.cc/150?u=maria`,
    online: false,
    phone: '555-0102',
    email: 'maria.garcia@example.com',
  },
  {
    id: '3',
    name: 'Dr. Carlos Sánchez',
    role: 'Doctor',
    specialty: 'Neurologist',
    avatar: `https://i.pravatar.cc/150?u=carlos`,
    online: true,
    phone: '555-0103',
    email: 'carlos.sanchez@example.com',
  },
  {
    id: '4',
    name: 'Laura Martínez',
    role: 'Enfermera',
    specialty: 'Jefa de Enfermeras',
    avatar: `https://i.pravatar.cc/150?u=laura-enf`,
    online: true,
    phone: '555-0104',
    email: 'laura.martinez@example.com',
  },
  {
    id: '5',
    name: 'Roberto Gómez',
    role: 'Técnico',
    specialty: 'Laboratorio',
    avatar: `https://i.pravatar.cc/150?u=roberto`,
    online: false,
    phone: '555-0105',
    email: 'roberto.gomez@example.com',
  },
  {
    id: '6',
    name: 'Dra. Ana López',
    role: 'Doctor',
    specialty: 'Dermatologist',
    avatar: `https://i.pravatar.cc/150?u=ana`,
    online: true,
    phone: '555-0106',
    email: 'ana.lopez@example.com',
  },
];
