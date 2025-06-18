
import { PersonnelCard } from '@/components/personnel/PersonnelCard';
import { PersonnelFilters } from '@/components/personnel/PersonnelFilters';
import { PersonnelDetailView } from '@/components/personnel/PersonnelDetailView';
import { personnel, PersonnelRole, Personnel as PersonnelType } from '@/data/personnel';
import { Stethoscope, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';

const Personnel = () => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState<PersonnelRole | 'all'>('all');
    const [onlineOnly, setOnlineOnly] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState<PersonnelType | null>(null);
    const [showDetailView, setShowDetailView] = useState(false);

    const filteredPersonnel = useMemo(() => {
        return personnel.filter(person => {
            // Filtro de búsqueda
            if (searchTerm && !person.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
            }
            
            // Filtro por rol
            if (selectedRole !== 'all' && person.role !== selectedRole) {
                return false;
            }
            
            // Filtro por estado online
            if (onlineOnly && !person.online) {
                return false;
            }
            
            return true;
        });
    }, [searchTerm, selectedRole, onlineOnly]);

    const handleClearFilters = () => {
        setSearchTerm('');
        setSelectedRole('all');
        setOnlineOnly(false);
    };

    const handleViewDetails = (person: PersonnelType) => {
        setSelectedPerson(person);
        setShowDetailView(true);
    };

    const handleCloseDetailView = () => {
        setShowDetailView(false);
        setSelectedPerson(null);
    };

    const onlineCount = personnel.filter(p => p.online).length;
    const totalCount = personnel.length;

    return (
        <div className="space-y-6 mt-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-brand-light p-3 rounded-lg">
                        <Stethoscope className="w-6 h-6 text-brand-blue" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-brand-dark">{t('sidebar.personnel', 'Personal')}</h1>
                        <div className="flex items-center gap-3 mt-1">
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                {onlineCount} en línea
                            </Badge>
                            <Badge variant="outline" className="text-gray-600">
                                <Users className="w-3 h-3 mr-1" />
                                {totalCount} total
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>

            <PersonnelFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedRole={selectedRole}
                onRoleChange={setSelectedRole}
                onlineOnly={onlineOnly}
                onOnlineToggle={setOnlineOnly}
                onClearFilters={handleClearFilters}
            />

            {/* Resultados */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                        Mostrando {filteredPersonnel.length} de {totalCount} miembros del personal
                    </p>
                    {filteredPersonnel.length !== totalCount && (
                        <p className="text-sm text-brand-blue">
                            {totalCount - filteredPersonnel.length} filtrados
                        </p>
                    )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredPersonnel.map((person) => (
                        <PersonnelCard 
                            key={person.id} 
                            person={person} 
                            onViewDetails={handleViewDetails}
                        />
                    ))}
                </div>
                
                {filteredPersonnel.length === 0 && (
                    <div className="text-center py-12">
                        <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontró personal</h3>
                        <p className="text-gray-500">
                            No hay miembros del personal que coincidan con los filtros seleccionados.
                        </p>
                    </div>
                )}
            </div>

            {/* Modal de vista detallada */}
            {showDetailView && selectedPerson && (
                <PersonnelDetailView
                    person={selectedPerson}
                    onClose={handleCloseDetailView}
                />
            )}
        </div>
    );
};

export default Personnel;
