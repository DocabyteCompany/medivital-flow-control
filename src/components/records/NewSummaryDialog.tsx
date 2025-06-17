
import { useState } from 'react';
import { useActivities } from '@/contexts/ActivityContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from '@/components/ui/label';
import { personnel } from '@/data/personnel';
import { type Patient } from '@/data/patients';
import { useTranslation } from 'react-i18next';
import { FileText, Check, ChevronsUpDown, User } from 'lucide-react';
import { cn } from '@/lib/utils';

type NewSummaryDialogProps = {
  patient: Patient;
  currentDoctorId?: string;
};

export const NewSummaryDialog = ({ patient, currentDoctorId = '1' }: NewSummaryDialogProps) => {
  const { t } = useTranslation();
  const { addActivity } = useActivities();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [comboboxOpen, setComboboxOpen] = useState(false);

  const currentDoctor = personnel.find(p => p.id === currentDoctorId);
  const doctorOptions = [
    ...(currentDoctor ? [{
      id: 'self',
      name: `Para mí mismo (${currentDoctor.name})`,
      specialty: currentDoctor.specialty,
      isSelf: true
    }] : []),
    ...personnel.filter(d => d.id !== currentDoctorId).map(d => ({
      id: d.id,
      name: d.name,
      specialty: d.specialty,
      isSelf: false
    }))
  ];

  const handleSubmit = () => {
    if (!selectedDoctor) return;

    const selectedOption = doctorOptions.find(d => d.id === selectedDoctor);
    if (!selectedOption) return;

    const doctorName = selectedOption.isSelf ? currentDoctor?.name || 'Doctor actual' : selectedOption.name;
    const isSelfSummary = selectedOption.isSelf;

    addActivity({
      type: 'summary',
      title: `Generar resumen para ${patient.name}`,
      description: `${isSelfSummary ? 'Auto-solicitado' : `Solicitado por ${doctorName}`}. La IA está procesando el expediente del paciente.`,
      details: {
        paciente: patient.name,
        solicitado_por: doctorName,
        tipo: isSelfSummary ? 'Revisión personal' : 'Interconsulta'
      }
    });
    
    setIsOpen(false);
    setSelectedDoctor(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) {
        setSelectedDoctor(null);
        setComboboxOpen(false);
      }
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
            <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={comboboxOpen}
                  className="w-full justify-between"
                >
                  {selectedDoctor
                    ? doctorOptions.find(doc => doc.id === selectedDoctor)?.name
                    : "Seleccionar doctor..."
                  }
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Buscar doctor..." />
                  <CommandList>
                    <CommandEmpty>No se encontró ningún doctor.</CommandEmpty>
                    <CommandGroup>
                      {doctorOptions.map((doc) => (
                        <CommandItem
                          key={doc.id}
                          value={doc.name}
                          onSelect={() => {
                            setSelectedDoctor(doc.id);
                            setComboboxOpen(false);
                          }}
                        >
                          <div className="flex items-center gap-2 flex-1">
                            {doc.isSelf && <User className="h-4 w-4 text-blue-500" />}
                            <div>
                              <p className="font-medium">{doc.name}</p>
                              <p className="text-xs text-gray-500">{doc.specialty}</p>
                            </div>
                          </div>
                          <Check
                            className={cn(
                              "ml-auto h-4 w-4",
                              selectedDoctor === doc.id ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
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
