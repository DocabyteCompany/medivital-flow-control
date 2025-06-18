
import { useActivities } from '@/contexts/ActivityContext';
import { usePermissions } from '@/hooks/usePermissions';
import { Button } from '@/components/ui/button';
import { ContextualAIButton } from '@/components/ai/contextual/ContextualAIButton';
import { useAIContext } from '@/hooks/useAIContext';
import { useAIPermissions } from '@/hooks/useAIPermissions';
import { aiAuditService } from '@/services/ai/AIAuditService';
import { FileText, Phone, CalendarClock, Users, Settings, BarChart3 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const QuickActions = () => {
  const { addActivity } = useActivities();
  const { t } = useTranslation();
  const { isAdmin, isDoctor } = usePermissions();
  const context = useAIContext();
  const { role } = useAIPermissions(context);

  const handleSummarize = async () => {
    await aiAuditService.logAction(
      'general-summary', 
      'canUseAISummaries',
      role,
      context,
      true,
      { location: 'dashboard' }
    );

    addActivity({
      type: 'summary',
      title: 'Resumen general de interacciones',
      description: 'IA solicitada para generar un resumen de las interacciones recientes.',
      details: { solicitado_desde: 'Dashboard' }
    });
  };

  const handleScheduleCall = async () => {
    await aiAuditService.logAction(
      'schedule-call', 
      'canUseAICalls',
      role,
      context,
      true,
      { location: 'dashboard' }
    );

    addActivity({
      type: 'call',
      title: 'Programar llamada de seguimiento',
      description: 'IA solicitada para agendar una llamada con un paciente prioritario.',
      details: { solicitado_desde: 'Dashboard' }
    });
  };

  const handleReviewAgenda = async () => {
    await aiAuditService.logAction(
      'review-agenda', 
      'canUseAIScheduling',
      role,
      context,
      true,
      { location: 'dashboard' }
    );

    addActivity({
      type: 'schedule',
      title: 'Revisión de agenda del día',
      description: 'IA solicitada para revisar y optimizar la agenda de hoy.',
      details: { solicitado_desde: 'Dashboard' }
    });
  };

  const adminActions = [
    {
      label: 'Gestionar Personal',
      icon: Users,
      path: '/personal',
      description: 'Administrar doctores y personal médico'
    },
    {
      label: 'Ver Estadísticas',
      icon: BarChart3,
      path: '/estadisticas',
      description: 'Analizar métricas de la clínica'
    },
    {
      label: 'Configuración',
      icon: Settings,
      path: '/configuracion',
      description: 'Ajustar configuraciones del sistema'
    },
  ];

  if (isAdmin) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {adminActions.map((action) => (
          <Button 
            key={action.label} 
            variant="outline" 
            className="justify-start h-auto p-4 text-left bg-white shadow-soft border-0 rounded-2xl hover:bg-gray-50"
            asChild
          >
            <Link to={action.path}>
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <action.icon className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-brand-dark">{action.label}</p>
                  <p className="text-xs text-gray-500">{action.description}</p>
                </div>
              </div>
            </Link>
          </Button>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <ContextualAIButton
        permission="canUseAISummaries"
        context={context}
        icon={FileText}
        onClick={handleSummarize}
        variant="outline"
        className="justify-start h-auto p-4 text-left bg-white shadow-soft border-0 rounded-2xl hover:bg-gray-50"
      >
        <div className="flex items-center gap-4">
          <div className="bg-brand-light p-3 rounded-lg">
            <FileText className="w-6 h-6 text-brand-blue" />
          </div>
          <div>
            <p className="font-semibold text-brand-dark">{t('dashboard.quickActions.summarize', 'Resumir Interacciones')}</p>
          </div>
        </div>
      </ContextualAIButton>

      <ContextualAIButton
        permission="canUseAICalls"
        context={context}
        icon={Phone}
        onClick={handleScheduleCall}
        variant="outline"
        className="justify-start h-auto p-4 text-left bg-white shadow-soft border-0 rounded-2xl hover:bg-gray-50"
      >
        <div className="flex items-center gap-4">
          <div className="bg-brand-light p-3 rounded-lg">
            <Phone className="w-6 h-6 text-brand-blue" />
          </div>
          <div>
            <p className="font-semibold text-brand-dark">{t('dashboard.quickActions.scheduleCall', 'Agendar Llamada')}</p>
          </div>
        </div>
      </ContextualAIButton>

      <ContextualAIButton
        permission="canUseAIScheduling"
        context={context}
        icon={CalendarClock}
        onClick={handleReviewAgenda}
        variant="outline"
        className="justify-start h-auto p-4 text-left bg-white shadow-soft border-0 rounded-2xl hover:bg-gray-50"
      >
        <div className="flex items-center gap-4">
          <div className="bg-brand-light p-3 rounded-lg">
            <CalendarClock className="w-6 h-6 text-brand-blue" />
          </div>
          <div>
            <p className="font-semibold text-brand-dark">{t('dashboard.quickActions.reviewAgenda', 'Revisar Agenda')}</p>
          </div>
        </div>
      </ContextualAIButton>
    </div>
  );
};
