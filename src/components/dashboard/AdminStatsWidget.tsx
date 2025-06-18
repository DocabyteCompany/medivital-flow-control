
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Calendar, DollarSign, Users, Settings } from 'lucide-react';
import { SystemConfigService } from '@/services/systemConfigService';
import { useNavigate } from 'react-router-dom';

export const AdminStatsWidget = () => {
  const navigate = useNavigate();
  const config = SystemConfigService.getConfig();
  const financialConfig = SystemConfigService.getFinancialSectionConfig();

  // Mock data - se conectará con datos reales más adelante
  const clinicStats = {
    totalPatients: 1247,
    monthlyRevenue: 85420,
    appointmentsToday: 28,
    doctorsActive: 12,
    growthRate: '+12.5%'
  };

  const statsItems = [
    {
      title: 'Pacientes Totales',
      value: clinicStats.totalPatients.toLocaleString(),
      icon: Users,
      color: 'blue',
      enabled: config.enabledSections.patients
    },
    {
      title: financialConfig.show ? 'Ingresos del Mes' : 'Eficiencia Operativa',
      value: financialConfig.show ? `$${clinicStats.monthlyRevenue.toLocaleString()}` : '87.5%',
      icon: DollarSign,
      color: 'green',
      enabled: financialConfig.show || config.enabledSections.operational
    },
    {
      title: 'Citas Hoy',
      value: clinicStats.appointmentsToday.toString(),
      icon: Calendar,
      color: 'orange',
      enabled: config.enabledSections.appointments
    },
    {
      title: 'Doctores Activos',
      value: clinicStats.doctorsActive.toString(),
      icon: TrendingUp,
      color: 'purple',
      enabled: config.enabledSections.personnel
    }
  ].filter(item => item.enabled);

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-700';
      case 'green': return 'bg-green-100 text-green-700';
      case 'orange': return 'bg-orange-100 text-orange-700';
      case 'purple': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

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
        <div className="grid grid-cols-2 gap-4">
          {statsItems.map((item, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className={`p-2 rounded-lg ${getColorClasses(item.color)}`}>
                <item.icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-lg font-bold text-brand-dark">{item.value}</p>
                <p className="text-xs text-gray-500">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
        
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
