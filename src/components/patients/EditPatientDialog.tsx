
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Patient } from '@/data/patients';
import { usePatientPermissions } from '@/hooks/usePatientPermissions';
import { useToast } from '@/hooks/use-toast';

interface EditPatientDialogProps {
  patient: Patient;
  onSave?: (updatedPatient: Partial<Patient>) => void;
}

export const EditPatientDialog = ({ patient, onSave }: EditPatientDialogProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin } = usePatientPermissions();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: patient.name,
    dob: patient.dob,
    gender: patient.gender,
    bloodType: patient.bloodType,
    height: patient.height.toString(),
    weight: patient.weight.toString(),
    occupation: patient.occupation,
    status: patient.status,
    phone: patient.phone || '',
    email: patient.email || '',
    address: patient.address || '',
  });

  if (!isAdmin) {
    return null;
  }

  const handleSave = () => {
    const updatedPatient = {
      ...formData,
      height: parseFloat(formData.height),
      weight: parseFloat(formData.weight),
    };
    
    onSave?.(updatedPatient);
    setIsOpen(false);
    
    toast({
      title: "Paciente actualizado",
      description: `La información de ${patient.name} ha sido actualizada correctamente.`,
    });
    
    console.log('Paciente actualizado:', updatedPatient);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Paciente - {patient.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {/* Información Personal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-brand-dark">Información Personal</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nombre completo"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Fecha de Nacimiento</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender">Género</Label>
                <Select value={formData.gender} onValueChange={(value: 'Masculino' | 'Femenino') => setFormData({ ...formData, gender: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Masculino">Masculino</SelectItem>
                    <SelectItem value="Femenino">Femenino</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="occupation">Ocupación</Label>
                <Input
                  id="occupation"
                  value={formData.occupation}
                  onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                  placeholder="Ocupación"
                />
              </div>
            </div>
          </div>

          {/* Información Médica */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-brand-dark">Información Médica</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bloodType">Tipo de Sangre</Label>
                <Select value={formData.bloodType} onValueChange={(value) => setFormData({ ...formData, bloodType: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Altura (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  placeholder="175"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Peso (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  placeholder="70"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Estado</Label>
              <Select value={formData.status} onValueChange={(value: 'Saludable' | 'En tratamiento' | 'Crítico') => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Saludable">Saludable</SelectItem>
                  <SelectItem value="En tratamiento">En tratamiento</SelectItem>
                  <SelectItem value="Crítico">Crítico</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Información de Contacto */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-brand-dark">Información de Contacto</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+34 612 345 678"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="paciente@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Calle Mayor 15, Madrid"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Guardar Cambios
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
