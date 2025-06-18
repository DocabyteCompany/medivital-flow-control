
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
  MapPin, 
  User, 
  Briefcase,
  Activity,
  Settings
} from "lucide-react";
import { useNavigate } from "react-router-dom";

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

  // Mock data para ejemplo
  const schedule = [
    { day: 'Lunes', hours: '08:00 - 16:00', patients: 12 },
    { day: 'Martes', hours: '08:00 - 16:00', patients: 10 },
    { day: 'Miércoles', hours: '10:00 - 18:00', patients: 8 },
    { day: 'Jueves', hours: '08:00 - 16:00', patients: 11 },
    { day: 'Viernes', hours: '08:00 - 14:00', patients: 9 },
  ];

  const recentActivity = [
    { type: 'patient', description: 'Consulta con María González', time: '2 horas' },
    { type: 'message', description: 'Respondió mensaje de Dr. Sánchez', time: '4 horas' },
    { type: 'appointment', description: 'Cita programada para mañana', time: '1 día' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
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
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="info" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Información
              </TabsTrigger>
              <TabsTrigger value="schedule" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Horario
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Actividad
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
              <Card>
                <CardHeader>
                  <CardTitle>Horario Semanal</CardTitle>
                  <CardDescription>Horarios y carga de pacientes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {schedule.map((day, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-20 font-medium">{day.day}</div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-4 h-4" />
                            {day.hours}
                          </div>
                        </div>
                        <Badge variant="outline">{day.patients} pacientes</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Actividad Reciente</CardTitle>
                  <CardDescription>Últimas actividades del personal</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="p-2 bg-brand-light rounded-lg">
                          {activity.type === 'patient' && <User className="w-4 h-4 text-brand-blue" />}
                          {activity.type === 'message' && <MessageSquare className="w-4 h-4 text-brand-blue" />}
                          {activity.type === 'appointment' && <Calendar className="w-4 h-4 text-brand-blue" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.description}</p>
                          <p className="text-sm text-gray-500">Hace {activity.time}</p>
                        </div>
                      </div>
                    ))}
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
