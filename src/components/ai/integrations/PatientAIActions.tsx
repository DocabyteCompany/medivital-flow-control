
import { ContextualAIButton } from '@/components/ai/contextual/ContextualAIButton';
import { useAIContext } from '@/hooks/useAIContext';
import { useActivities } from '@/contexts/ActivityContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, UserCheck, FileText, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAIPermissions } from '@/hooks/useAIPermissions';
import { aiAuditService } from '@/services/ai/AIAuditService';

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

  const handleConfirmAppointment = async () => {
    await aiAuditService.logAction(
      'confirm-appointment', 
      'canUseAICalls',
      role,
      context,
      true,
      { patientId, patientName }
    );

    addActivity({
      type: 'call',
      title: `Confirmar cita - ${patientName}`,
      description: `IA llamando para confirmar cita próxima del paciente ${patientName}`,
      details: { 
        paciente: patientName,
        tipo_accion: 'confirmacion_cita',
        solicitado_desde: 'Perfil_Paciente'
      }
    });
  };

  const handleScheduleFollowUp = async () => {
    await aiAuditService.logAction(
      'schedule-followup', 
      'canUseAIFollowUp',
      role,
      context,
      true,
      { patientId, patientName }
    );

    addActivity({
      type: 'follow-up',
      title: `Programar seguimiento - ${patientName}`,
      description: `IA programando seguimiento post-consulta para ${patientName}`,
      details: { 
        paciente: patientName,
        tipo_accion: 'programar_seguimiento',
        motivo: 'post_consulta',
        solicitado_desde: 'Perfil_Paciente'
      }
    });
  };

  const handleGenerateSummary = async () => {
    await aiAuditService.logAction(
      'generate-summary', 
      'canUseAISummaries',
      role,
      context,
      true,
      { patientId, patientName }
    );

    addActivity({
      type: 'summary',
      title: `Resumen médico - ${patientName}`,
      description: `IA generando resumen médico basado en historial de ${patientName}`,
      details: { 
        paciente: patientName,
        tipo_resumen: 'historial_completo',
        solicitado_desde: 'Perfil_Paciente'
      }
    });
  };

  const handleCallReminder = async () => {
    await aiAuditService.logAction(
      'call-reminder', 
      'canUseAICalls',
      role,
      context,
      true,
      { patientId, patientName }
    );

    addActivity({
      type: 'call',
      title: `Llamar recordatorio - ${patientName}`,
      description: `IA realizando llamada de recordatorio para ${patientName}`,
      details: { 
        paciente: patientName,
        tipo_accion: 'llamada_recordatorio',
        solicitado_desde: 'Perfil_Paciente'
      }
    });
  };

  const handleUpdateContact = async () => {
    await aiAuditService.logAction(
      'update-contact', 
      'canUseAIScheduling',
      role,
      context,
      true,
      { patientId, patientName }
    );

    addActivity({
      type: 'schedule',
      title: `Actualizar contacto - ${patientName}`,
      description: `IA sugiriendo correcciones en datos de contacto de ${patientName}`,
      details: { 
        paciente: patientName,
        tipo_accion: 'actualizacion_datos',
        solicitado_desde: 'Perfil_Paciente'
      }
    });
  };

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
            >
              Confirmar cita próxima
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
            >
              Programar seguimiento
            </ContextualAIButton>
          )}

          <ContextualAIButton
            permission="canUseAISummaries"
            context={context}
            icon={FileText}
            onClick={handleGenerateSummary}
            variant="outline"
            size="sm"
          >
            Generar resumen médico
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
            >
              Llamar recordatorio
            </ContextualAIButton>
          )}

          <ContextualAIButton
            permission="canUseAIScheduling"
            context={context}
            icon={UserCheck}
            onClick={handleUpdateContact}
            variant="outline"
            size="sm"
          >
            Actualizar datos contacto
          </ContextualAIButton>
        </div>
      </CardContent>
    </Card>
  );
};
