
import { personnel, Personnel } from '@/data/personnel';

export interface Message {
  id: string;
  text: string;
  timestamp: string;
  senderId: string;
  conversationId: string;
  isRead: boolean;
  isUrgent?: boolean;
  attachments?: MessageAttachment[];
}

export interface MessageAttachment {
  id: string;
  name: string;
  type: 'image' | 'document' | 'study';
  url: string;
  size: number;
}

export interface Conversation {
  id: string;
  type: 'individual' | 'group';
  name?: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
  isArchived: boolean;
  createdAt: string;
}

export interface GroupChannel {
  id: string;
  name: string;
  description: string;
  type: 'specialty' | 'shift' | 'emergency' | 'admin';
  participants: string[];
  color: string;
}

// Canales grupales predefinidos
export const groupChannels: GroupChannel[] = [
  {
    id: 'cardiology',
    name: 'Cardiología',
    description: 'Equipo de cardiología',
    type: 'specialty',
    participants: ['1'], // Dr. Elian Villegas
    color: 'bg-red-500'
  },
  {
    id: 'pediatrics',
    name: 'Pediatría',
    description: 'Equipo de pediatría',
    type: 'specialty',
    participants: ['2'], // Dra. María García
    color: 'bg-blue-500'
  },
  {
    id: 'emergency',
    name: 'Emergencias',
    description: 'Canal para comunicaciones urgentes',
    type: 'emergency',
    participants: ['1', '2', '3', '4'],
    color: 'bg-red-600'
  },
  {
    id: 'admin',
    name: 'Administración',
    description: 'Canal administrativo',
    type: 'admin',
    participants: ['4', '5'],
    color: 'bg-gray-600'
  }
];

// Datos de ejemplo para conversaciones
const sampleConversations: Conversation[] = [
  {
    id: '1',
    type: 'individual',
    participants: ['current-user', '1'],
    unreadCount: 2,
    isArchived: false,
    createdAt: '2024-06-17T10:00:00Z',
    lastMessage: {
      id: 'msg-1',
      text: 'Perfecto, gracias. Lo reviso de inmediato.',
      timestamp: '11:12 AM',
      senderId: '1',
      conversationId: '1',
      isRead: false
    }
  },
  {
    id: '2',
    type: 'individual',
    participants: ['current-user', '2'],
    unreadCount: 0,
    isArchived: false,
    createdAt: '2024-06-16T14:00:00Z',
    lastMessage: {
      id: 'msg-2',
      text: 'Muchas gracias.',
      timestamp: 'Ayer',
      senderId: '2',
      conversationId: '2',
      isRead: true
    }
  },
  {
    id: 'emergency',
    type: 'group',
    name: 'Emergencias',
    participants: ['current-user', '1', '2', '3', '4'],
    unreadCount: 1,
    isArchived: false,
    createdAt: '2024-06-17T08:00:00Z',
    lastMessage: {
      id: 'msg-3',
      text: 'Paciente crítico en camino, ETA 5 minutos',
      timestamp: '10:30 AM',
      senderId: '4',
      conversationId: 'emergency',
      isRead: false,
      isUrgent: true
    }
  }
];

const sampleMessages: Record<string, Message[]> = {
  '1': [
    {
      id: 'msg-1-1',
      text: 'Dr. Villegas, le he agendado un nuevo paciente, Jorge Villareal.',
      senderId: 'current-user',
      conversationId: '1',
      timestamp: '11:10 AM',
      isRead: true
    },
    {
      id: 'msg-1-2',
      text: 'Perfecto, gracias. Lo reviso de inmediato.',
      senderId: '1',
      conversationId: '1',
      timestamp: '11:12 AM',
      isRead: false
    }
  ],
  '2': [
    {
      id: 'msg-2-1',
      text: '¿Podrías generar un resumen de la última consulta?',
      senderId: '2',
      conversationId: '2',
      timestamp: 'Ayer',
      isRead: true
    },
    {
      id: 'msg-2-2',
      text: 'Claro, Dra. García. Aquí está el resumen.',
      senderId: 'current-user',
      conversationId: '2',
      timestamp: 'Ayer',
      isRead: true
    }
  ],
  'emergency': [
    {
      id: 'msg-3-1',
      text: 'Paciente crítico en camino, ETA 5 minutos',
      senderId: '4',
      conversationId: 'emergency',
      timestamp: '10:30 AM',
      isRead: false,
      isUrgent: true
    }
  ]
};

export class MessageService {
  static getConversations(): Conversation[] {
    const stored = localStorage.getItem('conversations');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Error parsing conversations:', error);
      }
    }
    return sampleConversations;
  }

  static getMessages(conversationId: string): Message[] {
    const stored = localStorage.getItem(`messages-${conversationId}`);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Error parsing messages:', error);
      }
    }
    return sampleMessages[conversationId] || [];
  }

  static sendMessage(conversationId: string, text: string, isUrgent = false): Message {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      senderId: 'current-user',
      conversationId,
      isRead: true,
      isUrgent
    };

    const messages = this.getMessages(conversationId);
    messages.push(newMessage);
    localStorage.setItem(`messages-${conversationId}`, JSON.stringify(messages));

    // Update conversation last message
    const conversations = this.getConversations();
    const conversationIndex = conversations.findIndex(c => c.id === conversationId);
    if (conversationIndex !== -1) {
      conversations[conversationIndex].lastMessage = newMessage;
      localStorage.setItem('conversations', JSON.stringify(conversations));
    }

    return newMessage;
  }

  static markAsRead(conversationId: string): void {
    const conversations = this.getConversations();
    const conversationIndex = conversations.findIndex(c => c.id === conversationId);
    if (conversationIndex !== -1) {
      conversations[conversationIndex].unreadCount = 0;
      localStorage.setItem('conversations', JSON.stringify(conversations));
    }
  }

  static getPersonnelForRole(currentRole: 'Admin' | 'Doctor'): Personnel[] {
    if (currentRole === 'Admin') {
      return personnel; // Admin puede ver todo el personal
    }
    return personnel.filter(p => p.role === 'Doctor'); // Doctor solo ve otros doctores
  }

  static getTotalUnreadCount(): number {
    const conversations = this.getConversations();
    return conversations.reduce((total, conv) => total + conv.unreadCount, 0);
  }
}
