
import { ActivityContext } from '@/components/ia/ActivityCard';
import { FABAction } from '@/components/ai/fab/FABActionDefinitions';
import { aiAuditService } from './AIAuditService';

export class FABActionService {
  static async executeAction(
    action: FABAction, 
    context: ActivityContext, 
    role: 'Admin' | 'Doctor',
    additionalData?: Record<string, any>
  ): Promise<{ success: boolean; message: string; data?: any }> {
    console.log(`Executing AI action: ${action.id} (${action.label}) in context:`, context);

    try {
      // Registrar la acción en auditoría
      await aiAuditService.logAction(
        action.id,
        action.permission,
        role,
        context,
        true,
        { ...additionalData, actionLabel: action.label }
      );

      // Simular procesamiento de la acción
      await this.simulateActionProcessing(action);

      // Retornar resultado basado en el tipo de acción
      return this.getActionResult(action, context);

    } catch (error) {
      console.error(`Error executing action ${action.id}:`, error);
      
      // Registrar error en auditoría
      await aiAuditService.logAction(
        action.id,
        action.permission,
        role,
        context,
        false,
        { error: error instanceof Error ? error.message : 'Unknown error' }
      );

      return {
        success: false,
        message: `Error al ejecutar ${action.label}: ${error instanceof Error ? error.message : 'Error desconocido'}`
      };
    }
  }

  private static async simulateActionProcessing(action: FABAction): Promise<void> {
    // Simular tiempo de procesamiento variable según el tipo de acción
    const processingTime = this.getProcessingTime(action.id);
    await new Promise(resolve => setTimeout(resolve, processingTime));
  }

  private static getProcessingTime(actionId: string): number {
    const timeMap: Record<string, number> = {
      'transcribe-consultation': 3000,
      'generate-medical-summary': 2500,
      'summarize-interactions': 2000,
      'prepare-consultations': 2500,
      'confirm-appointment': 1500,
      'schedule-followup': 1500,
      'send-reminders': 1000,
      'analyze-patterns': 3000,
      'generate-insights': 2500
    };
    
    return timeMap[actionId] || 1500;
  }

  private static getActionResult(action: FABAction, context: ActivityContext): { success: true; message: string; data?: any } {
    const resultMap: Record<string, () => { success: true; message: string; data?: any }> = {
      'summarize-interactions': () => ({
        success: true,
        message: 'IA ha generado un resumen de las interacciones recientes',
        data: { summary: 'Resumen generado exitosamente', insights: 3 }
      }),
      
      'generate-medical-summary': () => ({
        success: true,
        message: 'Resumen médico generado correctamente',
        data: { pages: 2, sections: ['Historial', 'Diagnósticos', 'Tratamientos'] }
      }),
      
      'transcribe-consultation': () => ({
        success: true,
        message: 'Consulta transcrita exitosamente',
        data: { duration: '45 min', words: 2847 }
      }),
      
      'confirm-appointment': () => ({
        success: true,
        message: 'Cita confirmada automáticamente',
        data: { confirmed: true, method: 'SMS + Email' }
      }),
      
      'schedule-followup': () => ({
        success: true,
        message: 'Seguimiento programado correctamente',
        data: { scheduledFor: '1 semana', type: 'Consulta de control' }
      }),
      
      'prepare-consultations': () => ({
        success: true,
        message: 'Consultas del día preparadas',
        data: { prepared: 8, insights: 5 }
      }),
      
      'send-reminders': () => ({
        success: true,
        message: 'Recordatorios enviados exitosamente',
        data: { sent: 12, method: 'SMS + WhatsApp' }
      }),
      
      'analyze-patterns': () => ({
        success: true,
        message: 'Patrones analizados correctamente',
        data: { patterns: 4, recommendations: 7 }
      }),
      
      'generate-insights': () => ({
        success: true,
        message: 'Insights generados exitosamente',
        data: { insights: 6, trends: 3 }
      })
    };

    const generator = resultMap[action.id];
    if (generator) {
      return generator();
    }

    // Resultado genérico
    return {
      success: true,
      message: `${action.label} ejecutado correctamente`,
      data: { timestamp: new Date().toISOString() }
    };
  }
}
