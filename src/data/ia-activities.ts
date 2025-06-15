import { Activity } from '@/components/ia/ActivityCard';

export const activities: Activity[] = [
  {
    id: '1',
    type: 'call',
    title: 'Llamada con Juan Pérez',
    description: 'Resumen de la llamada sobre los resultados de su último análisis de sangre.',
    timestamp: 'Hoy a las 10:30 AM',
    status: 'completed',
    details: { 
      duration: '15 min', 
      transcript_preview: 'La transcripción de la llamada está disponible...',
      sentiment: 'Positivo'
    }
  },
  {
    id: '2',
    type: 'summary',
    title: 'Resumen generado para María García',
    description: 'IA generó un resumen de la última consulta de María sobre su tratamiento.',
    timestamp: 'Hoy a las 09:45 AM',
    status: 'completed',
    details: {
      source_document: 'Consulta del 14/06/2025',
      link_to_record: '/expedientes/maria-garcia/resumen-1'
    }
  },
  {
    id: '3',
    type: 'schedule',
    title: 'Cita agendada para Carlos López',
    description: 'Se agendó una cita de seguimiento para el próximo martes.',
    timestamp: 'Ayer a las 4:00 PM',
    status: 'completed',
    details: {
      doctor: 'Dr. Alan Morales',
      specialty: 'Cardiología',
      date: 'Martes, 17 de Junio - 11:00 AM'
    }
  },
  {
    id: '4',
    type: 'call',
    title: 'Llamada con Ana Fernández',
    description: 'Llamada de seguimiento sobre su recuperación postoperatoria.',
    timestamp: 'hace 2 días',
    status: 'completed',
    details: { 
      duration: '8 min',
      sentiment: 'Neutral'
    }
  },
    {
    id: '5',
    type: 'schedule',
    title: 'Intento de agendar con Luis Martinez',
    description: 'No se pudo contactar al paciente para confirmar la cita.',
    timestamp: 'hace 3 días',
    status: 'failed',
    details: {
      failure_reason: 'Paciente no responde la llamada',
      attempts: '3'
    }
  },
  {
    id: '6',
    type: 'summary',
    title: 'Generando resumen para Sofia Rodriguez',
    description: 'La IA está procesando la transcripción de la última llamada.',
    timestamp: 'En curso...',
    status: 'in-progress',
  },
  {
    id: '7',
    type: 'call',
    title: 'Llamada fallida con Jorge Ramos',
    description: 'No se pudo establecer conexión con el paciente.',
    timestamp: 'Hace 1 hora',
    status: 'failed',
    details: {
      failure_reason: 'Número no disponible',
      attempts: '1'
    }
  }
];
