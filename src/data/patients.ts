
export interface Patient {
  id: string;
  name: string;
  dob: string; // Date of birth
  gender: 'Masculino' | 'Femenino';
  lastVisit: string;
}

export const patients: Patient[] = [
  { id: '1', name: 'Jorge Villareal', dob: '1967-05-12', gender: 'Masculino', lastVisit: '2025-06-15' },
  { id: '2', name: 'Sofía Ramirez', dob: '2018-11-22', gender: 'Femenino', lastVisit: '2025-06-14' },
  { id: '3', name: 'Carlos López', dob: '1980-01-30', gender: 'Masculino', lastVisit: '2025-06-12' },
  { id: '4', name: 'Laura Martínez', dob: '1992-09-05', gender: 'Femenino', lastVisit: '2025-06-10' },
  { id: '5', name: 'Luis Martinez', dob: '1955-03-18', gender: 'Masculino', lastVisit: '2025-05-28' },
  { id: '6', name: 'Sofia Rodriguez', dob: '1988-07-21', gender: 'Femenino', lastVisit: '2025-06-13' },
  { id: '7', name: 'Jorge Ramos', dob: '1976-02-14', gender: 'Masculino', lastVisit: '2025-06-01' },
];
