
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { UserPlus, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NewPatientForm } from './NewPatientForm';
import { usePatientPermissions } from '@/hooks/usePatientPermissions';
import { toast } from 'sonner';

export const NewPatientDialog = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { canCreatePatient } = usePatientPermissions();

  // Both admins and doctors can now create patients
  if (!canCreatePatient()) {
    return null;
  }

  const handlePatientCreated = (patientId: string) => {
    setIsOpen(false);
    
    // Show success message with options
    toast.success('Paciente creado exitosamente', {
      description: 'El expediente médico ha sido generado automáticamente',
      action: {
        label: 'Ver Expediente',
        onClick: () => navigate(`/expedientes?patient=${patientId}`),
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-brand-blue hover:bg-brand-blue/90">
          <UserPlus className="mr-2 h-4 w-4" />
          {t('dashboard.newPatient.button', 'Añadir Paciente')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {t('dashboard.newPatient.title', 'Crear nuevo paciente y expediente')}
          </DialogTitle>
        </DialogHeader>
        <NewPatientForm onSuccess={handlePatientCreated} />
      </DialogContent>
    </Dialog>
  );
};
