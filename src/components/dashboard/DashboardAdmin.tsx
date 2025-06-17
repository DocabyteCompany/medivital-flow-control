
import { AIActivitiesWidget } from '@/components/dashboard/AIActivitiesWidget';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RecentChats } from '@/components/dashboard/RecentChats';
import { AdminStatsWidget } from '@/components/dashboard/AdminStatsWidget';
import { AdminRemindersWidget } from '@/components/dashboard/AdminRemindersWidget';
import { AdminUserManagement } from '@/components/dashboard/AdminUserManagement';
import { NewPatientDialog } from '@/components/patients/NewPatientDialog';
import { useTranslation } from 'react-i18next';

export const DashboardAdmin = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-8 mt-4">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-brand-dark">Panel Administrativo</h1>
        <NewPatientDialog />
      </div>

      {/* Acciones Rápidas específicas para Admin */}
      <QuickActions />

      {/* Widgets específicos para Admin */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AdminStatsWidget />
        <AdminRemindersWidget />
        <AdminUserManagement />
      </div>

      {/* Fila inferior - Actividades IA y Chats Recientes */}
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
