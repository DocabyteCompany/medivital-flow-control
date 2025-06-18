
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, TrendingUp, Clock, User, Activity } from 'lucide-react';

interface UsageAnomaly {
  id: string;
  userId: string;
  userName: string;
  anomalyType: 'spike' | 'drop' | 'unusual_pattern' | 'error_rate';
  description: string;
  severity: 'low' | 'medium' | 'high';
  detectedAt: Date;
  baselineValue: number;
  currentValue: number;
  change: number;
  possibleCauses: string[];
  recommendedActions: string[];
}

export const AIUsageAnomalyDetection = () => {
  const [anomalies, setAnomalies] = useState<UsageAnomaly[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular detección de anomalías
    setTimeout(() => {
      const mockAnomalies: UsageAnomaly[] = [
        {
          id: '1',
          userId: 'DOC-001',
          userName: 'Dr. García',
          anomalyType: 'spike',
          description: 'Aumento del 250% en el uso de transcripción IA en las últimas 24 horas',
          severity: 'high',
          detectedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
          baselineValue: 12,
          currentValue: 42,
          change: 250,
          possibleCauses: [
            'Nueva funcionalidad descubierta',
            'Aumento en carga de trabajo',
            'Uso incorrecto de la herramienta'
          ],
          recommendedActions: [
            'Contactar al usuario para verificar necesidades',
            'Revisar configuración de límites',
            'Proporcionar capacitación adicional'
          ]
        },
        {
          id: '2',
          userId: 'ADM-001',
          userName: 'Admin López',
          anomalyType: 'error_rate',
          description: 'Tasa de errores inusualmente alta en procesamiento de citas',
          severity: 'medium',
          detectedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
          baselineValue: 2,
          currentValue: 15,
          change: 650,
          possibleCauses: [
            'Problema de integración con sistema',
            'Datos incorrectos en entrada',
            'Configuración de workflow incorrecta'
          ],
          recommendedActions: [
            'Revisar logs de sistema',
            'Validar configuración de workflows',
            'Ejecutar diagnóstico de sistema'
          ]
        },
        {
          id: '3',
          userId: 'DOC-003',
          userName: 'Dra. Martínez',
          anomalyType: 'drop',
          description: 'Disminución del 80% en uso de recordatorios automáticos',
          severity: 'low',
          detectedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
          baselineValue: 25,
          currentValue: 5,
          change: -80,
          possibleCauses: [
            'Usuario no disponible',
            'Problema técnico',
            'Cambio en flujo de trabajo'
          ],
          recommendedActions: [
            'Verificar disponibilidad del usuario',
            'Revisar configuración de la cuenta',
            'Ofrecer soporte técnico'
          ]
        }
      ];

      setAnomalies(mockAnomalies);
      setLoading(false);
    }, 1000);
  }, []);

  const getSeverityColor = (severity: UsageAnomaly['severity']) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getAnomalyIcon = (type: UsageAnomaly['anomalyType']) => {
    switch (type) {
      case 'spike': return <TrendingUp className="h-4 w-4 text-red-600" />;
      case 'drop': return <TrendingUp className="h-4 w-4 text-blue-600 transform rotate-180" />;
      case 'unusual_pattern': return <Activity className="h-4 w-4 text-orange-600" />;
      case 'error_rate': return <AlertTriangle className="h-4 w-4 text-red-600" />;
    }
  };

  const handleInvestigateAnomaly = (anomalyId: string) => {
    console.log(`Investigating anomaly: ${anomalyId}`);
    // Aquí se implementaría la lógica para investigar la anomalía
  };

  const handleResolveAnomaly = (anomalyId: string) => {
    setAnomalies(prev => prev.filter(a => a.id !== anomalyId));
    console.log(`Resolved anomaly: ${anomalyId}`);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cargando detección de anomalías...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            Detección de Anomalías de Uso
          </span>
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            {anomalies.length} anomalías detectadas
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {anomalies.length === 0 ? (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              No se han detectado anomalías en el uso de IA recientemente.
            </AlertDescription>
          </Alert>
        ) : (
          anomalies.map(anomaly => (
            <div key={anomaly.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {getAnomalyIcon(anomaly.anomalyType)}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <User className="h-3 w-3 text-gray-500" />
                      <span className="text-sm font-medium">{anomaly.userName}</span>
                      <Badge variant="outline" className={getSeverityColor(anomaly.severity)}>
                        {anomaly.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700">{anomaly.description}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3" />
                      Detectado hace {Math.round((Date.now() - anomaly.detectedAt.getTime()) / (60 * 60 * 1000))} horas
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {anomaly.change > 0 ? '+' : ''}{anomaly.change}%
                  </p>
                  <p className="text-xs text-gray-500">
                    {anomaly.baselineValue} → {anomaly.currentValue}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="font-medium mb-1 text-gray-700">Posibles causas:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {anomaly.possibleCauses.map((cause, index) => (
                      <li key={index}>{cause}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-1 text-gray-700">Acciones recomendadas:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {anomaly.recommendedActions.map((action, index) => (
                      <li key={index}>{action}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleInvestigateAnomaly(anomaly.id)}
                >
                  Investigar
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleResolveAnomaly(anomaly.id)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Resolver
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
