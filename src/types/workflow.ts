
export interface WorkflowStep {
  id: string;
  type: 'trigger' | 'condition' | 'action' | 'approval';
  name: string;
  description: string;
  config: Record<string, any>;
  position: { x: number; y: number };
  connections: string[];
}

export interface WorkflowCondition {
  id: string;
  field: string;
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'not_empty';
  value: string | number | boolean;
  logicalOperator?: 'AND' | 'OR';
}

export interface AIWorkflow {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  steps: WorkflowStep[];
  triggers: string[];
  approvalRequired: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: 'clinical' | 'administrative' | 'communication';
  workflow: Omit<AIWorkflow, 'id' | 'createdBy' | 'createdAt' | 'updatedAt'>;
}
