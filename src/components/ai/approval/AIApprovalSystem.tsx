
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, Clock, AlertTriangle, User } from 'lucide-react';

interface PendingApproval {
  id: string;
  actionType: string;
  requestedBy: string;
  requestedAt: Date;
  description: string;
  context: {
    patientId?: string;
    actionDetails: Record<string, any>;
  };
  priority: 'low' | 'medium' | 'high';
}

interface AIApprovalSystemProps {
  userRole: 'Doctor' | 'Admin';
}

export const AIApprovalSystem = ({ userRole }: AIApprovalSystemProps) => {
  const [pendingApprovals, setPendingApprovals] = useState<PendingApproval[]>([]);
  const { toast } = useToast();

  // Mock data para demostración
  useEffect(() => {
    const mockApprovals: PendingApproval[] = [
      {
        id: '1',
        actionType: 'bulk-actions',
        requestedBy: 'Dr. García',
        requestedAt: new Date(Date.now() - 30 * 60 * 1000),
        description: 'Envío masivo de recordatorios a 45 pacientes para citas de mañana',
        context: {
          actionDetails: {
            recipientCount: 45,
            messageType: 'reminder',
            scheduledFor: 'tomorrow'
          }
        },
        priority: 'high'
      },
      {
        id: '2',
        actionType: 'sensitive-data',
        requestedBy: 'Dr. López',
        requestedAt: new Date(Date.now() - 15 * 60 * 1000),
        description: 'Acceso a historial médico completo para análisis predictivo',
        context: {
          patientId: 'PAT-001',
          actionDetails: {
            dataScope: 'complete_history',
            purpose: 'predictive_analysis'
          }
        },
        priority: 'medium'
      }
    ];

    // Solo mostrar si el usuario es Admin
    if (userRole === 'Admin') {
      setPendingApprovals(mockApprovals);
    }
  }, [userRole]);

  const handleApproval = async (approvalId: string, approved: boolean) => {
    const approval = pendingApprovals.find(a => a.id === approvalId);
    if (!approval) return;

    // Simular procesamiento
    await new Promise(resolve => setTimeout(resolve, 1000));

    setPendingApprovals(prev => prev.filter(a => a.id !== approvalId));

    toast({
      title: approved ? 'Acción Aprobada' : 'Acción Rechazada',
      description: `${approval.description} ha sido ${approved ? 'aprobada' : 'rechazada'}.`,
    });

    console.log(`Approval ${approvalId} ${approved ? 'approved' : 'rejected'} by ${userRole}`);
  };

  const getPriorityColor = (priority: PendingApproval['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getPriorityIcon = (priority: PendingApproval['priority']) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'medium': return <Clock className="h-4 w-4" />;
      case 'low': return <CheckCircle className="h-4 w-4" />;
    }
  };

  if (userRole !== 'Admin') {
    return (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Solo los administradores pueden gestionar aprobaciones de IA.
        </AlertDescription>
      </Alert>
    );
  }

  if (pendingApprovals.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Sistema de Aprobaciones IA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">No hay acciones pendientes de aprobación.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-600" />
            Aprobaciones Pendientes
          </span>
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            {pendingApprovals.length} pendientes
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {pendingApprovals.map(approval => (
          <div key={approval.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">{approval.requestedBy}</span>
                  <Badge variant="outline" className={getPriorityColor(approval.priority)}>
                    <span className="flex items-center gap-1">
                      {getPriorityIcon(approval.priority)}
                      {approval.priority}
                    </span>
                  </Badge>
                </div>
                <p className="text-sm text-gray-700 mb-2">{approval.description}</p>
                <p className="text-xs text-gray-500">
                  Solicitado hace {Math.round((Date.now() - approval.requestedAt.getTime()) / 60000)} minutos
                </p>
              </div>
            </div>
            
            {/* Detalles de la acción */}
            <div className="bg-gray-50 rounded p-3 text-xs">
              <p className="font-medium mb-1">Detalles:</p>
              {Object.entries(approval.context.actionDetails).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-gray-600">{key.replace(/_/g, ' ')}:</span>
                  <span className="font-medium">{String(value)}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                size="sm"
                onClick={() => handleApproval(approval.id, true)}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Aprobar
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleApproval(approval.id, false)}
                className="border-red-300 text-red-700 hover:bg-red-50"
              >
                <XCircle className="h-4 w-4 mr-1" />
                Rechazar
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
