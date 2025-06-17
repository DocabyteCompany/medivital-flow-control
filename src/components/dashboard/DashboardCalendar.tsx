
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type CalendarView = 'day' | 'week' | 'month';

export const DashboardCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [view, setView] = useState<CalendarView>('month');

  // Mock appointments data - this would come from real data
  const appointments = [
    { id: 1, date: '2025-06-17', time: '09:00', patient: 'María González', type: 'Consulta' },
    { id: 2, date: '2025-06-17', time: '10:30', patient: 'Carlos Ruiz', type: 'Seguimiento' },
    { id: 3, date: '2025-06-18', time: '14:00', patient: 'Ana Martínez', type: 'Evaluación' },
  ];

  const getAppointmentsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return appointments.filter(apt => apt.date === dateStr);
  };

  const renderDayView = () => {
    const dayAppointments = getAppointmentsForDate(selectedDate);
    
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">
            {selectedDate.toLocaleDateString('es-ES', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h3>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedDate(new Date(selectedDate.getTime() - 24 * 60 * 60 * 1000))}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedDate(new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000))}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        {dayAppointments.length > 0 ? (
          <div className="space-y-2">
            {dayAppointments.map(apt => (
              <div key={apt.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium">{apt.patient}</p>
                  <p className="text-sm text-gray-600">{apt.time}</p>
                </div>
                <Badge variant="outline">{apt.type}</Badge>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No hay citas programadas</p>
        )}
      </div>
    );
  };

  const renderWeekView = () => {
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
    
    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">
            Semana del {startOfWeek.toLocaleDateString('es-ES')}
          </h3>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedDate(new Date(selectedDate.getTime() - 7 * 24 * 60 * 60 * 1000))}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedDate(new Date(selectedDate.getTime() + 7 * 24 * 60 * 60 * 1000))}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((date, index) => {
            const dayAppointments = getAppointmentsForDate(date);
            return (
              <div key={index} className="p-2 border rounded text-center">
                <p className="text-xs font-medium">{date.toLocaleDateString('es-ES', { weekday: 'short' })}</p>
                <p className="text-sm">{date.getDate()}</p>
                {dayAppointments.length > 0 && (
                  <Badge variant="secondary" className="text-xs mt-1">
                    {dayAppointments.length}
                  </Badge>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Card className="shadow-soft border-0 rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-brand-blue" />
            Calendario
          </div>
          <div className="flex gap-1">
            <Button 
              variant={view === 'day' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setView('day')}
            >
              Día
            </Button>
            <Button 
              variant={view === 'week' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setView('week')}
            >
              Semana
            </Button>
            <Button 
              variant={view === 'month' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setView('month')}
            >
              Mes
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {view === 'month' ? (
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            className="rounded-md border"
          />
        ) : view === 'week' ? (
          renderWeekView()
        ) : (
          renderDayView()
        )}
      </CardContent>
    </Card>
  );
};
