
import { personnel } from './personnel';
import { patients } from './patients';

export interface MedicalReferral {
  id: string;
  patientId: string;
  fromDoctorId: string; // Doctor que hace el referido
  toDoctorId: string; // Doctor que recibe el referido
  specialty: string;
  reason: string;
  urgency: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Pending' | 'Accepted' | 'Transferred' | 'Completed' | 'Cancelled';
  notes?: string;
  createdAt: string;
  updatedAt: string;
  allowSummaryAccess: boolean; // Pre-autorización para acceso a resumen
  transferHistory?: {
    fromDoctorId: string;
    toDoctorId: string;
    reason: string;
    date: string;
  }[];
}

export const referrals: MedicalReferral[] = [
  {
    id: 'ref1',
    patientId: '1', // Jorge Villareal
    fromDoctorId: '1', // Dr. García (Cardiólogo)
    toDoctorId: '3', // Dr. Rodríguez (Neurólogo)
    specialty: 'Neurología',
    reason: 'Evaluación de dolores de cabeza recurrentes post-procedimiento cardiológico',
    urgency: 'Medium',
    status: 'Accepted',
    notes: 'Paciente presenta cefaleas desde intervención. Requiere evaluación neurológica.',
    createdAt: '2025-06-15T14:30:00',
    updatedAt: '2025-06-16T09:00:00',
    allowSummaryAccess: true
  },
  {
    id: 'ref2',
    patientId: '3', // Carlos López
    fromDoctorId: '3', // Dr. Rodríguez (Neurólogo)
    toDoctorId: '1', // Dr. García (Cardiólogo)
    specialty: 'Cardiología',
    reason: 'Evaluación cardiológica pre-cirugía neurológica',
    urgency: 'High',
    status: 'Pending',
    notes: 'Paciente requiere clearance cardiológico antes de procedimiento neurológico mayor.',
    createdAt: '2025-06-16T11:00:00',
    updatedAt: '2025-06-16T11:00:00',
    allowSummaryAccess: true
  },
  {
    id: 'ref3',
    patientId: '2', // Sofía Ramirez
    fromDoctorId: '2', // Dra. López (Pediatra)
    toDoctorId: '6', // Dr. Morales (Dermatólogo)
    specialty: 'Dermatología',
    reason: 'Evaluación de lesión cutánea en menor',
    urgency: 'Low',
    status: 'Transferred',
    notes: 'Lesión pigmentada requiere evaluación especializada.',
    createdAt: '2025-06-10T16:20:00',
    updatedAt: '2025-06-12T10:15:00',
    allowSummaryAccess: false,
    transferHistory: [{
      fromDoctorId: '6', // Dr. Morales
      toDoctorId: '1', // Dr. García (como ejemplo de transferencia)
      reason: 'No disponible esta semana, derivado a colega',
      date: '2025-06-12T10:15:00'
    }]
  }
];

export const getReferralsByPatient = (patientId: string) => {
  return referrals.filter(ref => ref.patientId === patientId);
};

export const getReferralsByDoctor = (doctorId: string) => {
  return referrals.filter(ref => ref.toDoctorId === doctorId || ref.fromDoctorId === doctorId);
};

export const getPendingReferralsForDoctor = (doctorId: string) => {
  return referrals.filter(ref => ref.toDoctorId === doctorId && ref.status === 'Pending');
};

export const getDoctorForReferral = (doctorId: string) => {
  return personnel.find(p => p.id === doctorId);
};

export const getPatientForReferral = (patientId: string) => {
  return patients.find(p => p.id === patientId);
};
