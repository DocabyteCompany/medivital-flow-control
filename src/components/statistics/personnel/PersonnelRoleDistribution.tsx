
import { BarChart, Bar, XAxis, YAxis } from 'recharts';
import { Users } from 'lucide-react';
import { BaseStatsCard, ChartWrapper } from '@/components/common';
import { PersonnelStats } from '@/types';

interface PersonnelRoleDistributionProps {
  stats: PersonnelStats;
}

export const PersonnelRoleDistribution = ({ stats }: PersonnelRoleDistributionProps) => {
  const roleData = [
    { name: 'Doctores', value: stats.doctors, key: 'doctors' },
    { name: 'Enfermeras', value: stats.nurses, key: 'nurses' },
    { name: 'Técnicos', value: stats.technicians, key: 'technicians' },
    { name: 'Administrativos', value: stats.administrative, key: 'administrative' },
    { name: 'Radiólogos', value: stats.radiologists, key: 'radiologists' }
  ];

  return (
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
  );
};
