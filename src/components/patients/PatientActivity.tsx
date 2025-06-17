
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePatientPermissions } from '@/hooks/usePatientPermissions';
import { Clock, Phone, CreditCard, Calendar, FileText, Pill, Activity } from 'lucide-react';
import { Patient } from '@/data/patients';

interface PatientActivityProps {
  patient: Patient;
}

// Mock data específico por paciente
const getPatientActivity = (patientId: string, isAdmin: boolean) => {
  const adminActivities = {
    '1': [ // Jorge Villareal
      {
        id: 1,
        type: 'payment',
        title: 'Pago procesado',
        description: 'Consulta cardiología - €120',
        time: '2 horas',
        icon: CreditCard,
        priority: 'low'
      },
      {
        id: 2,
        type: 'contact',
        title: 'Teléfono actualizado',
        description: 'Cambió de +34 612 345 678 a +34 612 345 679',
        time: '1 día',
        icon: Phone,
        priority: 'low'
      },
      {
        id: 3,
        type: 'appointment',
        title: 'Cita reprogramada',
        description: 'Movida del 16/06 al 18/06',
        time: '3 días',
        icon: Calendar,
        priority: 'medium'
      }
    ],
    '2': [ // Sofía Ramirez
      {
        id: 1,
        type: 'payment',
        title: 'Pago pendiente',
        description: 'Consulta pediatría - €85',
        time: '1 día',
        icon: CreditCard,
        priority: 'high'
      },
      {
        id: 2,
        type: 'contact',
        title: 'Email verificado',
        description: 'sofia.ramirez@email.com confirmado',
        time: '2 días',
        icon: Phone,
        priority: 'low'
      }
    ]
  };

  const doctorActivities = {
    '1': [ // Jorge Villareal
      {
        id: 1,
        type: 'prescription',
        title: 'Medicación ajustada',
        description: 'Enalapril 10mg - reducir dosis a 5mg',
        time: '2 horas',
        icon: Pill,
        priority: 'high'
      },
      {
        id: 2,
        type: 'note',
        title: 'Nota médica agregada',
        description: 'Presión arterial estable, continuar tratamiento',
        time: '2 horas',
        icon: FileText,
        priority: 'medium'
      },
      {
        id: 3,
        type: 'vital',
        title: 'Signos vitales registrados',
        description: 'PA: 115/80, FC: 72 bpm',
        time: '2 horas',
        icon: Activity,
        priority: 'medium'
      }
    ],
    '2': [ // Sofía Ramirez
      {
        id: 1,
        type: 'prescription',
        title: 'Inhalador prescrito',
        description: 'Salbutamol 100mcg - 2 puff cada 6h si necesario',
        time: '1 día',
        icon: Pill,
        priority: 'high'
      },
      {
        id: 2,
        type: 'note',
        title: 'Evolución positiva',
        description: 'Mejora en síntomas respiratorios, continuar tratamiento',
        time: '1 día',
        icon: FileText,
        priority: 'medium'
      }
    ]
  };

  const activities = isAdmin ? adminActivities : doctorActivities;
  return activities[patientId as keyof typeof activities] || activities['1'];
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
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

export const PatientActivity = ({ patient }: PatientActivityProps) => {
  const { t } = useTranslation();
  const { isAdmin, isDoctor } = usePatientPermissions();

  const activities = getPatientActivity(patient.id, isAdmin);
  const title = isAdmin ? `Actividad Administrativa - ${patient.name}` : `Actividad Médica - ${patient.name}`;

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
                    activity.priority === 'high' ? 'bg-orange-100' :
                    activity.priority === 'medium' ? 'bg-yellow-100' :
                    'bg-green-100'
                  }`}>
                    <IconComponent className={`w-4 h-4 ${
                      activity.priority === 'high' ? 'text-orange-600' :
                      activity.priority === 'medium' ? 'text-yellow-600' :
                      'text-green-600'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.title}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Badge className={getPriorityColor(activity.priority)}>
                          {activity.priority === 'high' ? 'Alto' :
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
