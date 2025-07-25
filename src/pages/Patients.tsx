
import { VitalsCard } from '@/components/VitalsCard';
import { PatientInfo } from '@/components/PatientInfo';
import { Schedule } from '@/components/Schedule';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { PatientsList } from '@/components/patients/PatientsList';
import { PatientStatistics } from '@/components/patients/PatientStatistics';
import { PatientActivity } from '@/components/patients/PatientActivity';
import { PatientSchedule } from '@/components/patients/PatientSchedule';
import { PatientBilling } from '@/components/patients/PatientBilling';
import { PatientAIActions } from '@/components/ai/integrations/PatientAIActions';
import { patients } from '@/data/patients';
import { usePatientPermissions } from '@/hooks/usePatientPermissions';

const vitalsData = {
  heartbeat: Array.from({ length: 20 }, () => ({ uv: Math.floor(Math.random() * 30 + 70) })),
  pressure: Array.from({ length: 20 }, () => ({ uv: Math.floor(Math.random() * 40 + 80) })),
  haemoglobin: Array.from({ length: 20 }, () => ({ uv: Math.random() * 5 + 12 })),
  sugar: Array.from({ length: 20 }, () => ({ uv: Math.floor(Math.random() * 40 + 80) })),
};

const Patients = () => {
  const { t } = useTranslation();
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const { isAdmin } = usePatientPermissions();

  const handleSelectPatient = (patientId: string) => {
    setSelectedPatientId(patientId);
  };

  const handleBackToList = () => {
    setSelectedPatientId(null);
  };

  if (!selectedPatientId) {
    return <PatientsList onSelectPatient={handleSelectPatient} />;
  }

  const selectedPatient = patients.find(p => p.id === selectedPatientId);

  if (!selectedPatient) {
    console.error(`Patient with id ${selectedPatientId} not found.`);
    handleBackToList();
    return null;
  }

  // Determinar si el paciente tiene cita próxima o consulta reciente
  const hasUpcomingAppointment = Math.random() > 0.5; // Simulado
  const hasRecentConsultation = Math.random() > 0.6; // Simulado

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-8 mt-4">
        <PatientInfo patient={selectedPatient} onBack={handleBackToList} />
        <div className="flex-1">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="bg-transparent p-0 border-b-2 border-gray-100 w-full justify-start rounded-none">
              <TabsTrigger value="all" className="data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-brand-blue rounded-none">{t('tabs.all', 'Todos')}</TabsTrigger>
              <TabsTrigger value="statistic" className="data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-brand-blue rounded-none">{t('tabs.statistic', 'Estadísticas')}</TabsTrigger>
              <TabsTrigger value="activity" className="data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-brand-blue rounded-none">{t('tabs.activity', 'Actividad')}</TabsTrigger>
              <TabsTrigger value="schedule" className="data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-brand-blue rounded-none">{t('tabs.schedule', 'Agenda')}</TabsTrigger>
              {isAdmin && (
                <TabsTrigger value="invoice" className="data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-brand-blue rounded-none">{t('tabs.invoice', 'Facturación')}</TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <VitalsCard title={t('vitals.heartbeat')} value="85" unit={t('vitals.bpm')} data={vitalsData.heartbeat} strokeColor="#FF7A9F" fillColor="#FF7A9F" lastVisitDate={selectedPatient.lastVisit} />
                <VitalsCard title={t('vitals.bloodPressure')} value="100" unit="/80 mmHg" data={vitalsData.pressure} strokeColor="#7AC0FF" fillColor="#7AC0FF" lastVisitDate={selectedPatient.lastVisit} />
                <VitalsCard title={t('vitals.haemoglobin')} value="17.5" unit="g/dL" data={vitalsData.haemoglobin} strokeColor="#A87AFF" fillColor="#A87AFF" lastVisitDate={selectedPatient.lastVisit} />
                <VitalsCard title={t('vitals.sugarLevels')} value="100" unit="mg/dL" data={vitalsData.sugar} strokeColor="#FFB87A" fillColor="#FFB87A" lastVisitDate={selectedPatient.lastVisit} />
              </div>
              <div className="mt-8">
                <Schedule patient={selectedPatient} />
              </div>
            </TabsContent>
            
            <TabsContent value="statistic" className="mt-6">
              <PatientStatistics patient={selectedPatient} />
            </TabsContent>
            
            <TabsContent value="activity" className="mt-6">
              <PatientActivity patient={selectedPatient} />
            </TabsContent>
            
            <TabsContent value="schedule" className="mt-6">
              <PatientSchedule patient={selectedPatient} />
            </TabsContent>
            
            {isAdmin && (
              <TabsContent value="invoice" className="mt-6">
                <PatientBilling patient={selectedPatient} />
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>

      {/* Nuevo panel de acciones IA */}
      <PatientAIActions
        patientId={selectedPatient.id}
        patientName={selectedPatient.name}
        hasUpcomingAppointment={hasUpcomingAppointment}
        hasRecentConsultation={hasRecentConsultation}
      />
    </div>
  );
};

export default Patients;
