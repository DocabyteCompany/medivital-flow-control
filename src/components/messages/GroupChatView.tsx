
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Phone, Video, Users, AlertTriangle } from "lucide-react";
import { GroupChannel, Message, MessageService } from "@/services/messageService";
import { personnel } from "@/data/personnel";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";

interface GroupChatViewProps {
  channel: GroupChannel | null;
}

export const GroupChatView = ({ channel }: GroupChatViewProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (channel) {
      const channelMessages = MessageService.getMessages(channel.id);
      setMessages(channelMessages);
      MessageService.markAsRead(channel.id);
    }
  }, [channel]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "" || !channel) return;

    const message = MessageService.sendMessage(channel.id, newMessage, isUrgent);
    setMessages([...messages, message]);
    setNewMessage("");
    setIsUrgent(false);
  };

  const getParticipantInfo = (participantId: string) => {
    return personnel.find(p => p.id === participantId);
  };

  const getSenderInfo = (senderId: string) => {
    if (senderId === 'current-user') return null;
    return personnel.find(p => p.id === senderId);
  };

  if (!channel) {
    return (
      <div className="flex-1 flex items-center justify-center h-full text-muted-foreground">
        <div className="text-center">
          <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
          <p>Selecciona un canal para empezar a conversar.</p>
        </div>
      </div>
    );
  }

  const getChannelIcon = () => {
    switch (channel.type) {
      case 'emergency':
        return <AlertTriangle className="w-5 h-5" />;
      case 'specialty':
        return <Users className="w-5 h-5" />;
      default:
        return <Users className="w-5 h-5" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <header className="flex items-center p-4 border-b">
        <div className={cn("p-2 rounded-lg mr-3", channel.color)}>
          {getChannelIcon()}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="font-semibold">{channel.name}</p>
            {channel.type === 'emergency' && (
              <Badge variant="destructive" className="text-xs">URGENTE</Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{channel.description}</p>
          <p className="text-xs text-muted-foreground">
            {channel.participants.length} participantes
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Video className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => {
          const senderInfo = getSenderInfo(msg.senderId);
          const isCurrentUser = msg.senderId === 'current-user';
          
          return (
            <div
              key={msg.id}
              className={cn(
                "flex items-start gap-3",
                isCurrentUser ? "justify-end" : "justify-start"
              )}
            >
              {!isCurrentUser && senderInfo && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={senderInfo.avatar} />
                  <AvatarFallback>{senderInfo.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "max-w-xs lg:max-w-md",
                  isCurrentUser ? "order-first" : ""
                )}
              >
                {!isCurrentUser && senderInfo && (
                  <p className="text-xs text-muted-foreground mb-1 font-medium">
                    {senderInfo.name}
                  </p>
                )}
                <div
                  className={cn(
                    "rounded-lg px-4 py-2",
                    isCurrentUser
                      ? "bg-brand-blue text-white rounded-br-none"
                      : "bg-muted rounded-bl-none",
                    msg.isUrgent && "border-2 border-red-500"
                  )}
                >
                  {msg.isUrgent && (
                    <div className="flex items-center gap-1 mb-1">
                      <AlertTriangle className="w-3 h-3" />
                      <span className="text-xs font-medium">URGENTE</span>
                    </div>
                  )}
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </main>

      <footer className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="space-y-2">
          {channel.type === 'emergency' && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="urgent"
                checked={isUrgent}
                onChange={(e) => setIsUrgent(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="urgent" className="text-sm text-red-600 font-medium">
                Marcar como urgente
              </label>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={`Escribe en ${channel.name}...`}
              className="flex-1 bg-muted border-none focus-visible:ring-1 focus-visible:ring-ring"
            />
            <Button type="submit" className="bg-brand-blue hover:bg-brand-blue/90">
              Enviar
            </Button>
          </div>
        </form>
      </footer>
    </div>
  );
};
