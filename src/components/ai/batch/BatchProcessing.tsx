
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAIPermissions } from '@/hooks/useAIPermissions';
import { useAIContext } from '@/hooks/useAIContext';
import { aiAuditService } from '@/services/ai/AIAuditService';
import { Play, Pause, Square, Users, Mail, Calendar } from 'lucide-react';

interface BatchJob {
  id: string;
  type: 'send_reminders' | 'update_records' | 'generate_reports' | 'send_notifications';
  name: string;
  description: string;
  totalItems: number;
  processedItems: number;
  status: 'pending' | 'running' | 'paused' | 'completed' | 'failed';
  startedAt?: Date;
  completedAt?: Date;
  errors: string[];
}

export const BatchProcessing = () => {
  const [activeJobs, setActiveJobs] = useState<BatchJob[]>([]);
  const [selectedJobType, setSelectedJobType] = useState<string>('');
  const [jobDescription, setJobDescription] = useState('');
  const { toast } = useToast();
  const context = useAIContext();
  const { canPerformAction, role } = useAIPermissions(context);

  const jobTypes = [
    {
      value: 'send_reminders',
      label: 'Envío de Recordatorios',
      icon: Mail,
      description: 'Enviar recordatorios masivos a pacientes',
      permission: 'canUseAIReminders' as const
    },
    {
      value: 'update_records',
      label: 'Actualización de Registros',
      icon: Users,
      description: 'Actualizar información de pacientes masivamente',
      permission: 'canUseAIPatientIntake' as const
    },
    {
      value: 'generate_reports',
      label: 'Generación de Reportes',
      icon: Calendar,
      description: 'Generar reportes automáticos',
      permission: 'canUseAISummaries' as const
    },
    {
      value: 'send_notifications',
      label: 'Envío de Notificaciones',
      icon: Mail,
      description: 'Notificar a personal médico',
      permission: 'canUseAICalls' as const
    }
  ];

  const availableJobTypes = jobTypes.filter(jobType => 
    canPerformAction(jobType.permission)
  );

  const createBatchJob = async () => {
    if (!selectedJobType || !jobDescription) {
      toast({
        title: 'Error',
        description: 'Por favor selecciona un tipo de trabajo y proporciona una descripción.',
        variant: 'destructive'
      });
      return;
    }

    const jobType = jobTypes.find(jt => jt.value === selectedJobType);
    if (!jobType) return;

    // Verificar permisos y registrar acción
    if (!canPerformAction(jobType.permission)) {
      toast({
        title: 'Sin permisos',
        description: 'No tienes permisos para este tipo de procesamiento por lotes.',
        variant: 'destructive'
      });
      return;
    }

    await aiAuditService.logAction(
      `batch-${selectedJobType}`,
      jobType.permission,
      role,
      context,
      true,
      { description: jobDescription, type: selectedJobType }
    );

    const newJob: BatchJob = {
      id: Date.now().toString(),
      type: selectedJobType as BatchJob['type'],
      name: jobType.label,
      description: jobDescription,
      totalItems: Math.floor(Math.random() * 100) + 20, // Simular número de elementos
      processedItems: 0,
      status: 'pending',
      errors: []
    };

    setActiveJobs(prev => [...prev, newJob]);
    setSelectedJobType('');
    setJobDescription('');

    toast({
      title: 'Trabajo en lote creado',
      description: `Se ha creado el trabajo: ${newJob.name}`,
    });

    // Simular procesamiento
    setTimeout(() => startJob(newJob.id), 1000);
  };

  const startJob = (jobId: string) => {
    setActiveJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { ...job, status: 'running', startedAt: new Date() }
        : job
    ));

    // Simular progreso
    const progressInterval = setInterval(() => {
      setActiveJobs(prev => prev.map(job => {
        if (job.id === jobId && job.status === 'running') {
          const newProcessed = Math.min(job.processedItems + Math.floor(Math.random() * 5) + 1, job.totalItems);
          
          if (newProcessed >= job.totalItems) {
            clearInterval(progressInterval);
            return {
              ...job,
              processedItems: newProcessed,
              status: 'completed',
              completedAt: new Date()
            };
          }
          
          return { ...job, processedItems: newProcessed };
        }
        return job;
      }));
    }, 1000);
  };

  const pauseJob = (jobId: string) => {
    setActiveJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, status: 'paused' } : job
    ));
  };

  const stopJob = (jobId: string) => {
    setActiveJobs(prev => prev.filter(job => job.id !== jobId));
  };

  const getStatusColor = (status: BatchJob['status']) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'running': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'paused': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-brand-blue" />
          Procesamiento por Lotes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Crear nuevo trabajo */}
        <div className="space-y-4 p-4 border rounded-lg">
          <h3 className="font-semibold">Crear Nuevo Trabajo</h3>
          
          <Select value={selectedJobType} onValueChange={setSelectedJobType}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar tipo de trabajo" />
            </SelectTrigger>
            <SelectContent>
              {availableJobTypes.map(jobType => (
                <SelectItem key={jobType.value} value={jobType.value}>
                  <div className="flex items-center gap-2">
                    <jobType.icon className="h-4 w-4" />
                    {jobType.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Textarea
            placeholder="Descripción del trabajo (ej: Enviar recordatorios a pacientes con citas mañana)"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />

          <Button onClick={createBatchJob} disabled={!selectedJobType || !jobDescription}>
            Crear Trabajo
          </Button>
        </div>

        {/* Trabajos activos */}
        <div className="space-y-4">
          <h3 className="font-semibold">Trabajos Activos</h3>
          
          {activeJobs.length === 0 ? (
            <p className="text-sm text-gray-600 text-center py-4">
              No hay trabajos por lotes activos
            </p>
          ) : (
            activeJobs.map(job => (
              <div key={job.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{job.name}</h4>
                    <p className="text-sm text-gray-600">{job.description}</p>
                  </div>
                  <Badge variant="outline" className={getStatusColor(job.status)}>
                    {job.status}
                  </Badge>
                </div>

                {job.status === 'running' && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progreso</span>
                      <span>{job.processedItems}/{job.totalItems}</span>
                    </div>
                    <Progress value={(job.processedItems / job.totalItems) * 100} />
                  </div>
                )}

                <div className="flex gap-2">
                  {job.status === 'pending' && (
                    <Button size="sm" onClick={() => startJob(job.id)}>
                      <Play className="h-4 w-4 mr-1" />
                      Iniciar
                    </Button>
                  )}
                  
                  {job.status === 'running' && (
                    <Button size="sm" variant="outline" onClick={() => pauseJob(job.id)}>
                      <Pause className="h-4 w-4 mr-1" />
                      Pausar
                    </Button>
                  )}
                  
                  {job.status === 'paused' && (
                    <Button size="sm" onClick={() => startJob(job.id)}>
                      <Play className="h-4 w-4 mr-1" />
                      Reanudar
                    </Button>
                  )}
                  
                  <Button size="sm" variant="destructive" onClick={() => stopJob(job.id)}>
                    <Square className="h-4 w-4 mr-1" />
                    Detener
                  </Button>
                </div>

                {job.completedAt && (
                  <p className="text-xs text-green-600">
                    Completado: {job.completedAt.toLocaleString()}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
