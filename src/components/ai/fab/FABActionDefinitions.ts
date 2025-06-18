
import { ActivityContext } from '@/components/ia/ActivityCard';
import { BooleanPermissionKeys } from '@/hooks/useAIPermissions';

export interface FABAction {
  id: string;
  label: string;
  permission: BooleanPermissionKeys;
  actionType?: string;
  priority: number; // 1 = más alta prioridad
  icon?: string; // nombre del icono lucide
}

// Definiciones de acciones por página
export const FAB_ACTIONS_BY_PAGE: Record<string, FABAction[]> = {
  dashboard: [
    {
      id: 'summarize-interactions',
      label: 'Resumir Interacciones',
      permission: 'canUseAISummaries',
      priority: 1,
      icon: 'FileText'
    },
    {
      id: 'schedule-call',
      label: 'Agendar Llamada',
      permission: 'canUseAICalls',
      priority: 2,
      icon: 'Phone'
    },
    {
      id: 'review-agenda',
      label: 'Revisar Agenda',
      permission: 'canUseAIScheduling',
      priority: 3,
      icon: 'CalendarClock'
    },
    {
      id: 'view-metrics',
      label: 'Ver Métricas IA',
      permission: 'canViewAIMetrics',
      priority: 4,
      icon: 'BarChart3'
    }
  ],
  
  patients: [
    {
      id: 'generate-medical-summary',
      label: 'Resumen Médico',
      permission: 'canUseAISummaries',
      priority: 1,
      icon: 'FileText'
    },
    {
      id: 'confirm-appointment',
      label: 'Confirmar Cita',
      permission: 'canUseAIReminders',
      priority: 2,
      icon: 'CalendarCheck'
    },
    {
      id: 'schedule-followup',
      label: 'Programar Seguimiento',
      permission: 'canUseAIFollowUp',
      priority: 3,
      icon: 'Clock'
    },
    {
      id: 'transcribe-notes',
      label: 'Transcribir Notas',
      permission: 'canUseAITranscription',
      priority: 4,
      icon: 'Mic'
    }
  ],

  agenda: [
    {
      id: 'prepare-consultations',
      label: 'Preparar Consultas',
      permission: 'canUseAISummaries',
      priority: 1,
      icon: 'Stethoscope'
    },
    {
      id: 'confirm-daily-appointments',
      label: 'Confirmar Citas del Día',
      permission: 'canUseAIReminders',
      priority: 2,
      icon: 'CalendarCheck'
    },
    {
      id: 'send-reminders',
      label: 'Enviar Recordatorios',
      permission: 'canUseAIReminders',
      priority: 3,
      icon: 'Bell'
    },
    {
      id: 'optimize-schedule',
      label: 'Optimizar Horarios',
      permission: 'canUseAIScheduling',
      priority: 4,
      icon: 'Calendar'
    }
  ],

  records: [
    {
      id: 'transcribe-consultation',
      label: 'Transcribir Consulta',
      permission: 'canUseAITranscription',
      priority: 1,
      icon: 'Mic'
    },
    {
      id: 'generate-medical-summary',
      label: 'Generar Resumen',
      permission: 'canUseAISummaries',
      priority: 2,
      icon: 'FileText'
    },
    {
      id: 'create-referral',
      label: 'Crear Referencia',
      permission: 'canUseAIReferrals',
      priority: 3,
      icon: 'ArrowRight'
    },
    {
      id: 'schedule-followup',
      label: 'Agendar Seguimiento',
      permission: 'canUseAIFollowUp',
      priority: 4,
      icon: 'Clock'
    }
  ],

  'ia-activities': [
    {
      id: 'cleanup-activities',
      label: 'Limpiar Actividades',
      permission: 'canApproveAIActions',
      actionType: 'bulk-actions',
      priority: 1,
      icon: 'Trash2'
    },
    {
      id: 'export-report',
      label: 'Exportar Reporte',
      permission: 'canViewAIMetrics',
      priority: 2,
      icon: 'Download'
    },
    {
      id: 'analyze-patterns',
      label: 'Analizar Patrones',
      permission: 'canViewAIMetrics',
      priority: 3,
      icon: 'TrendingUp'
    },
    {
      id: 'configure-workflow',
      label: 'Configurar Flujo',
      permission: 'canConfigureAIWorkflows',
      priority: 4,
      icon: 'Settings'
    }
  ],

  statistics: [
    {
      id: 'generate-insights',
      label: 'Generar Insights',
      permission: 'canViewAIMetrics',
      priority: 1,
      icon: 'Lightbulb'
    },
    {
      id: 'predict-trends',
      label: 'Predecir Tendencias',
      permission: 'canViewAIMetrics',
      priority: 2,
      icon: 'TrendingUp'
    },
    {
      id: 'export-data',
      label: 'Exportar Datos',
      permission: 'canViewAIMetrics',
      priority: 3,
      icon: 'Download'
    },
    {
      id: 'schedule-report',
      label: 'Programar Reporte',
      permission: 'canConfigureAIWorkflows',
      priority: 4,
      icon: 'Calendar'
    }
  ],

  messages: [
    {
      id: 'smart-reply',
      label: 'Respuesta Inteligente',
      permission: 'canUseAISummaries',
      priority: 1,
      icon: 'MessageSquare'
    },
    {
      id: 'translate-message',
      label: 'Traducir Mensaje',
      permission: 'canUseAISummaries',
      priority: 2,
      icon: 'Languages'
    },
    {
      id: 'summarize-conversation',
      label: 'Resumir Conversación',
      permission: 'canUseAISummaries',
      priority: 3,
      icon: 'FileText'
    },
    {
      id: 'schedule-from-message',
      label: 'Agendar desde Mensaje',
      permission: 'canUseAIScheduling',
      priority: 4,
      icon: 'Calendar'
    }
  ],

  personnel: [
    {
      id: 'analyze-performance',
      label: 'Analizar Rendimiento',
      permission: 'canViewAIMetrics',
      priority: 1,
      icon: 'BarChart3'
    },
    {
      id: 'optimize-schedules',
      label: 'Optimizar Horarios',
      permission: 'canConfigureAIWorkflows',
      priority: 2,
      icon: 'Calendar'
    },
    {
      id: 'predict-workload',
      label: 'Predecir Carga',
      permission: 'canViewAIMetrics',
      priority: 3,
      icon: 'TrendingUp'
    },
    {
      id: 'generate-report',
      label: 'Generar Reporte',
      permission: 'canViewAIMetrics',
      priority: 4,
      icon: 'FileText'
    }
  ],

  configuration: [
    {
      id: 'configure-ai-workflows',
      label: 'Configurar IA',
      permission: 'canConfigureAIWorkflows',
      priority: 1,
      icon: 'Bot'
    },
    {
      id: 'audit-ai-usage',
      label: 'Auditar Uso IA',
      permission: 'canAuditAIUsage',
      priority: 2,
      icon: 'Shield'
    },
    {
      id: 'backup-settings',
      label: 'Respaldar Config',
      permission: 'canConfigureAIWorkflows',
      priority: 3,
      icon: 'Download'
    },
    {
      id: 'optimize-system',
      label: 'Optimizar Sistema',
      permission: 'canConfigureAIWorkflows',
      priority: 4,
      icon: 'Zap'
    }
  ]
};

// Función para obtener acciones contextuales filtradas por permisos
export const getContextualActions = (
  context: ActivityContext,
  canPerformAction: (permission: BooleanPermissionKeys, actionType?: string) => boolean
): FABAction[] => {
  const currentPage = context.currentPage || 'dashboard';
  const pageActions = FAB_ACTIONS_BY_PAGE[currentPage] || [];

  // Filtrar por permisos y ordenar por prioridad
  const availableActions = pageActions
    .filter(action => canPerformAction(action.permission, action.actionType))
    .sort((a, b) => a.priority - b.priority);

  // Devolver máximo 4 acciones
  return availableActions.slice(0, 4);
};
