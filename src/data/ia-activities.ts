
import { Activity } from '@/components/ia/ActivityCard';

export const activities: Activity[] = [
  {
    id: '8',
    type: 'summary',
    title: 'Resumen médico para Jorge Villareal',
    description: 'Resumen del historial del paciente, referido por Dr. Carlos Sánchez por un cuadro de arritmia.',
    timestamp: 'Hoy a las 11:05 AM',
    status: 'completed',
    details: { 
      referido_por: 'Dr. Carlos Sánchez',
      motivo_de_referencia: 'Arritmia ventricular recurrente',
      puntos_clave_cardiologia: 'Paciente masculino, 58 años, con historial de hipertensión. ECG muestra QRS ancho y extrasístoles ventriculares frecuentes. Se recomienda ecocardiograma y posible ablación.',
      paciente: 'Jorge Villareal'
    }
  },
  {
    id: '2',
    type: 'summary',
    title: 'Resumen de consulta para Sofía Ramirez',
    description: 'Resumen de la última consulta pediátrica, solicitado por la Dra. María García.',
    timestamp: 'Ayer a las 3:20 PM',
    status: 'completed',
    details: {
      solicitado_por: 'Dra. María García',
      paciente: 'Sofía Ramirez',
      fuente: 'Consulta del 14/06/2025'
    }
  },
  {
    id: '4',
    type: 'call',
    title: 'Llamada con paciente Laura Martínez',
    description: 'Llamada de seguimiento post-tratamiento dermatológico, solicitada por Dra. Ana López.',
    timestamp: 'Hace 2 días',
    status: 'completed',
    details: { 
      solicitado_por: 'Dra. Ana López',
      paciente: 'Laura Martínez',
      duracion: '8 min',
      sentiment: 'Positivo',
      resumen_llamada: 'Paciente reporta mejoría significativa y sin efectos adversos.'
    }
  },
  {
    id: '1',
    type: 'call',
    title: 'Llamada con Juan Pérez',
    description: 'Resumen de la llamada sobre los resultados de su último análisis de sangre.',
    timestamp: 'Hoy a las 10:30 AM',
    status: 'completed',
    details: { 
      duration: '15 min', 
      sentiment: 'Positivo'
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
      attempts: '1',
      sentiment: 'Negativo'
    }
  }
];
