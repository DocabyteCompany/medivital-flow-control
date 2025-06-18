
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Personnel } from "@/data/personnel";
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';
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
  const { t } = useTranslation();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Mock data para ejemplo
  const [weeklySchedule, setWeeklySchedule] = useState<ScheduleEntry[]>([
    { id: '1', day: t('personnel.schedule.days.monday'), startTime: '08:00', endTime: '16:00', type: 'regular', patients: 12, status: 'active' },
    { id: '2', day: t('personnel.schedule.days.tuesday'), startTime: '08:00', endTime: '16:00', type: 'regular', patients: 10, status: 'active' },
    { id: '3', day: t('personnel.schedule.days.wednesday'), startTime: '10:00', endTime: '18:00', type: 'regular', patients: 8, status: 'active' },
    { id: '4', day: t('personnel.schedule.days.thursday'), startTime: '08:00', endTime: '16:00', type: 'regular', patients: 11, status: 'active' },
    { id: '5', day: t('personnel.schedule.days.friday'), startTime: '08:00', endTime: '14:00', type: 'regular', patients: 9, status: 'active' },
    { id: '6', day: t('personnel.schedule.days.saturday'), startTime: '09:00', endTime: '13:00', type: 'oncall', patients: 3, status: 'active' },
  ]);

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

  const handleEditSchedule = (scheduleId: string) => {
    const schedule = weeklySchedule.find(s => s.id === scheduleId);
    console.log('Editando horario:', schedule);
    
    toast({
      title: "Editar Turno",
      description: `Función de edición para el turno de ${schedule?.day}. Esta funcionalidad se implementará próximamente.`,
    });
  };

  const handleDeleteSchedule = (scheduleId: string) => {
    const schedule = weeklySchedule.find(s => s.id === scheduleId);
    
    // Simular eliminación
    setWeeklySchedule(prev => prev.filter(s => s.id !== scheduleId));
    
    toast({
      title: "Turno Eliminado",
      description: `Se ha eliminado el turno de ${schedule?.day}.`,
      variant: "destructive",
    });
  };

  const handleAddShift = () => {
    console.log('Agregando nuevo turno');
    
    toast({
      title: "Agregar Turno",
      description: "Función para agregar nuevo turno. Esta funcionalidad se implementará próximamente.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendario de disponibilidad */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              {t('personnel.schedule.availability')}
            </CardTitle>
            <CardDescription>
              {t('personnel.schedule.availabilityDesc')}
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
                <span className="text-sm">{t('personnel.schedule.available')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-sm">{t('personnel.schedule.busy')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm">{t('personnel.schedule.unavailable')}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Horario semanal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              {t('personnel.schedule.weeklySchedule')}
            </CardTitle>
            <CardDescription>
              {t('personnel.schedule.weeklyScheduleDesc')}
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
                      {t(`personnel.schedule.types.${schedule.type}`)}
                    </Badge>
                    <Badge variant="outline" className={getStatusColor(schedule.status)}>
                      {t(`personnel.schedule.status.${schedule.status}`)}
                    </Badge>
                    <div className="flex gap-1">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditSchedule(schedule.id)}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteSchedule(schedule.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" onClick={handleAddShift}>
              <Plus className="w-4 h-4 mr-2" />
              {t('personnel.schedule.addShift')}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Estadísticas de turnos */}
      <Card>
        <CardHeader>
          <CardTitle>{t('personnel.schedule.shiftStats')}</CardTitle>
          <CardDescription>{t('personnel.schedule.shiftStatsDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">40</div>
              <div className="text-sm text-gray-600">{t('personnel.schedule.weeklyHours')}</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">53</div>
              <div className="text-sm text-gray-600">{t('personnel.schedule.patientsThisWeek')}</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">2</div>
              <div className="text-sm text-gray-600">{t('personnel.schedule.extraShifts')}</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">95%</div>
              <div className="text-sm text-gray-600">{t('personnel.schedule.attendance')}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
