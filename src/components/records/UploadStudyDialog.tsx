
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText } from 'lucide-react';
import { addExternalStudy, type ExternalStudy } from '@/data/externalStudies';
import { usePermissions } from '@/hooks/usePermissions';
import { type Patient } from '@/data/patients';

type UploadStudyDialogProps = {
  patient: Patient;
  onStudyUploaded?: () => void;
};

export const UploadStudyDialog = ({ patient, onStudyUploaded }: UploadStudyDialogProps) => {
  const { currentRole } = usePermissions();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    studyType: '',
    title: '',
    laboratory: '',
    date: '',
    notes: '',
    fileName: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newStudy = addExternalStudy({
      patientId: patient.id,
      studyType: formData.studyType as ExternalStudy['studyType'],
      title: formData.title,
      fileUrl: `/placeholder-${formData.studyType.toLowerCase()}.pdf`,
      fileName: formData.fileName,
      laboratory: formData.laboratory,
      date: new Date(formData.date).toISOString(),
      doctorId: '1', // This would come from current user context
      doctorName: currentRole === 'Admin' ? 'Admin' : 'Dr. García',
      notes: formData.notes
    });

    console.log('Nuevo estudio añadido:', newStudy);
    
    // Reset form
    setFormData({
      studyType: '',
      title: '',
      laboratory: '',
      date: '',
      notes: '',
      fileName: ''
    });
    
    setOpen(false);
    onStudyUploaded?.();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        fileName: file.name
      }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2">
          <Upload className="w-4 h-4" />
          Subir Estudio
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Subir Estudio Externo
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="studyType">Tipo de Estudio</Label>
            <Select value={formData.studyType} onValueChange={(value) => setFormData(prev => ({ ...prev, studyType: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Radiología">Radiología</SelectItem>
                <SelectItem value="Laboratorio">Laboratorio</SelectItem>
                <SelectItem value="Cardiología">Cardiología</SelectItem>
                <SelectItem value="Neurología">Neurología</SelectItem>
                <SelectItem value="Otros">Otros</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="title">Título del Estudio</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Ej: Resonancia Magnética Cerebral"
              required
            />
          </div>

          <div>
            <Label htmlFor="laboratory">Laboratorio/Centro</Label>
            <Input
              id="laboratory"
              value={formData.laboratory}
              onChange={(e) => setFormData(prev => ({ ...prev, laboratory: e.target.value }))}
              placeholder="Nombre del laboratorio"
              required
            />
          </div>

          <div>
            <Label htmlFor="date">Fecha del Estudio</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="file">Archivo</Label>
            <Input
              id="file"
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              required
            />
            {formData.fileName && (
              <p className="text-sm text-gray-600 mt-1">Archivo: {formData.fileName}</p>
            )}
          </div>

          <div>
            <Label htmlFor="notes">Notas (Opcional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Observaciones adicionales..."
              rows={3}
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Subir Estudio
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
