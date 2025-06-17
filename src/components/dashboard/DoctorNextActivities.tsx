
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar, Phone, FileText } from 'lucide-react';

export const DoctorNextActivities = () => {
  // Mock data - se conectará con datos reales más adelante
  const nextActivities = [
    { 
      id: 1, 
      type: 'consultation', 
      title: 'Consulta María González', 
      time: '10:30', 
      duration: '30 min',
      status: 'próximo'
    },
    { 
      id: 2, 
      type: 'call', 
      title: 'Llamada seguimiento Carlos Ruiz', 
      time: '11:30', 
      duration: '15 min',
      status: 'programado'
    },
    { 
      id: 3, 
      type: 'review', 
      title: 'Revisar expediente Ana Martínez', 
      time: '14:00', 
      duration: '20 min',
      status: 'pendiente'
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'consultation': return <Calendar className="w-4 h-4 text-blue-600" />;
      case 'call': return <Phone className="w-4 h-4 text-green-600" />;
      case 'review': return <FileText className="w-4 h-4 text-orange-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'próximo': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'programado': return 'bg-green-100 text-green-700 border-green-200';
      case 'pendiente': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card className="shadow-soft border-0 rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-brand-blue" />
          Próximas Actividades
        </CardTitle>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          {nextActivities.length} actividades
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {nextActivities.map(activity => (
            <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                {getActivityIcon(activity.type)}
                <div>
                  <p className="font-semibold text-sm text-brand-dark">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.time} - {activity.duration}</p>
                </div>
              </div>
              <Badge variant="outline" className={getStatusColor(activity.status)}>
                {activity.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
