
import { AIActivitiesWidget } from '@/components/dashboard/AIActivitiesWidget';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RecentChats } from '@/components/dashboard/RecentChats';
import { NewPatientDialog } from '@/components/patients/NewPatientDialog';
import { useTranslation } from 'react-i18next';
import { Calendar, Users, FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const DashboardDoctor = () => {
  const { t } = useTranslation();

  // Mock data - esto se conectará con datos reales más adelante
  const todayAppointments = [
    { id: 1, time: '09:00', patient: 'Jorge Villareal', type: 'Consulta Cardiológica' },
    { id: 2, time: '10:30', patient: 'Sofía Ramirez', type: 'Seguimiento Pediátrico' },
    { id: 3, time: '14:00', patient: 'Carlos López', type: 'Revisión Neurológica' },
  ];

  const pendingPatients = [
    { id: 1, name: 'Laura Martínez', status: 'En sala de espera', time: '09:45' },
    { id: 2, name: 'Luis Martinez', status: 'Próximo', time: '10:00' },
  ];

  const pendingAITasks = 5; // Número de tareas de IA pendientes de revisión

  return (
    <div className="flex flex-col gap-8 mt-4">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-brand-dark">Mi Panel de Control</h1>
        <NewPatientDialog />
      </div>

      {/* Fila superior - Mi Agenda del Día y Pacientes Pendientes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mi Agenda del Día */}
        <Card className="shadow-soft border-0 rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-brand-blue" />
              Mi Agenda del Día
            </CardTitle>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {todayAppointments.length} citas
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayAppointments.map(appointment => (
                <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-sm text-brand-dark">{appointment.time}</p>
                    <p className="text-sm text-gray-600">{appointment.patient}</p>
                    <p className="text-xs text-gray-500">{appointment.type}</p>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Programada
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pacientes Pendientes */}
        <Card className="shadow-soft border-0 rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-brand-blue" />
              Pacientes Pendientes
            </CardTitle>
            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
              {pendingPatients.length} esperando
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingPatients.map(patient => (
                <div key={patient.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-sm text-brand-dark">{patient.name}</p>
                    <p className="text-xs text-gray-500">{patient.status}</p>
                  </div>
                  <span className="text-sm text-gray-600">{patient.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tareas IA Pendientes de Revisión - Widget Prominente */}
      <Card className="shadow-soft border-0 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Tareas de IA Pendientes de Mi Revisión
            </div>
            <Badge className="bg-blue-600 text-white text-base px-4 py-2">
              {pendingAITasks} pendientes
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Tienes {pendingAITasks} resúmenes de expedientes y análisis de IA esperando tu aprobación.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Revisar Ahora
          </button>
        </CardContent>
      </Card>

      {/* Fila inferior - Actividades IA y Chats Recientes */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <AIActivitiesWidget />
        </div>
        <div>
          <RecentChats />
        </div>
      </div>
    </div>
  );
};
