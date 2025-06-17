
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Edit } from 'lucide-react';
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

interface EditBasicContactDialogProps {
  patient: Patient;
  onSave?: (updatedContact: Partial<Patient>) => void;
}

export const EditBasicContactDialog = ({ patient, onSave }: EditBasicContactDialogProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { canEditBasicContact } = usePatientPermissions();
  
  const [formData, setFormData] = useState({
    phone: patient.phone || '',
    email: patient.email || '',
    address: patient.address || '',
  });

  if (!canEditBasicContact()) {
    return null;
  }

  const handleSave = () => {
    onSave?.(formData);
    setIsOpen(false);
    console.log('Contacto básico actualizado:', formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit className="w-4 h-4 mr-2" />
          {t('patients.editContact', 'Editar Contacto')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('patients.editBasicContact', 'Editar Información de Contacto')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="phone">{t('patients.phone', 'Teléfono')}</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder={t('patients.phonePlaceholder', 'Número de teléfono')}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t('patients.email', 'Email')}</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder={t('patients.emailPlaceholder', 'Correo electrónico')}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">{t('patients.address', 'Dirección')}</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder={t('patients.addressPlaceholder', 'Dirección completa')}
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
