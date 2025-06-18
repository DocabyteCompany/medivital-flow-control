
import { Message, Conversation } from '../messageService';
import { StorageService } from '../storage/StorageService';

export class MessageRepository {
  private static sampleConversations: Conversation[] = [
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

  private static sampleMessages: Record<string, Message[]> = {
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

  static getConversations(): Conversation[] {
    return StorageService.getConversations(this.sampleConversations) || this.sampleConversations;
  }

  static saveConversations(conversations: Conversation[]): void {
    StorageService.setConversations(conversations);
  }

  static getMessages(conversationId: string): Message[] {
    return StorageService.getMessages(conversationId, this.sampleMessages[conversationId]) || [];
  }

  static saveMessages(conversationId: string, messages: Message[]): void {
    StorageService.setMessages(conversationId, messages);
  }

  static getTotalUnreadCount(): number {
    const conversations = this.getConversations();
    return conversations.reduce((total, conv) => total + conv.unreadCount, 0);
  }
}
