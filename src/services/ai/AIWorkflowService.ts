
import { AIWorkflow, WorkflowTemplate } from '@/types/workflow';

class AIWorkflowService {
  private workflows: AIWorkflow[] = [];
  private templates: WorkflowTemplate[] = [
    {
      id: 'template_patient_reminder',
      name: 'Recordatorio de Cita',
      description: 'Envía recordatorios automáticos a pacientes antes de sus citas',
      category: 'communication',
      workflow: {
        name: 'Recordatorio de Cita',
        description: 'Workflow para enviar recordatorios automáticos',
        isActive: true,
        steps: [
          {
            id: 'trigger_1',
            type: 'trigger',
            name: 'Cita Programada',
            description: 'Se activa cuando se programa una cita',
            config: { event: 'appointment_scheduled' },
            position: { x: 100, y: 100 },
            connections: ['condition_1']
          },
          {
            id: 'condition_1',
            type: 'condition',
            name: 'Verificar Tiempo',
            description: 'Verificar si la cita es en las próximas 24 horas',
            config: { 
              field: 'appointment_time',
              operator: 'greater_than',
              value: '24_hours'
            },
            position: { x: 100, y: 220 },
            connections: ['action_1']
          },
          {
            id: 'action_1',
            type: 'action',
            name: 'Enviar Recordatorio',
            description: 'Enviar SMS/email de recordatorio al paciente',
            config: { 
              action: 'send_reminder',
              channels: ['sms', 'email']
            },
            position: { x: 100, y: 340 },
            connections: []
          }
        ],
        triggers: ['appointment_scheduled'],
        approvalRequired: false
      }
    },
    {
      id: 'template_follow_up',
      name: 'Seguimiento Post-Consulta',
      description: 'Programa seguimientos automáticos después de consultas',
      category: 'clinical',
      workflow: {
        name: 'Seguimiento Post-Consulta',
        description: 'Workflow para seguimiento automático de pacientes',
        isActive: true,
        steps: [
          {
            id: 'trigger_2',
            type: 'trigger',
            name: 'Consulta Completada',
            description: 'Se activa cuando se completa una consulta',
            config: { event: 'consultation_completed' },
            position: { x: 100, y: 100 },
            connections: ['condition_2']
          },
          {
            id: 'condition_2',
            type: 'condition',
            name: 'Verificar Tipo',
            description: 'Verificar si requiere seguimiento',
            config: { 
              field: 'consultation_type',
              operator: 'equals',
              value: 'high_priority'
            },
            position: { x: 100, y: 220 },
            connections: ['action_2']
          },
          {
            id: 'action_2',
            type: 'action',
            name: 'Programar Seguimiento',
            description: 'Programar cita de seguimiento automáticamente',
            config: { 
              action: 'schedule_follow_up',
              days_after: 7
            },
            position: { x: 100, y: 340 },
            connections: []
          }
        ],
        triggers: ['consultation_completed'],
        approvalRequired: false
      }
    }
  ];

  async getWorkflows(): Promise<AIWorkflow[]> {
    return [...this.workflows];
  }

  async getWorkflow(id: string): Promise<AIWorkflow | null> {
    return this.workflows.find(w => w.id === id) || null;
  }

  async saveWorkflow(workflow: AIWorkflow): Promise<AIWorkflow> {
    const existingIndex = this.workflows.findIndex(w => w.id === workflow.id);
    
    if (existingIndex >= 0) {
      this.workflows[existingIndex] = { ...workflow, updatedAt: new Date() };
    } else {
      this.workflows.push({ ...workflow, createdAt: new Date(), updatedAt: new Date() });
    }

    console.log('Workflow saved:', workflow);
    return workflow;
  }

  async deleteWorkflow(id: string): Promise<boolean> {
    const initialLength = this.workflows.length;
    this.workflows = this.workflows.filter(w => w.id !== id);
    return this.workflows.length < initialLength;
  }

  async testWorkflow(workflow: AIWorkflow): Promise<{ success: boolean; message: string; results?: any }> {
    // Simulación de prueba de workflow
    console.log('Testing workflow:', workflow);
    
    // Validación básica
    if (workflow.steps.length === 0) {
      return { success: false, message: 'El workflow debe tener al menos un paso' };
    }

    const triggerSteps = workflow.steps.filter(step => step.type === 'trigger');
    if (triggerSteps.length === 0) {
      return { success: false, message: 'El workflow debe tener al menos un trigger' };
    }

    // Simular ejecución
    return {
      success: true,
      message: 'Workflow probado exitosamente',
      results: {
        stepsExecuted: workflow.steps.length,
        executionTime: Math.random() * 1000,
        status: 'completed'
      }
    };
  }

  async getTemplates(): Promise<WorkflowTemplate[]> {
    return [...this.templates];
  }

  async createFromTemplate(templateId: string, customName?: string): Promise<AIWorkflow> {
    const template = this.templates.find(t => t.id === templateId);
    if (!template) {
      throw new Error('Template no encontrado');
    }

    const workflow: AIWorkflow = {
      ...template.workflow,
      id: `workflow_${Date.now()}`,
      name: customName || template.workflow.name,
      createdBy: 'current_user',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return this.saveWorkflow(workflow);
  }

  async validateWorkflow(workflow: AIWorkflow): Promise<{ isValid: boolean; errors: string[] }> {
    const errors: string[] = [];

    if (!workflow.name.trim()) {
      errors.push('El nombre es requerido');
    }

    if (workflow.steps.length === 0) {
      errors.push('El workflow debe tener al menos un paso');
    }

    const triggerSteps = workflow.steps.filter(step => step.type === 'trigger');
    if (triggerSteps.length === 0) {
      errors.push('El workflow debe tener al menos un trigger');
    }

    // Verificar conexiones
    workflow.steps.forEach(step => {
      step.connections.forEach(connectionId => {
        if (!workflow.steps.find(s => s.id === connectionId)) {
          errors.push(`Conexión inválida desde ${step.name}`);
        }
      });
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

export const aiWorkflowService = new AIWorkflowService();
