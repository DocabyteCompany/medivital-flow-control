import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSearch } from "./MessageSearch";
import { NotificationBadge } from "./NotificationBadge";
import { MessageService, Conversation, groupChannels } from "@/services/messageService";
import { personnel, Personnel } from "@/data/personnel";
import { useRole } from "@/contexts/RoleContext";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Users, AlertTriangle } from "lucide-react";
interface DoctorListProps {
  selectedConversationId: string | null;
  onSelectConversation: (id: string, type: 'individual' | 'group') => void;
}
const DoctorList = ({
  selectedConversationId,
  onSelectConversation
}: DoctorListProps) => {
  const {
    selectedRole
  } = useRole();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<any>({});
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [availablePersonnel, setAvailablePersonnel] = useState<Personnel[]>([]);
  useEffect(() => {
    const convs = MessageService.getConversations();
    setConversations(convs);
    const personnel = MessageService.getPersonnelForRole(selectedRole);
    setAvailablePersonnel(personnel);
  }, [selectedRole]);
  const filterConversations = (convs: Conversation[]) => {
    return convs.filter(conv => {
      // Filtro de búsqueda
      if (searchTerm) {
        if (conv.type === 'individual') {
          const otherParticipant = conv.participants.find(p => p !== 'current-user');
          const person = personnel.find(p => p.id === otherParticipant);
          if (!person?.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
          }
        } else {
          if (!conv.name?.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
          }
        }
      }

      // Filtros adicionales para conversaciones individuales
      if (conv.type === 'individual' && filters.role) {
        const otherParticipant = conv.participants.find(p => p !== 'current-user');
        const person = personnel.find(p => p.id === otherParticipant);
        if (person?.role !== filters.role) return false;
      }
      if (conv.type === 'individual' && filters.onlineOnly) {
        const otherParticipant = conv.participants.find(p => p !== 'current-user');
        const person = personnel.find(p => p.id === otherParticipant);
        if (!person?.online) return false;
      }
      return true;
    });
  };
  const filterPersonnel = (people: Personnel[]) => {
    return people.filter(person => {
      if (searchTerm && !person.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      if (filters.role && person.role !== filters.role) return false;
      if (filters.onlineOnly && !person.online) return false;
      return true;
    });
  };
  const getPersonInfo = (participantId: string) => {
    return personnel.find(p => p.id === participantId);
  };
  const startNewConversation = (personId: string) => {
    onSelectConversation(personId, 'individual');
  };
  const individualConversations = filterConversations(conversations.filter(c => c.type === 'individual'));
  const groupConversations = conversations.filter(c => c.type === 'group');
  const filteredPersonnel = filterPersonnel(availablePersonnel);
  const totalUnread = MessageService.getTotalUnreadCount();
  return <div className="w-2/5 flex flex-col p-4 border-r">
      

      <MessageSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} filters={filters} onFiltersChange={setFilters} />

      <Tabs defaultValue="chats" className="flex-1 mt-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chats" className="text-xs">
            Chats
            {individualConversations.length > 0 && <Badge variant="secondary" className="ml-1 text-xs">
                {individualConversations.length}
              </Badge>}
          </TabsTrigger>
          <TabsTrigger value="groups" className="text-xs">
            Grupos
            {groupConversations.length > 0 && <Badge variant="secondary" className="ml-1 text-xs">
                {groupConversations.length}
              </Badge>}
          </TabsTrigger>
          <TabsTrigger value="contacts" className="text-xs">Contactos</TabsTrigger>
        </TabsList>

        <TabsContent value="chats" className="flex-1 overflow-y-auto mt-4">
          <div className="space-y-2">
            {individualConversations.map(conv => {
            const otherParticipant = conv.participants.find(p => p !== 'current-user');
            const person = getPersonInfo(otherParticipant!);
            if (!person) return null;
            return <div key={conv.id} onClick={() => onSelectConversation(conv.id, 'individual')} className={cn("flex items-center p-3 rounded-lg cursor-pointer hover:bg-muted", selectedConversationId === conv.id && "bg-muted")}>
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={person.avatar} alt={person.name} />
                      <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {person.online && <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-white" />}
                    <NotificationBadge count={conv.unreadCount} />
                  </div>
                  <div className="ml-4 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold truncate">{person.name}</p>
                      <Badge variant="outline" className="text-xs">{person.role}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{person.specialty}</p>
                    {conv.lastMessage && <p className="text-sm text-muted-foreground truncate">
                        {conv.lastMessage.text}
                      </p>}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {conv.lastMessage?.timestamp}
                  </div>
                </div>;
          })}
          </div>
        </TabsContent>

        <TabsContent value="groups" className="flex-1 overflow-y-auto mt-4">
          <div className="space-y-2">
            {groupChannels.map(channel => {
            const groupConv = conversations.find(c => c.id === channel.id);
            return <div key={channel.id} onClick={() => onSelectConversation(channel.id, 'group')} className={cn("flex items-center p-3 rounded-lg cursor-pointer hover:bg-muted", selectedConversationId === channel.id && "bg-muted")}>
                  <div className="relative">
                    <div className={cn("p-3 rounded-lg", channel.color)}>
                      {channel.type === 'emergency' ? <AlertTriangle className="w-6 h-6 text-white" /> : <Users className="w-6 h-6 text-white" />}
                    </div>
                    {groupConv && <NotificationBadge count={groupConv.unreadCount} />}
                  </div>
                  <div className="ml-4 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{channel.name}</p>
                      {channel.type === 'emergency' && <Badge variant="destructive" className="text-xs">URGENTE</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">{channel.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {channel.participants.length} participantes
                    </p>
                  </div>
                  {groupConv?.lastMessage && <div className="text-xs text-muted-foreground">
                      {groupConv.lastMessage.timestamp}
                    </div>}
                </div>;
          })}
          </div>
        </TabsContent>

        <TabsContent value="contacts" className="flex-1 overflow-y-auto mt-4">
          <div className="space-y-2">
            {filteredPersonnel.map(person => <div key={person.id} onClick={() => startNewConversation(person.id)} className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-muted">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={person.avatar} alt={person.name} />
                    <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {person.online && <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white" />}
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm truncate">{person.name}</p>
                    <Badge variant="outline" className="text-xs">{person.role}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{person.specialty}</p>
                </div>
              </div>)}
          </div>
        </TabsContent>
      </Tabs>
    </div>;
};
export default DoctorList;