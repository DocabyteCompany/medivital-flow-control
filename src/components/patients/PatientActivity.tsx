
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePatientPermissions } from '@/hooks/usePatientPermissions';
import { Clock, AlertTriangle, CheckCircle, Phone, CreditCard, Calendar } from 'lucide-react';

const adminActivities = [
  {
    id: 1,
    type: 'confirmation',
    title: 'Confirmar cita de Jorge Villareal',
    description: 'Cita programada para mañana a las 10:00',
    priority: 'high',
    icon: Phone,
    time: '2 min'
  },
  {
    id: 2,
    type: 'payment',
    title: 'Pago pendiente - Sofía Ramirez',
    description: 'Consulta del 14/06 - €85',
    priority: 'medium',
    icon: CreditCard,
    time: '1 hora'
  },
  {
    id: 3,
    type: 'schedule',
    title: 'Preparar consulta Carlos López',
    description: 'Revisar historial antes de cita de hoy',
    priority: 'medium',
    icon: Calendar,
    time: '30 min'
  },
  {
    id: 4,
    type: 'payment',
    title: 'Facturación completada - Laura Martínez',
    description: 'Pago procesado correctamente',
    priority: 'low',
    icon: CheckCircle,
    time: '2 horas'
  }
];

const doctorActivities = [
  {
    id: 1,
    type: 'critical',
    title: 'Luis Martinez - Estado crítico',
    description: 'Requiere seguimiento inmediato de presión arterial',
    priority: 'critical',
    icon: AlertTriangle,
    time: 'Ahora'
  },
  {
    id: 2,
    type: 'followup',
    title: 'Revisión Jorge Ramos',
    description: 'Control post-tratamiento programado',
    priority: 'high',
    icon: Clock,
    time: '1 hora'
  },
  {
    id: 3,
    type: 'checkup',
    title: 'Sofía Ramirez - Evolución positiva',
    description: 'Tratamiento respondiendo bien, continuar',
    priority: 'medium',
    icon: CheckCircle,
    time: '3 horas'
  },
  {
    id: 4,
    type: 'review',
    title: 'Carlos López - Resultados laboratorio',
    description: 'Analíticas recibidas, revisar valores',
    priority: 'medium',
    icon: Clock,
    time: '5 horas'
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical':
      return 'bg-red-100 text-red-800';
    case 'high':
      return 'bg-orange-100 text-orange-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const PatientActivity = () => {
  const { t } = useTranslation();
  const { isAdmin, isDoctor } = usePatientPermissions();

  const activities = isAdmin ? adminActivities : doctorActivities;
  const title = isAdmin ? 'Tareas Administrativas' : 'Seguimientos Médicos';

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity) => {
              const IconComponent = activity.icon;
              return (
                <div key={activity.id} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                  <div className={`p-2 rounded-full ${
                    activity.priority === 'critical' ? 'bg-red-100' :
                    activity.priority === 'high' ? 'bg-orange-100' :
                    'bg-blue-100'
                  }`}>
                    <IconComponent className={`w-4 h-4 ${
                      activity.priority === 'critical' ? 'text-red-600' :
                      activity.priority === 'high' ? 'text-orange-600' :
                      'text-blue-600'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.title}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Badge className={getPriorityColor(activity.priority)}>
                          {activity.priority === 'critical' ? 'Crítico' :
                           activity.priority === 'high' ? 'Alto' :
                           activity.priority === 'medium' ? 'Medio' : 'Bajo'}
                        </Badge>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {activity.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
