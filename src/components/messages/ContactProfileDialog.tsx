
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Personnel } from "@/data/personnel";
import { Phone, Mail, Stethoscope, Clock, MapPin } from "lucide-react";

interface ContactProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  doctor: Personnel;
}

export const ContactProfileDialog = ({ open, onOpenChange, doctor }: ContactProfileDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Perfil del Contacto</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header del perfil */}
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={doctor.avatar} alt={doctor.name} />
              <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{doctor.name}</h3>
              <p className="text-sm text-gray-600">{doctor.role}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className={`w-2 h-2 rounded-full ${doctor.online ? 'bg-green-500' : 'bg-gray-400'}`} />
                <span className="text-sm text-gray-500">
                  {doctor.online ? 'En línea' : 'Desconectado'}
                </span>
              </div>
            </div>
          </div>

          {/* Especialidad */}
          {doctor.specialty && (
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Stethoscope className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-900">Especialidad</p>
                <p className="text-sm text-blue-700">{doctor.specialty}</p>
              </div>
            </div>
          )}

          {/* Información de contacto */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Información de Contacto</h4>
            
            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
              <Phone className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Teléfono</p>
                <p className="text-sm text-gray-600">{doctor.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
              <Mail className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-gray-600">{doctor.email}</p>
              </div>
            </div>
          </div>

          {/* Horarios (mock data) */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Horarios</h4>
            <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
              <Clock className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Lunes a Viernes</p>
                <p className="text-sm text-gray-600">8:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>

          {/* Estado */}
          <div className="flex justify-center">
            <Badge variant={doctor.online ? "default" : "secondary"} className="px-4 py-1">
              {doctor.online ? "Disponible" : "No disponible"}
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
