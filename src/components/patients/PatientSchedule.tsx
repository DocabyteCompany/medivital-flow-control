
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePatientPermissions } from '@/hooks/usePatientPermissions';
import { Clock, User, Phone, Stethoscope } from 'lucide-react';

const adminSchedule = [
  {
    id: 1,
    time: '09:00',
    patient: 'Jorge Villareal',
    type: 'Consulta',
    status: 'confirmed',
    preparation: 'Revisar historial cardiovascular',
    phone: '+34 612 345 678'
  },
  {
    id: 2,
    time: '10:30',
    patient: 'Sofía Ramirez',
    type: 'Seguimiento',
    status: 'pending',
    preparation: 'Preparar material pediátrico',
    phone: '+34 687 123 456'
  },
  {
    id: 3,
    time: '12:00',
    patient: 'Carlos López',
    type: 'Revisión',
    status: 'confirmed',
    preparation: 'Resultados de análisis listos',
    phone: '+34 654 987 321'
  },
  {
    id: 4,
    time: '15:30',
    patient: 'Laura Martínez',
    type: 'Consulta',
    status: 'confirmed',
    preparation: 'Primera consulta - formularios listos',
    phone: '+34 698 456 789'
  }
];

const doctorSchedule = [
  {
    id: 1,
    time: '09:00',
    patient: 'Jorge Villareal',
    type: 'Consulta',
    duration: '30 min',
    notes: 'Control presión arterial, ajustar medicación',
    lastVisit: '2025-05-15'
  },
  {
    id: 2,
    time: '10:30',
    patient: 'Sofía Ramirez',
    type: 'Seguimiento',
    duration: '20 min',
    notes: 'Evolución tratamiento respiratorio',
    lastVisit: '2025-06-14'
  },
  {
    id: 3,
    time: '12:00',
    patient: 'Carlos López',
    type: 'Revisión',
    duration: '25 min',
    notes: 'Revisar análisis, posible alta médica',
    lastVisit: '2025-06-12'
  },
  {
    id: 4,
    time: '15:30',
    patient: 'Laura Martínez',
    type: 'Consulta',
    duration: '45 min',
    notes: 'Primera consulta - evaluación completa',
    lastVisit: '2025-06-10'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const PatientSchedule = () => {
  const { t } = useTranslation();
  const { isAdmin, isDoctor } = usePatientPermissions();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            {isAdmin ? 'Agenda Operativa' : 'Consultas del Día'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {(isAdmin ? adminSchedule : doctorSchedule).map((appointment) => (
              <div key={appointment.id} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex flex-col items-center">
                  <div className="bg-brand-blue text-white px-3 py-1 rounded-full text-sm font-medium">
                    {appointment.time}
                  </div>
                  {isDoctor && (
                    <span className="text-xs text-gray-500 mt-1">
                      {(appointment as any).duration}
                    </span>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <p className="text-sm font-medium text-gray-900">
                        {appointment.patient}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{appointment.type}</Badge>
                      {isAdmin && (
                        <Badge className={getStatusColor((appointment as any).status)}>
                          {(appointment as any).status === 'confirmed' ? 'Confirmado' :
                           (appointment as any).status === 'pending' ? 'Pendiente' : 'Cancelado'}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {isAdmin && (
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-gray-600">
                        📋 {(appointment as any).preparation}
                      </p>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Phone className="w-3 h-3" />
                        <span>{(appointment as any).phone}</span>
                      </div>
                    </div>
                  )}
                  
                  {isDoctor && (
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Stethoscope className="w-3 h-3" />
                        <span>{(appointment as any).notes}</span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Última visita: {new Date((appointment as any).lastVisit).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
