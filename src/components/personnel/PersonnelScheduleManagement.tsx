
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Personnel } from "@/data/personnel";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  Edit, 
  Trash2,
  Users,
  CheckCircle
} from "lucide-react";

interface PersonnelScheduleManagementProps {
  person: Personnel;
}

interface ScheduleEntry {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  type: 'regular' | 'overtime' | 'oncall';
  patients: number;
  status: 'active' | 'break' | 'unavailable';
}

export const PersonnelScheduleManagement = ({ person }: PersonnelScheduleManagementProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Mock data para ejemplo
  const weeklySchedule: ScheduleEntry[] = [
    { id: '1', day: 'Lunes', startTime: '08:00', endTime: '16:00', type: 'regular', patients: 12, status: 'active' },
    { id: '2', day: 'Martes', startTime: '08:00', endTime: '16:00', type: 'regular', patients: 10, status: 'active' },
    { id: '3', day: 'Miércoles', startTime: '10:00', endTime: '18:00', type: 'regular', patients: 8, status: 'active' },
    { id: '4', day: 'Jueves', startTime: '08:00', endTime: '16:00', type: 'regular', patients: 11, status: 'active' },
    { id: '5', day: 'Viernes', startTime: '08:00', endTime: '14:00', type: 'regular', patients: 9, status: 'active' },
    { id: '6', day: 'Sábado', startTime: '09:00', endTime: '13:00', type: 'oncall', patients: 3, status: 'active' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'break': return 'bg-yellow-100 text-yellow-800';
      case 'unavailable': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'regular': return 'bg-blue-100 text-blue-800';
      case 'overtime': return 'bg-orange-100 text-orange-800';
      case 'oncall': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendario de disponibilidad */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              Calendario de Disponibilidad
            </CardTitle>
            <CardDescription>
              Vista mensual de disponibilidad y turnos asignados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Disponible</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-sm">Ocupado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm">No disponible</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Horario semanal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Horario Semanal
            </CardTitle>
            <CardDescription>
              Configuración de turnos y horarios de trabajo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weeklySchedule.map((schedule) => (
                <div key={schedule.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-20 font-medium">{schedule.day}</div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      {schedule.startTime} - {schedule.endTime}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getTypeColor(schedule.type)}>
                      {schedule.type}
                    </Badge>
                    <Badge variant="outline" className={getStatusColor(schedule.status)}>
                      {schedule.status}
                    </Badge>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4">
              <Plus className="w-4 h-4 mr-2" />
              Agregar Turno
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Estadísticas de turnos */}
      <Card>
        <CardHeader>
          <CardTitle>Estadísticas de Turnos</CardTitle>
          <CardDescription>Resumen de actividad y carga de trabajo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">40</div>
              <div className="text-sm text-gray-600">Horas semanales</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">53</div>
              <div className="text-sm text-gray-600">Pacientes esta semana</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">2</div>
              <div className="text-sm text-gray-600">Turnos extra</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">95%</div>
              <div className="text-sm text-gray-600">Asistencia</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
