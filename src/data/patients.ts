
export interface Patient {
  id: string;
  name: string;
  dob: string; // Date of birth
  gender: 'Masculino' | 'Femenino';
  lastVisit: string;
  bloodType: string;
  height: number;
  weight: number;
  occupation: string;
  status: 'Saludable' | 'En tratamiento' | 'Crítico';
}

export const patients: Patient[] = [
  { id: '1', name: 'Jorge Villareal', dob: '1967-05-12', gender: 'Masculino', lastVisit: '2025-06-15', bloodType: 'B+', height: 170, weight: 80, occupation: 'Arquitecto', status: 'Saludable' },
  { id: '2', name: 'Sofía Ramirez', dob: '2018-11-22', gender: 'Femenino', lastVisit: '2025-06-14', bloodType: 'A-', height: 95, weight: 15, occupation: 'Estudiante', status: 'En tratamiento' },
  { id: '3', name: 'Carlos López', dob: '1980-01-30', gender: 'Masculino', lastVisit: '2025-06-12', bloodType: 'O+', height: 180, weight: 85, occupation: 'Ingeniero', status: 'Saludable' },
  { id: '4', name: 'Laura Martínez', dob: '1992-09-05', gender: 'Femenino', lastVisit: '2025-06-10', bloodType: 'AB+', height: 165, weight: 60, occupation: 'Diseñadora', status: 'Saludable' },
  { id: '5', name: 'Luis Martinez', dob: '1955-03-18', gender: 'Masculino', lastVisit: '2025-05-28', bloodType: 'A+', height: 175, weight: 78, occupation: 'Jubilado', status: 'Crítico' },
  { id: '6', name: 'Sofia Rodriguez', dob: '1988-07-21', gender: 'Femenino', lastVisit: '2025-06-13', bloodType: 'O-', height: 168, weight: 55, occupation: 'Doctora', status: 'Saludable' },
  { id: '7', name: 'Jorge Ramos', dob: '1976-02-14', gender: 'Masculino', lastVisit: '2025-06-01', bloodType: 'B-', height: 182, weight: 90, occupation: 'Abogado', status: 'En tratamiento' },
];
