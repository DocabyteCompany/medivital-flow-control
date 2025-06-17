
import { useState } from 'react';
import { patients, type Patient } from '@/data/patients';
import { NewSummaryDialog } from '@/components/records/NewSummaryDialog';
import { ReferralsSection } from '@/components/records/ReferralsSection';
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
import { ClipboardList, Eye, UserPlus } from 'lucide-react';
import { referrals } from '@/data/referrals';

const Records = () => {
  const { t } = useTranslation();
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
        <h1 className="text-2xl font-bold text-brand-dark">{t('sidebar.records', 'Expedientes')}</h1>
      </div>
      
      <div className="rounded-2xl shadow-soft border-0 bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('records.table.patient', 'Paciente')}</TableHead>
              <TableHead>{t('records.table.dob', 'Fecha de Nacimiento')}</TableHead>
              <TableHead>{t('records.table.gender', 'Género')}</TableHead>
              <TableHead>{t('records.table.lastVisit', 'Última Visita')}</TableHead>
              <TableHead>Referidos</TableHead>
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
                      <NewSummaryDialog patient={patient} />
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

              <ReferralsSection patient={selectedPatient} />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Records;
