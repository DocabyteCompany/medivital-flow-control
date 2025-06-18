
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell } from 'recharts';
import { getPatientStatistics } from '@/services/statisticsService';
import { Users, TrendingUp } from 'lucide-react';
import { BaseStatsCard, MetricsGrid, ChartWrapper } from '@/components/common';

export const PatientStatsWidget = () => {
  const stats = getPatientStatistics();

  const statusData = [
    { name: 'Saludable', value: stats.healthy, color: '#10B981' },
    { name: 'En tratamiento', value: stats.inTreatment, color: '#F59E0B' },
    { name: 'Crítico', value: stats.critical, color: '#EF4444' }
  ];

  const genderData = [
    { name: 'Hombres', value: stats.byGender.male },
    { name: 'Mujeres', value: stats.byGender.female }
  ];

  const insuranceData = Object.entries(stats.byInsurance).map(([type, count]) => ({
    name: type === 'none' ? 'Sin seguro' : 
          type === 'public' ? 'Público' :
          type === 'private' ? 'Privado' :
          type === 'mixed' ? 'Mixto' : 'Internacional',
    value: count
  }));

  const mainMetrics = [
    { title: 'Total Pacientes', value: stats.total, color: 'blue' },
    { title: 'Saludables', value: stats.healthy, color: 'green' },
    { title: 'En Tratamiento', value: stats.inTreatment, color: 'yellow' },
    { title: 'Críticos', value: stats.critical, color: 'red' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Métricas principales */}
      <BaseStatsCard
        title="Resumen de Pacientes"
        description="Estadísticas generales de la base de pacientes"
        icon={Users}
        colSpan="lg:col-span-2"
      >
        <MetricsGrid metrics={mainMetrics} />
      </BaseStatsCard>

      {/* Distribución por estado de salud */}
      <BaseStatsCard
        title="Estado de Salud"
        description="Distribución de pacientes por estado"
      >
        <ChartWrapper
          config={{
            value: { label: "Pacientes", color: "hsl(var(--chart-1))" }
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

      {/* Distribución por género */}
      <BaseStatsCard
        title="Distribución por Género"
        description="Pacientes por género"
      >
        <ChartWrapper
          config={{
            value: { label: "Pacientes", color: "hsl(var(--chart-2))" }
          }}
          height={200}
        >
          <BarChart data={genderData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="value" fill="#3B82F6" />
          </BarChart>
        </ChartWrapper>
      </BaseStatsCard>

      {/* Nuevos pacientes */}
      <BaseStatsCard
        title="Nuevos Pacientes"
        description="Último mes"
        icon={TrendingUp}
        iconColor="text-green-600"
      >
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600">{stats.newThisMonth}</div>
          <div className="text-sm text-gray-600">Pacientes registrados</div>
        </div>
      </BaseStatsCard>

      {/* Tipos de seguro */}
      <BaseStatsCard
        title="Tipos de Seguro"
        description="Distribución por tipo de seguro médico"
      >
        <ChartWrapper
          config={{
            value: { label: "Pacientes", color: "hsl(var(--chart-3))" }
          }}
          height={200}
        >
          <BarChart data={insuranceData} layout="horizontal">
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={80} />
            <Bar dataKey="value" fill="#10B981" />
          </BarChart>
        </ChartWrapper>
      </BaseStatsCard>
    </div>
  );
};
