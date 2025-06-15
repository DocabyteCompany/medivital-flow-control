export interface Message {
  id: number;
  text: string;
  timestamp: string;
  sender: 'me' | string;
  avatar?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  online: boolean;
  lastMessage: {
    text: string;
    time: string;
  };
}

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Elian Villegas',
    specialty: 'Cardiologist',
    avatar: `https://i.pravatar.cc/150?u=elian`,
    online: true,
    lastMessage: {
      text: 'Perfecto, nos vemos entonces.',
      time: '10:40 AM',
    },
  },
  {
    id: '2',
    name: 'Dra. María García',
    specialty: 'Pediatrician',
    avatar: `https://i.pravatar.cc/150?u=maria`,
    online: false,
    lastMessage: {
      text: 'Recuerda la cita de mañana.',
      time: 'Ayer',
    },
  },
  {
    id: '3',
    name: 'Dr. Carlos Sánchez',
    specialty: 'Neurologist',
    avatar: `https://i.pravatar.cc/150?u=carlos`,
    online: true,
    lastMessage: {
      text: 'El resultado de los análisis está listo.',
      time: 'Hace 2 días',
    },
  },
    {
    id: '4',
    name: 'Dra. Ana López',
    specialty: 'Dermatologist',
    avatar: `https://i.pravatar.cc/150?u=ana`,
    online: false,
    lastMessage: {
      text: 'Por favor, envíeme las fotos.',
      time: 'Hace 3 días',
    },
  },
];

export const messages: Record<string, Message[]> = {
  '1': [
    { id: 1, text: 'Dr. Villegas, le he agendado un nuevo paciente, Jorge Villareal. Fue referido por el Dr. Carlos Sánchez debido a un cuadro de arritmia complejo. Le he preparado un resumen con los puntos clave para su especialidad.', sender: 'me', timestamp: '11:10 AM' },
    { id: 2, text: 'Puede revisar el resumen aquí:', sender: 'me', timestamp: '11:10 AM' },
    { id: 3, text: '[Ir al resumen de Jorge Villareal](/ia-activities?title=Resumen%20m%C3%A9dico%20para%20Jorge%20Villareal&type=summary)', sender: 'me', timestamp: '11:10 AM' },
    { id: 4, text: 'Perfecto, gracias. Lo reviso de inmediato y me pongo en contacto con el equipo.', sender: '1', timestamp: '11:12 AM', avatar: `https://i.pravatar.cc/150?u=elian` },
  ],
  '2': [
    { id: 1, text: 'Hola, ¿podrías generar un resumen de la última consulta de la paciente Sofía Ramirez?', sender: '2', timestamp: 'Ayer', avatar: `https://i.pravatar.cc/150?u=maria` },
    { id: 2, text: '¡Claro, Dra. García! He generado el resumen. Puede acceder a él desde aquí:', sender: 'me', timestamp: 'Ayer' },
    { id: 3, text: '[Ir a resumen para Sofía Ramirez](/ia-activities?title=Resumen%20de%20consulta%20para%20Sof%C3%ADa%20Ramirez&type=summary)', sender: 'me', timestamp: 'Ayer' },
    { id: 4, text: 'Muchas gracias.', sender: '2', timestamp: 'Ayer', avatar: `https://i.pravatar.cc/150?u=maria` },
  ],
  '3': [
    { id: 1, text: '(Mensaje de Enf. Laura) Dr. Sánchez, el paciente Jorge Villareal de la cama 204 presenta arritmia y su estado se complica. ¿Qué indicamos?', sender: '3', timestamp: '10:55 AM', avatar: `https://i.pravatar.cc/150?u=carlos` },
    { id: 2, text: 'Gracias, Laura. Estabilícenlo y preparen su traslado. Voy a contactar al Dr. Villegas, es un caso para él. Por favor, IA, notifica al Dr. Villegas y envíale un resumen del caso.', sender: '3', timestamp: '11:00 AM', avatar: `https://i.pravatar.cc/150?u=carlos` },
    { id: 3, text: 'Entendido, Dr. Sánchez. He notificado al Dr. Villegas y le he enviado un resumen del caso del paciente Jorge Villareal. Puede seguir la actividad si lo desea.', sender: 'me', timestamp: '11:02 AM' },
  ],
  '4': [
    { id: 1, text: 'Hola, necesito que realices una llamada de seguimiento a la paciente Laura Martínez. Ha terminado su tratamiento y quiero verificar su estado.', sender: '4', timestamp: 'Hace 2 días', avatar: `https://i.pravatar.cc/150?u=ana` },
    { id: 2, text: 'Por supuesto, Dra. López. He iniciado la llamada y le notificaré el resultado. Puede ver los detalles de la actividad aquí:', sender: 'me', timestamp: 'Hace 2 días' },
    { id: 3, text: '[Ir a llamada con Laura Martínez](/ia-activities?title=Llamada%20con%20paciente%20Laura%20Mart%C3%ADnez&type=call)', sender: 'me', timestamp: 'Hace 2 días' },
    { id: 4, text: 'Excelente, quedo al pendiente.', sender: '4', timestamp: 'Hace 2 días', avatar: `https://i.pravatar.cc/150?u=ana` },
  ],
};
