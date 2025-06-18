
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, User, Activity, TrendingUp, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { aiAuditService, AIAuditLog } from '@/services/ai/AIAuditService';
import { useAIPermissions } from '@/hooks/useAIPermissions';
import { AIPermissionGuard } from '@/components/ai/permissions/AIPermissionGuard';

export const AIAuditDashboard = () => {
  const { t } = useTranslation();
  const { permissions } = useAIPermissions();
  const [logs, setLogs] = useState<AIAuditLog[]>([]);
  const [metrics, setMetrics] = useState<any>(null);
  const [timeFilter, setTimeFilter] = useState<string>('today');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  useEffect(() => {
    loadAuditData();
  }, [timeFilter, roleFilter]);

  const loadAuditData = async () => {
    const now = new Date();
    let dateFrom: Date | undefined;

    if (timeFilter === 'today') {
      dateFrom = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    } else if (timeFilter === 'week') {
      dateFrom = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else if (timeFilter === 'month') {
      dateFrom = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    const filters = {
      dateFrom,
      userRole: roleFilter !== 'all' ? roleFilter as 'Doctor' | 'Admin' : undefined
    };

    const auditLogs = await aiAuditService.getAuditLogs(filters);
    const usageMetrics = await aiAuditService.getUsageMetrics(filters.userRole);

    setLogs(auditLogs);
    setMetrics(usageMetrics);
  };

  const formatTimestamp = (timestamp: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(timestamp);
  };

  const getStatusBadge = (success: boolean) => {
    return (
      <Badge variant={success ? "default" : "destructive"} className="text-xs">
        {success ? 'Éxito' : 'Error'}
      </Badge>
    );
  };

  return (
    <AIPermissionGuard permission="canAuditAIUsage">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="bg-brand-light p-3 rounded-lg">
            <Shield className="w-6 h-6 text-brand-blue" />
          </div>
          <h1 className="text-2xl font-bold text-brand-dark">
            {t('ai.audit.title', 'Auditoría de IA')}
          </h1>
        </div>

        {/* Filtros */}
        <div className="flex gap-4">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período de tiempo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hoy</SelectItem>
              <SelectItem value="week">Última semana</SelectItem>
              <SelectItem value="month">Último mes</SelectItem>
              <SelectItem value="all">Todos</SelectItem>
            </SelectContent>
          </Select>

          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Rol de usuario" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los roles</SelectItem>
              <SelectItem value="Doctor">Doctores</SelectItem>
              <SelectItem value="Admin">Administradores</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="metrics" className="w-full">
          <TabsList>
            <TabsTrigger value="metrics">Métricas</TabsTrigger>
            <TabsTrigger value="logs">Logs de Auditoría</TabsTrigger>
          </TabsList>

          <TabsContent value="metrics" className="space-y-6">
            {metrics && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Acciones</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metrics.totalActions}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Hoy</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metrics.todayActions}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Tasa de Éxito</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metrics.successRate.toFixed(1)}%</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Promedio/Día</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metrics.averageActionsPerDay.toFixed(1)}</div>
                  </CardContent>
                </Card>
              </div>
            )}

            {metrics?.mostUsedActions && (
              <Card>
                <CardHeader>
                  <CardTitle>Acciones Más Utilizadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {metrics.mostUsedActions.map((item: any, index: number) => (
                      <div key={item.action} className="flex justify-between items-center">
                        <span className="text-sm">{item.action}</span>
                        <Badge variant="outline">{item.count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="logs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Historial de Actividades</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-3">
                    {logs.map((log) => (
                      <div key={log.id} className="border rounded-lg p-4 space-y-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">{log.userRole}</span>
                            <Badge variant="outline" className="text-xs">
                              {log.permission}
                            </Badge>
                          </div>
                          {getStatusBadge(log.success)}
                        </div>
                        
                        <div>
                          <p className="font-medium">{log.action}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatTimestamp(log.timestamp)}
                          </p>
                        </div>

                        {log.context && (
                          <div className="text-xs text-muted-foreground">
                            Página: {log.context.currentPage}
                            {log.context.patientId && ` | Paciente: ${log.context.patientId}`}
                          </div>
                        )}

                        {log.details && Object.keys(log.details).length > 0 && (
                          <div className="text-xs bg-gray-50 p-2 rounded">
                            {Object.entries(log.details).map(([key, value]) => (
                              <div key={key}>
                                <strong>{key}:</strong> {String(value)}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AIPermissionGuard>
  );
};
