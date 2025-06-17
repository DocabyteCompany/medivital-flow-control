
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { appointments, getPatientForAppointment } from '@/data/appointments';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

interface DoctorAgendaViewProps {
  selectedDate?: Date;
  doctorId?: string; // En un caso real vendría del contexto de usuario
}

export const DoctorAgendaView = ({ selectedDate, doctorId = '1' }: DoctorAgendaViewProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const dateString = selectedDate ? selectedDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
  
  // Filtrar citas del doctor para el día seleccionado
  const doctorAppointments = appointments
    .filter(app => app.personnelId === doctorId && app.date === dateString)
    .sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime());

  const handleConfirmAttendance = (appointmentId: string) => {
    toast({
      title: "Asistencia Confirmada",
      description: "Has confirmado tu asistencia a esta cita.",
    });
  };

  const handleMarkCompleted = (appointmentId: string) => {
    toast({
      title: "Cita Completada",
      description: "La cita ha sido marcada como completada.",
    });
  };

  const handleMarkAbsent = (appointmentId: string) => {
    toast({
      title: "Paciente Ausente",
      description: "Has marcado al paciente como ausente.",
      variant: "destructive",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getNextAppointment = () => {
    const now = new Date();
    return doctorAppointments.find(app => {
      const appDateTime = new Date(`${app.date}T${app.time}`);
      return appDateTime > now && app.status === 'Scheduled';
    });
  };

  const nextAppointment = getNextAppointment();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-brand-light p-3 rounded-lg">
          <Calendar className="w-6 h-6 text-brand-blue" />
        </div>
        <h2 className="text-2xl font-bold text-brand-dark">Mi Agenda Personal</h2>
      </div>

      {nextAppointment && (
        <Card className="bg-brand-blue text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Próxima Cita
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold">
                  {new Date(`${nextAppointment.date}T${nextAppointment.time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="opacity-90">{nextAppointment.type}</p>
                <p className="opacity-75">
                  Paciente: {getPatientForAppointment(nextAppointment.patientId)?.name}
                </p>
              </div>
              <Button 
                variant="secondary" 
                onClick={() => handleConfirmAttendance(nextAppointment.id)}
                className="bg-white/20 hover:bg-white/30 text-white"
              >
                Confirmar Asistencia
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Agenda del {selectedDate ? selectedDate.toLocaleDateString() : 'Día'}
            <Badge variant="outline" className="ml-2">
              {doctorAppointments.length} citas
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {doctorAppointments.length > 0 ? (
              doctorAppointments.map((appointment) => {
                const patient = getPatientForAppointment(appointment.patientId);
                const appointmentDate = new Date(`${appointment.date}T${appointment.time}`);

                return (
                  <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-center w-20 flex-shrink-0">
                        <p className="text-lg font-bold text-brand-dark">
                          {appointmentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-3 flex-1">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={`https://i.pravatar.cc/150?u=${patient?.id}`} alt={patient?.name} />
                          <AvatarFallback>{patient?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-brand-dark">{appointment.type}</p>
                            <Badge className={getStatusColor(appointment.status)}>
                              {appointment.status === 'Completed' ? 'Completada' : 
                               appointment.status === 'Scheduled' ? 'Programada' : 'Cancelada'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{patient?.name}</p>
                        </div>
                      </div>
                    </div>

                    {appointment.status === 'Scheduled' && (
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleMarkCompleted(appointment.id)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleMarkAbsent(appointment.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 px-4 bg-gray-50 rounded-2xl">
                <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="font-semibold text-brand-dark">No tienes citas programadas</p>
                <p className="text-sm text-gray-500">Para el día seleccionado</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
