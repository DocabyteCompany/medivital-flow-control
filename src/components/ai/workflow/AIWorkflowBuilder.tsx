
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { WorkflowStep } from './WorkflowStep';
import { AIWorkflow, WorkflowStep as WorkflowStepType } from '@/types/workflow';
import { Plus, Save, Play } from 'lucide-react';
import { useAIPermissions } from '@/hooks/useAIPermissions';
import { AIPermissionGuard } from '@/components/ai/permissions/AIPermissionGuard';

interface AIWorkflowBuilderProps {
  workflow?: AIWorkflow;
  onSave: (workflow: AIWorkflow) => void;
  onTest: (workflow: AIWorkflow) => void;
}

export const AIWorkflowBuilder = ({ workflow, onSave, onTest }: AIWorkflowBuilderProps) => {
  const aiPermissions = useAIPermissions();
  
  const [workflowData, setWorkflowData] = useState<AIWorkflow>(
    workflow || {
      id: `workflow_${Date.now()}`,
      name: '',
      description: '',
      isActive: false,
      steps: [],
      triggers: [],
      approvalRequired: false,
      createdBy: 'current_user',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  );

  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<string | null>(null);

  const addStep = (type: WorkflowStepType['type']) => {
    const newStep: WorkflowStepType = {
      id: `step_${Date.now()}`,
      type,
      name: `Nuevo ${type}`,
      description: `Descripción del ${type}`,
      config: {},
      position: { x: 100, y: 100 + workflowData.steps.length * 120 },
      connections: []
    };

    setWorkflowData(prev => ({
      ...prev,
      steps: [...prev.steps, newStep],
      updatedAt: new Date()
    }));
  };

  const editStep = (stepId: string) => {
    // Implementar edición de paso
    console.log('Editing step:', stepId);
  };

  const deleteStep = (stepId: string) => {
    setWorkflowData(prev => ({
      ...prev,
      steps: prev.steps.filter(step => step.id !== stepId),
      updatedAt: new Date()
    }));
  };

  const connectStep = (stepId: string) => {
    if (isConnecting && isConnecting !== stepId) {
      // Crear conexión entre pasos
      setWorkflowData(prev => ({
        ...prev,
        steps: prev.steps.map(step => 
          step.id === isConnecting 
            ? { ...step, connections: [...step.connections, stepId] }
            : step
        ),
        updatedAt: new Date()
      }));
      setIsConnecting(null);
    } else {
      setIsConnecting(stepId);
    }
  };

  const handleSave = () => {
    if (!workflowData.name.trim()) {
      alert('El nombre del workflow es requerido');
      return;
    }
    onSave(workflowData);
  };

  const handleTest = () => {
    if (workflowData.steps.length === 0) {
      alert('Añade al menos un paso para probar el workflow');
      return;
    }
    onTest(workflowData);
  };

  return (
    <AIPermissionGuard permission="canConfigureSystem">
      <div className="space-y-6">
        {/* Configuración del Workflow */}
        <Card>
          <CardHeader>
            <CardTitle>Configuración del Workflow</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Nombre</label>
                <Input
                  value={workflowData.name}
                  onChange={(e) => setWorkflowData(prev => ({ 
                    ...prev, 
                    name: e.target.value,
                    updatedAt: new Date()
                  }))}
                  placeholder="Nombre del workflow"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={workflowData.isActive}
                  onCheckedChange={(checked) => setWorkflowData(prev => ({ 
                    ...prev, 
                    isActive: checked,
                    updatedAt: new Date()
                  }))}
                />
                <label className="text-sm font-medium">Activo</label>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Descripción</label>
              <Textarea
                value={workflowData.description}
                onChange={(e) => setWorkflowData(prev => ({ 
                  ...prev, 
                  description: e.target.value,
                  updatedAt: new Date()
                }))}
                placeholder="Descripción del workflow"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={workflowData.approvalRequired}
                onCheckedChange={(checked) => setWorkflowData(prev => ({ 
                  ...prev, 
                  approvalRequired: checked,
                  updatedAt: new Date()
                }))}
              />
              <label className="text-sm font-medium">Requiere aprobación</label>
            </div>
          </CardContent>
        </Card>

        {/* Herramientas de construcción */}
        <Card>
          <CardHeader>
            <CardTitle>Añadir Pasos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap">
              <Button onClick={() => addStep('trigger')} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Trigger
              </Button>
              <Button onClick={() => addStep('condition')} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Condición
              </Button>
              <Button onClick={() => addStep('action')} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Acción
              </Button>
              <Button onClick={() => addStep('approval')} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Aprobación
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Canvas del Workflow */}
        <Card>
          <CardHeader>
            <CardTitle>Diseñador de Workflow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative border rounded-lg p-4 min-h-[400px] bg-gray-50">
              {workflowData.steps.map(step => (
                <WorkflowStep
                  key={step.id}
                  step={step}
                  onEdit={editStep}
                  onDelete={deleteStep}
                  onConnect={connectStep}
                  isSelected={selectedStep === step.id}
                  isConnecting={isConnecting === step.id}
                />
              ))}
              
              {workflowData.steps.length === 0 && (
                <div className="text-center text-muted-foreground py-20">
                  Añade pasos para comenzar a construir tu workflow
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Acciones */}
        <div className="flex gap-2">
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Guardar Workflow
          </Button>
          <Button onClick={handleTest} variant="outline">
            <Play className="h-4 w-4 mr-2" />
            Probar Workflow
          </Button>
        </div>
      </div>
    </AIPermissionGuard>
  );
};
