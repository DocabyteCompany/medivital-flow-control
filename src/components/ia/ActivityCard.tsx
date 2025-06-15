
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

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
};

export const ActivityCard = ({ activity, icon: Icon }: ActivityCardProps) => {
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
    </Card>
  );
};
