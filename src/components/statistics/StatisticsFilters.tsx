
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Filter, X, Download } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export interface StatisticsFilters {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  period: string;
  department: string;
  status: string;
  insuranceType: string;
}

interface StatisticsFiltersProps {
  filters: StatisticsFilters;
  onFiltersChange: (filters: StatisticsFilters) => void;
  onExport?: () => void;
}

export const StatisticsFiltersComponent = ({ filters, onFiltersChange, onExport }: StatisticsFiltersProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const quickPeriods = [
    { label: 'Última semana', value: '7d' },
    { label: 'Último mes', value: '30d' },
    { label: 'Últimos 3 meses', value: '90d' },
    { label: 'Último año', value: '365d' },
    { label: 'Personalizado', value: 'custom' }
  ];

  const departments = [
    'Todos',
    'Cardiología',
    'Pediatría',
    'Medicina General',
    'Ginecología',
    'Traumatología',
    'Radiología'
  ];

  const statuses = [
    'Todos',
    'Saludable',
    'En tratamiento',
    'Crítico'
  ];

  const insuranceTypes = [
    'Todos',
    'Público',
    'Privado',
    'Mixto',
    'Internacional',
    'Sin seguro'
  ];

  const handleQuickPeriod = (period: string) => {
    const today = new Date();
    let from: Date | undefined;
    let to: Date | undefined = today;

    switch (period) {
      case '7d':
        from = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        from = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        from = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case '365d':
        from = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      case 'custom':
        from = undefined;
        to = undefined;
        break;
    }

    onFiltersChange({
      ...filters,
      period,
      dateRange: { from, to }
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      dateRange: { from: undefined, to: undefined },
      period: '30d',
      department: 'Todos',
      status: 'Todos',
      insuranceType: 'Todos'
    });
  };

  const activeFiltersCount = [
    filters.department !== 'Todos',
    filters.status !== 'Todos',
    filters.insuranceType !== 'Todos',
    filters.dateRange.from && filters.dateRange.to
  ].filter(Boolean).length;

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-blue-600" />
          Filtros de Estadísticas
          {activeFiltersCount > 0 && (
            <Badge variant="secondary">{activeFiltersCount} filtros activos</Badge>
          )}
        </CardTitle>
        <div className="flex gap-2">
          {onExport && (
            <Button variant="outline" size="sm" onClick={onExport}>
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={() => setShowAdvanced(!showAdvanced)}>
            {showAdvanced ? 'Menos filtros' : 'Más filtros'}
          </Button>
          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="w-4 h-4 mr-2" />
              Limpiar
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Períodos rápidos */}
        <div>
          <label className="text-sm font-medium mb-2 block">Período</label>
          <div className="flex flex-wrap gap-2">
            {quickPeriods.map((period) => (
              <Button
                key={period.value}
                variant={filters.period === period.value ? "default" : "outline"}
                size="sm"
                onClick={() => handleQuickPeriod(period.value)}
              >
                {period.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Rango de fechas personalizado */}
        {filters.period === 'custom' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Fecha inicio</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.dateRange.from ? (
                      format(filters.dateRange.from, "PPP", { locale: es })
                    ) : (
                      "Seleccionar fecha"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={filters.dateRange.from}
                    onSelect={(date) => onFiltersChange({
                      ...filters,
                      dateRange: { ...filters.dateRange, from: date }
                    })}
                    locale={es}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Fecha fin</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.dateRange.to ? (
                      format(filters.dateRange.to, "PPP", { locale: es })
                    ) : (
                      "Seleccionar fecha"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={filters.dateRange.to}
                    onSelect={(date) => onFiltersChange({
                      ...filters,
                      dateRange: { ...filters.dateRange, to: date }
                    })}
                    locale={es}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )}

        {/* Filtros avanzados */}
        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
            <div>
              <label className="text-sm font-medium mb-2 block">Departamento</label>
              <Select value={filters.department} onValueChange={(value) => onFiltersChange({ ...filters, department: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Estado</label>
              <Select value={filters.status} onValueChange={(value) => onFiltersChange({ ...filters, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Tipo de Seguro</label>
              <Select value={filters.insuranceType} onValueChange={(value) => onFiltersChange({ ...filters, insuranceType: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {insuranceTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
