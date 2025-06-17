
export interface Patient {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  dni?: string;
  email?: string;
  phone?: string;
  dob: string; // Date of birth
  gender: 'Masculino' | 'Femenino';
  lastVisit: string;
  bloodType: string;
  height: number;
  weight: number;
  occupation: string;
  status: 'Saludable' | 'En tratamiento' | 'Crítico';
  address?: string;
  insuranceType?: 'none' | 'public' | 'private' | 'mixed' | 'international';
  createdAt: string;
  createdBy: string;
}

export const patients: Patient[] = [
  { 
    id: '1', 
    name: 'Jorge Villareal', 
    dob: '1967-05-12', 
    gender: 'Masculino', 
    lastVisit: '2025-06-15', 
    bloodType: 'B+', 
    height: 170, 
    weight: 80, 
    occupation: 'Arquitecto', 
    status: 'Saludable',
    phone: '+34 612 345 678',
    email: 'jorge.villareal@email.com',
    address: 'Calle Mayor 15, Madrid',
    insuranceType: 'private',
    createdAt: '2024-01-15T09:00:00',
    createdBy: 'admin'
  },
  { 
    id: '2', 
    name: 'Sofía Ramirez', 
    dob: '2018-11-22', 
    gender: 'Femenino', 
    lastVisit: '2025-06-14', 
    bloodType: 'A-', 
    height: 95, 
    weight: 15, 
    occupation: 'Estudiante', 
    status: 'En tratamiento',
    phone: '+34 687 123 456',
    email: 'sofia.ramirez@email.com',
    address: 'Avenida Libertad 22, Barcelona',
    insuranceType: 'public',
    createdAt: '2024-02-20T14:30:00',
    createdBy: 'admin'
  },
  { 
    id: '3', 
    name: 'Carlos López', 
    dob: '1980-01-30', 
    gender: 'Masculino', 
    lastVisit: '2025-06-12', 
    bloodType: 'O+', 
    height: 180, 
    weight: 85, 
    occupation: 'Ingeniero', 
    status: 'Saludable',
    phone: '+34 654 987 321',
    email: 'carlos.lopez@email.com',
    address: 'Plaza España 8, Valencia',
    insuranceType: 'mixed',
    createdAt: '2024-03-10T11:15:00',
    createdBy: 'admin'
  },
  { 
    id: '4', 
    name: 'Laura Martínez', 
    dob: '1992-09-05', 
    gender: 'Femenino', 
    lastVisit: '2025-06-10', 
    bloodType: 'AB+', 
    height: 165, 
    weight: 60, 
    occupation: 'Diseñadora', 
    status: 'Saludable',
    phone: '+34 698 456 789',
    email: 'laura.martinez@email.com',
    address: 'Calle Paz 12, Sevilla',
    insuranceType: 'private',
    createdAt: '2024-04-05T16:45:00',
    createdBy: 'admin'
  },
  { 
    id: '5', 
    name: 'Luis Martinez', 
    dob: '1955-03-18', 
    gender: 'Masculino', 
    lastVisit: '2025-05-28', 
    bloodType: 'A+', 
    height: 175, 
    weight: 78, 
    occupation: 'Jubilado', 
    status: 'Crítico',
    phone: '+34 676 234 567',
    email: 'luis.martinez@email.com',
    address: 'Calle Sol 5, Bilbao',
    insuranceType: 'public',
    createdAt: '2024-01-20T10:00:00',
    createdBy: 'admin'
  },
  { 
    id: '6', 
    name: 'Sofia Rodriguez', 
    dob: '1988-07-21', 
    gender: 'Femenino', 
    lastVisit: '2025-06-13', 
    bloodType: 'O-', 
    height: 168, 
    weight: 55, 
    occupation: 'Doctora', 
    status: 'Saludable',
    phone: '+34 645 678 912',
    email: 'sofia.rodriguez@email.com',
    address: 'Avenida Constitución 30, Granada',
    insuranceType: 'none',
    createdAt: '2024-02-28T08:30:00',
    createdBy: 'admin'
  },
  { 
    id: '7', 
    name: 'Jorge Ramos', 
    dob: '1976-02-14', 
    gender: 'Masculino', 
    lastVisit: '2025-06-01', 
    bloodType: 'B-', 
    height: 182, 
    weight: 90, 
    occupation: 'Abogado', 
    status: 'En tratamiento',
    phone: '+34 623 789 456',
    email: 'jorge.ramos@email.com',
    address: 'Paseo Gracia 18, Barcelona',
    insuranceType: 'private',
    createdAt: '2024-03-15T13:20:00',
    createdBy: 'admin'
  },
];

// Function to add a new patient to the array
export const addPatient = (patientData: Omit<Patient, 'id' | 'createdAt' | 'createdBy' | 'lastVisit' | 'status'>): Patient => {
  const newPatient: Patient = {
    ...patientData,
    id: `patient_${Date.now()}`,
    createdAt: new Date().toISOString(),
    createdBy: 'current_user', // This would come from auth context in real app
    lastVisit: new Date().toISOString().split('T')[0],
    status: 'Saludable'
  };
  
  patients.push(newPatient);
  return newPatient;
};

// Function to get patient by ID
export const getPatientById = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};
