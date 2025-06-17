
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { getPatientStatistics } from '@/services/statisticsService';
import { Users, UserCheck, AlertTriangle, TrendingUp } from 'lucide-react';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

export const PatientStatsWidget = () => {
  const stats = getPatientStatistics();

  const statusData = [
    { name: 'Saludable', value: stats.healthy, color: '#10B981' },
    { name: 'En tratamiento', value: stats.inTreatment, color: '#F59E0B' },
    { name: 'Crítico', value: stats.critical, color: '#EF4444' }
  ];

  const genderData = [
    { name: 'Hombres', value: stats.byGender.male },
    { name: 'Mujeres', value: stats.byGender.female }
  ];

  const insuranceData = Object.entries(stats.byInsurance).map(([type, count]) => ({
    name: type === 'none' ? 'Sin seguro' : 
          type === 'public' ? 'Público' :
          type === 'private' ? 'Privado' :
          type === 'mixed' ? 'Mixto' : 'Internacional',
    value: count
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Métricas principales */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-brand-blue" />
            Resumen de Pacientes
          </CardTitle>
          <CardDescription>Estadísticas generales de la base de pacientes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Pacientes</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats.healthy}</div>
              <div className="text-sm text-gray-600">Saludables</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{stats.inTreatment}</div>
              <div className="text-sm text-gray-600">En Tratamiento</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{stats.critical}</div>
              <div className="text-sm text-gray-600">Críticos</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Distribución por estado de salud */}
      <Card>
        <CardHeader>
          <CardTitle>Estado de Salud</CardTitle>
          <CardDescription>Distribución de pacientes por estado</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              value: {
                label: "Pacientes",
                color: "hsl(var(--chart-1))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Distribución por género */}
      <Card>
        <CardHeader>
          <CardTitle>Distribución por Género</CardTitle>
          <CardDescription>Pacientes por género</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              value: {
                label: "Pacientes",
                color: "hsl(var(--chart-2))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={genderData}>
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Nuevos pacientes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Nuevos Pacientes
          </CardTitle>
          <CardDescription>Último mes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{stats.newThisMonth}</div>
            <div className="text-sm text-gray-600">Pacientes registrados</div>
          </div>
        </CardContent>
      </Card>

      {/* Tipos de seguro */}
      <Card>
        <CardHeader>
          <CardTitle>Tipos de Seguro</CardTitle>
          <CardDescription>Distribución por tipo de seguro médico</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              value: {
                label: "Pacientes",
                color: "hsl(var(--chart-3))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={insuranceData} layout="horizontal">
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
