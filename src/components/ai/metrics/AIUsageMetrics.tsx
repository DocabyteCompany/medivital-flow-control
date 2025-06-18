
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { aiAuditService } from '@/services/ai/AIAuditService';
import { useAIPermissions } from '@/hooks/useAIPermissions';

export const AIUsageMetrics = () => {
  const { t } = useTranslation();
  const { permissions } = useAIPermissions();
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      const usageMetrics = await aiAuditService.getUsageMetrics();
      setMetrics(usageMetrics);
    } catch (error) {
      console.error('Error loading AI metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cargando métricas...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  if (!metrics) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error al cargar métricas</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  const dailyUsagePercentage = (metrics.todayActions / permissions.dailyAIActionsLimit) * 100;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Uso Diario de IA
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Acciones hoy: {metrics.todayActions} / {permissions.dailyAIActionsLimit}
            </span>
            <Badge variant={dailyUsagePercentage > 80 ? "destructive" : "default"}>
              {dailyUsagePercentage.toFixed(0)}%
            </Badge>
          </div>
          <Progress value={dailyUsagePercentage} className="w-full" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Estadísticas de Rendimiento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm">Tasa de éxito:</span>
            <Badge variant="outline">{metrics.successRate.toFixed(1)}%</Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Acciones esta semana:</span>
            <Badge variant="outline">{metrics.weekActions}</Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Promedio por día:</span>
            <Badge variant="outline">{metrics.averageActionsPerDay.toFixed(1)}</Badge>
          </div>
        </CardContent>
      </Card>

      {metrics.mostUsedActions && metrics.mostUsedActions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Acciones Más Frecuentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {metrics.mostUsedActions.slice(0, 3).map((action: any, index: number) => (
                <div key={action.action} className="flex justify-between items-center">
                  <span className="text-sm">{action.action.replace('-', ' ')}</span>
                  <Badge variant="secondary">{action.count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {dailyUsagePercentage > 90 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-yellow-800">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">
                Te acercas al límite diario de acciones de IA
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
