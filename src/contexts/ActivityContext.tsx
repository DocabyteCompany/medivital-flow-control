
import { createContext, useState, useContext, ReactNode } from 'react';
import { type Activity } from '@/components/ia/ActivityCard';
import { activities as initialActivities } from '@/data/ia-activities';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';

type ActivityContextType = {
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
  addActivity: (activity: Omit<Activity, 'id' | 'timestamp' | 'status'>) => void;
};

const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

export const ActivityProvider = ({ children }: { children: ReactNode }) => {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const { toast } = useToast();
  const { t } = useTranslation();

  const addActivity = (activityData: Omit<Activity, 'id' | 'timestamp' | 'status'>) => {
    const newActivity: Activity = {
      ...activityData,
      id: String(Date.now()),
      timestamp: t('iaActivities.status.inProgress', 'En Progreso'),
      status: 'in-progress',
    };
    setActivities(prev => [newActivity, ...prev]);
    toast({
        title: t('iaActivities.toast.activityCreatedTitle', 'Actividad Creada'),
        description: t('iaActivities.toast.activityCreatedDescription', `Se ha creado la actividad: "${newActivity.title}"`),
    });
  };

  return (
    <ActivityContext.Provider value={{ activities, setActivities, addActivity }}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivities = () => {
  const context = useContext(ActivityContext);
  if (context === undefined) {
    throw new Error('useActivities must be used within an ActivityProvider');
  }
  return context;
};
