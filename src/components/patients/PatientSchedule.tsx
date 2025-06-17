
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePatientPermissions } from '@/hooks/usePatientPermissions';
import { Clock, User, Calendar } from 'lucide-react';
import { Patient } from '@/data/patients';

interface PatientScheduleProps {
  patient: Patient;
}

// Mock data específico por paciente
const getPatientSchedule = (patientId: string) => {
  const scheduleData = {
    '1': { // Jorge Villareal
      upcoming: [
        {
          id: 1,
          date: '2025-06-18',
          time: '10:00',
          type: 'Control Cardiología',
          doctor: 'Dr. García',
          status: 'confirmed',
          notes: 'Control presión arterial y ajuste medicación'
        },
        {
          id: 2,
          date: '2025-06-25',
          time: '09:30',
          type: 'Análisis de Sangre',
          doctor: 'Laboratorio',
          status: 'confirmed',
          notes: 'Perfil lipídico y glucosa'
        }
      ],
      past: [
        {
          id: 3,
          date: '2025-06-15',
          time: '11:00',
          type: 'Consulta Cardiología',
          doctor: 'Dr. García',
          status: 'completed',
          notes: 'Revisión general, presión estable'
        },
        {
          id: 4,
          date: '2025-05-20',
          time: '10:30',
          type: 'Control Rutinario',
          doctor: 'Dr. García',
          status: 'completed',
          notes: 'Ajuste de medicación antihipertensiva'
        }
      ]
    },
    '2': { // Sofía Ramirez
      upcoming: [
        {
          id: 1,
          date: '2025-06-20',
          time: '16:00',
          type: 'Control Pediatría',
          doctor: 'Dra. López',
          status: 'confirmed',
          notes: 'Seguimiento tratamiento respiratorio'
        }
      ],
      past: [
        {
          id: 2,
          date: '2025-06-14',
          time: '15:30',
          type: 'Consulta Pediatría',
          doctor: 'Dra. López',
          status: 'completed',
          notes: 'Evaluación síntomas respiratorios'
        },
        {
          id: 3,
          date: '2025-05-28',
          time: '16:00',
          type: 'Vacunación',
          doctor: 'Enfermera Ana',
          status: 'completed',
          notes: 'Vacuna anual correspondiente'
        }
      ]
    }
  };

  return scheduleData[patientId as keyof typeof scheduleData] || scheduleData['1'];
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'completed':
      return 'bg-blue-100 text-blue-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const PatientSchedule = ({ patient }: PatientScheduleProps) => {
  const { t } = useTranslation();
  const { isAdmin, isDoctor } = usePatientPermissions();
  const schedule = getPatientSchedule(patient.id);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Próximas Citas - {patient.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {schedule.upcoming.length > 0 ? (
              schedule.upcoming.map((appointment) => (
                <div key={appointment.id} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex flex-col items-center">
                    <div className="bg-brand-blue text-white px-3 py-1 rounded-full text-sm font-medium">
                      {appointment.time}
                    </div>
                    <span className="text-xs text-gray-500 mt-1">
                      {new Date(appointment.date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <p className="text-sm font-medium text-gray-900">
                          {appointment.type}
                        </p>
                      </div>
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status === 'confirmed' ? 'Confirmado' : 'Pendiente'}
                      </Badge>
                    </div>
                    
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-gray-600">
                        👨‍⚕️ {appointment.doctor}
                      </p>
                      <p className="text-sm text-gray-500">
                        📋 {appointment.notes}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No hay próximas citas programadas</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Historial de Citas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {schedule.past.map((appointment) => (
              <div key={appointment.id} className="flex items-start space-x-4 p-4 border rounded-lg bg-gray-50">
                <div className="flex flex-col items-center">
                  <div className="bg-gray-400 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {appointment.time}
                  </div>
                  <span className="text-xs text-gray-500 mt-1">
                    {new Date(appointment.date).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <p className="text-sm font-medium text-gray-900">
                        {appointment.type}
                      </p>
                    </div>
                    <Badge className={getStatusColor(appointment.status)}>
                      Completado
                    </Badge>
                  </div>
                  
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-600">
                      👨‍⚕️ {appointment.doctor}
                    </p>
                    <p className="text-sm text-gray-500">
                      📋 {appointment.notes}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
