
import { useState } from 'react';
import { patients, type Patient } from '@/data/patients';
import { NewSummaryDialog } from '@/components/records/NewSummaryDialog';
import { ReferralsSection } from '@/components/records/ReferralsSection';
import { RecordHistorySection } from '@/components/records/RecordHistorySection';
import { useRecordsPermissions } from '@/hooks/useRecordsPermissions';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { ClipboardList, Eye, ShieldAlert } from 'lucide-react';
import { referrals } from '@/data/referrals';

const Records = () => {
  const { t } = useTranslation();
  const { canViewClinicalData, canGenerateSummaries, canViewPatientHistory, isLimitedView } = useRecordsPermissions();
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const getPatientReferralsCount = (patientId: string) => {
    return referrals.filter(ref => ref.patientId === patientId).length;
  };

  const getPendingReferralsCount = (patientId: string) => {
    return referrals.filter(ref => ref.patientId === patientId && ref.status === 'Pending').length;
  };

  return (
    <div className="space-y-6 mt-4">
      <div className="flex items-center gap-3">
        <div className="bg-brand-light p-3 rounded-lg">
          <ClipboardList className="w-6 h-6 text-brand-blue" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-brand-dark">{t('sidebar.records', 'Expedientes')}</h1>
          {isLimitedView() && (
            <div className="flex items-center gap-2 mt-1">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              <p className="text-sm text-amber-600">Vista administrativa limitada - Solo información básica</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="rounded-2xl shadow-soft border-0 bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('records.table.patient', 'Paciente')}</TableHead>
              <TableHead>{t('records.table.dob', 'Fecha de Nacimiento')}</TableHead>
              <TableHead>{t('records.table.gender', 'Género')}</TableHead>
              <TableHead>{t('records.table.lastVisit', 'Última Visita')}</TableHead>
              {canViewClinicalData() && <TableHead>Referidos</TableHead>}
              <TableHead className="text-right">{t('records.table.actions', 'Acciones')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient: Patient) => {
              const referralsCount = getPatientReferralsCount(patient.id);
              const pendingCount = getPendingReferralsCount(patient.id);
              
              return (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.name}</TableCell>
                  <TableCell>{new Date(patient.dob).toLocaleDateString()}</TableCell>
                  <TableCell>{t(`gender.${patient.gender.toLowerCase()}`, patient.gender)}</TableCell>
                  <TableCell>{new Date(patient.lastVisit).toLocaleDateString()}</TableCell>
                  {canViewClinicalData() && (
                    <TableCell>
                      <div className="flex gap-1">
                        {referralsCount > 0 && (
                          <Badge variant="outline" className="text-xs">
                            {referralsCount} referidos
                          </Badge>
                        )}
                        {pendingCount > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            {pendingCount} pendientes
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                  )}
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedPatient(patient)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Ver Expediente
                      </Button>
                      {canGenerateSummaries() && <NewSummaryDialog patient={patient} />}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedPatient} onOpenChange={() => setSelectedPatient(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ClipboardList className="w-5 h-5" />
              Expediente de {selectedPatient?.name}
              {isLimitedView() && (
                <Badge variant="outline" className="text-amber-600 border-amber-300">
                  Vista Limitada
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>
          {selectedPatient && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Fecha de Nacimiento</p>
                  <p className="font-semibold">{new Date(selectedPatient.dob).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Género</p>
                  <p className="font-semibold">{selectedPatient.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Última Visita</p>
                  <p className="font-semibold">{new Date(selectedPatient.lastVisit).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Estado</p>
                  <Badge variant="outline">Activo</Badge>
                </div>
              </div>

              {canViewClinicalData() ? (
                <>
                  <ReferralsSection patient={selectedPatient} />
                  {canViewPatientHistory() && <RecordHistorySection patient={selectedPatient} />}
                </>
              ) : (
                <div className="text-center py-8">
                  <ShieldAlert className="w-12 h-12 mx-auto mb-4 text-amber-500" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Vista Administrativa Limitada</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Como administrador, solo tienes acceso a información básica del paciente. 
                    Para acceder a información clínica, contacta con el personal médico.
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Records;
