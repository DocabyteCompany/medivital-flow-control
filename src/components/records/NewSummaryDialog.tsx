
import { useState } from 'react';
import { useActivities } from '@/contexts/ActivityContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { doctors } from '@/data/messages';
import { type Patient } from '@/data/patients';
import { useTranslation } from 'react-i18next';
import { FileText } from 'lucide-react';

type NewSummaryDialogProps = {
  patient: Patient;
};

export const NewSummaryDialog = ({ patient }: NewSummaryDialogProps) => {
  const { t } = useTranslation();
  const { addActivity } = useActivities();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!selectedDoctor) return;

    const doctor = doctors.find(d => d.id === selectedDoctor);
    if (!doctor) return;

    addActivity({
      type: 'summary',
      title: `Generar resumen para ${patient.name}`,
      description: `Solicitado por ${doctor.name}. La IA está procesando el expediente del paciente.`,
      details: {
        paciente: patient.name,
        solicitado_por: doctor.name
      }
    });
    setIsOpen(false);
    setSelectedDoctor(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) setSelectedDoctor(null);
    }}>
      <DialogTrigger asChild>
        <Button size="sm">
          <FileText className="mr-2 h-4 w-4" />
          {t('records.generateSummary', 'Generar Resumen')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('records.newSummaryTitle', 'Generar Resumen de Expediente')}</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <p>{t('records.patient', 'Paciente')}: <span className="font-semibold">{patient.name}</span></p>
          <div className="space-y-2">
            <Label htmlFor="doctor-select">{t('records.requestingDoctor', 'Doctor que solicita')}</Label>
            <Select onValueChange={setSelectedDoctor}>
              <SelectTrigger id="doctor-select">
                <SelectValue placeholder={t('records.selectDoctor', 'Seleccionar un doctor')} />
              </SelectTrigger>
              <SelectContent>
                {doctors.map(doc => (
                  <SelectItem key={doc.id} value={doc.id}>{doc.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
             <Button variant="ghost">{t('common.cancel', 'Cancelar')}</Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={!selectedDoctor}>
            {t('records.generate', 'Generar')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
