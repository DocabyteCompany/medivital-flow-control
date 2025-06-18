
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Personnel } from "@/data/personnel";
import { 
  Mail, 
  MessageSquare, 
  Phone, 
  Calendar, 
  Clock, 
  User, 
  Briefcase,
  Activity,
  TrendingUp,
  CalendarDays
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PersonnelScheduleManagement } from "./PersonnelScheduleManagement";
import { PersonnelProductivityStats } from "./PersonnelProductivityStats";
import { PersonnelActivityHistory } from "./PersonnelActivityHistory";

interface PersonnelDetailViewProps {
  person: Personnel;
  onClose: () => void;
}

export const PersonnelDetailView = ({ person, onClose }: PersonnelDetailViewProps) => {
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const handleMessage = () => {
    navigate(`/mensajes?contact=${person.id}`);
  };

  const handleCall = () => {
    window.location.href = `tel:${person.phone}`;
  };

  const handleEmail = () => {
    window.location.href = `mailto:${person.email}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="w-16 h-16">
                <AvatarImage src={person.avatar} alt={person.name} />
                <AvatarFallback>{getInitials(person.name)}</AvatarFallback>
              </Avatar>
              {person.online && (
                <span className="absolute bottom-0 right-0 block h-4 w-4 rounded-full bg-green-500 ring-2 ring-white" />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-brand-dark">{person.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary">{person.role}</Badge>
                {person.specialty && <Badge variant="outline">{person.specialty}</Badge>}
                <Badge variant={person.online ? "default" : "secondary"} className={person.online ? "bg-green-500" : ""}>
                  {person.online ? "En línea" : "Desconectado"}
                </Badge>
              </div>
            </div>
          </div>
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
        </div>

        <div className="p-6">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="info" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Información
              </TabsTrigger>
              <TabsTrigger value="schedule" className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                Horarios
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Actividad
              </TabsTrigger>
              <TabsTrigger value="productivity" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Productividad
              </TabsTrigger>
              <TabsTrigger value="agenda" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Agenda
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Contacto
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5" />
                      Información Profesional
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Rol</label>
                      <p className="text-base">{person.role}</p>
                    </div>
                    {person.specialty && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Especialidad</label>
                        <p className="text-base">{person.specialty}</p>
                      </div>
                    )}
                    <div>
                      <label className="text-sm font-medium text-gray-500">Estado</label>
                      <p className="text-base flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${person.online ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        {person.online ? 'En línea' : 'Desconectado'}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="w-5 h-5" />
                      Información de Contacto
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Teléfono</label>
                      <p className="text-base">{person.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Email</label>
                      <p className="text-base">{person.email}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="mt-6">
              <PersonnelScheduleManagement person={person} />
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <PersonnelActivityHistory person={person} />
            </TabsContent>

            <TabsContent value="productivity" className="mt-6">
              <PersonnelProductivityStats person={person} />
            </TabsContent>

            <TabsContent value="agenda" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Vinculación con Agenda</CardTitle>
                  <CardDescription>Ver agenda completa y gestionar citas del personal</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Vista de Agenda Integrada</h3>
                    <p className="text-gray-500 mb-4">
                      Accede a la agenda completa del personal con todas sus citas programadas
                    </p>
                    <Button onClick={() => navigate(`/agenda?personnel=${person.id}`)}>
                      <Calendar className="w-4 h-4 mr-2" />
                      Abrir Agenda Completa
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="w-5 h-5" />
                      Llamar
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">Realizar llamada telefónica</p>
                    <Button onClick={handleCall} className="w-full">
                      <Phone className="w-4 h-4 mr-2" />
                      {person.phone}
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Mensaje
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">Enviar mensaje interno</p>
                    <Button onClick={handleMessage} variant="outline" className="w-full">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Abrir chat
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="w-5 h-5" />
                      Email
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">Enviar correo electrónico</p>
                    <Button onClick={handleEmail} variant="outline" className="w-full">
                      <Mail className="w-4 h-4 mr-2" />
                      {person.email}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
