
export interface Patient {
  id: string;
  patientId: string; // Nuevo campo ID aleatorio para búsqueda
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
  healthStatus: 'Saludable' | 'En tratamiento' | 'Crítico'; // Agregado para compatibilidad
  address?: string;
  insuranceType?: 'none' | 'public' | 'private' | 'mixed' | 'international';
  insurance?: {
    type: 'none' | 'public' | 'private' | 'mixed' | 'international';
  }; // Agregado para compatibilidad
  createdAt: string;
  createdBy: string;
}

// Función para generar ID aleatorio
const generatePatientId = (): string => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  let result = '';
  
  // 2 letras + 4 números
  for (let i = 0; i < 2; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  for (let i = 0; i < 4; i++) {
    result += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  
  return result;
};

export const patients: Patient[] = [
  { 
    id: '1',
    patientId: 'JV4582',
    name: 'Jorge Villareal', 
    dob: '1967-05-12', 
    gender: 'Masculino', 
    lastVisit: '2025-06-15', 
    bloodType: 'B+', 
    height: 170, 
    weight: 80, 
    occupation: 'Arquitecto', 
    status: 'Saludable',
    healthStatus: 'Saludable',
    phone: '+52 55 1234 5678',
    email: 'jorge.villareal@email.com',
    address: 'Calle Insurgentes 15, Ciudad de México',
    insuranceType: 'private',
    insurance: { type: 'private' },
    createdAt: '2024-01-15T09:00:00',
    createdBy: 'admin'
  },
  { 
    id: '2',
    patientId: 'SR9821',
    name: 'Sofía Ramirez', 
    dob: '2018-11-22', 
    gender: 'Femenino', 
    lastVisit: '2025-06-14', 
    bloodType: 'A-', 
    height: 95, 
    weight: 15, 
    occupation: 'Estudiante', 
    status: 'En tratamiento',
    healthStatus: 'En tratamiento',
    phone: '+52 33 8765 4321',
    email: 'sofia.ramirez@email.com',
    address: 'Avenida Libertad 22, Guadalajara',
    insuranceType: 'public',
    insurance: { type: 'public' },
    createdAt: '2024-02-20T14:30:00',
    createdBy: 'admin'
  },
  { 
    id: '3',
    patientId: 'CL3456',
    name: 'Carlos López', 
    dob: '1980-01-30', 
    gender: 'Masculino', 
    lastVisit: '2025-06-12', 
    bloodType: 'O+', 
    height: 180, 
    weight: 85, 
    occupation: 'Ingeniero', 
    status: 'Saludable',
    healthStatus: 'Saludable',
    phone: '+52 81 9876 5432',
    email: 'carlos.lopez@email.com',
    address: 'Plaza Zaragoza 8, Monterrey',
    insuranceType: 'mixed',
    insurance: { type: 'mixed' },
    createdAt: '2024-03-10T11:15:00',
    createdBy: 'admin'
  },
  { 
    id: '4',
    patientId: 'LM7890',
    name: 'Laura Martínez', 
    dob: '1992-09-05', 
    gender: 'Femenino', 
    lastVisit: '2025-06-10', 
    bloodType: 'AB+', 
    height: 165, 
    weight: 60, 
    occupation: 'Diseñadora', 
    status: 'Saludable',
    healthStatus: 'Saludable',
    phone: '+52 55 4567 8901',
    email: 'laura.martinez@email.com',
    address: 'Calle Reforma 12, Ciudad de México',
    insuranceType: 'private',
    insurance: { type: 'private' },
    createdAt: '2024-04-05T16:45:00',
    createdBy: 'admin'
  },
  { 
    id: '5',
    patientId: 'LM1234',
    name: 'Luis Martinez', 
    dob: '1955-03-18', 
    gender: 'Masculino', 
    lastVisit: '2025-05-28', 
    bloodType: 'A+', 
    height: 175, 
    weight: 78, 
    occupation: 'Jubilado', 
    status: 'Crítico',
    healthStatus: 'Crítico',
    phone: '+52 55 2345 6789',
    email: 'luis.martinez@email.com',
    address: 'Calle Juárez 5, Ciudad de México',
    insuranceType: 'public',
    insurance: { type: 'public' },
    createdAt: '2024-01-20T10:00:00',
    createdBy: 'admin'
  },
  { 
    id: '6',
    patientId: 'SR5678',
    name: 'Sofia Rodriguez', 
    dob: '1988-07-21', 
    gender: 'Femenino', 
    lastVisit: '2025-06-13', 
    bloodType: 'O-', 
    height: 168, 
    weight: 55, 
    occupation: 'Doctora', 
    status: 'Saludable',
    healthStatus: 'Saludable',
    phone: '+52 33 6789 0123',
    email: 'sofia.rodriguez@email.com',
    address: 'Avenida Revolución 30, Guadalajara',
    insuranceType: 'none',
    insurance: { type: 'none' },
    createdAt: '2024-02-28T08:30:00',
    createdBy: 'admin'
  },
  { 
    id: '7',
    patientId: 'JR9012',
    name: 'Jorge Ramos', 
    dob: '1976-02-14', 
    gender: 'Masculino', 
    lastVisit: '2025-06-01', 
    bloodType: 'B-', 
    height: 182, 
    weight: 90, 
    occupation: 'Abogado', 
    status: 'En tratamiento',
    healthStatus: 'En tratamiento',
    phone: '+52 55 7890 1234',
    email: 'jorge.ramos@email.com',
    address: 'Paseo de la Reforma 18, Ciudad de México',
    insuranceType: 'private',
    insurance: { type: 'private' },
    createdAt: '2024-03-15T13:20:00',
    createdBy: 'admin'
  },
];

// Function to add a new patient to the array
export const addPatient = (patientData: Omit<Patient, 'id' | 'patientId' | 'createdAt' | 'createdBy' | 'lastVisit' | 'status'>): Patient => {
  const newPatient: Patient = {
    ...patientData,
    id: `patient_${Date.now()}`,
    patientId: generatePatientId(),
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

// Function to search patients by name or patientId
export const searchPatients = (query: string): Patient[] => {
  if (!query.trim()) return patients;
  
  const searchTerm = query.toLowerCase().trim();
  return patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm) ||
    patient.patientId.toLowerCase().includes(searchTerm)
  );
};
