
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ActivityCard, type Activity } from '@/components/ia/ActivityCard';
import { activities as allActivities } from '@/data/ia-activities';
import { Phone, FileText, Calendar as CalendarIcon, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

type FilterType = 'all' | Activity['type'];

const ICONS = {
  call: Phone,
  summary: FileText,
  schedule: CalendarIcon
};

const IaActivities = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredActivities = filter === 'all'
    ? allActivities
    : allActivities.filter(activity => activity.type === filter);
  
  const filterButtons: { label: string; filter: FilterType }[] = [
    { label: t('iaActivities.filters.all', 'Todos'), filter: 'all' },
    { label: t('iaActivities.filters.calls', 'Llamadas'), filter: 'call' },
    { label: t('iaActivities.filters.summaries', 'Resúmenes'), filter: 'summary' },
    { label: t('iaActivities.filters.scheduling', 'Agendamientos'), filter: 'schedule' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
            <div className="bg-brand-light p-3 rounded-lg">
                <Bot className="w-6 h-6 text-brand-blue" />
            </div>
            <h1 className="text-2xl font-bold text-brand-dark">{t('sidebar.iaActivities', 'Actividades de la IA')}</h1>
        </div>
        <div className="flex items-center gap-2 p-1 bg-brand-light rounded-lg">
          {filterButtons.map(item => (
            <Button
              key={item.filter}
              size="sm"
              onClick={() => setFilter(item.filter)}
              className={cn(
                "transition-colors rounded-md font-semibold",
                filter === item.filter
                  ? 'bg-white text-brand-blue shadow-sm'
                  : 'bg-transparent text-gray-500 hover:bg-white/80'
              )}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>
      
      {filteredActivities.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredActivities.map(activity => (
            <ActivityCard key={activity.id} activity={activity} icon={ICONS[activity.type]} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-500">
          <p>{t('iaActivities.noActivities', 'No hay actividades para mostrar con este filtro.')}</p>
        </div>
      )}
    </div>
  );
};
export default IaActivities;
