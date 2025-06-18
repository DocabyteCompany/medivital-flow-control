
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { WorkflowCondition as WorkflowConditionType } from '@/types/workflow';
import { Trash2 } from 'lucide-react';

interface WorkflowConditionProps {
  condition: WorkflowConditionType;
  onChange: (condition: WorkflowConditionType) => void;
  onDelete: (conditionId: string) => void;
  availableFields: { value: string; label: string }[];
}

export const WorkflowCondition = ({ 
  condition, 
  onChange, 
  onDelete, 
  availableFields 
}: WorkflowConditionProps) => {
  const handleFieldChange = (field: string) => {
    onChange({ ...condition, field });
  };

  const handleOperatorChange = (operator: WorkflowConditionType['operator']) => {
    onChange({ ...condition, operator });
  };

  const handleValueChange = (value: string) => {
    onChange({ ...condition, value });
  };

  const handleLogicalOperatorChange = (logicalOperator: 'AND' | 'OR') => {
    onChange({ ...condition, logicalOperator });
  };

  return (
    <Card className="p-4">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Condición</CardTitle>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDelete(condition.id)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <Select value={condition.field} onValueChange={handleFieldChange}>
            <SelectTrigger>
              <SelectValue placeholder="Campo" />
            </SelectTrigger>
            <SelectContent>
              {availableFields.map(field => (
                <SelectItem key={field.value} value={field.value}>
                  {field.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={condition.operator} onValueChange={handleOperatorChange}>
            <SelectTrigger>
              <SelectValue placeholder="Operador" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="equals">Igual a</SelectItem>
              <SelectItem value="contains">Contiene</SelectItem>
              <SelectItem value="greater_than">Mayor que</SelectItem>
              <SelectItem value="less_than">Menor que</SelectItem>
              <SelectItem value="not_empty">No vacío</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Valor"
            value={String(condition.value)}
            onChange={(e) => handleValueChange(e.target.value)}
          />
        </div>

        {condition.logicalOperator !== undefined && (
          <Select value={condition.logicalOperator} onValueChange={handleLogicalOperatorChange}>
            <SelectTrigger>
              <SelectValue placeholder="Operador lógico" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AND">Y</SelectItem>
              <SelectItem value="OR">O</SelectItem>
            </SelectContent>
          </Select>
        )}
      </CardContent>
    </Card>
  );
};
