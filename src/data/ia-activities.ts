
import { Activity } from '@/components/ia/ActivityCard';

export const activities: Activity[] = [
  {
    id: '1',
    type: 'call',
    title: 'Llamada con Juan Pérez',
    description: 'Resumen de la llamada sobre los resultados de su último análisis de sangre.',
    timestamp: 'Hoy a las 10:30 AM',
    status: 'completed',
    details: { duration: '15 min', transcript: '...' }
  },
  {
    id: '2',
    type: 'summary',
    title: 'Resumen generado para María García',
    description: 'IA generó un resumen de la última consulta de María sobre su tratamiento.',
    timestamp: 'Hoy a las 09:45 AM',
    status: 'completed',
  },
  {
    id: '3',
    type: 'schedule',
    title: 'Cita agendada para Carlos López',
    description: 'Se agendó una cita de seguimiento para el próximo martes.',
    timestamp: 'Ayer a las 4:00 PM',
    status: 'completed',
  },
  {
    id: '4',
    type: 'call',
    title: 'Llamada con Ana Fernández',
    description: 'Llamada de seguimiento sobre su recuperación postoperatoria.',
    timestamp: 'hace 2 días',
    status: 'completed',
  },
    {
    id: '5',
    type: 'schedule',
    title: 'Intento de agendar con Luis Martinez',
    description: 'No se pudo contactar al paciente para confirmar la cita.',
    timestamp: 'hace 3 días',
    status: 'failed',
  },
  {
    id: '6',
    type: 'summary',
    title: 'Generando resumen para Sofia Rodriguez',
    description: 'La IA está procesando la transcripción de la última llamada.',
    timestamp: 'En curso...',
    status: 'in-progress',
  }
];
