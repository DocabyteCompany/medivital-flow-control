
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Download, Calendar, TrendingUp, DollarSign, Clock } from 'lucide-react';

interface ExecutiveSummary {
  period: string;
  totalAISavings: number;
  timesSaved: number;
  efficiencyGain: number;
  userAdoption: number;
  topPerformingFeatures: string[];
  keyInsights: string[];
  recommendations: string[];
}

export const AIExecutiveReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [executiveSummary, setExecutiveSummary] = useState<ExecutiveSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular generación de reporte ejecutivo
    setTimeout(() => {
      const mockSummary: ExecutiveSummary = {
        period: 'Noviembre 2024',
        totalAISavings: 45600,
        timesSaved: 1520,
        efficiencyGain: 32,
        userAdoption: 78,
        topPerformingFeatures: [
          'Transcripción IA (85% adopción)',
          'Recordatorios Automáticos (92% adopción)',
          'Análisis de Sentimientos (67% adopción)'
        ],
        keyInsights: [
          'La implementación de IA ha reducido el tiempo administrativo en un 32%',
          'Los doctores reportan 45 minutos adicionales por día para atención directa al paciente',
          'La satisfacción del personal ha aumentado un 23% desde la implementación',
          'Se ha reducido un 89% los errores en documentación médica'
        ],
        recommendations: [
          'Expandir capacitación en workflows automáticos para aumentar adopción del 45% al 70%',
          'Implementar análisis predictivo en todas las especialidades',
          'Considerar integración con sistemas de telemedicina',
          'Establecer KPIs específicos para medir ROI por departamento'
        ]
      };

      setExecutiveSummary(mockSummary);
      setLoading(false);
    }, 1500);
  }, [selectedPeriod]);

  const handleExportReport = () => {
    console.log(`Exporting executive report for period: ${selectedPeriod}`);
    // Aquí se implementaría la lógica de exportación
  };

  const handleScheduleReport = () => {
    console.log('Opening schedule report dialog');
    // Aquí se implementaría la lógica para programar reportes
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Generando reporte ejecutivo...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!executiveSummary) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-brand-blue" />
            Reporte Ejecutivo de IA
          </span>
          <div className="flex items-center gap-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Semanal</SelectItem>
                <SelectItem value="monthly">Mensual</SelectItem>
                <SelectItem value="quarterly">Trimestral</SelectItem>
                <SelectItem value="yearly">Anual</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm" variant="outline" onClick={handleExportReport}>
              <Download className="h-4 w-4 mr-1" />
              Exportar
            </Button>
            <Button size="sm" onClick={handleScheduleReport}>
              <Calendar className="h-4 w-4 mr-1" />
              Programar
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Resumen de KPIs principales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Ahorros Totales</span>
            </div>
            <p className="text-2xl font-bold text-green-700">
              ${executiveSummary.totalAISavings.toLocaleString()}
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Tiempo Ahorrado</span>
            </div>
            <p className="text-2xl font-bold text-blue-700">
              {executiveSummary.timesSaved}h
            </p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">Ganancia Eficiencia</span>
            </div>
            <p className="text-2xl font-bold text-purple-700">
              +{executiveSummary.efficiencyGain}%
            </p>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-800">Adopción Usuario</span>
            </div>
            <p className="text-2xl font-bold text-orange-700">
              {executiveSummary.userAdoption}%
            </p>
          </div>
        </div>

        {/* Características más exitosas */}
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Funcionalidades Más Exitosas
          </h3>
          <div className="space-y-2">
            {executiveSummary.topPerformingFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  #{index + 1}
                </Badge>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Insights clave */}
        <div>
          <h3 className="font-semibold mb-3">Insights Clave del Período</h3>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <ul className="space-y-2">
              {executiveSummary.keyInsights.map((insight, index) => (
                <li key={index} className="text-sm text-blue-800 flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  {insight}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recomendaciones estratégicas */}
        <div>
          <h3 className="font-semibold mb-3">Recomendaciones Estratégicas</h3>
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <ul className="space-y-2">
              {executiveSummary.recommendations.map((rec, index) => (
                <li key={index} className="text-sm text-orange-800 flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center pt-4 border-t">
          <p className="text-xs text-gray-500">
            Reporte generado automáticamente para el período: {executiveSummary.period}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
