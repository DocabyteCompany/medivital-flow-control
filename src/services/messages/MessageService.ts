
import { personnel, Personnel } from '@/data/personnel';
import { Message } from '../messageService';
import { MessageRepository } from './MessageRepository';
import { MessageUtils } from './MessageUtils';

export class MessageService {
  static getConversations() {
    return MessageRepository.getConversations();
  }

  static getMessages(conversationId: string) {
    return MessageRepository.getMessages(conversationId);
  }

  static sendMessage(conversationId: string, text: string, isUrgent = false): Message {
    const newMessage = MessageUtils.createMessage(conversationId, text, 'current-user', isUrgent);
    
    // Guardar mensaje
    const messages = MessageRepository.getMessages(conversationId);
    messages.push(newMessage);
    MessageRepository.saveMessages(conversationId, messages);

    // Actualizar conversación
    const conversations = MessageRepository.getConversations();
    const conversationIndex = conversations.findIndex(c => c.id === conversationId);
    if (conversationIndex !== -1) {
      conversations[conversationIndex].lastMessage = newMessage;
      MessageRepository.saveConversations(conversations);
    }

    MessageUtils.triggerMessageUpdate(conversationId, newMessage);
    return newMessage;
  }

  static markAsRead(conversationId: string): void {
    const conversations = MessageRepository.getConversations();
    const conversationIndex = conversations.findIndex(c => c.id === conversationId);
    if (conversationIndex !== -1) {
      conversations[conversationIndex].unreadCount = 0;
      MessageRepository.saveConversations(conversations);
      MessageUtils.triggerConversationUpdate(conversationId);
    }
  }

  static getPersonnelForRole(currentRole: 'Admin' | 'Doctor'): Personnel[] {
    if (currentRole === 'Admin') {
      return personnel;
    }
    return personnel.filter(p => p.role === 'Doctor');
  }

  static getTotalUnreadCount(): number {
    return MessageRepository.getTotalUnreadCount();
  }

  static simulateIncomingMessage(conversationId: string, senderId: string, text: string): void {
    const newMessage = MessageUtils.createMessage(conversationId, text, senderId, false);
    
    const messages = MessageRepository.getMessages(conversationId);
    messages.push(newMessage);
    MessageRepository.saveMessages(conversationId, messages);

    const conversations = MessageRepository.getConversations();
    const conversationIndex = conversations.findIndex(c => c.id === conversationId);
    if (conversationIndex !== -1) {
      conversations[conversationIndex].lastMessage = newMessage;
      conversations[conversationIndex].unreadCount += 1;
      MessageRepository.saveConversations(conversations);
    }

    MessageUtils.triggerMessageUpdate(conversationId, newMessage);
  }
}
