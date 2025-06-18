
import { getPersonnelStatistics } from '@/services/statisticsService';
import { Stethoscope } from 'lucide-react';
import { useStatisticsLoading } from '@/hooks/useStatisticsLoading';
import { StatsSkeleton } from './StatsSkeleton';
import { BaseStatsCard, MetricsGrid } from '@/components/common';
import { PersonnelRoleDistribution } from './personnel/PersonnelRoleDistribution';
import { PersonnelOnlineStatus } from './personnel/PersonnelOnlineStatus';
import { PersonnelSpecialtyBreakdown } from './personnel/PersonnelSpecialtyBreakdown';

export const PersonnelStatsWidget = () => {
  const isLoading = useStatisticsLoading(300);
  const stats = getPersonnelStatistics();

  const mainMetrics = [
    { title: 'Total Personal', value: stats.total, color: 'blue' },
    { title: 'Doctores', value: stats.doctors, color: 'green' },
    { title: 'Enfermeras', value: stats.nurses, color: 'purple' },
    { title: 'En Línea', value: stats.online, color: 'orange' }
  ];

  const specialtyData = Object.entries(stats.bySpecialty);

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
      <PersonnelRoleDistribution stats={stats} />

      {/* Estado de disponibilidad */}
      <PersonnelOnlineStatus stats={stats} />

      {/* Especialidades médicas */}
      <PersonnelSpecialtyBreakdown stats={stats} />
    </div>
  );
};
