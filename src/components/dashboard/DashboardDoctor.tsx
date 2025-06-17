
import { AIActivitiesWidget } from '@/components/dashboard/AIActivitiesWidget';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RecentChats } from '@/components/dashboard/RecentChats';
import { DoctorPatientsWidget } from '@/components/dashboard/DoctorPatientsWidget';
import { DoctorNextActivities } from '@/components/dashboard/DoctorNextActivities';
import { NewPatientDialog } from '@/components/patients/NewPatientDialog';
import { useTranslation } from 'react-i18next';

export const DashboardDoctor = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-8 mt-4">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-brand-dark">Mi Panel de Control</h1>
        <NewPatientDialog />
      </div>

      {/* Acciones Rápidas específicas para Doctor */}
      <QuickActions />

      {/* Widgets específicos para Doctor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DoctorPatientsWidget />
        <DoctorNextActivities />
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
