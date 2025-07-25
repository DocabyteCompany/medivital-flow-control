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

// Definiciones de acciones por página (solo usando permisos existentes)
export const FAB_ACTIONS_BY_PAGE: Record<string, FABAction[]> = {
  dashboard: [
    {
      id: 'summarize-interactions',
      label: 'Resumir Interacciones',
      permission: 'canUseAIActions',
      priority: 1,
      icon: 'FileText'
    },
    {
      id: 'schedule-call',
      label: 'Agendar Llamada',
      permission: 'canModifySchedules',
      priority: 2,
      icon: 'Phone'
    },
    {
      id: 'review-agenda',
      label: 'Revisar Agenda',
      permission: 'canAccessRecords',
      priority: 3,
      icon: 'CalendarClock'
    },
    {
      id: 'view-metrics',
      label: 'Ver Métricas IA',
      permission: 'canGenerateReports',
      priority: 4,
      icon: 'BarChart3'
    }
  ],
  
  patients: [
    {
      id: 'generate-medical-summary',
      label: 'Resumen Médico',
      permission: 'canUseAIActions',
      priority: 1,
      icon: 'FileText'
    },
    {
      id: 'confirm-appointment',
      label: 'Confirmar Cita',
      permission: 'canModifySchedules',
      priority: 2,
      icon: 'CalendarCheck'
    },
    {
      id: 'schedule-followup',
      label: 'Programar Seguimiento',
      permission: 'canUseAIActions',
      priority: 3,
      icon: 'Clock'
    },
    {
      id: 'transcribe-notes',
      label: 'Transcribir Notas',
      permission: 'canUseAIActions',
      priority: 4,
      icon: 'Mic'
    }
  ],

  agenda: [
    {
      id: 'prepare-consultations',
      label: 'Preparar Consultas',
      permission: 'canUseAIActions',
      priority: 1,
      icon: 'Stethoscope'
    },
    {
      id: 'confirm-daily-appointments',
      label: 'Confirmar Citas del Día',
      permission: 'canModifySchedules',
      priority: 2,
      icon: 'CalendarCheck'
    },
    {
      id: 'send-reminders',
      label: 'Enviar Recordatorios',
      permission: 'canUseAIActions',
      priority: 3,
      icon: 'Bell'
    },
    {
      id: 'optimize-schedule',
      label: 'Optimizar Horarios',
      permission: 'canModifySchedules',
      priority: 4,
      icon: 'Calendar'
    }
  ],

  records: [
    {
      id: 'transcribe-consultation',
      label: 'Transcribir Consulta',
      permission: 'canUseAIActions',
      priority: 1,
      icon: 'Mic'
    },
    {
      id: 'generate-medical-summary',
      label: 'Generar Resumen',
      permission: 'canUseAIActions',
      priority: 2,
      icon: 'FileText'
    },
    {
      id: 'create-referral',
      label: 'Crear Referencia',
      permission: 'canAccessRecords',
      priority: 3,
      icon: 'ArrowRight'
    },
    {
      id: 'schedule-followup',
      label: 'Agendar Seguimiento',
      permission: 'canModifySchedules',
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
      permission: 'canGenerateReports',
      priority: 2,
      icon: 'Download'
    },
    {
      id: 'analyze-patterns',
      label: 'Analizar Patrones',
      permission: 'canGenerateReports',
      priority: 3,
      icon: 'TrendingUp'
    },
    {
      id: 'configure-workflow',
      label: 'Configurar Flujo',
      permission: 'canConfigureSystem',
      priority: 4,
      icon: 'Settings'
    }
  ],

  statistics: [
    {
      id: 'generate-insights',
      label: 'Generar Insights',
      permission: 'canGenerateReports',
      priority: 1,
      icon: 'Lightbulb'
    },
    {
      id: 'predict-trends',
      label: 'Predecir Tendencias',
      permission: 'canGenerateReports',
      priority: 2,
      icon: 'TrendingUp'
    },
    {
      id: 'export-data',
      label: 'Exportar Datos',
      permission: 'canGenerateReports',
      priority: 3,
      icon: 'Download'
    },
    {
      id: 'schedule-report',
      label: 'Programar Reporte',
      permission: 'canConfigureSystem',
      priority: 4,
      icon: 'Calendar'
    }
  ],

  messages: [
    {
      id: 'smart-reply',
      label: 'Respuesta Inteligente',
      permission: 'canUseAIActions',
      priority: 1,
      icon: 'MessageSquare'
    },
    {
      id: 'translate-message',
      label: 'Traducir Mensaje',
      permission: 'canUseAIActions',
      priority: 2,
      icon: 'Languages'
    },
    {
      id: 'summarize-conversation',
      label: 'Resumir Conversación',
      permission: 'canUseAIActions',
      priority: 3,
      icon: 'FileText'
    },
    {
      id: 'schedule-from-message',
      label: 'Agendar desde Mensaje',
      permission: 'canModifySchedules',
      priority: 4,
      icon: 'Calendar'
    }
  ],

  personnel: [
    {
      id: 'analyze-performance',
      label: 'Analizar Rendimiento',
      permission: 'canGenerateReports',
      priority: 1,
      icon: 'BarChart3'
    },
    {
      id: 'optimize-schedules',
      label: 'Optimizar Horarios',
      permission: 'canManagePersonnel',
      priority: 2,
      icon: 'Calendar'
    },
    {
      id: 'predict-workload',
      label: 'Predecir Carga',
      permission: 'canGenerateReports',
      priority: 3,
      icon: 'TrendingUp'
    },
    {
      id: 'generate-report',
      label: 'Generar Reporte',
      permission: 'canGenerateReports',
      priority: 4,
      icon: 'FileText'
    }
  ],

  configuration: [
    {
      id: 'configure-ai-workflows',
      label: 'Configurar IA',
      permission: 'canConfigureSystem',
      priority: 1,
      icon: 'Bot'
    },
    {
      id: 'audit-ai-usage',
      label: 'Auditar Uso IA',
      permission: 'canConfigureSystem',
      priority: 2,
      icon: 'Shield'
    },
    {
      id: 'backup-settings',
      label: 'Respaldar Config',
      permission: 'canConfigureSystem',
      priority: 3,
      icon: 'Download'
    },
    {
      id: 'optimize-system',
      label: 'Optimizar Sistema',
      permission: 'canConfigureSystem',
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