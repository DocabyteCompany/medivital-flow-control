
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { getAppointmentStatistics } from '@/services/statisticsService';
import { Calendar, CheckCircle, Clock, XCircle, RotateCcw } from 'lucide-react';

const STATUS_COLORS = {
  completed: '#10B981',
  scheduled: '#3B82F6',
  cancelled: '#EF4444',
  rescheduled: '#F59E0B'
};

export const AppointmentStatsWidget = () => {
  const stats = getAppointmentStatistics();

  const statusData = [
    { name: 'Completadas', value: stats.completed, color: STATUS_COLORS.completed },
    { name: 'Programadas', value: stats.scheduled, color: STATUS_COLORS.scheduled },
    { name: 'Canceladas', value: stats.cancelled, color: STATUS_COLORS.cancelled },
    { name: 'Reprogramadas', value: stats.rescheduled, color: STATUS_COLORS.rescheduled }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Métricas principales */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-brand-blue" />
            Resumen de Citas
          </CardTitle>
          <CardDescription>Estadísticas de gestión de citas médicas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Citas</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-1" />
              <div className="text-xl font-bold text-green-600">{stats.completed}</div>
              <div className="text-xs text-gray-600">Completadas</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600 mx-auto mb-1" />
              <div className="text-xl font-bold text-blue-600">{stats.scheduled}</div>
              <div className="text-xs text-gray-600">Programadas</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600 mx-auto mb-1" />
              <div className="text-xl font-bold text-red-600">{stats.cancelled}</div>
              <div className="text-xs text-gray-600">Canceladas</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <RotateCcw className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
              <div className="text-xl font-bold text-yellow-600">{stats.rescheduled}</div>
              <div className="text-xs text-gray-600">Reprogramadas</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tasa de completitud */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Tasa de Completitud
          </CardTitle>
          <CardDescription>Porcentaje de citas completadas exitosamente</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600">
              {stats.completionRate.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600 mt-2">
              {stats.completed} de {stats.total} citas
            </div>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-green-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${stats.completionRate}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Distribución por estado */}
      <Card>
        <CardHeader>
          <CardTitle>Estado de las Citas</CardTitle>
          <CardDescription>Distribución por estado actual</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              value: {
                label: "Citas",
                color: "hsl(var(--chart-1))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Tendencia mensual */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Tendencia Mensual de Citas</CardTitle>
          <CardDescription>Evolución del número de citas por mes</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              count: {
                label: "Citas",
                color: "hsl(var(--chart-2))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={stats.monthlyTrend}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
