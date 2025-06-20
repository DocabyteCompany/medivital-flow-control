
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { es } from 'date-fns/locale';
import { usePermissions } from '@/hooks/usePermissions';
import { AdminAgendaView } from '@/components/agenda/AdminAgendaView';
import { DoctorAgendaView } from '@/components/agenda/DoctorAgendaView';
import { AgendaAIActions } from '@/components/ai/integrations/AgendaAIActions';

const Agenda = () => {
  const { t } = useTranslation();
  const { isAdmin } = usePermissions();
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Simular datos para las acciones IA
  const hasAppointments = true;
  const hasNoShows = Math.random() > 0.7;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
        <div className="xl:col-span-3 h-full">
          {isAdmin() ? (
            <AdminAgendaView selectedDate={date} />
          ) : (
            <DoctorAgendaView selectedDate={date} />
          )}
        </div>
        <Card className="xl:col-span-1 shadow-soft border-0 rounded-2xl flex flex-col p-0">
          <CardHeader>
            <CardTitle>{t('agenda.calendarTitle', 'Calendario')}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex items-center justify-center p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md"
              locale={es}
            />
          </CardContent>
        </Card>
      </div>

      {/* Nuevo panel de acciones IA */}
      <AgendaAIActions
        selectedDate={date}
        hasAppointments={hasAppointments}
        hasNoShows={hasNoShows}
      />
    </div>
  );
};

export default Agenda;
