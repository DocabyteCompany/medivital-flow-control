
import { useActivities } from '@/contexts/ActivityContext';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ActivityIcon } from '@/components/ia/ActivityIcon';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';

export const AIActivitiesWidget = () => {
  const { activities } = useActivities();
  const { t } = useTranslation();
  const recentActivities = activities.slice(0, 4);

  const statusMap = {
    completed: t('iaActivities.status.completed', 'Completado'),
    'in-progress': t('iaActivities.status.inProgress', 'En Progreso'),
    failed: t('iaActivities.status.failed', 'Fallido'),
  };

  const getStatusClasses = (status: 'completed' | 'in-progress' | 'failed') => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  return (
    <Card className="shadow-soft border-0 rounded-2xl h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t('dashboard.aiActivities.title', 'Actividad Reciente de IA')}</CardTitle>
        <Button asChild variant="link" className="text-brand-blue font-semibold p-0 h-auto">
          <Link to="/ia-activities">{t('dashboard.aiActivities.viewAll', 'Ver todo')}</Link>
        </Button>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-4">
          {recentActivities.map(activity => (
            <div key={activity.id} className="flex items-center gap-4">
              <div className="bg-brand-light p-2 rounded-lg">
                <ActivityIcon type={activity.type} className="w-5 h-5 text-brand-blue" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="font-semibold text-sm text-brand-dark truncate">{activity.title}</p>
                <p className="text-xs text-gray-500 truncate">{activity.description}</p>
              </div>
              <Badge variant="outline" className={cn("capitalize font-semibold px-2.5 py-1 text-xs", getStatusClasses(activity.status))}>
                {statusMap[activity.status]}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
