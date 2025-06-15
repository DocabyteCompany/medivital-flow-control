
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ActivityCard, type Activity } from '@/components/ia/ActivityCard';
import { activities as allActivities } from '@/data/ia-activities';
import { Phone, FileText, Calendar as CalendarIcon, Bot, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from '@/components/ui/input';

type FilterType = 'all' | Activity['type'];
type StatusFilterType = 'all' | Activity['status'];

const ICONS = {
  call: Phone,
  summary: FileText,
  schedule: CalendarIcon
};

const IaActivities = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<FilterType>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilterType>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredActivities = allActivities
    .filter(activity => filter === 'all' || activity.type === filter)
    .filter(activity => statusFilter === 'all' || activity.status === statusFilter)
    .filter(activity => 
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
  const filterButtons: { label: string; filter: FilterType }[] = [
    { label: t('iaActivities.filters.all', 'Todos'), filter: 'all' },
    { label: t('iaActivities.filters.calls', 'Llamadas'), filter: 'call' },
    { label: t('iaActivities.filters.summaries', 'Resúmenes'), filter: 'summary' },
    { label: t('iaActivities.filters.scheduling', 'Agendamientos'), filter: 'schedule' },
  ];

  const statusOptions = [
    { value: 'all', label: t('iaActivities.statusFilters.all', 'Todos los estados') },
    { value: 'completed', label: t('iaActivities.status.completed', 'Completado') },
    { value: 'in-progress', label: t('iaActivities.status.inProgress', 'En Progreso') },
    { value: 'failed', label: t('iaActivities.status.failed', 'Fallido') },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
          <div className="bg-brand-light p-3 rounded-lg">
              <Bot className="w-6 h-6 text-brand-blue" />
          </div>
          <h1 className="text-2xl font-bold text-brand-dark">{t('sidebar.iaActivities', 'Actividades de la IA')}</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('iaActivities.filters.searchPlaceholder', 'Buscar por título o descripción...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full bg-card rounded-lg border-0 shadow-soft"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex items-center gap-2 p-1 bg-brand-light rounded-lg">
            {filterButtons.map(item => (
              <Button
                key={item.filter}
                size="sm"
                onClick={() => setFilter(item.filter)}
                className={cn(
                  "transition-colors rounded-md font-semibold flex-1 sm:flex-none",
                  filter === item.filter
                    ? 'bg-white text-brand-blue shadow-sm'
                    : 'bg-transparent text-gray-500 hover:bg-white/80'
                )}
              >
                {item.label}
              </Button>
            ))}
          </div>
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as StatusFilterType)}>
            <SelectTrigger className="w-full sm:w-[180px] bg-card rounded-lg border-0 shadow-soft">
              <SelectValue placeholder={t('iaActivities.statusFilters.placeholder', 'Filtrar por estado')} />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
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
