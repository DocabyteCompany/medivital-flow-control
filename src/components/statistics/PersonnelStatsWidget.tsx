
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { getPersonnelStatistics } from '@/services/statisticsService';
import { Stethoscope, Users, UserCheck, Activity } from 'lucide-react';

export const PersonnelStatsWidget = () => {
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Personal</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats.doctors}</div>
              <div className="text-sm text-gray-600">Doctores</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{stats.nurses}</div>
              <div className="text-sm text-gray-600">Enfermeras</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{stats.online}</div>
              <div className="text-sm text-gray-600">En Línea</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Distribución por roles */}
      <Card>
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
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Estado de disponibilidad */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-600" />
            Disponibilidad
          </CardTitle>
          <CardDescription>Personal en línea actualmente</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {onlinePercentage.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600 mt-2">
              {stats.online} de {stats.total} en línea
            </div>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${onlinePercentage}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Especialidades médicas */}
      {specialtyData.length > 0 && (
        <Card className="lg:col-span-2">
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
                  margin={{ left: 100, right: 20, top: 20, bottom: 20 }}
                >
                  <XAxis type="number" />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    width={100}
                    fontSize={12}
                  />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
                  />
                  <Bar dataKey="value" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
