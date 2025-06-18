
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { getPersonnelStatistics } from '@/services/statisticsService';
import { Stethoscope, Users, UserCheck, Activity } from 'lucide-react';
import { useStatisticsLoading } from '@/hooks/useStatisticsLoading';
import { StatsSkeleton } from './StatsSkeleton';

export const PersonnelStatsWidget = () => {
  const isLoading = useStatisticsLoading(300);
  const stats = getPersonnelStatistics();

  const roleData = [
    { name: 'Doctores', value: stats.doctors, key: 'doctors' },
    { name: 'Enfermeras', value: stats.nurses, key: 'nurses' },
    { name: 'Técnicos', value: stats.technicians, key: 'technicians' },
    { name: 'Administrativos', value: stats.administrative, key: 'administrative' },
    { name: 'Radiólogos', value: stats.radiologists, key: 'radiologists' }
  ];

  const specialtyData = Object.entries(stats.bySpecialty).map(([specialty, count], index) => ({
    name: specialty,
    value: count,
    key: `specialty-${index}`
  }));

  const onlinePercentage = stats.total > 0 ? (stats.online / stats.total) * 100 : 0;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StatsSkeleton colSpan="lg:col-span-2" showMetrics={true} showChart={false} />
        <StatsSkeleton showChart={true} showMetrics={false} />
        <StatsSkeleton showChart={false} showMetrics={false} />
        {specialtyData.length > 0 && (
          <StatsSkeleton colSpan="lg:col-span-2" showChart={true} showMetrics={false} />
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in-50 duration-500">
      {/* Métricas principales */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-brand-blue" />
            Resumen del Personal
          </CardTitle>
          <CardDescription>Estadísticas del equipo médico y administrativo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg transition-all duration-300 hover:bg-blue-100">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Personal</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg transition-all duration-300 hover:bg-green-100">
              <div className="text-2xl font-bold text-green-600">{stats.doctors}</div>
              <div className="text-sm text-gray-600">Doctores</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg transition-all duration-300 hover:bg-purple-100">
              <div className="text-2xl font-bold text-purple-600">{stats.nurses}</div>
              <div className="text-sm text-gray-600">Enfermeras</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg transition-all duration-300 hover:bg-orange-100">
              <div className="text-2xl font-bold text-orange-600">{stats.online}</div>
              <div className="text-sm text-gray-600">En Línea</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Distribución por roles */}
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Distribución por Roles
          </CardTitle>
          <CardDescription>Personal por tipo de rol</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              value: {
                label: "Personal",
                color: "hsl(var(--chart-1))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={roleData} margin={{ bottom: 80, left: 20, right: 20, top: 20 }}>
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={80}
                  interval={0}
                  fontSize={12}
                />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="value" 
                  fill="#3B82F6" 
                  radius={[4, 4, 0, 0]}
                  className="transition-all duration-300"
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Estado de disponibilidad */}
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-600" />
            Disponibilidad
          </CardTitle>
          <CardDescription>Personal en línea actualmente</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 transition-all duration-300">
              {onlinePercentage.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600 mt-2">
              {stats.online} de {stats.total} en línea
            </div>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${onlinePercentage}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Especialidades médicas */}
      {specialtyData.length > 0 && (
        <Card className="lg:col-span-2 transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Especialidades Médicas</CardTitle>
            <CardDescription>Distribución del personal médico por especialidad ({specialtyData.length} especialidades)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Personal",
                  color: "hsl(var(--chart-2))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height={300}>
                <BarChart 
                  data={specialtyData} 
                  layout="horizontal"
                  margin={{ left: 120, right: 20, top: 20, bottom: 20 }}
                >
                  <XAxis 
                    type="number" 
                    domain={[0, Math.max(...specialtyData.map(d => d.value)) + 1]}
                    tickCount={Math.min(6, Math.max(...specialtyData.map(d => d.value)) + 1)}
                  />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    width={120}
                    fontSize={12}
                    interval={0}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar 
                    dataKey="value" 
                    fill="#10B981" 
                    radius={[0, 4, 4, 0]}
                    minPointSize={5}
                    className="transition-all duration-300"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
