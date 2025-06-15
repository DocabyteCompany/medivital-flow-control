
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Doctor, Message, messages as initialMessages } from "@/data/messages";
import { cn } from "@/lib/utils";
import { Phone, Send, Video } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";

interface ChatViewProps {
  doctor: Doctor | undefined;
}

const ChatView = ({ doctor }: ChatViewProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (doctor) {
      setMessages(initialMessages[doctor.id] || []);
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

    const message: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  if (!doctor) {
    return (
      <div className="flex-1 flex items-center justify-center h-full text-muted-foreground bg-card rounded-l-none">
        <p>Selecciona un chat para empezar a conversar.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-8rem)] bg-card rounded-l-none">
      <header className="flex items-center p-4 border-b">
        <Avatar className="h-10 w-10">
          <AvatarImage src={doctor.avatar} alt={doctor.name} />
          <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="ml-4">
          <p className="font-semibold">{doctor.name}</p>
          <p className={cn("text-sm", doctor.online ? "text-green-500" : "text-muted-foreground")}>{doctor.online ? "En línea" : "Desconectado"}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full"><Phone className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon" className="rounded-full"><Video className="h-5 w-5" /></Button>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex items-end gap-2",
              msg.sender === "me" ? "justify-end" : "justify-start"
            )}
          >
            {msg.sender !== 'me' && (
              <Avatar className="h-8 w-8">
                <AvatarImage src={msg.avatar} />
                <AvatarFallback>{msg.sender.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
            <div
              className={cn(
                "max-w-xs lg:max-w-md rounded-lg px-4 py-2",
                msg.sender === "me"
                  ? "bg-brand-blue text-white rounded-br-none"
                  : "bg-muted rounded-bl-none"
              )}
            >
              <p className="text-sm">{msg.text}</p>
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
