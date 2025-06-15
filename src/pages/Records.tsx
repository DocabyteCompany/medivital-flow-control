
import { patients, type Patient } from '@/data/patients';
import { NewSummaryDialog } from '@/components/records/NewSummaryDialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslation } from 'react-i18next';
import { ClipboardList } from 'lucide-react';

const Records = () => {
  const { t } = useTranslation();

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
              <TableHead className="text-right">{t('records.table.actions', 'Acciones')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient: Patient) => (
              <TableRow key={patient.id}>
                <TableCell className="font-medium">{patient.name}</TableCell>
                <TableCell>{new Date(patient.dob).toLocaleDateString()}</TableCell>
                <TableCell>{t(`gender.${patient.gender.toLowerCase()}`, patient.gender)}</TableCell>
                <TableCell>{new Date(patient.lastVisit).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <NewSummaryDialog patient={patient} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default Records;
