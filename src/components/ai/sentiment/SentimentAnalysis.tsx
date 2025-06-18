
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Smile, Frown, Meh, TrendingUp, MessageCircle } from 'lucide-react';

interface SentimentData {
  source: 'chat' | 'review' | 'call' | 'appointment_feedback';
  sentiment: 'positive' | 'neutral' | 'negative';
  score: number; // 0-100
  text: string;
  timestamp: Date;
  patientId?: string;
  context?: string;
}

interface SentimentSummary {
  positive: number;
  neutral: number;
  negative: number;
  averageScore: number;
  trend: 'improving' | 'stable' | 'declining';
}

export const SentimentAnalysis = () => {
  const [sentimentData, setSentimentData] = useState<SentimentData[]>([]);
  const [summary, setSummary] = useState<SentimentSummary | null>(null);

  useEffect(() => {
    // Generar datos de ejemplo para análisis de sentimientos
    const mockData: SentimentData[] = [
      {
        source: 'chat',
        sentiment: 'positive',
        score: 85,
        text: 'Excelente atención, muy profesional y amable',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        patientId: 'PAT-001',
        context: 'Consulta de seguimiento'
      },
      {
        source: 'review',
        sentiment: 'negative',
        score: 25,
        text: 'Mucho tiempo de espera, servicio lento',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        patientId: 'PAT-002',
        context: 'Primera consulta'
      },
      {
        source: 'appointment_feedback',
        sentiment: 'positive',
        score: 78,
        text: 'Doctor muy atento, explicaciones claras',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        patientId: 'PAT-003',
        context: 'Consulta especializada'
      },
      {
        source: 'chat',
        sentiment: 'neutral',
        score: 50,
        text: 'Cita programada correctamente',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
        patientId: 'PAT-004',
        context: 'Agendamiento'
      },
      {
        source: 'call',
        sentiment: 'positive',
        score: 92,
        text: 'Muy satisfecho con el tratamiento recibido',
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
        patientId: 'PAT-005',
        context: 'Seguimiento telefónico'
      }
    ];

    setSentimentData(mockData);

    // Calcular resumen
    const positive = mockData.filter(d => d.sentiment === 'positive').length;
    const neutral = mockData.filter(d => d.sentiment === 'neutral').length;
    const negative = mockData.filter(d => d.sentiment === 'negative').length;
    const averageScore = mockData.reduce((sum, d) => sum + d.score, 0) / mockData.length;

    setSummary({
      positive,
      neutral,
      negative,
      averageScore,
      trend: averageScore > 70 ? 'improving' : averageScore > 50 ? 'stable' : 'declining'
    });
  }, []);

  const getSentimentIcon = (sentiment: SentimentData['sentiment']) => {
    switch (sentiment) {
      case 'positive': return <Smile className="h-4 w-4 text-green-600" />;
      case 'neutral': return <Meh className="h-4 w-4 text-gray-600" />;
      case 'negative': return <Frown className="h-4 w-4 text-red-600" />;
    }
  };

  const getSentimentColor = (sentiment: SentimentData['sentiment']) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800 border-green-200';
      case 'neutral': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'negative': return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  const getSourceIcon = (source: SentimentData['source']) => {
    switch (source) {
      case 'chat': return <MessageCircle className="h-4 w-4" />;
      case 'review': return <TrendingUp className="h-4 w-4" />;
      case 'call': return <MessageCircle className="h-4 w-4" />;
      case 'appointment_feedback': return <Smile className="h-4 w-4" />;
    }
  };

  if (!summary) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Análisis de Sentimientos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">Cargando análisis...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-brand-blue" />
          Análisis de Sentimientos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Resumen general */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Smile className="h-5 w-5 text-green-600" />
              <span className="text-2xl font-bold text-green-600">{summary.positive}</span>
            </div>
            <p className="text-xs text-gray-600">Positivos</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Meh className="h-5 w-5 text-gray-600" />
              <span className="text-2xl font-bold text-gray-600">{summary.neutral}</span>
            </div>
            <p className="text-xs text-gray-600">Neutrales</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Frown className="h-5 w-5 text-red-600" />
              <span className="text-2xl font-bold text-red-600">{summary.negative}</span>
            </div>
            <p className="text-xs text-gray-600">Negativos</p>
          </div>
        </div>

        {/* Score promedio */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Puntuación Promedio</span>
            <span className="font-medium">{summary.averageScore.toFixed(1)}/100</span>
          </div>
          <Progress value={summary.averageScore} className="h-3" />
          <div className="flex items-center gap-2 text-xs">
            <TrendingUp className={`h-3 w-3 ${summary.trend === 'improving' ? 'text-green-600' : summary.trend === 'declining' ? 'text-red-600' : 'text-gray-600'}`} />
            <span className="capitalize">{summary.trend === 'improving' ? 'Mejorando' : summary.trend === 'declining' ? 'Declinando' : 'Estable'}</span>
          </div>
        </div>

        {/* Lista de sentimientos recientes */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Feedback Reciente</h4>
          {sentimentData.slice(0, 3).map((item, index) => (
            <div key={index} className="border rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getSourceIcon(item.source)}
                  <span className="text-xs font-medium capitalize">
                    {item.source.replace('_', ' ')}
                  </span>
                </div>
                <Badge variant="outline" className={getSentimentColor(item.sentiment)}>
                  <span className="flex items-center gap-1">
                    {getSentimentIcon(item.sentiment)}
                    {item.score}
                  </span>
                </Badge>
              </div>
              
              <p className="text-sm text-gray-700">"{item.text}"</p>
              
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>{item.context}</span>
                <span>{item.timestamp.toLocaleTimeString()}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
