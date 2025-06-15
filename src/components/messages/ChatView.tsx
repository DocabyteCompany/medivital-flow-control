import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Doctor, Message, messages as initialMessages } from "@/data/messages";
import { cn } from "@/lib/utils";
import { Phone, Send, Video } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { useActivities } from "@/contexts/ActivityContext";
import type { Activity } from "@/components/ia/ActivityCard";
import { Link } from "react-router-dom";

interface ChatViewProps {
  doctor: Doctor | undefined;
}

const renderMessageText = (text: string) => {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/;
  const match = text.match(linkRegex);

  if (!match) {
    return <p className="text-sm">{text}</p>;
  }

  const pretext = text.substring(0, match.index);
  const linkText = match[1];
  const url = match[2];
  const posttext = text.substring(match.index! + match[0].length);

  return (
    <p className="text-sm">
      {pretext}
      <Link to={url} className="inline-block bg-brand-blue-light text-brand-blue font-semibold px-3 py-1.5 rounded-lg hover:bg-brand-blue-light/80 transition-colors text-xs mx-1">
        {linkText} &rarr;
      </Link>
      {posttext}
    </p>
  );
};

const ChatView = ({ doctor }: ChatViewProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const { activities, addActivity } = useActivities();
  const prevActivitiesRef = useRef<Activity[]>();

  useEffect(() => {
    prevActivitiesRef.current = activities;
  });
  const prevActivities = prevActivitiesRef.current;

  useEffect(() => {
    if (doctor) {
      const msgs = initialMessages[doctor.id]?.map(m => ({ ...m, sender: m.sender === 'me' ? 'me' : doctor.id })) || [];
      setMessages(msgs);
    } else {
      setMessages([]);
    }
    setNewMessage("");
  }, [doctor]);
  
  useEffect(() => {
    if (!doctor || !prevActivities) return;

    const relevantCurrentActivities = activities.filter(a => a.details?.doctorId === doctor.id);

    relevantCurrentActivities.forEach(currentActivity => {
        const prevActivity = prevActivities.find(p => p.id === currentActivity.id);
        
        if (prevActivity && prevActivity.status !== currentActivity.status) {
            let statusText = '';
            switch(currentActivity.status) {
                case 'completed':
                    statusText = 'se ha completado';
                    break;
                case 'failed':
                    statusText = 'ha fallado';
                    break;
                case 'in-progress':
                    if (prevActivity.status === 'failed') {
                        statusText = 'se está reintentando';
                    }
                    break;
                default:
                    break;
            }

            if (statusText) {
                const systemMessage: Message = {
                    id: Date.now(),
                    text: `ℹ️ La actividad "${currentActivity.title}" ${statusText}.`,
                    sender: doctor.id,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    avatar: doctor.avatar,
                };
                setMessages(prev => [...prev, systemMessage]);
            }
        }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activities, doctor]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "" || !doctor) return;

    if (newMessage.startsWith('/')) {
        const [command, ...args] = newMessage.trim().substring(1).split(' ');
        const content = args.join(' ');

        const userMessage: Message = {
            id: Date.now(),
            text: newMessage,
            sender: "me",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        let activityType: Activity['type'] | null = null;
        let title = '';
        let description = '';

        switch (command.toLowerCase()) {
            case 'resumir':
                activityType = 'summary';
                title = `Resumen para ${doctor.name}`;
                description = `IA solicitada para resumir conversación. ${content ? `Contexto: ${content}`: ''}`;
                break;
            case 'llamar':
                activityType = 'call';
                title = `Llamada programada con ${doctor.name}`;
                description = `IA solicitada para iniciar llamada. ${content ? `Motivo: ${content}`: ''}`;
                break;
            case 'agendar':
                activityType = 'schedule';
                title = `Cita para ${doctor.name}`;
                description = `IA solicitada para agendar cita. ${content ? `Detalles: ${content}`: ''}`;
                break;
            default:
                const errorMessage: Message = {
                    id: Date.now() + 1,
                    text: `Comando "/${command}" no reconocido. Intenta con /resumir, /llamar, o /agendar.`,
                    sender: doctor.id,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    avatar: doctor.avatar,
                };
                setMessages([...messages, userMessage, errorMessage]);
                setNewMessage("");
                return;
        }

        addActivity({
            type: activityType,
            title,
            description,
            details: {
                solicitado_desde: "Chat",
                paciente: doctor.name,
                doctorId: doctor.id,
            }
        });

        const confirmationMessage: Message = {
            id: Date.now() + 1,
            text: `✅ Actividad "${command}" iniciada. Puedes seguir su progreso en el panel de Actividades de IA.`,
            sender: doctor.id,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            avatar: doctor.avatar,
        };
        setMessages([...messages, userMessage, confirmationMessage]);
        
        setNewMessage("");
        return;
    }

    const message: Message = {
      id: Date.now(),
      text: newMessage,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, message]);
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
                <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
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
              {renderMessageText(msg.text)}
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
