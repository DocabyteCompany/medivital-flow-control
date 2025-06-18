
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

export type BooleanPermissionKeys = keyof Pick<AIPermissions, {
  [K in keyof AIPermissions]: AIPermissions[K] extends boolean ? K : never;
}[keyof AIPermissions]>;

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

  const canPerformAction = (action: BooleanPermissionKeys, actionType?: string): boolean => {
    const permission = contextualPermissions[action];
    
    // Verificar si es un booleano (permisos principales)
    if (!permission) return false;
    
    // Verificar si la acción requiere aprobación
    if (actionType && contextualPermissions.requiresApprovalFor.includes(actionType)) {
      return contextualPermissions.canBypassApprovals;
    }
    
    return true;
  };

  const getAvailableActions = (): string[] => {
    const actions: string[] = [];
    
    const booleanPermissions: BooleanPermissionKeys[] = [
      'canUseAITranscription',
      'canUseAIScheduling', 
      'canUseAISummaries',
      'canUseAICalls',
      'canUseAIReferrals',
      'canUseAIReminders',
      'canUseAIFollowUp',
      'canUseAIPatientIntake',
      'canConfigureAIWorkflows',
      'canViewAIMetrics',
      'canApproveAIActions',
      'canAuditAIUsage',
      'canBypassApprovals'
    ];

    booleanPermissions.forEach(permission => {
      if (contextualPermissions[permission]) {
        const actionName = permission.replace(/^canUseAI|^can/, '').toLowerCase();
        actions.push(actionName);
      }
    });

    return actions;
  };

  return {
    permissions: contextualPermissions,
    canPerformAction,
    getAvailableActions,
    role: selectedRole
  };
};
