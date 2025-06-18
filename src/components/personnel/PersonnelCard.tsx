
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Personnel } from "@/data/personnel";
import { Mail, MessageSquare, Phone, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PersonnelCardProps {
    person: Personnel;
    onViewDetails?: (person: Personnel) => void;
}

export const PersonnelCard = ({ person, onViewDetails }: PersonnelCardProps) => {
    const navigate = useNavigate();

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('');
    }

    const handleMessage = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigate(`/mensajes?contact=${person.id}`);
    };

    const handleCall = (e: React.MouseEvent) => {
        e.stopPropagation();
        window.location.href = `tel:${person.phone}`;
    };

    const handleEmail = (e: React.MouseEvent) => {
        e.stopPropagation();
        window.location.href = `mailto:${person.email}`;
    };

    const handleCardClick = () => {
        if (onViewDetails) {
            onViewDetails(person);
        }
    };

    return (
        <Card 
            className="shadow-soft border-0 rounded-2xl hover:shadow-lg transition-all cursor-pointer hover:scale-105"
            onClick={handleCardClick}
        >
            <CardHeader className="flex flex-col items-center text-center p-6">
                <div className="relative">
                    <Avatar className="w-24 h-24">
                        <AvatarImage src={person.avatar} alt={person.name} />
                        <AvatarFallback>{getInitials(person.name)}</AvatarFallback>
                    </Avatar>
                    {person.online && (
                        <span className="absolute bottom-1 right-1 block h-4 w-4 rounded-full bg-green-500 ring-2 ring-white" />
                    )}
                </div>
                <CardTitle className="mt-4 text-lg font-bold text-brand-dark">{person.name}</CardTitle>
                <p className="text-sm text-gray-500">{person.role}</p>
                {person.specialty && <Badge variant="secondary" className="mt-2">{person.specialty}</Badge>}
                
                {/* Indicador de más información */}
                <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                    <Eye className="w-3 h-3" />
                    <span>Ver detalles</span>
                </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
                <div className="space-y-3">
                    {/* Información de contacto */}
                    <div className="text-xs text-gray-500 space-y-1">
                        <div className="flex items-center gap-2">
                            <Phone className="w-3 h-3" />
                            <span>{person.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="w-3 h-3" />
                            <span>{person.email}</span>
                        </div>
                    </div>
                    
                    {/* Botones de acción */}
                    <div className="flex space-x-2">
                        <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={handleCall}
                            title={`Llamar a ${person.name}`}
                        >
                            <Phone className="h-4 w-4" />
                        </Button>
                        <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={handleMessage}
                            title={`Enviar mensaje a ${person.name}`}
                        >
                            <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={handleEmail}
                            title={`Enviar email a ${person.name}`}
                        >
                            <Mail className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
