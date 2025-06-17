
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, CheckCircle, AlertCircle } from 'lucide-react';

export const AdminRemindersWidget = () => {
  // Mock data - se conectará con datos reales más adelante
  const reminders = [
    { id: 1, type: 'Cita mañana', patient: 'Dr. García', message: 'Recordatorio enviado', status: 'sent' },
    { id: 2, type: 'Seguimiento', patient: 'Dra. López', message: 'Pendiente de envío', status: 'pending' },
    { id: 3, type: 'Reagendar', patient: 'Dr. Ruiz', message: 'Confirmado', status: 'confirmed' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'confirmed': return <CheckCircle className="w-4 h-4 text-blue-600" />;
      default: return <AlertCircle className="w-4 h-4 text-orange-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-700 border-green-200';
      case 'confirmed': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-orange-100 text-orange-700 border-orange-200';
    }
  };

  return (
    <Card className="shadow-soft border-0 rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-brand-blue" />
          Gestión de Recordatorios
        </CardTitle>
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
          {reminders.length} activos
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {reminders.map(reminder => (
            <div key={reminder.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                {getStatusIcon(reminder.status)}
                <div>
                  <p className="font-semibold text-sm text-brand-dark">{reminder.type}</p>
                  <p className="text-xs text-gray-500">{reminder.patient}</p>
                </div>
              </div>
              <Badge variant="outline" className={getStatusColor(reminder.status)}>
                {reminder.message}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
