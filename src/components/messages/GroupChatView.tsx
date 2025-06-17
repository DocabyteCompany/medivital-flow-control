
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { GroupChannel, MessageService, Message } from "@/services/messageService";
import { personnel } from "@/data/personnel";
import { cn } from "@/lib/utils";
import { Send, Users, AlertTriangle } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";

interface GroupChatViewProps {
  channel: GroupChannel | null;
}

export const GroupChatView = ({ channel }: GroupChatViewProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (channel) {
      const msgs = MessageService.getMessages(channel.id);
      setMessages(msgs);
      MessageService.markAsRead(channel.id);
    } else {
      setMessages([]);
    }
    setNewMessage("");
  }, [channel]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "" || !channel) return;

    const isUrgent = channel.type === 'emergency' || newMessage.includes('URGENTE');
    const message = MessageService.sendMessage(channel.id, newMessage, isUrgent);
    setMessages(prev => [...prev, message]);
    setNewMessage("");
  };

  const getSenderInfo = (senderId: string) => {
    if (senderId === 'current-user') return null;
    return personnel.find(p => p.id === senderId);
  };

  if (!channel) {
    return (
      <div className="flex-1 flex items-center justify-center h-full text-muted-foreground">
        <p>Selecciona un canal para empezar a conversar.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <header className="flex items-center p-4 border-b">
        <div className={cn("p-2 rounded-lg mr-3", channel.color)}>
          {channel.type === 'emergency' ? (
            <AlertTriangle className="w-6 h-6 text-white" />
          ) : (
            <Users className="w-6 h-6 text-white" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{channel.name}</h3>
            {channel.type === 'emergency' && (
              <Badge variant="destructive" className="text-xs">URGENTE</Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{channel.description}</p>
          <p className="text-xs text-muted-foreground">
            {channel.participants.length} participantes
          </p>
        </div>
      </header>
      
      <main className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => {
          const sender = getSenderInfo(msg.senderId);
          const isCurrentUser = msg.senderId === 'current-user';
          
          return (
            <div
              key={msg.id}
              className={cn(
                "flex items-end gap-2",
                isCurrentUser ? "justify-end" : "justify-start"
              )}
            >
              {!isCurrentUser && sender && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={sender.avatar} />
                  <AvatarFallback>{sender.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "max-w-xs lg:max-w-md px-4 py-2 rounded-lg",
                  isCurrentUser
                    ? "bg-brand-blue text-white rounded-br-none"
                    : "bg-muted rounded-bl-none",
                  msg.isUrgent && "border-2 border-red-500"
                )}
              >
                {!isCurrentUser && sender && (
                  <p className="text-xs font-semibold mb-1">{sender.name}</p>
                )}
                <p className="text-sm">{msg.text}</p>
                {msg.isUrgent && (
                  <span className="text-xs text-red-500 font-semibold">URGENTE</span>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </main>
      
      <footer className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex items-center gap-4">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={`Escribe en ${channel.name}...`}
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
