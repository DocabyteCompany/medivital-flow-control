
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, Plus, Edit, Trash2, Bot } from 'lucide-react';
import { appointments, getDoctorForAppointment, getPatientForAppointment } from '@/data/appointments';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

interface AdminAgendaViewProps {
  selectedDate?: Date;
}

export const AdminAgendaView = ({ selectedDate }: AdminAgendaViewProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [filter, setFilter] = useState<'all' | 'today' | 'week'>('today');

  const dateString = selectedDate ? selectedDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
  
  const getFilteredAppointments = () => {
    const today = new Date();
    const selectedDateObj = selectedDate || today;
    
    switch (filter) {
      case 'today':
        return appointments.filter(app => app.date === dateString);
      case 'week':
        const weekStart = new Date(selectedDateObj);
        weekStart.setDate(selectedDateObj.getDate() - selectedDateObj.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        
        return appointments.filter(app => {
          const appDate = new Date(app.date);
          return appDate >= weekStart && appDate <= weekEnd;
        });
      default:
        return appointments;
    }
  };

  const filteredAppointments = getFilteredAppointments()
    .sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime());

  const handleNewAppointment = () => {
    toast({
      title: "Nueva Cita",
      description: "Funcionalidad de nueva cita en desarrollo...",
    });
  };

  const handleEditAppointment = (appointmentId: string) => {
    toast({
      title: "Editar Cita",
      description: `Editando cita ${appointmentId}...`,
    });
  };

  const handleDeleteAppointment = (appointmentId: string) => {
    toast({
      title: "Eliminar Cita",
      description: `Cita ${appointmentId} eliminada.`,
      variant: "destructive",
    });
  };

  const handleAISuggestion = () => {
    toast({
      title: "Sugerencias de IA",
      description: "La IA sugiere reprogramar 3 citas para optimizar el horario.",
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-brand-light p-3 rounded-lg">
            <Calendar className="w-6 h-6 text-brand-blue" />
          </div>
          <h2 className="text-2xl font-bold text-brand-dark">Vista Administrativa - Agenda Global</h2>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleAISuggestion} variant="outline" className="gap-2">
            <Bot className="w-4 h-4" />
            Sugerencias IA
          </Button>
          <Button onClick={handleNewAppointment} className="gap-2">
            <Plus className="w-4 h-4" />
            Nueva Cita
          </Button>
        </div>
      </div>

      <div className="flex gap-2">
        <Button 
          variant={filter === 'today' ? 'default' : 'outline'} 
          onClick={() => setFilter('today')}
          size="sm"
        >
          Hoy
        </Button>
        <Button 
          variant={filter === 'week' ? 'default' : 'outline'} 
          onClick={() => setFilter('week')}
          size="sm"
        >
          Esta Semana
        </Button>
        <Button 
          variant={filter === 'all' ? 'default' : 'outline'} 
          onClick={() => setFilter('all')}
          size="sm"
        >
          Todas
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Citas Programadas ({filteredAppointments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => {
                const doctor = getDoctorForAppointment(appointment.personnelId);
                const patient = getPatientForAppointment(appointment.patientId);
                const appointmentDate = new Date(`${appointment.date}T${appointment.time}`);

                return (
                  <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-center w-24 flex-shrink-0">
                        <p className="text-sm text-gray-500">{appointmentDate.toLocaleDateString()}</p>
                        <p className="text-lg font-bold text-brand-dark">{appointmentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-brand-dark">{appointment.type}</p>
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status === 'Completed' ? 'Completada' : 
                             appointment.status === 'Scheduled' ? 'Programada' : 'Cancelada'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">Paciente: {patient?.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={doctor?.avatar} alt={doctor?.name} />
                            <AvatarFallback className="text-xs">{doctor?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-500">{doctor?.name}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEditAppointment(appointment.id)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDeleteAppointment(appointment.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 px-4 bg-gray-50 rounded-2xl">
                <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="font-semibold text-brand-dark">No hay citas programadas</p>
                <p className="text-sm text-gray-500">Para el período seleccionado</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
