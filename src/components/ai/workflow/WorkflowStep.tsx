
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WorkflowStep as WorkflowStepType } from '@/types/workflow';
import { Settings, Trash2, Play, CheckCircle, AlertCircle, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WorkflowStepProps {
  step: WorkflowStepType;
  onEdit: (stepId: string) => void;
  onDelete: (stepId: string) => void;
  onConnect: (stepId: string) => void;
  isSelected?: boolean;
  isConnecting?: boolean;
}

export const WorkflowStep = ({ 
  step, 
  onEdit, 
  onDelete, 
  onConnect, 
  isSelected = false,
  isConnecting = false 
}: WorkflowStepProps) => {
  const getStepIcon = (type: WorkflowStepType['type']) => {
    switch (type) {
      case 'trigger':
        return <Zap className="h-4 w-4" />;
      case 'condition':
        return <AlertCircle className="h-4 w-4" />;
      case 'action':
        return <Play className="h-4 w-4" />;
      case 'approval':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Play className="h-4 w-4" />;
    }
  };

  const getStepColor = (type: WorkflowStepType['type']) => {
    switch (type) {
      case 'trigger':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'condition':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'action':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'approval':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card 
      className={cn(
        "w-64 cursor-pointer transition-all hover:shadow-md",
        isSelected && "ring-2 ring-brand-blue",
        isConnecting && "ring-2 ring-yellow-400"
      )}
      style={{
        position: 'absolute',
        left: step.position.x,
        top: step.position.y
      }}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStepIcon(step.type)}
            <CardTitle className="text-sm">{step.name}</CardTitle>
          </div>
          <Badge variant="outline" className={cn("text-xs", getStepColor(step.type))}>
            {step.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-xs text-muted-foreground mb-3">{step.description}</p>
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onEdit(step.id)}
          >
            <Settings className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onConnect(step.id)}
          >
            Conectar
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDelete(step.id)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
