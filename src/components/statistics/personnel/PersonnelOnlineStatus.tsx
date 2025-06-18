
import { Activity } from 'lucide-react';
import { BaseStatsCard, ProgressIndicator } from '@/components/common';
import { PersonnelStats } from '@/types';

interface PersonnelOnlineStatusProps {
  stats: PersonnelStats;
}

export const PersonnelOnlineStatus = ({ stats }: PersonnelOnlineStatusProps) => {
  const onlinePercentage = stats.total > 0 ? (stats.online / stats.total) * 100 : 0;

  return (
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
  );
};
