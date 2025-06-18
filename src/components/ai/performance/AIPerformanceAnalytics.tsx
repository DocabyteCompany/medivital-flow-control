
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useRole } from '@/contexts/RoleContext';
import { 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Target, 
  Users, 
  AlertTriangle,
  BarChart3,
  PieChart,
  TrendingDown
} from 'lucide-react';

interface ROIMetric {
  category: string;
  timeInvested: number; // horas
  timeSaved: number; // horas
  costSavings: number; // dinero ahorrado
  efficiency: number; // porcentaje
  trend: 'up' | 'down' | 'stable';
}

interface UsagePattern {
  feature: string;
  usage: number;
  satisfaction: number;
  adoption: number;
  issues: number;
}

interface PerformanceRecommendation {
  id: string;
  type: 'optimization' | 'training' | 'configuration' | 'alert';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  effort: 'low' | 'medium' | 'high';
  estimatedSavings: string;
}

export const AIPerformanceAnalytics = () => {
  const { selectedRole } = useRole();
  const [roiMetrics, setROIMetrics] = useState<ROIMetric[]>([]);
  const [usagePatterns, setUsagePatterns] = useState<UsagePattern[]>([]);
  const [recommendations, setRecommendations] = useState<PerformanceRecommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      const mockROI: ROIMetric[] = [
        {
          category: 'Documentación',
          timeInvested: 120,
          timeSaved: 840,
          costSavings: 12600,
          efficiency: 85,
          trend: 'up'
        },
        {
          category: 'Agendamiento',
          timeInvested: 60,
          timeSaved: 240,
          costSavings: 3600,
          efficiency: 75,
          trend: 'up'
        },
        {
          category: 'Facturación',
          timeInvested: 80,
          timeSaved: 320,
          costSavings: 4800,
          efficiency: 70,
          trend: 'stable'
        }
      ];

      const mockPatterns: UsagePattern[] = [
        { feature: 'Transcripción IA', usage: 95, satisfaction: 92, adoption: 88, issues: 2 },
        { feature: 'Recordatorios Automáticos', usage: 87, satisfaction: 89, adoption: 94, issues: 1 },
        { feature: 'Análisis Predictivo', usage: 65, satisfaction: 78, adoption: 71, issues: 5 },
        { feature: 'Workflows Automáticos', usage: 45, satisfaction: 82, adoption: 52, issues: 3 }
      ];

      const mockRecommendations: PerformanceRecommendation[] = [
        {
          id: '1',
          type: 'optimization',
          title: 'Optimizar flujos de trabajo automáticos',
          description: 'Los workflows automáticos tienen baja adopción. Simplificar configuración podría aumentar uso en 30%.',
          impact: 'high',
          effort: 'medium',
          estimatedSavings: '15 horas/semana'
        },
        {
          id: '2',
          type: 'training',
          title: 'Capacitación en análisis predictivo',
          description: 'El personal muestra resistencia al análisis predictivo. Capacitación específica mejoraría adopción.',
          impact: 'medium',
          effort: 'medium',
          estimatedSavings: '8 horas/semana'
        },
        {
          id: '3',
          type: 'alert',
          title: 'Uso anómalo detectado',
          description: 'Usuario "Dr. García" ha aumentado uso de IA en 200% esta semana. Verificar si necesita soporte.',
          impact: 'low',
          effort: 'low',
          estimatedSavings: 'Prevención de errores'
        }
      ];

      setROIMetrics(mockROI);
      setUsagePatterns(mockPatterns);
      setRecommendations(mockRecommendations);
      setLoading(false);
    }, 1500);
  }, []);

  const getTrendIcon = (trend: ROIMetric['trend']) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-600" />;
      case 'stable': return <BarChart3 className="h-4 w-4 text-blue-600" />;
    }
  };

  const getImpactColor = (impact: PerformanceRecommendation['impact']) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getTypeIcon = (type: PerformanceRecommendation['type']) => {
    switch (type) {
      case 'optimization': return <Target className="h-4 w-4" />;
      case 'training': return <Users className="h-4 w-4" />;
      case 'configuration': return <BarChart3 className="h-4 w-4" />;
      case 'alert': return <AlertTriangle className="h-4 w-4" />;
    }
  };

  if (selectedRole !== 'Admin') {
    return (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Solo los administradores pueden acceder al análisis de rendimiento de IA.
        </AlertDescription>
      </Alert>
    );
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cargando análisis de rendimiento...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChart className="h-5 w-5 text-brand-blue" />
          Análisis de Rendimiento y ROI de IA
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="roi" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="roi">ROI y Eficiencia</TabsTrigger>
            <TabsTrigger value="patterns">Patrones de Uso</TabsTrigger>
            <TabsTrigger value="recommendations">Recomendaciones</TabsTrigger>
          </TabsList>

          <TabsContent value="roi" className="space-y-4">
            {roiMetrics.map((metric, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{metric.category}</h4>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(metric.trend)}
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {metric.efficiency}% eficiencia
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Tiempo Invertido</p>
                    <p className="font-semibold">{metric.timeInvested}h</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Tiempo Ahorrado</p>
                    <p className="font-semibold text-green-600">{metric.timeSaved}h</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Ahorro Económico</p>
                    <p className="font-semibold text-green-600">${metric.costSavings.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">ROI</p>
                    <p className="font-semibold text-green-600">
                      {Math.round((metric.timeSaved / metric.timeInvested - 1) * 100)}%
                    </p>
                  </div>
                </div>

                <Progress value={metric.efficiency} className="h-2" />
              </div>
            ))}
          </TabsContent>

          <TabsContent value="patterns" className="space-y-4">
            {usagePatterns.map((pattern, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{pattern.feature}</h4>
                  <Badge variant="outline" className={
                    pattern.issues > 3 ? 'bg-red-50 text-red-700 border-red-200' :
                    pattern.issues > 1 ? 'bg-orange-50 text-orange-700 border-orange-200' :
                    'bg-green-50 text-green-700 border-green-200'
                  }>
                    {pattern.issues} issues
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Uso</p>
                    <Progress value={pattern.usage} className="h-2 mb-1" />
                    <p className="text-xs font-medium">{pattern.usage}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Satisfacción</p>
                    <Progress value={pattern.satisfaction} className="h-2 mb-1" />
                    <p className="text-xs font-medium">{pattern.satisfaction}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Adopción</p>
                    <Progress value={pattern.adoption} className="h-2 mb-1" />
                    <p className="text-xs font-medium">{pattern.adoption}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Problemas</p>
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3 text-orange-500" />
                      <span className="text-xs font-medium">{pattern.issues}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            {recommendations.map(rec => (
              <div key={rec.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded">
                      {getTypeIcon(rec.type)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{rec.title}</h4>
                      <p className="text-xs text-gray-600">{rec.description}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={getImpactColor(rec.impact)}>
                    {rec.impact} impacto
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600">Esfuerzo: <span className="font-medium">{rec.effort}</span></span>
                    <span className="text-gray-600">Ahorro estimado: <span className="font-medium text-green-600">{rec.estimatedSavings}</span></span>
                  </div>
                  <Button size="sm" variant="outline">
                    Implementar
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
