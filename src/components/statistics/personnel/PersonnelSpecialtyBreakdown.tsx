
import { BarChart, Bar, XAxis, YAxis } from 'recharts';
import { BaseStatsCard, ChartWrapper } from '@/components/common';
import { PersonnelStats } from '@/types';

interface PersonnelSpecialtyBreakdownProps {
  stats: PersonnelStats;
}

export const PersonnelSpecialtyBreakdown = ({ stats }: PersonnelSpecialtyBreakdownProps) => {
  const specialtyData = Object.entries(stats.bySpecialty).map(([specialty, count], index) => ({
    name: specialty,
    value: count,
    key: `specialty-${index}`
  }));

  if (specialtyData.length === 0) {
    return null;
  }

  return (
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
  );
};
