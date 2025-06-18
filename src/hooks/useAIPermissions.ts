
import { useMemo } from 'react';
import { useRole } from '@/contexts/RoleContext';
import type { ActivityContext } from '@/components/ia/ActivityCard';

export interface AIPermissions {
  // Herramientas básicas
  canUseAITranscription: boolean;
  canUseAIScheduling: boolean;
  canUseAISummaries: boolean;
  canUseAICalls: boolean;
  canUseAIReferrals: boolean;
  canUseAIReminders: boolean;
  canUseAIFollowUp: boolean;
  canUseAIPatientIntake: boolean;
  
  // Configuración y administración
  canConfigureAIWorkflows: boolean;
  canViewAIMetrics: boolean;
  canApproveAIActions: boolean;
  canAuditAIUsage: boolean;
  
  // Límites y restricciones
  dailyAIActionsLimit: number;
  requiresApprovalFor: string[];
  canBypassApprovals: boolean;
}

const AI_PERMISSIONS_BY_ROLE = {
  Doctor: {
    canUseAITranscription: true,
    canUseAIScheduling: false,
    canUseAISummaries: true,
    canUseAICalls: false,
    canUseAIReferrals: true,
    canUseAIReminders: true,
    canUseAIFollowUp: true,
    canUseAIPatientIntake: true,
    canConfigureAIWorkflows: false,
    canViewAIMetrics: true,
    canApproveAIActions: false,
    canAuditAIUsage: false,
    dailyAIActionsLimit: 50,
    requiresApprovalFor: ['bulk-actions', 'sensitive-data'],
    canBypassApprovals: false
  },
  Admin: {
    canUseAITranscription: false,
    canUseAIScheduling: true,
    canUseAISummaries: false,
    canUseAICalls: true,
    canUseAIReferrals: false,
    canUseAIReminders: true,
    canUseAIFollowUp: true,
    canUseAIPatientIntake: false,
    canConfigureAIWorkflows: true,
    canViewAIMetrics: true,
    canApproveAIActions: true,
    canAuditAIUsage: true,
    dailyAIActionsLimit: 200,
    requiresApprovalFor: [],
    canBypassApprovals: true
  }
} as const;

export const useAIPermissions = (context?: ActivityContext) => {
  const { selectedRole } = useRole();
  
  const basePermissions = useMemo(() => {
    return AI_PERMISSIONS_BY_ROLE[selectedRole];
  }, [selectedRole]);

  const contextualPermissions = useMemo(() => {
    if (!context) return basePermissions;

    // Aquí podemos añadir lógica contextual específica
    const permissions = { ...basePermissions };

    // Si estamos en una página de pacientes y el usuario es Admin,
    // podríamos restringir algunas acciones clínicas
    if (context.currentPage === 'patients' && selectedRole === 'Admin') {
      permissions.canUseAITranscription = false;
      permissions.canUseAISummaries = false;
    }

    return permissions;
  }, [basePermissions, context, selectedRole]);

  const canPerformAction = (action: keyof AIPermissions, actionType?: string) => {
    const permission = contextualPermissions[action];
    
    // Verificar si es un booleano (permisos principales)
    if (typeof permission === 'boolean') {
      if (!permission) return false;
      
      // Verificar si la acción requiere aprobación
      if (actionType && contextualPermissions.requiresApprovalFor.includes(actionType)) {
        return contextualPermissions.canBypassApprovals;
      }
      
      return true;
    }
    
    // Para propiedades que no son booleanas, simplemente retornar false
    return false;
  };

  const getAvailableActions = () => {
    const actions: string[] = [];
    
    if (canPerformAction('canUseAITranscription')) {
      actions.push('transcription');
    }
    if (canPerformAction('canUseAIScheduling')) {
      actions.push('schedule');
    }
    if (canPerformAction('canUseAISummaries')) {
      actions.push('summary');
    }
    if (canPerformAction('canUseAICalls')) {
      actions.push('call');
    }
    if (canPerformAction('canUseAIReferrals')) {
      actions.push('referral');
    }
    if (canPerformAction('canUseAIReminders')) {
      actions.push('reminder');
    }
    if (canPerformAction('canUseAIFollowUp')) {
      actions.push('follow-up');
    }
    if (canPerformAction('canUseAIPatientIntake')) {
      actions.push('patient-intake');
    }

    return actions;
  };

  return {
    permissions: contextualPermissions,
    canPerformAction,
    getAvailableActions,
    role: selectedRole
  };
};
