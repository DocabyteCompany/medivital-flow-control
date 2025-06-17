
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, Clock, Coffee } from 'lucide-react';
import { getUserConfiguration, saveUserConfiguration, ScheduleSettings as ScheduleSettingsType } from '@/services/configurationService';
import { useToast } from '@/components/ui/use-toast';

export const ScheduleSettings = () => {
  const [settings, setSettings] = useState<ScheduleSettingsType>({
    workingHours: { start: '08:00', end: '17:00' },
    workingDays: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
    defaultAppointmentDuration: 30,
    lunchBreak: { start: '12:00', end: '13:00' },
  });
  const { toast } = useToast();

  const weekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  useEffect(() => {
    const config = getUserConfiguration();
    setSettings(config.schedule);
  }, []);

  const handleWorkingDayChange = (day: string, checked: boolean) => {
    const newWorkingDays = checked
      ? [...settings.workingDays, day]
      : settings.workingDays.filter(d => d !== day);
    
    setSettings({ ...settings, workingDays: newWorkingDays });
  };

  const handleSave = () => {
    saveUserConfiguration({ schedule: settings });
    toast({
      title: "Configuración guardada",
      description: "Tu configuración de agenda ha sido actualizada.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-brand-dark mb-2">Configuración de Agenda</h3>
        <p className="text-gray-600">Define tus horarios de trabajo y preferencias de citas.</p>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-blue" />
              Horario de Trabajo
            </CardTitle>
            <CardDescription>
              Define tu horario laboral diario
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start-time">Hora de inicio</Label>
                <Input
                  id="start-time"
                  type="time"
                  value={settings.workingHours.start}
                  onChange={(e) => setSettings({
                    ...settings,
                    workingHours: { ...settings.workingHours, start: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="end-time">Hora de fin</Label>
                <Input
                  id="end-time"
                  type="time"
                  value={settings.workingHours.end}
                  onChange={(e) => setSettings({
                    ...settings,
                    workingHours: { ...settings.workingHours, end: e.target.value }
                  })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-blue" />
              Días Laborables
            </CardTitle>
            <CardDescription>
              Selecciona los días de la semana en que trabajas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {weekDays.map((day) => (
                <div key={day} className="flex items-center space-x-2">
                  <Checkbox
                    id={day}
                    checked={settings.workingDays.includes(day)}
                    onCheckedChange={(checked) => handleWorkingDayChange(day, checked as boolean)}
                  />
                  <Label htmlFor={day} className="text-sm font-normal">{day}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Coffee className="w-4 h-4 text-brand-blue" />
              Horario de Almuerzo
            </CardTitle>
            <CardDescription>
              Define tu hora de descanso para almuerzo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lunch-start">Inicio almuerzo</Label>
                <Input
                  id="lunch-start"
                  type="time"
                  value={settings.lunchBreak.start}
                  onChange={(e) => setSettings({
                    ...settings,
                    lunchBreak: { ...settings.lunchBreak, start: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="lunch-end">Fin almuerzo</Label>
                <Input
                  id="lunch-end"
                  type="time"
                  value={settings.lunchBreak.end}
                  onChange={(e) => setSettings({
                    ...settings,
                    lunchBreak: { ...settings.lunchBreak, end: e.target.value }
                  })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Duración de Citas</CardTitle>
            <CardDescription>
              Tiempo predeterminado para nuevas citas (en minutos)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-32">
              <Label htmlFor="appointment-duration">Minutos por cita</Label>
              <Input
                id="appointment-duration"
                type="number"
                min="15"
                max="120"
                step="15"
                value={settings.defaultAppointmentDuration}
                onChange={(e) => setSettings({
                  ...settings,
                  defaultAppointmentDuration: parseInt(e.target.value) || 30
                })}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={handleSave} className="bg-brand-blue hover:bg-brand-blue/90">
          Guardar Configuración
        </Button>
      </div>
    </div>
  );
};
