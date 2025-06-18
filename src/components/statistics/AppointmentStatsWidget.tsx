
import { BarChart, Bar, XAxis, YAxis, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { getAppointmentStatistics } from '@/services/statisticsService';
import { Calendar, CheckCircle, Clock, XCircle, RotateCcw } from 'lucide-react';
import { BaseStatsCard, MetricsGrid, ChartWrapper, ProgressIndicator } from '@/components/common';

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

  const mainMetrics = [
    { 
      title: 'Total Citas', 
      value: stats.total, 
      color: 'blue'
    },
    { 
      title: 'Completadas', 
      value: stats.completed, 
      color: 'green',
      icon: <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-1" />
    },
    { 
      title: 'Programadas', 
      value: stats.scheduled, 
      color: 'blue',
      icon: <Clock className="w-6 h-6 text-blue-600 mx-auto mb-1" />
    },
    { 
      title: 'Canceladas', 
      value: stats.cancelled, 
      color: 'red',
      icon: <XCircle className="w-6 h-6 text-red-600 mx-auto mb-1" />
    },
    { 
      title: 'Reprogramadas', 
      value: stats.rescheduled, 
      color: 'yellow',
      icon: <RotateCcw className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Métricas principales */}
      <BaseStatsCard
        title="Resumen de Citas"
        description="Estadísticas de gestión de citas médicas"
        icon={Calendar}
        colSpan="lg:col-span-2"
      >
        <MetricsGrid metrics={mainMetrics} columns={5} />
      </BaseStatsCard>

      {/* Tasa de completitud */}
      <BaseStatsCard
        title="Tasa de Completitud"
        description="Porcentaje de citas completadas exitosamente"
        icon={CheckCircle}
        iconColor="text-green-600"
      >
        <div className="text-center text-green-600">
          <ProgressIndicator 
            percentage={stats.completionRate}
            color="bg-green-600"
            height="h-3"
          />
          <div className="text-sm text-gray-600 mt-2">
            {stats.completed} de {stats.total} citas
          </div>
        </div>
      </BaseStatsCard>

      {/* Distribución por estado */}
      <BaseStatsCard
        title="Estado de las Citas"
        description="Distribución por estado actual"
      >
        <ChartWrapper
          config={{
            value: { label: "Citas", color: "hsl(var(--chart-1))" }
          }}
          height={200}
        >
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
          </PieChart>
        </ChartWrapper>
      </BaseStatsCard>

      {/* Tendencia mensual */}
      <BaseStatsCard
        title="Tendencia Mensual de Citas"
        description="Evolución del número de citas por mes"
        colSpan="lg:col-span-2"
      >
        <ChartWrapper
          config={{
            count: { label: "Citas", color: "hsl(var(--chart-2))" }
          }}
          height={250}
        >
          <LineChart data={stats.monthlyTrend}>
            <XAxis dataKey="month" />
            <YAxis />
            <Line 
              type="monotone" 
              dataKey="count" 
              stroke="#3B82F6" 
              strokeWidth={3}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 5 }}
            />
          </LineChart>
        </ChartWrapper>
      </BaseStatsCard>
    </div>
  );
};
