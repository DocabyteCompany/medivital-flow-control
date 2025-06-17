
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Download, Calendar, Building2 } from 'lucide-react';
import { getStudiesByPatient, type ExternalStudy } from '@/data/externalStudies';
import { type Patient } from '@/data/patients';
import { UploadStudyDialog } from './UploadStudyDialog';
import { useRecordsPermissions } from '@/hooks/useRecordsPermissions';

type ExternalStudiesSectionProps = {
  patient: Patient;
};

export const ExternalStudiesSection = ({ patient }: ExternalStudiesSectionProps) => {
  const { canViewClinicalData } = useRecordsPermissions();
  const studies = getStudiesByPatient(patient.id);

  const getStudyTypeColor = (type: ExternalStudy['studyType']) => {
    switch (type) {
      case 'Radiología': return 'bg-blue-100 text-blue-800';
      case 'Laboratorio': return 'bg-green-100 text-green-800';
      case 'Cardiología': return 'bg-red-100 text-red-800';
      case 'Neurología': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!canViewClinicalData()) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Estudios y Análisis Externos
            {studies.length > 0 && (
              <Badge variant="outline">{studies.length}</Badge>
            )}
          </div>
          <UploadStudyDialog patient={patient} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        {studies.length > 0 ? (
          <div className="space-y-4">
            {studies.map((study) => (
              <div key={study.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getStudyTypeColor(study.studyType)}>
                        {study.studyType}
                      </Badge>
                      <h4 className="font-semibold">{study.title}</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        <span>{study.laboratory}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(study.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    {study.notes && (
                      <p className="text-sm text-gray-700 mt-2 italic">"{study.notes}"</p>
                    )}
                    
                    <div className="text-xs text-gray-500 mt-2">
                      Subido por: {study.doctorName} • {new Date(study.uploadedAt).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="ml-4">
                    <Download className="w-4 h-4 mr-2" />
                    Descargar
                  </Button>
                </div>
                
                <div className="bg-gray-50 p-2 rounded text-xs text-gray-600">
                  <FileText className="w-3 h-3 inline mr-1" />
                  {study.fileName}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            <FileText className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm">No hay estudios externos cargados</p>
            <p className="text-xs text-gray-400 mt-1">
              Los estudios de laboratorios externos aparecerán aquí
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
