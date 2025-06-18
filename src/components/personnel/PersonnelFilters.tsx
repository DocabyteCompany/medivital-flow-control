
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X, Users, Stethoscope } from 'lucide-react';
import { PersonnelRole } from '@/data/personnel';

interface PersonnelFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedRole: PersonnelRole | 'all';
  onRoleChange: (role: PersonnelRole | 'all') => void;
  onlineOnly: boolean;
  onOnlineToggle: (value: boolean) => void;
  onClearFilters: () => void;
}

export const PersonnelFilters = ({
  searchTerm,
  onSearchChange,
  selectedRole,
  onRoleChange,
  onlineOnly,
  onOnlineToggle,
  onClearFilters
}: PersonnelFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const roles: (PersonnelRole | 'all')[] = ['all', 'Doctor', 'Enfermera', 'Técnico', 'Administrativo', 'Radiólogo'];

  const hasActiveFilters = selectedRole !== 'all' || onlineOnly || searchTerm.length > 0;

  return (
    <div className="space-y-4">
      {/* Barra de búsqueda principal */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar personal por nombre..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className={showFilters ? "bg-brand-light" : ""}
        >
          <Filter className="w-4 h-4 mr-2" />
          Filtros
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              !
            </Badge>
          )}
        </Button>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            <X className="w-4 h-4 mr-1" />
            Limpiar
          </Button>
        )}
      </div>

      {/* Panel de filtros expandible */}
      {showFilters && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Stethoscope className="w-4 h-4 inline mr-1" />
                Filtrar por Rol
              </label>
              <Select value={selectedRole} onValueChange={onRoleChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar rol" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role === 'all' ? 'Todos los roles' : role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 inline mr-1" />
                Estado
              </label>
              <div className="flex items-center space-x-4">
                <Button
                  variant={onlineOnly ? "default" : "outline"}
                  size="sm"
                  onClick={() => onOnlineToggle(!onlineOnly)}
                  className="flex-1"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Solo en línea
                </Button>
                <Button
                  variant={!onlineOnly ? "default" : "outline"}
                  size="sm"
                  onClick={() => onOnlineToggle(false)}
                  className="flex-1"
                >
                  Todos
                </Button>
              </div>
            </div>
          </div>

          {/* Resumen de filtros activos */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 pt-2 border-t">
              <span className="text-sm text-gray-600">Filtros activos:</span>
              {selectedRole !== 'all' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {selectedRole}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => onRoleChange('all')} />
                </Badge>
              )}
              {onlineOnly && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  En línea
                  <X className="w-3 h-3 cursor-pointer" onClick={() => onOnlineToggle(false)} />
                </Badge>
              )}
              {searchTerm && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  "{searchTerm}"
                  <X className="w-3 h-3 cursor-pointer" onClick={() => onSearchChange('')} />
                </Badge>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
