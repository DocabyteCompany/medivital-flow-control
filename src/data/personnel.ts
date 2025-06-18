
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
    specialty: 'Cardiología',
    avatar: `https://i.pravatar.cc/150?u=elian`,
    online: true,
    phone: '555-0101',
    email: 'elian.villegas@example.com',
  },
  {
    id: '2',
    name: 'Dra. María García',
    role: 'Doctor',
    specialty: 'Pediatría',
    avatar: `https://i.pravatar.cc/150?u=maria`,
    online: false,
    phone: '555-0102',
    email: 'maria.garcia@example.com',
  },
  {
    id: '3',
    name: 'Dr. Carlos Sánchez',
    role: 'Doctor',
    specialty: 'Neurología',
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
    specialty: 'Dermatología',
    avatar: `https://i.pravatar.cc/150?u=ana`,
    online: true,
    phone: '555-0106',
    email: 'ana.lopez@example.com',
  },
  {
    id: '7',
    name: 'Dr. Miguel Torres',
    role: 'Doctor',
    specialty: 'Traumatología',
    avatar: `https://i.pravatar.cc/150?u=miguel`,
    online: true,
    phone: '555-0107',
    email: 'miguel.torres@example.com',
  },
  {
    id: '8',
    name: 'Dra. Carmen Ruiz',
    role: 'Doctor',
    specialty: 'Ginecología',
    avatar: `https://i.pravatar.cc/150?u=carmen`,
    online: false,
    phone: '555-0108',
    email: 'carmen.ruiz@example.com',
  },
  {
    id: '9',
    name: 'Dr. José Herrera',
    role: 'Doctor',
    specialty: 'Cardiología',
    avatar: `https://i.pravatar.cc/150?u=jose`,
    online: true,
    phone: '555-0109',
    email: 'jose.herrera@example.com',
  },
  {
    id: '10',
    name: 'Patricia Silva',
    role: 'Enfermera',
    specialty: 'Enfermería General',
    avatar: `https://i.pravatar.cc/150?u=patricia`,
    online: true,
    phone: '555-0110',
    email: 'patricia.silva@example.com',
  },
  {
    id: '11',
    name: 'Luis Morales',
    role: 'Radiólogo',
    specialty: 'Radiología',
    avatar: `https://i.pravatar.cc/150?u=luis`,
    online: false,
    phone: '555-0111',
    email: 'luis.morales@example.com',
  },
  {
    id: '12',
    name: 'Ana Fernández',
    role: 'Administrativo',
    specialty: 'Recursos Humanos',
    avatar: `https://i.pravatar.cc/150?u=anaf`,
    online: true,
    phone: '555-0112',
    email: 'ana.fernandez@example.com',
  },
];
