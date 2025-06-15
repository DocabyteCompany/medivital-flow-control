
import { PersonnelCard } from '@/components/personnel/PersonnelCard';
import { personnel } from '@/data/personnel';
import { Stethoscope } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Personnel = () => {
    const { t } = useTranslation();

    return (
        <div className="space-y-6 mt-4">
            <div className="flex items-center gap-3">
                <div className="bg-brand-light p-3 rounded-lg">
                    <Stethoscope className="w-6 h-6 text-brand-blue" />
                </div>
                <h1 className="text-2xl font-bold text-brand-dark">{t('sidebar.personnel', 'Personal')}</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {personnel.map((person) => (
                    <PersonnelCard key={person.id} person={person} />
                ))}
            </div>
        </div>
    );
};

export default Personnel;
