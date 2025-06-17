
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Personnel } from "@/data/personnel";
import { MessageService, Message } from "@/services/messageService";
import { cn } from "@/lib/utils";
import { Phone, Send, Video } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";

interface ChatViewProps {
  doctor: Personnel | undefined;
}

const ChatView = ({ doctor }: ChatViewProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (doctor) {
      // Buscar conversación existente o crear una nueva
      const conversations = MessageService.getConversations();
      const existingConv = conversations.find(c => 
        c.type === 'individual' && 
        c.participants.includes(doctor.id) && 
        c.participants.includes('current-user')
      );
      
      if (existingConv) {
        const msgs = MessageService.getMessages(existingConv.id);
        setMessages(msgs);
        MessageService.markAsRead(existingConv.id);
      } else {
        setMessages([]);
      }
    } else {
      setMessages([]);
    }
    setNewMessage("");
  }, [doctor]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "" || !doctor) return;

    // Buscar o crear conversación
    let conversations = MessageService.getConversations();
    let conversationId = conversations.find(c => 
      c.type === 'individual' && 
      c.participants.includes(doctor.id) && 
      c.participants.includes('current-user')
    )?.id;

    if (!conversationId) {
      // Crear nueva conversación
      conversationId = `conv-${Date.now()}`;
      const newConversation = {
        id: conversationId,
        type: 'individual' as const,
        participants: ['current-user', doctor.id],
        unreadCount: 0,
        isArchived: false,
        createdAt: new Date().toISOString()
      };
      conversations.push(newConversation);
      localStorage.setItem('conversations', JSON.stringify(conversations));
    }

    const message = MessageService.sendMessage(conversationId, newMessage);
    setMessages(prev => [...prev, message]);
    setNewMessage("");
  };

  if (!doctor) {
    return (
      <div className="flex-1 flex items-center justify-center h-full text-muted-foreground">
        <p>Selecciona un chat para empezar a conversar.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <header className="flex items-center p-4 border-b">
        <Avatar className="h-10 w-10">
          <AvatarImage src={doctor.avatar} alt={doctor.name} />
          <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="ml-4">
          <p className="font-semibold">{doctor.name}</p>
          <p className={cn("text-sm", doctor.online ? "text-green-500" : "text-muted-foreground")}>
            {doctor.online ? "En línea" : "Desconectado"}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Video className="h-5 w-5" />
          </Button>
        </div>
      </header>
      
      <main className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex items-end gap-2",
              msg.senderId === "current-user" ? "justify-end" : "justify-start"
            )}
          >
            {msg.senderId !== 'current-user' && (
              <Avatar className="h-8 w-8">
                <AvatarImage src={doctor.avatar} />
                <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
            <div
              className={cn(
                "max-w-xs lg:max-w-md px-4 py-2 rounded-lg",
                msg.senderId === "current-user"
                  ? "bg-brand-blue text-white rounded-br-none"
                  : "bg-muted rounded-bl-none",
                msg.isUrgent && "border-2 border-red-500"
              )}
            >
              <p className="text-sm">{msg.text}</p>
              {msg.isUrgent && (
                <span className="text-xs text-red-500 font-semibold">URGENTE</span>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>
      
      <footer className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex items-center gap-4">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="flex-1 bg-muted border-none focus-visible:ring-1 focus-visible:ring-ring"
          />
          <Button type="submit" size="icon" className="bg-brand-blue hover:bg-brand-blue/90">
            <Send className="h-5 w-5 text-white" />
          </Button>
        </form>
      </footer>
    </div>
  );
};

export default ChatView;
