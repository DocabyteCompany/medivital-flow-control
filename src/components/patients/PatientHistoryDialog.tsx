
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Calendar, User } from 'lucide-react';
import { Patient } from '@/data/patients';

interface PatientDocument {
  id: string;
  title: string;
  type: 'Historia Clínica' | 'Examen' | 'Receta' | 'Informe';
  date: string;
  doctor: string;
  size: string;
}

// Mock data para documentos del historial
const getPatientDocuments = (patientId: string): PatientDocument[] => {
  // En una aplicación real, esto vendría de una API
  return [
    {
      id: '1',
      title: 'Historia Clínica Inicial',
      type: 'Historia Clínica',
      date: '2024-01-15',
      doctor: 'Dr. García Martínez',
      size: '2.1 MB'
    },
    {
      id: '2',
      title: 'Examen de Laboratorio - Hemograma',
      type: 'Examen',
      date: '2024-03-10',
      doctor: 'Dra. López Hernández',
      size: '1.5 MB'
    },
    {
      id: '3',
      title: 'Receta Médica - Marzo 2024',
      type: 'Receta',
      date: '2024-03-12',
      doctor: 'Dr. García Martínez',
      size: '0.8 MB'
    },
    {
      id: '4',
      title: 'Informe de Consulta Especializada',
      type: 'Informe',
      date: '2024-05-20',
      doctor: 'Dr. Rodríguez Silva',
      size: '1.2 MB'
    }
  ];
};

const getDocumentTypeColor = (type: string) => {
  switch (type) {
    case 'Historia Clínica': return 'bg-blue-100 text-blue-800';
    case 'Examen': return 'bg-green-100 text-green-800';
    case 'Receta': return 'bg-purple-100 text-purple-800';
    case 'Informe': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

interface PatientHistoryDialogProps {
  patient: Patient;
  children: React.ReactNode;
}

export const PatientHistoryDialog = ({ patient, children }: PatientHistoryDialogProps) => {
  const documents = getPatientDocuments(patient.id);

  const handleDownload = (document: PatientDocument) => {
    // Simular descarga de PDF
    console.log(`Descargando: ${document.title}`);
    // En una aplicación real, aquí se haría la descarga del archivo
    alert(`Descargando: ${document.title}`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Historial de {patient.name}
            <Badge variant="outline" className="ml-2">
              ID: {patient.patientId}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">Paciente</p>
              <p className="font-semibold">{patient.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">ID del Paciente</p>
              <p className="font-semibold">{patient.patientId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total de Documentos</p>
              <p className="font-semibold">{documents.length} archivos</p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Documentos del Historial</h3>
            {documents.length > 0 ? (
              documents.map((document) => (
                <Card key={document.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-3">
                        <FileText className="w-8 h-8 text-red-500 mt-1" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-brand-dark">{document.title}</h4>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(document.date).toLocaleDateString('es-MX')}
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {document.doctor}
                            </div>
                            <span>{document.size}</span>
                          </div>
                          <Badge className={`mt-2 ${getDocumentTypeColor(document.type)}`}>
                            {document.type}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(document)}
                        className="flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Descargar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay documentos</h3>
                <p className="text-gray-500">
                  No se han encontrado documentos en el historial de este paciente.
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
