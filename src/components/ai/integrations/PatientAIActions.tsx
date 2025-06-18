
import { ContextualAIButton } from '@/components/ai/contextual/ContextualAIButton';
import { useAIContext } from '@/hooks/useAIContext';
import { useActivities } from '@/contexts/ActivityContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, UserCheck, FileText, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAIPermissions } from '@/hooks/useAIPermissions';
import { aiAuditService } from '@/services/ai/AIAuditService';
import { FABActionService } from '@/services/ai/FABActionService';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';

interface PatientAIActionsProps {
  patientId: string;
  patientName: string;
  hasUpcomingAppointment?: boolean;
  hasRecentConsultation?: boolean;
}

export const PatientAIActions = ({ 
  patientId, 
  patientName,
  hasUpcomingAppointment = false,
  hasRecentConsultation = false 
}: PatientAIActionsProps) => {
  const { t } = useTranslation();
  const { addActivity } = useActivities();
  const context = useAIContext(patientId);
  const { role } = useAIPermissions(context);
  const { toast } = useToast();
  const [loadingActions, setLoadingActions] = useState<Set<string>>(new Set());

  const setActionLoading = (actionId: string, loading: boolean) => {
    setLoadingActions(prev => {
      const newSet = new Set(prev);
      if (loading) {
        newSet.add(actionId);
      } else {
        newSet.delete(actionId);
      }
      return newSet;
    });
  };

  const executePatientAction = async (actionId: string, actionLabel: string, permission: any) => {
    setActionLoading(actionId, true);

    try {
      const result = await FABActionService.executeAction(
        { id: actionId, label: actionLabel, permission, priority: 1 },
        context,
        role,
        { patientId, patientName }
      );

      if (result.success) {
        addActivity({
          type: getActivityType(actionId),
          title: `${actionLabel} - ${patientName}`,
          description: result.message,
          details: { 
            paciente: patientName,
            tipo_accion: actionId,
            solicitado_desde: 'Perfil_Paciente',
            resultado: result.data
          }
        });

        toast({
          title: "Acción Completada",
          description: result.message,
          duration: 4000
        });
      }
    } catch (error) {
      toast({
        title: "Error en Acción IA",
        description: error instanceof Error ? error.message : 'Error desconocido',
        variant: "destructive",
        duration: 5000
      });
    } finally {
      setActionLoading(actionId, false);
    }
  };

  const getActivityType = (actionId: string): 'call' | 'summary' | 'schedule' | 'reminder' | 'follow-up' | 'transcription' | 'referral' | 'patient-intake' => {
    if (actionId.includes('call') || actionId.includes('confirm')) return 'call';
    if (actionId.includes('summary')) return 'summary';
    if (actionId.includes('schedule') || actionId.includes('followup')) return 'follow-up';
    if (actionId.includes('update')) return 'schedule';
    return 'summary';
  };

  const handleConfirmAppointment = () => 
    executePatientAction('confirm-appointment', 'Confirmar cita próxima', 'canUseAIScheduling');

  const handleScheduleFollowUp = () => 
    executePatientAction('schedule-followup', 'Programar seguimiento', 'canUseAIFollowUp');

  const handleGenerateSummary = () => 
    executePatientAction('generate-summary', 'Generar resumen médico', 'canUseAISummaries');

  const handleCallReminder = () => 
    executePatientAction('call-reminder', 'Llamar recordatorio', 'canUseAICalls');

  const handleUpdateContact = () => 
    executePatientAction('update-contact', 'Actualizar datos contacto', 'canUseAIScheduling');

  return (
    <Card className="shadow-soft border-0 rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg">
          {t('ai.patientActions.title', 'Acciones IA - Paciente')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Acciones para Doctores */}
          {hasUpcomingAppointment && (
            <ContextualAIButton
              permission="canUseAIScheduling"
              context={context}
              icon={Calendar}
              onClick={handleConfirmAppointment}
              variant="outline"
              size="sm"
              disabled={loadingActions.has('confirm-appointment')}
            >
              {loadingActions.has('confirm-appointment') ? 'Confirmando...' : 'Confirmar cita próxima'}
            </ContextualAIButton>
          )}

          {hasRecentConsultation && (
            <ContextualAIButton
              permission="canUseAIFollowUp"
              context={context}
              icon={UserCheck}
              onClick={handleScheduleFollowUp}
              variant="outline"
              size="sm"
              disabled={loadingActions.has('schedule-followup')}
            >
              {loadingActions.has('schedule-followup') ? 'Programando...' : 'Programar seguimiento'}
            </ContextualAIButton>
          )}

          <ContextualAIButton
            permission="canUseAISummaries"
            context={context}
            icon={FileText}
            onClick={handleGenerateSummary}
            variant="outline"
            size="sm"
            disabled={loadingActions.has('generate-summary')}
          >
            {loadingActions.has('generate-summary') ? 'Generando...' : 'Generar resumen médico'}
          </ContextualAIButton>

          {/* Acciones para Admins */}
          {hasUpcomingAppointment && (
            <ContextualAIButton
              permission="canUseAICalls"
              context={context}
              icon={Phone}
              onClick={handleCallReminder}
              variant="outline"
              size="sm"
              disabled={loadingActions.has('call-reminder')}
            >
              {loadingActions.has('call-reminder') ? 'Llamando...' : 'Llamar recordatorio'}
            </ContextualAIButton>
          )}

          <ContextualAIButton
            permission="canUseAIScheduling"
            context={context}
            icon={UserCheck}
            onClick={handleUpdateContact}
            variant="outline"
            size="sm"
            disabled={loadingActions.has('update-contact')}
          >
            {loadingActions.has('update-contact') ? 'Actualizando...' : 'Actualizar datos contacto'}
          </ContextualAIButton>
        </div>
      </CardContent>
    </Card>
  );
};
