
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X, Filter } from "lucide-react";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface MessageSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filters: {
    role?: string;
    specialty?: string;
    onlineOnly?: boolean;
  };
  onFiltersChange: (filters: any) => void;
}

export const MessageSearch = ({ 
  searchTerm, 
  onSearchChange, 
  filters, 
  onFiltersChange 
}: MessageSearchProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const clearSearch = () => {
    onSearchChange("");
  };

  const clearFilters = () => {
    onFiltersChange({});
    setIsFilterOpen(false);
  };

  const hasActiveFilters = Object.values(filters).some(Boolean);

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Buscar conversaciones..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-20"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {searchTerm && (
            <Button
              size="sm"
              variant="ghost"
              onClick={clearSearch}
              className="h-6 w-6 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className={`h-6 w-6 p-0 ${hasActiveFilters ? 'text-brand-blue' : ''}`}
              >
                <Filter className="h-3 w-3" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64" align="end">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Filtros</h4>
                  {hasActiveFilters && (
                    <Button size="sm" variant="ghost" onClick={clearFilters}>
                      Limpiar
                    </Button>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Rol</label>
                  <div className="flex flex-wrap gap-1">
                    {['Doctor', 'Enfermera', 'Técnico', 'Administrativo'].map(role => (
                      <Badge
                        key={role}
                        variant={filters.role === role ? "default" : "outline"}
                        className="cursor-pointer text-xs"
                        onClick={() => onFiltersChange({
                          ...filters,
                          role: filters.role === role ? undefined : role
                        })}
                      >
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="onlineOnly"
                    checked={filters.onlineOnly || false}
                    onChange={(e) => onFiltersChange({
                      ...filters,
                      onlineOnly: e.target.checked
                    })}
                    className="rounded"
                  />
                  <label htmlFor="onlineOnly" className="text-sm">
                    Solo usuarios en línea
                  </label>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-1">
          {filters.role && (
            <Badge variant="secondary" className="text-xs">
              Rol: {filters.role}
              <X 
                className="ml-1 h-3 w-3 cursor-pointer" 
                onClick={() => onFiltersChange({ ...filters, role: undefined })}
              />
            </Badge>
          )}
          {filters.onlineOnly && (
            <Badge variant="secondary" className="text-xs">
              En línea
              <X 
                className="ml-1 h-3 w-3 cursor-pointer" 
                onClick={() => onFiltersChange({ ...filters, onlineOnly: false })}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};
