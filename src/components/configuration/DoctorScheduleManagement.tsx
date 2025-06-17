
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar, User, Send } from 'lucide-react';
import { personnel } from '@/data/personnel';
import { useToast } from '@/hooks/use-toast';

export const DoctorScheduleManagement = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const { toast } = useToast();

  const doctors = personnel.filter(person => person.role === 'Doctor');

  const handleScheduleChangeRequest = (doctorId: string) => {
    const doctor = doctors.find(d => d.id === doctorId);
    console.log('Solicitar cambio de horario para:', doctor?.name);
    
    toast({
      title: "Solicitud enviada",
      description: `Se ha enviado una solicitud de cambio de horario a ${doctor?.name}. Recibirás una notificación cuando responda.`,
    });
  };

  const mockScheduleData = {
    '1': { workingHours: '08:00 - 17:00', workingDays: 'Lun-Vie', lunchBreak: '12:00-13:00' },
    '2': { workingHours: '09:00 - 18:00', workingDays: 'Lun-Sáb', lunchBreak: '13:00-14:00' },
    '3': { workingHours: '07:00 - 15:00', workingDays: 'Lun-Vie', lunchBreak: '11:30-12:30' },
    '6': { workingHours: '10:00 - 19:00', workingDays: 'Mar-Sáb', lunchBreak: '14:00-15:00' },
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-brand-dark mb-2">Gestión de Horarios de Doctores</h3>
        <p className="text-gray-600">Como administrador, puedes proponer cambios en los horarios de los doctores. Ellos deben aprobar estos cambios.</p>
      </div>

      <div className="grid gap-4">
        {doctors.map((doctor) => {
          const schedule = mockScheduleData[doctor.id as keyof typeof mockScheduleData];
          return (
            <Card key={doctor.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={doctor.avatar} 
                      alt={doctor.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <CardTitle className="text-base flex items-center gap-2">
                        {doctor.name}
                        <div className={`w-2 h-2 rounded-full ${doctor.online ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-blue-100 text-blue-800">
                          {doctor.specialty}
                        </Badge>
                      </CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleScheduleChangeRequest(doctor.id)}
                    className="flex items-center gap-2"
                  >
                    <Send className="w-3 h-3" />
                    Proponer Cambio
                  </Button>
                </div>
              </CardHeader>
              
              {schedule && (
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-brand-blue" />
                      <div>
                        <span className="font-medium">Horario:</span>
                        <p className="text-gray-600">{schedule.workingHours}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-brand-blue" />
                      <div>
                        <span className="font-medium">Días:</span>
                        <p className="text-gray-600">{schedule.workingDays}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-brand-blue" />
                      <div>
                        <span className="font-medium">Almuerzo:</span>
                        <p className="text-gray-600">{schedule.lunchBreak}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Send className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Cómo funciona el sistema de solicitudes</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Cuando propones un cambio, el doctor recibe una notificación</li>
              <li>• El doctor puede aceptar o rechazar la propuesta con comentarios</li>
              <li>• Solo cambios aprobados se aplicarán al sistema</li>
              <li>• Puedes ver el historial de solicitudes en la sección de notificaciones</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
