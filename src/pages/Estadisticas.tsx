
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PatientStatsWidget } from '@/components/statistics/PatientStatsWidget';
import { PersonnelStatsWidget } from '@/components/statistics/PersonnelStatsWidget';
import { AppointmentStatsWidget } from '@/components/statistics/AppointmentStatsWidget';
import { FinancialStatsWidget } from '@/components/statistics/FinancialStatsWidget';
import { OperationalStatsWidget } from '@/components/statistics/OperationalStatsWidget';
import { StatisticsFiltersComponent, StatisticsFilters } from '@/components/statistics/StatisticsFilters';
import { SystemConfigService } from '@/services/systemConfigService';
import { BarChart3, Users, Stethoscope, Calendar, DollarSign, Activity, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Estadisticas = () => {
  const navigate = useNavigate();
  const config = SystemConfigService.getConfig();
  const financialConfig = SystemConfigService.getFinancialSectionConfig();

  const [filters, setFilters] = useState<StatisticsFilters>({
    dateRange: { from: undefined, to: undefined },
    period: '30d',
    department: 'Todos',
    status: 'Todos',
    insuranceType: 'Todos'
  });

  const handleExport = () => {
    // Función para exportar reportes (implementar según necesidades)
    console.log('Exportando reporte con filtros:', filters);
    // Aquí se podría generar un PDF o Excel con los datos filtrados
  };

  const availableTabs = [
    {
      id: 'pacientes',
      label: 'Pacientes',
      icon: Users,
      enabled: config.enabledSections.patients,
      component: <PatientStatsWidget />
    },
    {
      id: 'personal',
      label: 'Personal',
      icon: Stethoscope,
      enabled: config.enabledSections.personnel,
      component: <PersonnelStatsWidget />
    },
    {
      id: 'citas',
      label: 'Citas',
      icon: Calendar,
      enabled: config.enabledSections.appointments,
      component: <AppointmentStatsWidget />
    },
    {
      id: 'financiero',
      label: financialConfig.title,
      icon: DollarSign,
      enabled: financialConfig.show,
      component: <FinancialStatsWidget />
    },
    {
      id: 'operacional',
      label: 'Métricas Operativas',
      icon: Activity,
      enabled: config.enabledSections.operational,
      component: <OperationalStatsWidget />
    }
  ].filter(tab => tab.enabled);

  const defaultTab = availableTabs[0]?.id || 'pacientes';

  return (
    <div className="flex flex-col gap-6 mt-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-brand-blue" />
            Estadísticas y Reportes
          </h1>
          <p className="text-gray-600 mt-1">
            Análisis completo de la actividad de la clínica
          </p>
          {config.institutionType === 'large_hospital' && (
            <p className="text-sm text-orange-600 mt-1">
              ⚡ Configuración optimizada para hospital grande
            </p>
          )}
        </div>
        <Button
          variant="outline"
          onClick={() => navigate('/configuracion')}
          className="flex items-center gap-2"
        >
          <Settings className="w-4 h-4" />
          Configurar Secciones
        </Button>
      </div>

      {/* Filtros */}
      <StatisticsFiltersComponent
        filters={filters}
        onFiltersChange={setFilters}
        onExport={handleExport}
      />

      {/* Nota para hospitales grandes */}
      {config.institutionType === 'large_hospital' && !financialConfig.show && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900">Sección Financiera Deshabilitada</h3>
                <p className="text-sm text-blue-700 mt-1">
                  La sección financiera está deshabilitada para hospitales grandes que ya cuentan con sistemas contables especializados. 
                  En su lugar, se muestran métricas operativas relevantes.
                </p>
                <p className="text-xs text-blue-600 mt-2">
                  Puedes habilitarla desde Configuración si necesitas reportes financieros básicos.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs para diferentes categorías de estadísticas */}
      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className={`grid w-full grid-cols-${availableTabs.length}`}>
          {availableTabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {availableTabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="mt-6">
            {tab.component}
          </TabsContent>
        ))}
      </Tabs>

      {/* Información adicional */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Información del Reporte</CardTitle>
          <CardDescription>
            Datos actualizados en tiempo real basados en la información de la clínica
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div>
              <strong>Última actualización:</strong><br />
              {new Date().toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
            <div>
              <strong>Período de datos:</strong><br />
              {filters.period === 'custom' && filters.dateRange.from && filters.dateRange.to
                ? `${filters.dateRange.from.toLocaleDateString()} - ${filters.dateRange.to.toLocaleDateString()}`
                : filters.period === '7d' ? 'Últimos 7 días'
                : filters.period === '30d' ? 'Últimos 30 días'
                : filters.period === '90d' ? 'Últimos 90 días'
                : filters.period === '365d' ? 'Último año'
                : 'Enero 2025 - Presente'
              }
            </div>
            <div>
              <strong>Tipo de institución:</strong><br />
              {config.institutionType === 'small_clinic' ? 'Clínica Pequeña'
                : config.institutionType === 'medium_clinic' ? 'Clínica Mediana'
                : 'Hospital Grande'
              }
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Estadisticas;
