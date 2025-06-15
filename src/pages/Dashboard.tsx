
import { AIActivitiesWidget } from '@/components/dashboard/AIActivitiesWidget';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RecentChats } from '@/components/dashboard/RecentChats';
import { NewPatientDialog } from '@/components/patients/NewPatientDialog';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-8 mt-4">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-brand-dark">{t('dashboard.title', 'Panel de Control')}</h1>
          <NewPatientDialog />
      </div>
      <div>
        <QuickActions />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <AIActivitiesWidget />
        </div>
        <div>
          <RecentChats />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
