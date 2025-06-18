
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Settings } from 'lucide-react';
import { SystemConfigService } from '@/services/systemConfigService';
import { useNavigate } from 'react-router-dom';
import { MetricsGrid } from '@/components/common';

export const AdminStatsWidget = () => {
  const navigate = useNavigate();
  const config = SystemConfigService.getConfig();
  const financialConfig = SystemConfigService.getFinancialSectionConfig();

  // Mock data - se conectará con datos reales más adelante (actualizado a pesos mexicanos)
  const clinicStats = {
    totalPatients: 1247,
    monthlyRevenue: 1710840,
    appointmentsToday: 28,
    doctorsActive: 12,
    growthRate: '+12.5%'
  };

  const metricsData = [
    {
      title: 'Pacientes Totales',
      value: clinicStats.totalPatients.toLocaleString(),
      color: 'blue'
    },
    {
      title: financialConfig.show ? 'Ingresos del Mes' : 'Eficiencia Operativa',
      value: financialConfig.show ? `$${clinicStats.monthlyRevenue.toLocaleString()} MXN` : '87.5%',
      color: 'green'
    },
    {
      title: 'Citas Hoy',
      value: clinicStats.appointmentsToday.toString(),
      color: 'orange'
    },
    {
      title: 'Doctores Activos',
      value: clinicStats.doctorsActive.toString(),
      color: 'purple'
    }
  ].filter((_, index) => {
    const enabledSections = [
      config.enabledSections.patients,
      financialConfig.show || config.enabledSections.operational,
      config.enabledSections.appointments,
      config.enabledSections.personnel
    ];
    return enabledSections[index];
  });

  return (
    <Card className="shadow-soft border-0 rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-brand-blue" />
          {config.institutionType === 'large_hospital' 
            ? 'Métricas del Hospital'
            : 'Estadísticas de la Clínica'
          }
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            {clinicStats.growthRate}
          </Badge>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/configuracion')}
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <MetricsGrid metrics={metricsData} columns={2} />
        
        {/* Información adicional según tipo de institución */}
        {config.institutionType === 'large_hospital' && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700">
              🏥 Configuración optimizada para hospital grande - 
              <button 
                onClick={() => navigate('/estadisticas')}
                className="underline ml-1"
              >
                Ver métricas operativas completas
              </button>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
