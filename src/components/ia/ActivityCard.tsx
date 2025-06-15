
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "../ui/button";
import { ChevronsUpDown } from "lucide-react";

export type Activity = {
  id: string;
  type: 'call' | 'summary' | 'schedule';
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'in-progress' | 'failed';
  details?: Record<string, any>;
};

type ActivityCardProps = {
  activity: Activity;
  icon: LucideIcon;
  onUpdateStatus: (id: string, status: Activity['status']) => void;
};

export const ActivityCard = ({ activity, icon: Icon, onUpdateStatus }: ActivityCardProps) => {
  const { t } = useTranslation();

  const getStatusClasses = (status: Activity['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const statusMap = {
    completed: t('iaActivities.status.completed', 'Completado'),
    'in-progress': t('iaActivities.status.inProgress', 'En Progreso'),
    failed: t('iaActivities.status.failed', 'Fallido'),
  };

  const formatDetailKey = (key: string) => {
    const translatedKey = t(`iaActivities.details.${key}`, key.replace(/_/g, ' '));
    return translatedKey.charAt(0).toUpperCase() + translatedKey.slice(1);
  }

  const hasDetails = activity.details && Object.keys(activity.details).length > 0;
  const hasActions = activity.status === 'failed' || activity.status === 'in-progress';

  return (
    <Card className="shadow-soft border-0 rounded-2xl flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-brand-light p-3 rounded-lg flex-shrink-0">
              <Icon className="w-6 h-6 text-brand-blue" />
            </div>
            <div className="flex-grow">
              <CardTitle className="text-base font-semibold text-brand-dark">{activity.title}</CardTitle>
              <CardDescription className="text-xs">{activity.timestamp}</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className={cn("capitalize font-semibold px-2.5 py-1 text-xs", getStatusClasses(activity.status))}>
            {statusMap[activity.status]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600">{activity.description}</p>
      </CardContent>
      {(hasDetails || hasActions) && (
        <CardFooter className="pt-0 px-6 pb-4 flex flex-col items-start">
          {hasDetails && (
            <Collapsible className="w-full">
              <CollapsibleTrigger asChild>
                <Button variant="link" className="p-0 h-auto font-semibold text-brand-blue flex items-center gap-1.5 group">
                  {t('iaActivities.viewDetails', 'Ver detalles')}
                  <ChevronsUpDown className="h-4 w-4 text-brand-blue transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4 text-sm w-full">
                <div className="space-y-3 rounded-lg bg-gray-50 p-4 border border-gray-200">
                  {Object.entries(activity.details!).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-start gap-4">
                      <span className="font-medium text-gray-500 text-xs flex-shrink-0">{formatDetailKey(key)}</span>
                      <span className="text-gray-800 text-right font-medium text-xs">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}
          {hasActions && (
            <div className={cn("flex gap-2 w-full", hasDetails ? "mt-4 pt-4 border-t" : "mt-2")}>
              {activity.status === 'failed' && (
                <Button size="sm" variant="outline" onClick={() => onUpdateStatus(activity.id, 'in-progress')}>
                  <p>{t('iaActivities.actions.retry', 'Reintentar')}</p>
                </Button>
              )}
              {activity.status === 'in-progress' && (
                <>
                  <Button size="sm" variant="outline" onClick={() => onUpdateStatus(activity.id, 'completed')}>
                    {t('iaActivities.actions.complete', 'Marcar completada')}
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => onUpdateStatus(activity.id, 'failed')}>
                    {t('iaActivities.actions.cancel', 'Cancelar')}
                  </Button>
                </>
              )}
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  );
};
