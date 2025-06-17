
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Patient } from '@/data/patients';
import { usePatientPermissions } from '@/hooks/usePatientPermissions';

interface EditVitalsDialogProps {
  patient: Patient;
  onSave?: (updatedVitals: any) => void;
}

export const EditVitalsDialog = ({ patient, onSave }: EditVitalsDialogProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { canEditVitals } = usePatientPermissions();
  
  const [formData, setFormData] = useState({
    heartRate: '85',
    bloodPressure: '120/80',
    temperature: '36.5',
    weight: patient.weight?.toString() || '',
    height: patient.height?.toString() || '',
  });

  if (!canEditVitals()) {
    return null;
  }

  const handleSave = () => {
    onSave?.(formData);
    setIsOpen(false);
    console.log('Signos vitales actualizados:', formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Activity className="w-4 h-4 mr-2" />
          {t('patients.editVitals', 'Editar Signos Vitales')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('patients.editVitalsTitle', 'Editar Signos Vitales')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="heartRate">{t('vitals.heartRate', 'Frecuencia Cardíaca')}</Label>
              <Input
                id="heartRate"
                value={formData.heartRate}
                onChange={(e) => setFormData({ ...formData, heartRate: e.target.value })}
                placeholder="85 bpm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bloodPressure">{t('vitals.bloodPressure', 'Presión Arterial')}</Label>
              <Input
                id="bloodPressure"
                value={formData.bloodPressure}
                onChange={(e) => setFormData({ ...formData, bloodPressure: e.target.value })}
                placeholder="120/80 mmHg"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="temperature">{t('vitals.temperature', 'Temperatura')}</Label>
              <Input
                id="temperature"
                value={formData.temperature}
                onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                placeholder="36.5°C"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">{t('patientInfo.weight', 'Peso')}</Label>
              <Input
                id="weight"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                placeholder="70 kg"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">{t('patientInfo.height', 'Altura')}</Label>
            <Input
              id="height"
              value={formData.height}
              onChange={(e) => setFormData({ ...formData, height: e.target.value })}
              placeholder="175 cm"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            {t('common.cancel', 'Cancelar')}
          </Button>
          <Button onClick={handleSave}>
            {t('common.save', 'Guardar')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
