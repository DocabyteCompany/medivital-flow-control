
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, LineChart, Line, ResponsiveContainer } from 'recharts';
import { getAppointmentStatistics, getPersonnelStatistics } from '@/services/statisticsService';
import { Activity, Clock, Users, TrendingUp, AlertTriangle } from 'lucide-react';

export const OperationalStatsWidget = () => {
  const appointmentStats = getAppointmentStatistics();
  const personnelStats = getPersonnelStatistics();

  // Métricas operativas específicas
  const operationalMetrics = {
    bedOccupancy: 78.5, // Simulado
    avgWaitTime: 25, // minutos
    patientSatisfaction: 4.2, // sobre 5
    equipmentUtilization: 85.3, // porcentaje
  };

  const efficiencyData = [
    { department: 'Urgencias', efficiency: 92 },
    { department: 'Cirugía', efficiency: 88 },
    { department: 'Consulta', efficiency: 95 },
    { department: 'Radiología', efficiency: 78 },
    { department: 'Laboratorio', efficiency: 90 },
  ];

  const waitTimeData = [
    { hour: '08:00', time: 15 },
    { hour: '10:00', time: 22 },
    { hour: '12:00', time: 35 },
    { hour: '14:00', time: 18 },
    { hour: '16:00', time: 28 },
    { hour: '18:00', time: 12 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Métricas operativas principales */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-brand-blue" />
            Métricas Operativas
          </CardTitle>
          <CardDescription>Indicadores clave de rendimiento hospitalario</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {operationalMetrics.bedOccupancy}%
              </div>
              <div className="text-sm text-gray-600">Ocupación de Camas</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 flex items-center justify-center gap-1">
                <Clock className="w-5 h-5" />
                {operationalMetrics.avgWaitTime}min
              </div>
              <div className="text-sm text-gray-600">Tiempo Promedio Espera</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {operationalMetrics.patientSatisfaction}/5
              </div>
              <div className="text-sm text-gray-600">Satisfacción Pacientes</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {operationalMetrics.equipmentUtilization}%
              </div>
              <div className="text-sm text-gray-600">Utilización Equipos</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Eficiencia por departamento */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Eficiencia por Departamento
          </CardTitle>
          <CardDescription>Porcentaje de eficiencia operativa</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              efficiency: {
                label: "Eficiencia (%)",
                color: "hsl(var(--chart-1))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={efficiencyData} layout="horizontal">
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="department" type="category" width={80} />
                <ChartTooltip 
                  content={<ChartTooltipContent 
                    formatter={(value) => [`${value}%`, 'Eficiencia']}
                  />} 
                />
                <Bar dataKey="efficiency" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Tiempos de espera por hora */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-600" />
            Tiempos de Espera por Hora
          </CardTitle>
          <CardDescription>Minutos promedio de espera durante el día</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              time: {
                label: "Tiempo (min)",
                color: "hsl(var(--chart-2))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={waitTimeData}>
                <XAxis dataKey="hour" />
                <YAxis />
                <ChartTooltip 
                  content={<ChartTooltipContent 
                    formatter={(value) => [`${value} min`, 'Tiempo de espera']}
                  />} 
                />
                <Line 
                  type="monotone" 
                  dataKey="time" 
                  stroke="#F59E0B" 
                  strokeWidth={3}
                  dot={{ fill: '#F59E0B', strokeWidth: 2, r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Personal activo */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Estado del Personal
          </CardTitle>
          <CardDescription>Personal activo y disponibilidad en tiempo real</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-3 border rounded-lg">
              <div className="text-lg font-bold text-blue-600">{personnelStats.doctors}</div>
              <div className="text-xs text-gray-600">Doctores</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="text-lg font-bold text-green-600">{personnelStats.nurses}</div>
              <div className="text-xs text-gray-600">Enfermeras</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="text-lg font-bold text-purple-600">{personnelStats.technicians}</div>
              <div className="text-xs text-gray-600">Técnicos</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="text-lg font-bold text-orange-600">{personnelStats.online}</div>
              <div className="text-xs text-gray-600">En Línea</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="text-lg font-bold text-red-600">
                {personnelStats.total - personnelStats.online}
              </div>
              <div className="text-xs text-gray-600">Fuera de Línea</div>
            </div>
          </div>
          
          {/* Alertas operativas */}
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-800">
              <AlertTriangle className="w-4 h-4" />
              <span className="font-medium">Alertas Operativas:</span>
            </div>
            <ul className="mt-2 text-sm text-yellow-700 space-y-1">
              <li>• Urgencias con 15% más demanda de lo normal</li>
              <li>• Equipo de radiología en mantenimiento hasta 15:00</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
