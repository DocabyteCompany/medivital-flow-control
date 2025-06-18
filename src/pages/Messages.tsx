import ChatView from "@/components/messages/ChatView";
import DoctorList from "@/components/messages/DoctorList";
import { GroupChatView } from "@/components/messages/GroupChatView";
import { MessageService, groupChannels } from "@/services/messageService";
import { personnel } from "@/data/personnel";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle } from "lucide-react";
const Messages = () => {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [conversationType, setConversationType] = useState<'individual' | 'group'>('individual');
  const [unreadCount, setUnreadCount] = useState(0);

  // Actualizar contador de mensajes no leídos
  useEffect(() => {
    const updateUnreadCount = () => {
      const totalUnread = MessageService.getTotalUnreadCount();
      setUnreadCount(totalUnread);
    };
    updateUnreadCount();

    // Actualizar cada 5 segundos para simular tiempo real
    const interval = setInterval(updateUnreadCount, 5000);
    return () => clearInterval(interval);
  }, [selectedConversationId]);
  const handleSelectConversation = (id: string, type: 'individual' | 'group') => {
    setSelectedConversationId(id);
    setConversationType(type);

    // Actualizar contador después de seleccionar conversación
    setTimeout(() => {
      const totalUnread = MessageService.getTotalUnreadCount();
      setUnreadCount(totalUnread);
    }, 100);
  };
  const getSelectedDoctor = () => {
    if (conversationType === 'individual' && selectedConversationId) {
      // Buscar si es una conversación existente
      const conversations = MessageService.getConversations();
      const conversation = conversations.find(c => c.id === selectedConversationId);
      if (conversation) {
        const otherParticipant = conversation.participants.find(p => p !== 'current-user');
        return personnel.find(p => p.id === otherParticipant);
      } else {
        // Es un contacto nuevo
        return personnel.find(p => p.id === selectedConversationId);
      }
    }
    return undefined;
  };
  const getSelectedChannel = () => {
    if (conversationType === 'group' && selectedConversationId) {
      return groupChannels.find(c => c.id === selectedConversationId) || null;
    }
    return null;
  };
  return <div className="flex flex-col gap-4 mt-4">
      {/* Header con contador */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-brand-blue" />
          <h1 className="text-2xl font-bold text-brand-dark">Mensajes</h1>
          {unreadCount > 0}
        </div>
        <p className="text-gray-600">
          Comunicación con el equipo médico y personal
        </p>
      </div>

      {/* Chat interface */}
      <Card className="flex h-[calc(100vh-12rem)] overflow-hidden">
        <DoctorList selectedConversationId={selectedConversationId} onSelectConversation={handleSelectConversation} />
        
        {conversationType === 'individual' ? <ChatView doctor={getSelectedDoctor()} /> : <GroupChatView channel={getSelectedChannel()} />}
      </Card>
    </div>;
};
export default Messages;