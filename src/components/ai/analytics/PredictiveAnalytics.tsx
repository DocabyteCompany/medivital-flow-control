
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { TrendingUp, TrendingDown, AlertTriangle, BarChart3, Users, Calendar } from 'lucide-react';

interface PredictiveInsight {
  id: string;
  type: 'patient_risk' | 'appointment_no_show' | 'resource_demand' | 'revenue_trend';
  title: string;
  description: string;
  confidence: number;
  impact: 'low' | 'medium' | 'high';
  actionable: boolean;
  data: Record<string, any>;
}

export const PredictiveAnalytics = () => {
  const [insights, setInsights] = useState<PredictiveInsight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de análisis predictivo
    setTimeout(() => {
      const mockInsights: PredictiveInsight[] = [
        {
          id: '1',
          type: 'appointment_no_show',
          title: 'Alto riesgo de inasistencias mañana',
          description: 'Se predice un 35% de inasistencias para las citas de mañana basado en patrones históricos',
          confidence: 85,
          impact: 'high',
          actionable: true,
          data: {
            predictedNoShows: 12,
            totalAppointments: 34,
            riskFactors: ['día lluvioso', 'lunes', 'citas tempranas']
          }
        },
        {
          id: '2',
          type: 'patient_risk',
          title: 'Pacientes en riesgo identificados',
          description: '3 pacientes requieren seguimiento prioritario basado en análisis de síntomas',
          confidence: 78,
          impact: 'high',
          actionable: true,
          data: {
            riskPatients: 3,
            riskFactors: ['síntomas recurrentes', 'faltas a citas', 'medicación irregular']
          }
        },
        {
          id: '3',
          type: 'resource_demand',
          title: 'Pico de demanda previsto',
          description: 'Se espera un aumento del 25% en consultas la próxima semana',
          confidence: 72,
          impact: 'medium',
          actionable: true,
          data: {
            expectedIncrease: '25%',
            peakDays: ['martes', 'miércoles'],
            recommendedActions: ['programar personal adicional', 'extender horarios']
          }
        }
      ];

      setInsights(mockInsights);
      setLoading(false);
    }, 2000);
  }, []);

  const getImpactColor = (impact: PredictiveInsight['impact']) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getTypeIcon = (type: PredictiveInsight['type']) => {
    switch (type) {
      case 'patient_risk': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'appointment_no_show': return <Calendar className="h-5 w-5 text-orange-600" />;
      case 'resource_demand': return <Users className="h-5 w-5 text-blue-600" />;
      case 'revenue_trend': return <TrendingUp className="h-5 w-5 text-green-600" />;
    }
  };

  const handleTakeAction = (insightId: string) => {
    const insight = insights.find(i => i.id === insightId);
    if (!insight) return;

    console.log(`Taking action for insight: ${insight.title}`);
    // Aquí se implementaría la lógica específica para cada tipo de acción
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-brand-blue" />
            Análisis Predictivo
          </CardTitle>
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
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-brand-blue" />
            Análisis Predictivo
          </span>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {insights.length} insights
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map(insight => (
          <div key={insight.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {getTypeIcon(insight.type)}
                <div>
                  <h4 className="font-semibold text-sm">{insight.title}</h4>
                  <p className="text-xs text-gray-600">{insight.description}</p>
                </div>
              </div>
              <Badge variant="outline" className={getImpactColor(insight.impact)}>
                {insight.impact}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Confianza</span>
                <span className="font-medium">{insight.confidence}%</span>
              </div>
              <Progress value={insight.confidence} className="h-2" />
            </div>

            <div className="bg-gray-50 rounded p-3 text-xs">
              <p className="font-medium mb-1">Datos relevantes:</p>
              {Object.entries(insight.data).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-gray-600">{key.replace(/_/g, ' ')}:</span>
                  <span className="font-medium">{Array.isArray(value) ? value.join(', ') : String(value)}</span>
                </div>
              ))}
            </div>

            {insight.actionable && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleTakeAction(insight.id)}
                className="w-full"
              >
                Tomar Acción
              </Button>
            )}
          </div>
        ))}

        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-xs">
            Los análisis predictivos son estimaciones basadas en datos históricos. 
            Siempre valide con criterio clínico profesional.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};
