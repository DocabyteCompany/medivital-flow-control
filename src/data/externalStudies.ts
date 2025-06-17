
export interface ExternalStudy {
  id: string;
  patientId: string;
  studyType: 'Radiología' | 'Laboratorio' | 'Cardiología' | 'Neurología' | 'Otros';
  title: string;
  fileUrl: string; // URL al archivo (PDF, imagen)
  fileName: string;
  laboratory: string; // Nombre del laboratorio externo
  date: string; // Fecha del estudio
  doctorId: string; // Doctor que carga el estudio
  doctorName: string;
  notes?: string; // Notas adicionales
  uploadedAt: string;
}

export const externalStudies: ExternalStudy[] = [
  {
    id: 'study1',
    patientId: '1', // Jorge Villareal
    studyType: 'Radiología',
    title: 'Resonancia Magnética Cerebral',
    fileUrl: '/placeholder-study.pdf',
    fileName: 'RM_Cerebral_Jorge_2025.pdf',
    laboratory: 'Centro de Diagnóstico Médico',
    date: '2025-06-10T10:00:00',
    doctorId: '1',
    doctorName: 'Dr. García',
    notes: 'Estudio solicitado por sintomatología neurológica',
    uploadedAt: '2025-06-11T09:30:00'
  },
  {
    id: 'study2',
    patientId: '2', // Sofía Ramirez
    studyType: 'Laboratorio',
    title: 'Hemograma Completo',
    fileUrl: '/placeholder-lab.pdf',
    fileName: 'Hemograma_Sofia_2025.pdf',
    laboratory: 'Laboratorio Central',
    date: '2025-06-12T08:00:00',
    doctorId: '2',
    doctorName: 'Dra. López',
    notes: 'Control de rutina pediátrica',
    uploadedAt: '2025-06-12T16:45:00'
  }
];

export const getStudiesByPatient = (patientId: string) => {
  return externalStudies
    .filter(study => study.patientId === patientId)
    .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
};

export const addExternalStudy = (study: Omit<ExternalStudy, 'id' | 'uploadedAt'>) => {
  const newStudy: ExternalStudy = {
    ...study,
    id: `study${Date.now()}`,
    uploadedAt: new Date().toISOString()
  };
  externalStudies.push(newStudy);
  return newStudy;
};
