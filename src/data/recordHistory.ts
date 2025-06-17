
export interface RecordHistoryEntry {
  id: string;
  patientId: string;
  action: 'referral_created' | 'referral_cancelled' | 'referral_accepted' | 'referral_transferred' | 'summary_generated' | 'notes_added' | 'vitals_updated';
  description: string;
  performedBy: string; // doctor/admin ID
  performedByName: string;
  timestamp: string;
  details?: Record<string, any>;
}

export const recordHistory: RecordHistoryEntry[] = [
  {
    id: 'hist1',
    patientId: '1',
    action: 'referral_created',
    description: 'Referido creado para evaluación neurológica',
    performedBy: '1',
    performedByName: 'Dr. García',
    timestamp: '2025-06-15T14:30:00',
    details: { specialty: 'Neurología', urgency: 'Medium' }
  },
  {
    id: 'hist2',
    patientId: '1',
    action: 'referral_accepted',
    description: 'Referido aceptado por especialista',
    performedBy: '3',
    performedByName: 'Dr. Rodríguez',
    timestamp: '2025-06-16T09:00:00'
  },
  {
    id: 'hist3',
    patientId: '2',
    action: 'summary_generated',
    description: 'Resumen de expediente generado por IA',
    performedBy: '2',
    performedByName: 'Dra. López',
    timestamp: '2025-06-14T16:45:00'
  }
];

export const getPatientHistory = (patientId: string) => {
  return recordHistory
    .filter(entry => entry.patientId === patientId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const addHistoryEntry = (entry: Omit<RecordHistoryEntry, 'id'>) => {
  const newEntry: RecordHistoryEntry = {
    ...entry,
    id: `hist${Date.now()}`
  };
  recordHistory.push(newEntry);
  return newEntry;
};
