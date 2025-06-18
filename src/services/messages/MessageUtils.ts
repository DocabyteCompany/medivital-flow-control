
import { Message } from '../messageService';

export class MessageUtils {
  static generateMessageId(): string {
    return Date.now().toString();
  }

  static getCurrentTimestamp(): string {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  static createMessage(
    conversationId: string,
    text: string,
    senderId: string = 'current-user',
    isUrgent: boolean = false
  ): Message {
    return {
      id: this.generateMessageId(),
      text,
      timestamp: this.getCurrentTimestamp(),
      senderId,
      conversationId,
      isRead: senderId === 'current-user',
      isUrgent
    };
  }

  static triggerMessageUpdate(conversationId: string, message: Message): void {
    window.dispatchEvent(new CustomEvent('messageUpdate', { 
      detail: { conversationId, message } 
    }));
  }

  static triggerConversationUpdate(conversationId: string): void {
    window.dispatchEvent(new CustomEvent('conversationUpdate', { 
      detail: { conversationId } 
    }));
  }
}
