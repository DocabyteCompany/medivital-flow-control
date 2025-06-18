
import { ChevronLeft, CheckCircle, FileText } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from 'react-i18next';
import { Patient } from '@/data/patients';
import { cn } from '@/lib/utils';
import { EditBasicContactDialog } from './patients/EditBasicContactDialog';
import { EditVitalsDialog } from './patients/EditVitalsDialog';
import { PatientHistoryDialog } from './patients/PatientHistoryDialog';
import { usePatientPermissions } from '@/hooks/usePatientPermissions';

const responsibleDoctors = [
  "https://i.pravatar.cc/150?img=1",
  "https://i.pravatar.cc/150?img=2",
  "https://i.pravatar.cc/150?img=3",
  "https://i.pravatar.cc/150?img=4",
];

const getAge = (dob: string) => {
  if (!dob) return 0;
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

interface PatientInfoProps {
  patient: Patient;
  onBack: () => void;
}

export const PatientInfo = ({ patient, onBack }: PatientInfoProps) => {
  const { t } = useTranslation();
  const age = getAge(patient.dob);
  const { 
    canEditBasicContact, 
    canEditVitals, 
    canEditPatientDemographics, 
    isAdmin, 
    isDoctor 
  } = usePatientPermissions();

  const getStatusInfo = (status: Patient['status']) => {
    switch (status) {
      case 'Saludable':
        return { text: t('patientInfo.healthy', 'Saludable'), className: 'bg-green-100 text-status-green' };
      case 'En tratamiento':
        return { text: t('patientInfo.inTreatment', 'En tratamiento'), className: 'bg-yellow-100 text-yellow-800' };
      case 'Crítico':
        return { text: t('patientInfo.critical', 'Crítico'), className: 'bg-red-100 text-red-800' };
      default:
        return { text: '', className: '' };
    }
  };

  const statusInfo = getStatusInfo(patient.status);
  
  return (
    <Card className="shadow-soft border-0 rounded-2xl w-full lg:w-80 flex-shrink-0">
      <CardContent className="p-6">
        <button onClick={onBack} className="flex items-center text-sm text-gray-500 hover:text-brand-blue mb-4">
          <ChevronLeft className="w-4 h-4 mr-1" />
          {t('patientInfo.allPatients', 'Todos los pacientes')}
        </button>
  
        <div className="flex flex-col items-center text-center">
          <Avatar className="w-20 h-20 mb-3">
            <AvatarImage src={`https://i.pravatar.cc/150?u=${patient.id}`} alt={patient.name} />
            <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold text-brand-dark">{patient.name}</h2>
          <p className="text-sm text-gray-400">ID: {patient.patientId}</p>
          <p className="text-sm text-gray-400">{t('patientInfo.yearsOldOccupation', '{{age}} años, {{occupation}}', { age, occupation: patient.occupation })}</p>
          <div className={cn("flex items-center text-xs font-medium px-3 py-1 rounded-full mt-2", statusInfo.className)}>
            <CheckCircle className="w-3 h-3 mr-1" />
            {statusInfo.text}
          </div>
        </div>

        {/* Opciones de edición según el rol */}
        {(canEditBasicContact() || canEditVitals()) && (
          <div className="flex flex-col gap-2 my-4">
            {canEditBasicContact() && (
              <EditBasicContactDialog patient={patient} />
            )}
            {canEditVitals() && (
              <EditVitalsDialog patient={patient} />
            )}
          </div>
        )}
  
        <div className="grid grid-cols-3 gap-4 text-center my-6">
          <div>
            <p className="text-xs text-gray-400">{t('patientInfo.blood', 'Sangre')}</p>
            <p className="font-bold text-brand-dark">{patient.bloodType}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">{t('patientInfo.height', 'Altura')}</p>
            <p className="font-bold text-brand-dark">{patient.height}<span className="font-normal text-sm">cm</span></p>
          </div>
          <div>
            <p className="text-xs text-gray-400">{t('patientInfo.weight', 'Peso')}</p>
            <p className="font-bold text-brand-dark">{patient.weight}<span className="font-normal text-sm">kg</span></p>
          </div>
        </div>
  
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{t('patientInfo.responsibleDoctors', 'Doctores Responsables')}</h3>
          <div className="flex -space-x-2">
            {responsibleDoctors.map((src, index) => (
              <Avatar key={index} className="w-8 h-8 border-2 border-white">
                <AvatarImage src={src} />
                <AvatarFallback>{index}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{t('patientInfo.patientHistory', 'Historial del Paciente')}</h3>
          <PatientHistoryDialog patient={patient}>
            <button className="flex items-center w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <FileText className="w-5 h-5 mr-3 text-pink-400"/>
              <div>
                <p className="text-sm font-semibold text-brand-dark">{patient.name}</p>
                <p className="text-xs text-gray-400">{t('patientInfo.historyFile', 'Ver historial médico')}</p>
              </div>
            </button>
          </PatientHistoryDialog>
        </div>
  
      </CardContent>
    </Card>
  );
}
