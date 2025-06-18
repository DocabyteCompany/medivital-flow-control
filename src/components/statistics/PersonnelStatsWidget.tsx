
import { BarChart, Bar, XAxis, YAxis } from 'recharts';
import { getPersonnelStatistics } from '@/services/statisticsService';
import { Stethoscope, Users, Activity } from 'lucide-react';
import { useStatisticsLoading } from '@/hooks/useStatisticsLoading';
import { StatsSkeleton } from './StatsSkeleton';
import { BaseStatsCard, MetricsGrid, ChartWrapper, ProgressIndicator } from '@/components/common';

export const PersonnelStatsWidget = () => {
  const isLoading = useStatisticsLoading(300);
  const stats = getPersonnelStatistics();

  const roleData = [
    { name: 'Doctores', value: stats.doctors, key: 'doctors' },
    { name: 'Enfermeras', value: stats.nurses, key: 'nurses' },
    { name: 'Técnicos', value: stats.technicians, key: 'technicians' },
    { name: 'Administrativos', value: stats.administrative, key: 'administrative' },
    { name: 'Radiólogos', value: stats.radiologists, key: 'radiologists' }
  ];

  const specialtyData = Object.entries(stats.bySpecialty).map(([specialty, count], index) => ({
    name: specialty,
    value: count,
    key: `specialty-${index}`
  }));

  const mainMetrics = [
    { title: 'Total Personal', value: stats.total, color: 'blue' },
    { title: 'Doctores', value: stats.doctors, color: 'green' },
    { title: 'Enfermeras', value: stats.nurses, color: 'purple' },
    { title: 'En Línea', value: stats.online, color: 'orange' }
  ];

  const onlinePercentage = stats.total > 0 ? (stats.online / stats.total) * 100 : 0;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StatsSkeleton colSpan="lg:col-span-2" showMetrics={true} showChart={false} />
        <StatsSkeleton showChart={true} showMetrics={false} />
        <StatsSkeleton showChart={false} showMetrics={false} />
        {specialtyData.length > 0 && (
          <StatsSkeleton colSpan="lg:col-span-2" showChart={true} showMetrics={false} />
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in-50 duration-500">
      {/* Métricas principales */}
      <BaseStatsCard
        title="Resumen del Personal"
        description="Estadísticas del equipo médico y administrativo"
        icon={Stethoscope}
        colSpan="lg:col-span-2"
      >
        <MetricsGrid metrics={mainMetrics} />
      </BaseStatsCard>

      {/* Distribución por roles */}
      <BaseStatsCard
        title="Distribución por Roles"
        description="Personal por tipo de rol"
        icon={Users}
        iconColor="text-blue-600"
      >
        <ChartWrapper
          config={{
            value: { label: "Personal", color: "hsl(var(--chart-1))" }
          }}
          height={250}
        >
          <BarChart data={roleData} margin={{ bottom: 80, left: 20, right: 20, top: 20 }}>
            <XAxis 
              dataKey="name" 
              angle={-45} 
              textAnchor="end" 
              height={80}
              interval={0}
              fontSize={12}
            />
            <YAxis />
            <Bar 
              dataKey="value" 
              fill="#3B82F6" 
              radius={[4, 4, 0, 0]}
              className="transition-all duration-300"
            />
          </BarChart>
        </ChartWrapper>
      </BaseStatsCard>

      {/* Estado de disponibilidad */}
      <BaseStatsCard
        title="Disponibilidad"
        description="Personal en línea actualmente"
        icon={Activity}
        iconColor="text-green-600"
      >
        <div className="text-center text-green-600">
          <ProgressIndicator 
            percentage={onlinePercentage}
            color="bg-green-600"
          />
          <div className="text-sm text-gray-600 mt-2">
            {stats.online} de {stats.total} en línea
          </div>
        </div>
      </BaseStatsCard>

      {/* Especialidades médicas */}
      {specialtyData.length > 0 && (
        <BaseStatsCard
          title="Especialidades Médicas"
          description={`Distribución del personal médico por especialidad (${specialtyData.length} especialidades)`}
          colSpan="lg:col-span-2"
        >
          <ChartWrapper
            config={{
              value: { label: "Personal", color: "hsl(var(--chart-2))" }
            }}
            height={300}
          >
            <BarChart 
              data={specialtyData} 
              layout="horizontal"
              margin={{ left: 120, right: 20, top: 20, bottom: 20 }}
            >
              <XAxis 
                type="number" 
                domain={[0, Math.max(...specialtyData.map(d => d.value)) + 1]}
                tickCount={Math.min(6, Math.max(...specialtyData.map(d => d.value)) + 1)}
              />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={120}
                fontSize={12}
                interval={0}
              />
              <Bar 
                dataKey="value" 
                fill="#10B981" 
                radius={[0, 4, 4, 0]}
                minPointSize={5}
                className="transition-all duration-300"
              />
            </BarChart>
          </ChartWrapper>
        </BaseStatsCard>
      )}
    </div>
  );
};
