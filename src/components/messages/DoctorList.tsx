
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { doctors } from "@/data/messages";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface DoctorListProps {
  selectedDoctorId: string | null;
  onSelectDoctor: (id: string) => void;
}

const DoctorList = ({ selectedDoctorId, onSelectDoctor }: DoctorListProps) => {
  return (
    <Card className="w-full md:w-1/3 lg:w-1/4 h-[calc(100vh-8rem)] flex flex-col p-4 border-r rounded-r-none">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Chats</h2>
      </div>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input placeholder="Buscar doctor..." className="pl-10" />
      </div>
      <div className="flex-1 overflow-y-auto -mr-4 pr-4">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            onClick={() => onSelectDoctor(doctor.id)}
            className={cn(
              "flex items-center p-3 rounded-lg cursor-pointer hover:bg-muted mb-2",
              selectedDoctorId === doctor.id && "bg-muted"
            )}
          >
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarImage src={doctor.avatar} alt={doctor.name} />
                <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {doctor.online && (
                <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
              )}
            </div>
            <div className="ml-4 flex-1">
              <p className="font-semibold">{doctor.name}</p>
              <p className="text-sm text-muted-foreground truncate">{doctor.lastMessage.text}</p>
            </div>
            <div className="text-xs text-muted-foreground">
              {doctor.lastMessage.time}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DoctorList;
