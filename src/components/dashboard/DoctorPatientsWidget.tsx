
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Clock } from 'lucide-react';

export const DoctorPatientsWidget = () => {
  // Mock data - se conectará con datos reales más adelante
  const todayPatients = [
    { id: 1, name: 'María González', appointment: '09:00', status: 'En consulta' },
    { id: 2, name: 'Carlos Ruiz', appointment: '10:30', status: 'Esperando' },
    { id: 3, name: 'Ana Martínez', appointment: '11:15', status: 'Próximo' },
    { id: 4, name: 'Luis Fernández', appointment: '14:00', status: 'Programado' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En consulta': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Esperando': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Próximo': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card className="shadow-soft border-0 rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-brand-blue" />
          Pacientes de Hoy
        </CardTitle>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          {todayPatients.length} pacientes
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {todayPatients.map(patient => (
            <div key={patient.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="font-semibold text-sm text-brand-dark">{patient.name}</p>
                  <p className="text-xs text-gray-500">{patient.appointment}</p>
                </div>
              </div>
              <Badge variant="outline" className={getStatusColor(patient.status)}>
                {patient.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
