
import { addPatient, type Patient } from '@/data/patients';
import { addHistoryEntry } from '@/data/recordHistory';

export interface NewPatientData {
  firstName: string;
  lastName: string;
  dni: string;
  email: string;
  phone: string;
  dob: string;
  gender: 'Masculino' | 'Femenino';
  bloodType: string;
  height: number;
  weight: number;
  occupation: string;
  address?: string;
  insuranceType?: 'none' | 'public' | 'private' | 'mixed' | 'international';
}

export const createPatientWithRecord = (data: NewPatientData): Patient => {
  // Create the patient
  const newPatient = addPatient({
    name: `${data.firstName} ${data.lastName}`,
    firstName: data.firstName,
    lastName: data.lastName,
    dni: data.dni,
    email: data.email,
    phone: data.phone,
    dob: data.dob,
    gender: data.gender,
    bloodType: data.bloodType,
    height: data.height,
    weight: data.weight,
    occupation: data.occupation,
    address: data.address,
    insuranceType: data.insuranceType,
  });

  // Generate initial medical record entry
  addHistoryEntry({
    patientId: newPatient.id,
    action: 'notes_added',
    description: 'Paciente registrado en el sistema',
    performedBy: 'current_user',
    performedByName: 'Sistema', // This would come from auth context
    timestamp: new Date().toISOString(),
    details: {
      type: 'patient_creation',
      patientId: newPatient.patientId,
      insuranceType: data.insuranceType,
      initialStatus: 'Saludable'
    }
  });

  return newPatient;
};

export const getInsuranceLabel = (type?: string): string => {
  switch (type) {
    case 'none': return 'Sin seguro';
    case 'public': return 'IMSS/ISSSTE';
    case 'private': return 'Seguro Privado';
    case 'mixed': return 'Seguro Mixto';
    case 'international': return 'Seguro Internacional';
    default: return 'No especificado';
  }
};
