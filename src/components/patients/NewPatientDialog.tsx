
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NewPatientForm } from './NewPatientForm';

export const NewPatientDialog = () => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="bg-brand-blue hover:bg-brand-blue/90">
                    <UserPlus className="mr-2 h-4 w-4" />
                    {t('dashboard.newPatient.button', 'Añadir Paciente')}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{t('dashboard.newPatient.title', 'Añadir nuevo paciente')}</DialogTitle>
                </DialogHeader>
                <NewPatientForm onSuccess={() => setIsOpen(false)} />
            </DialogContent>
        </Dialog>
    );
};
