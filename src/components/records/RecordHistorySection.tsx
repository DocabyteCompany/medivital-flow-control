
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, Activity } from 'lucide-react';
import { getPatientHistory, type RecordHistoryEntry } from '@/data/recordHistory';
import { type Patient } from '@/data/patients';

type RecordHistorySectionProps = {
  patient: Patient;
};

export const RecordHistorySection = ({ patient }: RecordHistorySectionProps) => {
  const history = getPatientHistory(patient.id);

  const getActionColor = (action: RecordHistoryEntry['action']) => {
    switch (action) {
      case 'referral_created': return 'bg-blue-100 text-blue-800';
      case 'referral_accepted': return 'bg-green-100 text-green-800';
      case 'referral_cancelled': return 'bg-red-100 text-red-800';
      case 'referral_transferred': return 'bg-purple-100 text-purple-800';
      case 'summary_generated': return 'bg-orange-100 text-orange-800';
      case 'notes_added': return 'bg-gray-100 text-gray-800';
      case 'vitals_updated': return 'bg-cyan-100 text-cyan-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionLabel = (action: RecordHistoryEntry['action']) => {
    switch (action) {
      case 'referral_created': return 'Referido Creado';
      case 'referral_accepted': return 'Referido Aceptado';
      case 'referral_cancelled': return 'Referido Cancelado';
      case 'referral_transferred': return 'Referido Transferido';
      case 'summary_generated': return 'Resumen Generado';
      case 'notes_added': return 'Notas Añadidas';
      case 'vitals_updated': return 'Signos Vitales';
      default: return action;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Historial de Cambios
          {history.length > 0 && (
            <Badge variant="outline">{history.length}</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {history.length > 0 ? (
          <div className="space-y-4">
            {history.map((entry) => (
              <div key={entry.id} className="flex items-start gap-3 p-3 border rounded-lg">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${entry.performedBy}`} />
                  <AvatarFallback className="text-xs">
                    {entry.performedByName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge className={getActionColor(entry.action)}>
                      {getActionLabel(entry.action)}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {new Date(entry.timestamp).toLocaleString()}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700">{entry.description}</p>
                  <p className="text-xs text-gray-500">Por: {entry.performedByName}</p>
                  
                  {entry.details && Object.keys(entry.details).length > 0 && (
                    <div className="text-xs text-gray-400 bg-gray-50 p-2 rounded mt-2">
                      {Object.entries(entry.details).map(([key, value]) => (
                        <span key={key} className="mr-3">
                          <strong>{key}:</strong> {String(value)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            <Activity className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm">No hay cambios registrados para este paciente</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
