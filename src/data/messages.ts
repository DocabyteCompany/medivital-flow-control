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
    { id: 1, text: 'Hola, Dr. Villegas. ¿Cómo está?', sender: 'me', timestamp: '10:30 AM' },
    { id: 2, text: '¡Hola! Todo bien por acá. ¿En qué puedo ayudarte?', sender: '1', timestamp: '10:31 AM', avatar: `https://i.pravatar.cc/150?u=elian` },
    { id: 3, text: 'Quería confirmar nuestra reunión de mañana.', sender: 'me', timestamp: '10:35 AM' },
    { id: 4, text: 'Confirmado. Mañana a las 11:00 AM.', sender: '1', timestamp: '10:36 AM', avatar: `https://i.pravatar.cc/150?u=elian` },
    { id: 5, text: 'Perfecto, nos vemos entonces.', sender: 'me', timestamp: '10:40 AM' },
  ],
  '2': [
    { id: 1, text: 'Dra. García, ¿podría hacerme un resumen de nuestra conversación, por favor?', sender: 'me', timestamp: 'Ayer' },
    { id: 2, text: '¡Claro! He generado el resumen. Puedes verlo aquí: [Ir a resumen para Dra. María García](/ia-activities?title=Resumen%20para%20Dra.%20Mar%C3%ADa%20Garc%C3%ADa&type=summary)', sender: '2', timestamp: 'Ayer', avatar: `https://i.pravatar.cc/150?u=maria` },
  ],
  '3': [
    { id: 1, text: 'Dr. Sánchez, ¿están listos mis análisis?', sender: 'me', timestamp: 'Hace 2 días' },
    { id: 2, text: 'Sí, acaban de llegar. Se los adjunto en su expediente.', sender: '3', timestamp: 'Hace 2 días', avatar: `https://i.pravatar.cc/150?u=carlos` },
    { id: 3, text: '(Mensaje de Enf. Laura) Dr. Sánchez, el paciente de la cama 204 presenta fiebre. ¿Indicamos paracetamol?', sender: '3', timestamp: 'Hace 2 días', avatar: `https://i.pravatar.cc/150?u=carlos` },
  ],
  '4': [
    { id: 1, text: 'Dra. López, ¿podría realizar una llamada a este paciente para seguimiento?', sender: 'me', timestamp: 'Hace 3 días' },
    { id: 2, text: 'Por supuesto. He iniciado la llamada. Puedes seguir el estado de la actividad aquí: [Ir a llamada con Dra. Ana López](/ia-activities?title=Llamada%20programada%20con%20Dra.%20Ana%20L%C3%B3pez&type=call)', sender: '4', timestamp: 'Hace 3 días', avatar: `https://i.pravatar.cc/150?u=ana` },
  ],
};
