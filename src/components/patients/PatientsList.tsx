
import { useTranslation } from 'react-i18next';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { patients } from '@/data/patients';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Edit } from 'lucide-react';
import { NewPatientDialog } from './NewPatientDialog';
import { EditBasicContactDialog } from './EditBasicContactDialog';
import { EditVitalsDialog } from './EditVitalsDialog';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { usePatientPermissions } from '@/hooks/usePatientPermissions';

const getAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

const getStatusBadgeClass = (status: 'Saludable' | 'En tratamiento' | 'Crítico') => {
    switch (status) {
        case 'Saludable':
            return 'bg-green-100 text-status-green';
        case 'En tratamiento':
            return 'bg-yellow-100 text-yellow-800';
        case 'Crítico':
            return 'bg-red-100 text-red-800';
    }
};

interface PatientsListProps {
    onSelectPatient: (patientId: string) => void;
}

export const PatientsList = ({ onSelectPatient }: PatientsListProps) => {
    const { t } = useTranslation();
    const { 
        canEditPatientDemographics, 
        canEditBasicContact, 
        canEditVitals, 
        isAdmin, 
        isDoctor 
    } = usePatientPermissions();

    return (
        <div className="space-y-6 mt-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="bg-brand-light p-3 rounded-lg">
                        <Users className="w-6 h-6 text-brand-blue" />
                    </div>
                    <h1 className="text-2xl font-bold text-brand-dark">{t('sidebar.patients', 'Pacientes')}</h1>
                </div>
                <NewPatientDialog />
            </div>

            <div className="bg-card p-6 rounded-2xl shadow-soft border-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t('patients.list.name', 'Nombre')}</TableHead>
                            <TableHead className="hidden md:table-cell">{t('patients.list.age', 'Edad')}</TableHead>
                            <TableHead className="hidden lg:table-cell">{t('patients.list.gender', 'Género')}</TableHead>
                            <TableHead className="hidden sm:table-cell">{t('patients.list.status', 'Estado')}</TableHead>
                            <TableHead className="text-right">{t('patients.list.actions', 'Acciones')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {patients.map((patient) => (
                            <TableRow key={patient.id} className="hover:bg-brand-light/50 cursor-pointer" onClick={() => onSelectPatient(patient.id)}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="w-10 h-10">
                                            <AvatarImage src={`https://i.pravatar.cc/150?u=${patient.id}`} alt={patient.name} />
                                            <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium text-brand-dark">{patient.name}</div>
                                            <div className="text-sm text-gray-500">{t('patients.list.lastVisit', 'Última visita')}: {new Date(patient.lastVisit).toLocaleDateString()}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">{getAge(patient.dob)}</TableCell>
                                <TableCell className="hidden lg:table-cell">{patient.gender}</TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    <Badge className={cn('border-none font-medium', getStatusBadgeClass(patient.status))}>
                                        {patient.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex gap-2 justify-end">
                                        <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); onSelectPatient(patient.id); }}>
                                            {t('patients.list.viewDetails', 'Ver Detalles')}
                                        </Button>
                                        
                                        {/* Opciones para Administradores - Edición completa */}
                                        {isAdmin && (
                                            <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); console.log('Editar paciente completo:', patient.id); }}>
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                        )}
                                        
                                        {/* Opciones para Doctores - Solo contacto básico y signos vitales */}
                                        {isDoctor && !isAdmin && (
                                            <>
                                                <div onClick={(e) => e.stopPropagation()}>
                                                    <EditBasicContactDialog patient={patient} />
                                                </div>
                                                <div onClick={(e) => e.stopPropagation()}>
                                                    <EditVitalsDialog patient={patient} />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};
