
import { type Activity } from '@/components/ia/ActivityCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Loader, List } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type ActivityStatsProps = {
  activities: Activity[];
};

export const ActivityStats = ({ activities }: ActivityStatsProps) => {
  const { t } = useTranslation();

  const total = activities.length;
  const completed = activities.filter(a => a.status === 'completed').length;
  const inProgress = activities.filter(a => a.status === 'in-progress').length;
  const failed = activities.filter(a => a.status === 'failed').length;

  const stats = [
    { title: t('iaActivities.stats.total', 'Total'), value: total, icon: List, color: 'text-gray-500' },
    { title: t('iaActivities.stats.completed', 'Completadas'), value: completed, icon: CheckCircle, color: 'text-green-500' },
    { title: t('iaActivities.stats.inProgress', 'En Progreso'), value: inProgress, icon: Loader, color: 'text-blue-500' },
    { title: t('iaActivities.stats.failed', 'Fallidas'), value: failed, icon: XCircle, color: 'text-red-500' },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map(stat => (
        <Card key={stat.title} className="shadow-soft border-0 rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-dark">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
