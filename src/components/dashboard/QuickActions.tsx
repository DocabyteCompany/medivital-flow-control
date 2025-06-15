
import { useActivities } from '@/contexts/ActivityContext';
import { Button } from '@/components/ui/button';
import { FileText, Phone, CalendarClock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const QuickActions = () => {
  const { addActivity } = useActivities();
  const { t } = useTranslation();

  const actions = [
    {
      label: t('dashboard.quickActions.summarize', 'Resumir Interacciones'),
      icon: FileText,
      action: () => addActivity({
        type: 'summary',
        title: 'Resumen general de interacciones',
        description: 'IA solicitada para generar un resumen de las interacciones recientes.',
        details: { solicitado_desde: 'Dashboard' }
      }),
    },
    {
      label: t('dashboard.quickActions.scheduleCall', 'Agendar Llamada'),
      icon: Phone,
      action: () => addActivity({
        type: 'call',
        title: 'Programar llamada de seguimiento',
        description: 'IA solicitada para agendar una llamada con un paciente prioritario.',
        details: { solicitado_desde: 'Dashboard' }
      }),
    },
    {
      label: t('dashboard.quickActions.reviewAgenda', 'Revisar Agenda'),
      icon: CalendarClock,
      action: () => addActivity({
        type: 'schedule',
        title: 'Revisión de agenda del día',
        description: 'IA solicitada para revisar y optimizar la agenda de hoy.',
        details: { solicitado_desde: 'Dashboard' }
      }),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {actions.map(({ label, icon: Icon, action }) => (
        <Button key={label} variant="outline" className="justify-start h-auto p-4 text-left bg-white shadow-soft border-0 rounded-2xl hover:bg-gray-50" onClick={action}>
          <div className="flex items-center gap-4">
            <div className="bg-brand-light p-3 rounded-lg">
              <Icon className="w-6 h-6 text-brand-blue" />
            </div>
            <div>
              <p className="font-semibold text-brand-dark">{label}</p>
            </div>
          </div>
        </Button>
      ))}
    </div>
  );
};
