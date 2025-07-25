
import { ContextualAIButton } from '@/components/ai/contextual/ContextualAIButton';
import { useAIContext } from '@/hooks/useAIContext';
import { useActivities } from '@/contexts/ActivityContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Phone, Calendar, Bell, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAIPermissions } from '@/hooks/useAIPermissions';
import { aiAuditService } from '@/services/ai/AIAuditService';

interface AgendaAIActionsProps {
  selectedDate?: Date;
  hasAppointments?: boolean;
  hasNoShows?: boolean;
}

export const AgendaAIActions = ({ 
  selectedDate,
  hasAppointments = true,
  hasNoShows = false 
}: AgendaAIActionsProps) => {
  const { t } = useTranslation();
  const { addActivity } = useActivities();
  const context = useAIContext();
  const { role } = useAIPermissions(context);

  const dateStr = selectedDate ? selectedDate.toLocaleDateString() : 'hoy';

  const handlePrepareConsultation = async () => {
    await aiAuditService.logAction(
      'prepare-consultation', 
      'canUseAISummaries',
      role,
      context,
      true,
      { date: dateStr }
    );

    addActivity({
      type: 'summary',
      title: `Preparar consultas - ${dateStr}`,
      description: `IA preparando resúmenes de historial para consultas del ${dateStr}`,
      details: { 
        fecha: dateStr,
        tipo_accion: 'preparacion_consultas',
        solicitado_desde: 'Agenda'
      }
    });
  };

  const handleGenerateNotes = async () => {
    await aiAuditService.logAction(
      'generate-notes', 
      'canUseAISummaries',
      role,
      context,
      true,
      { date: dateStr }
    );

    addActivity({
      type: 'summary',
      title: `Generar notas previas - ${dateStr}`,
      description: `IA generando templates de notas basados en citas anteriores`,
      details: { 
        fecha: dateStr,
        tipo_accion: 'notas_previas',
        solicitado_desde: 'Agenda'
      }
    });
  };

  const handleConfirmAppointments = async () => {
    await aiAuditService.logAction(
      'confirm-appointments', 
      'canUseAICalls',
      role,
      context,
      true,
      { date: dateStr }
    );

    addActivity({
      type: 'call',
      title: `Confirmar citas - ${dateStr}`,
      description: `IA realizando llamadas masivas de confirmación para ${dateStr}`,
      details: { 
        fecha: dateStr,
        tipo_accion: 'confirmacion_masiva',
        solicitado_desde: 'Agenda'
      }
    });
  };

  const handleSendReminders = async () => {
    await aiAuditService.logAction(
      'send-reminders', 
      'canUseAIReminders',
      role,
      context,
      true,
      { date: dateStr }
    );

    addActivity({
      type: 'reminder',
      title: `Enviar recordatorios - ${dateStr}`,
      description: `IA enviando mensajes automáticos de recordatorio para ${dateStr}`,
      details: { 
        fecha: dateStr,
        tipo_accion: 'recordatorios_automaticos',
        solicitado_desde: 'Agenda'
      }
    });
  };

  const handleFindUrgentSlot = async () => {
    await aiAuditService.logAction(
      'find-urgent-slot', 
      'canUseAIScheduling',
      role,
      context,
      true,
      { date: dateStr }
    );

    addActivity({
      type: 'schedule',
      title: `Buscar cita urgente`,
      description: `IA buscando mejor disponibilidad para cita urgente`,
      details: { 
        tipo_accion: 'busqueda_urgente',
        algoritmo: 'mejor_disponibilidad',
        solicitado_desde: 'Agenda'
      }
    });
  };

  const handleRescheduleNoShows = async () => {
    await aiAuditService.logAction(
      'reschedule-noshows', 
      'canUseAIScheduling',
      role,
      context,
      true,
      { date: dateStr }
    );

    addActivity({
      type: 'schedule',
      title: `Reagendar no-shows`,
      description: `IA reagendando automáticamente pacientes que no llegaron`,
      details: { 
        fecha: dateStr,
        tipo_accion: 'reagendamiento_automatico',
        solicitado_desde: 'Agenda'
      }
    });
  };

  return (
    <Card className="shadow-soft border-0 rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg">
          {t('ai.agendaActions.title', 'Acciones IA - Agenda')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Acciones para Doctores (vista personal) */}
          {role === 'doctor' && (
            <>
              <ContextualAIButton
            permission="canUseAIActions"
                context={context}
                icon={FileText}
                onClick={handlePrepareConsultation}
                variant="outline"
                size="sm"
              >
                Preparar consultas
              </ContextualAIButton>

              <ContextualAIButton
                permission="canUseAIActions"
                context={context}
                icon={FileText}
                onClick={handleGenerateNotes}
                variant="outline"
                size="sm"
              >
                Generar notas previas
              </ContextualAIButton>
            </>
          )}

          {/* Acciones para Admins (vista global) */}
          {role === 'admin' && (
            <>
              {hasAppointments && (
                <ContextualAIButton
                  permission="canUseAIActions"
                  context={context}
                  icon={Phone}
                  onClick={handleConfirmAppointments}
                  variant="outline"
                  size="sm"
                >
                  Confirmar citas del día
                </ContextualAIButton>
              )}

              <ContextualAIButton
                permission="canUseAIActions"
                context={context}
                icon={Bell}
                onClick={handleSendReminders}
                variant="outline"
                size="sm"
              >
                Enviar recordatorios
              </ContextualAIButton>

              <ContextualAIButton
                permission="canModifySchedules"
                context={context}
                icon={Search}
                onClick={handleFindUrgentSlot}
                variant="outline"
                size="sm"
              >
                Buscar cita urgente
              </ContextualAIButton>

              {hasNoShows && (
                <ContextualAIButton
                  permission="canModifySchedules"
                  context={context}
                  icon={Calendar}
                  onClick={handleRescheduleNoShows}
                  variant="outline"
                  size="sm"
                >
                  Reagendar no-shows
                </ContextualAIButton>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
