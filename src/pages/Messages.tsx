
import ChatView from "@/components/messages/ChatView";
import DoctorList from "@/components/messages/DoctorList";
import { GroupChatView } from "@/components/messages/GroupChatView";
import { MessageService, groupChannels } from "@/services/messageService";
import { personnel } from "@/data/personnel";
import { useState } from "react";
import { Card } from "@/components/ui/card";

const Messages = () => {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [conversationType, setConversationType] = useState<'individual' | 'group'>('individual');

  const handleSelectConversation = (id: string, type: 'individual' | 'group') => {
    setSelectedConversationId(id);
    setConversationType(type);
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

  return (
    <Card className="flex h-[calc(100vh-8.5rem)] overflow-hidden">
      <DoctorList 
        selectedConversationId={selectedConversationId} 
        onSelectConversation={handleSelectConversation} 
      />
      
      {conversationType === 'individual' ? (
        <ChatView doctor={getSelectedDoctor()} />
      ) : (
        <GroupChatView channel={getSelectedChannel()} />
      )}
    </Card>
  );
};

export default Messages;
