
import { personnel } from './personnel';
import { patients } from './patients';

export interface Appointment {
  id: string;
  patientId: string;
  personnelId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  type: string;
  status: 'Completed' | 'Scheduled' | 'Cancelled';
}

export const appointments: Appointment[] = [
  // Jorge Villareal (id: 1)
  { id: 'app1', patientId: '1', personnelId: '1', date: '2025-06-15', time: '10:00', type: 'Revisión Cardiológica', status: 'Completed' },
  { id: 'app2', patientId: '1', personnelId: '2', date: '2025-06-22', time: '11:30', type: 'Seguimiento', status: 'Scheduled' },

  // Sofía Ramirez (id: 2)
  { id: 'app3', patientId: '2', personnelId: '2', date: '2025-06-14', time: '09:00', type: 'Consulta Pediátrica', status: 'Completed' },
  { id: 'app4', patientId: '2', personnelId: '2', date: '2025-07-01', time: '09:00', type: 'Vacunación', status: 'Scheduled' },

  // Carlos López (id: 3)
  { id: 'app5', patientId: '3', personnelId: '3', date: '2025-06-12', time: '14:00', type: 'Consulta Neurológica', status: 'Completed' },
  { id: 'app6', patientId: '3', personnelId: '1', date: '2025-08-10', time: '16:00', type: 'Chequeo Anual', status: 'Scheduled' },

  // Laura Martínez (id: 4)
  { id: 'app7', patientId: '4', personnelId: '6', date: '2025-06-10', time: '11:00', type: 'Seguimiento Dermatológico', status: 'Completed' },
  { id: 'app8', patientId: '4', personnelId: '6', date: '2025-12-10', time: '11:00', type: 'Revisión Anual de Piel', status: 'Scheduled' },
  
  // Luis Martinez (id: 5)
  { id: 'app9', patientId: '5', personnelId: '1', date: '2025-05-28', time: '08:30', type: 'Cardiología de Urgencia', status: 'Completed' },
  { id: 'app10', patientId: '5', personnelId: '1', date: '2025-06-18', time: '09:00', type: 'Seguimiento Post-crítico', status: 'Scheduled' },

  // Sofia Rodriguez (id: 6)
  { id: 'app11', patientId: '6', personnelId: '1', date: '2025-06-13', time: '15:00', type: 'Consulta General', status: 'Completed' },

  // Jorge Ramos (id: 7)
  { id: 'app12', patientId: '7', personnelId: '3', date: '2025-06-01', time: '12:00', type: 'Seguimiento Neurológico', status: 'Completed' },
  { id: 'app13', patientId: '7', personnelId: '3', date: '2025-07-15', time: '12:00', type: 'Revisión de Tratamiento', status: 'Scheduled' },
];

export const getDoctorForAppointment = (personnelId: string) => {
    return personnel.find(p => p.id === personnelId);
}

export const getPatientForAppointment = (patientId: string) => {
    return patients.find(p => p.id === patientId);
}
