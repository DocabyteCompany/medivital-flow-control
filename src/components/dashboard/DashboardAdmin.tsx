
import { AIActivitiesWidget } from '@/components/dashboard/AIActivitiesWidget';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RecentChats } from '@/components/dashboard/RecentChats';
import { NewPatientDialog } from '@/components/patients/NewPatientDialog';
import { useTranslation } from 'react-i18next';
import { Calendar, TrendingUp, UserPlus, Bot } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const DashboardAdmin = () => {
  const { t } = useTranslation();

  // Mock data - esto se conectará con datos reales más adelante
  const clinicStats = {
    todayAppointments: 24,
    weekAppointments: 156,
    completedToday: 18,
    pendingToday: 6
  };

  const reminderStats = {
    sent: 45,
    successful: 38,
    failed: 7
  };

  const newPatients = [
    { id: 1, name: 'Ana García', registeredAt: '09:30', phone: '+52 999 123 4567' },
    { id: 2, name: 'Pedro Sánchez', registeredAt: '11:15', phone: '+52 999 765 4321' },
    { id: 3, name: 'María Rodríguez', registeredAt: '14:45', phone: '+52 999 456 7890' },
  ];

  const pendingAITasks = 12; // Número de tareas de IA pendientes de gestión

  return (
    <div className="flex flex-col gap-8 mt-4">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-brand-dark">Panel Administrativo</h1>
        <NewPatientDialog />
      </div>

      {/* Fila superior - Métricas principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resumen de Citas de la Clínica */}
        <Card className="shadow-soft border-0 rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-brand-blue" />
              Resumen de Citas
            </CardTitle>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Hoy
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{clinicStats.completedToday}</p>
                <p className="text-sm text-green-700">Completadas</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-2xl font-bold text-orange-600">{clinicStats.pendingToday}</p>
                <p className="text-sm text-orange-700">Pendientes</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Esta semana: <span className="font-semibold">{clinicStats.weekAppointments} citas</span></p>
            </div>
          </CardContent>
        </Card>

        {/* Estado de Recordatorios de IA */}
        <Card className="shadow-soft border-0 rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brand-blue" />
              Recordatorios de IA
            </CardTitle>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              {Math.round((reminderStats.successful / reminderStats.sent) * 100)}% éxito
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Enviados:</span>
                <span className="font-semibold">{reminderStats.sent}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-600">Exitosos:</span>
                <span className="font-semibold text-green-600">{reminderStats.successful}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-red-600">Fallidos:</span>
                <span className="font-semibold text-red-600">{reminderStats.failed}</span>
              </div>
            </div>
            {reminderStats.failed > 0 && (
              <div className="mt-4 p-3 bg-red-50 rounded-lg">
                <p className="text-sm text-red-700">
                  {reminderStats.failed} recordatorios requieren intervención manual
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Nuevos Pacientes Registrados */}
      <Card className="shadow-soft border-0 rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-brand-blue" />
            Nuevos Pacientes Registrados (Hoy)
          </CardTitle>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            {newPatients.length} nuevos
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {newPatients.map(patient => (
              <div key={patient.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-sm text-brand-dark">{patient.name}</p>
                  <p className="text-xs text-gray-500">{patient.phone}</p>
                </div>
                <span className="text-sm text-gray-600">{patient.registeredAt}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tareas IA Pendientes de Gestión - Widget Prominente */}
      <Card className="shadow-soft border-0 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border-purple-100">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-600" />
              Tareas de IA Pendientes de Gestión
            </div>
            <Badge className="bg-purple-600 text-white text-base px-4 py-2">
              {pendingAITasks} pendientes
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Hay {pendingAITasks} tareas de IA que requieren seguimiento administrativo: confirmaciones de reprogramación, clasificación de mensajes, etc.
          </p>
          <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
            Gestionar Ahora
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
