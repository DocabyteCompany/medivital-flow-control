
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Personnel } from "@/data/personnel";
import { appointments, getPatientForAppointment } from "@/data/appointments";
import { 
  User, 
  MessageSquare, 
  Calendar, 
  Clock,
  Phone,
  FileText,
  Activity,
  ExternalLink
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PersonnelActivityHistoryProps {
  person: Personnel;
}

interface ActivityEntry {
  id: string;
  type: 'appointment' | 'message' | 'call' | 'note' | 'schedule_change';
  description: string;
  timestamp: string;
  relatedPatient?: string;
  relatedAppointment?: string;
  status?: 'completed' | 'pending' | 'cancelled';
  details?: string;
}

export const PersonnelActivityHistory = ({ person }: PersonnelActivityHistoryProps) => {
  const navigate = useNavigate();

  // Obtener citas del personal
  const personnelAppointments = appointments.filter(apt => apt.personnelId === person.id);

  // Mock data para actividades recientes
  const recentActivities: ActivityEntry[] = [
    {
      id: '1',
      type: 'appointment',
      description: 'Consulta completada con Jorge Villareal',
      timestamp: '2025-06-18T10:30:00',
      relatedPatient: '1',
      relatedAppointment: 'app1',
      status: 'completed',
      details: 'Revisión cardiológica de rutina'
    },
    {
      id: '2',
      type: 'message',
      description: 'Respondió mensaje de Dr. Sánchez sobre caso neurológico',
      timestamp: '2025-06-18T09:15:00',
      status: 'completed'
    },
    {
      id: '3',
      type: 'call',
      description: 'Llamada telefónica con familia de paciente',
      timestamp: '2025-06-18T08:45:00',
      relatedPatient: '2',
      status: 'completed',
      details: 'Seguimiento post-consulta'
    },
    {
      id: '4',
      type: 'note',
      description: 'Nota médica agregada al expediente',
      timestamp: '2025-06-17T16:20:00',
      relatedPatient: '3',
      status: 'completed',
      details: 'Actualización de tratamiento'
    },
    {
      id: '5',
      type: 'schedule_change',
      description: 'Cambio de horario para turno de mañana',
      timestamp: '2025-06-17T14:00:00',
      status: 'completed',
      details: 'Adelantado 30 minutos por emergencia'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'appointment': return <Calendar className="w-4 h-4 text-blue-600" />;
      case 'message': return <MessageSquare className="w-4 h-4 text-green-600" />;
      case 'call': return <Phone className="w-4 h-4 text-purple-600" />;
      case 'note': return <FileText className="w-4 h-4 text-orange-600" />;
      case 'schedule_change': return <Clock className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewPatient = (patientId: string) => {
    navigate(`/pacientes?patient=${patientId}`);
  };

  const handleViewAppointment = (appointmentId: string) => {
    navigate(`/agenda?appointment=${appointmentId}`);
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Hace menos de 1 hora';
    if (diffInHours < 24) return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `Hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`;
  };

  return (
    <div className="space-y-6">
      {/* Resumen de actividad */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Citas Hoy</p>
                <p className="text-2xl font-bold text-brand-dark">8</p>
              </div>
              <Calendar className="w-6 h-6 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Mensajes</p>
                <p className="text-2xl font-bold text-brand-dark">12</p>
              </div>
              <MessageSquare className="w-6 h-6 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Llamadas</p>
                <p className="text-2xl font-bold text-brand-dark">5</p>
              </div>
              <Phone className="w-6 h-6 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Notas</p>
                <p className="text-2xl font-bold text-brand-dark">3</p>
              </div>
              <FileText className="w-6 h-6 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Historial de actividades */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Actividad Reciente
          </CardTitle>
          <CardDescription>
            Últimas actividades y acciones realizadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const patient = activity.relatedPatient ? getPatientForAppointment(activity.relatedPatient) : null;
              
              return (
                <div key={activity.id} className="flex items-start gap-3 p-4 border rounded-lg hover:bg-gray-50">
                  <div className="p-2 bg-brand-light rounded-lg flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-gray-900">{activity.description}</p>
                        {activity.details && (
                          <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
                        )}
                        {patient && (
                          <div className="flex items-center gap-2 mt-2">
                            <User className="w-3 h-3 text-gray-400" />
                            <span className="text-sm text-gray-600">{patient.name}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewPatient(activity.relatedPatient!)}
                              className="text-xs h-6 px-2"
                            >
                              <ExternalLink className="w-3 h-3 mr-1" />
                              Ver paciente
                            </Button>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-xs text-gray-500">
                          {formatTimeAgo(activity.timestamp)}
                        </span>
                        {activity.status && (
                          <Badge variant="outline" className={getStatusColor(activity.status)}>
                            {activity.status}
                          </Badge>
                        )}
                        {activity.relatedAppointment && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewAppointment(activity.relatedAppointment!)}
                            className="text-xs h-6"
                          >
                            Ver cita
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Próximas citas programadas */}
      <Card>
        <CardHeader>
          <CardTitle>Próximas Citas Programadas</CardTitle>
          <CardDescription>Agenda de citas vinculada del personal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {personnelAppointments
              .filter(apt => new Date(`${apt.date}T${apt.time}`) > new Date())
              .slice(0, 5)
              .map((appointment) => {
                const patient = getPatientForAppointment(appointment.patientId);
                const appointmentDate = new Date(`${appointment.date}T${appointment.time}`);
                
                return (
                  <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-center w-16">
                        <div className="text-sm text-gray-500">
                          {appointmentDate.toLocaleDateString(undefined, { weekday: 'short' })}
                        </div>
                        <div className="font-bold text-brand-dark">
                          {appointmentDate.getDate()}
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">{appointment.type}</p>
                        <p className="text-sm text-gray-600">
                          {patient?.name} • {appointmentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewAppointment(appointment.id)}
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Ver
                    </Button>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
