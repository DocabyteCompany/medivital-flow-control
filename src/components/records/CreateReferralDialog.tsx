
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { personnel } from '@/data/personnel';
import { type Patient } from '@/data/patients';
import { UserPlus, Stethoscope } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type CreateReferralDialogProps = {
  patient: Patient;
  fromDoctorId?: string;
};

export const CreateReferralDialog = ({ patient, fromDoctorId = '1' }: CreateReferralDialogProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [specialty, setSpecialty] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [urgency, setUrgency] = useState<string>('Medium');
  const [allowSummaryAccess, setAllowSummaryAccess] = useState(true);

  const availableDoctors = personnel.filter(p => p.id !== fromDoctorId);
  const specialties = [...new Set(personnel.map(p => p.specialty))];

  const handleSubmit = () => {
    if (!selectedDoctor || !specialty || !reason.trim()) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive",
      });
      return;
    }

    const doctor = personnel.find(d => d.id === selectedDoctor);
    
    toast({
      title: "Referido Creado",
      description: `Paciente ${patient.name} referido a ${doctor?.name} (${specialty}).`,
    });

    // Reset form
    setSelectedDoctor('');
    setSpecialty('');
    setReason('');
    setUrgency('Medium');
    setAllowSummaryAccess(true);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="gap-2">
          <UserPlus className="w-4 h-4" />
          Crear Referido
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-brand-blue" />
            Crear Referido Médico
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Paciente</Label>
            <p className="text-sm text-gray-600 font-semibold">{patient.name}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialty">Especialidad *</Label>
            <Select value={specialty} onValueChange={setSpecialty}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar especialidad" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map(spec => (
                  <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="doctor">Doctor Especialista *</Label>
            <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar doctor" />
              </SelectTrigger>
              <SelectContent>
                {availableDoctors
                  .filter(doc => !specialty || doc.specialty === specialty)
                  .map(doc => (
                    <SelectItem key={doc.id} value={doc.id}>
                      {doc.name} - {doc.specialty}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="urgency">Urgencia</Label>
            <Select value={urgency} onValueChange={setUrgency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Baja</SelectItem>
                <SelectItem value="Medium">Media</SelectItem>
                <SelectItem value="High">Alta</SelectItem>
                <SelectItem value="Urgent">Urgente</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Motivo del Referido *</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Describe el motivo de la referencia..."
              className="resize-none"
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="summary-access"
              checked={allowSummaryAccess}
              onCheckedChange={(checked) => setAllowSummaryAccess(checked as boolean)}
            />
            <Label htmlFor="summary-access" className="text-sm">
              Pre-autorizar acceso a resumen del expediente
            </Label>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleSubmit}>
            Crear Referido
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
