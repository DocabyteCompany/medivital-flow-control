
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { getFinancialStatistics } from '@/services/statisticsService';
import { DollarSign, TrendingUp, PieChart as PieChartIcon, BarChart3 } from 'lucide-react';

const INSURANCE_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export const FinancialStatsWidget = () => {
  const stats = getFinancialStatistics();

  const totalRevenue = stats.revenue.reduce((sum, item) => sum + item.amount, 0);
  const averageMonthly = totalRevenue / stats.revenue.length;
  const lastMonth = stats.revenue[stats.revenue.length - 1];
  const previousMonth = stats.revenue[stats.revenue.length - 2];
  const growth = previousMonth ? ((lastMonth.amount - previousMonth.amount) / previousMonth.amount) * 100 : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Métricas principales */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-brand-blue" />
            Resumen Financiero
          </CardTitle>
          <CardDescription>Estadísticas de ingresos y distribución por seguros</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                ${totalRevenue.toLocaleString()} MXN
              </div>
              <div className="text-sm text-gray-600">Ingresos Totales</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                ${averageMonthly.toLocaleString()} MXN
              </div>
              <div className="text-sm text-gray-600">Promedio Mensual</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                ${lastMonth.amount.toLocaleString()} MXN
              </div>
              <div className="text-sm text-gray-600">Último Mes</div>
            </div>
            <div className={`text-center p-4 rounded-lg ${growth >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
              <div className={`text-2xl font-bold flex items-center justify-center gap-1 ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                <TrendingUp className="w-5 h-5" />
                {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Crecimiento</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ingresos por mes */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Tendencia de Ingresos
          </CardTitle>
          <CardDescription>Evolución mensual de los ingresos</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              amount: {
                label: "Ingresos (MXN)",
                color: "hsl(var(--chart-1))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.revenue}>
                <XAxis dataKey="month" />
                <YAxis 
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <ChartTooltip 
                  content={<ChartTooltipContent 
                    formatter={(value) => [`$${Number(value).toLocaleString()} MXN`, 'Ingresos']}
                  />} 
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Distribución por tipo de seguro */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChartIcon className="w-5 h-5 text-purple-600" />
            Distribución por Seguro
          </CardTitle>
          <CardDescription>Pacientes por tipo de seguro médico</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              patients: {
                label: "Pacientes",
                color: "hsl(var(--chart-2))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={stats.byInsurance}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="patients"
                >
                  {stats.byInsurance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={INSURANCE_COLORS[index % INSURANCE_COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip 
                  content={<ChartTooltipContent 
                    formatter={(value, name) => [`${value} pacientes`, name]}
                  />} 
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Detalle por tipo de seguro */}
      <Card>
        <CardHeader>
          <CardTitle>Detalle por Tipo de Seguro</CardTitle>
          <CardDescription>Número y porcentaje de pacientes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stats.byInsurance.map((item, index) => (
              <div key={item.type} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: INSURANCE_COLORS[index % INSURANCE_COLORS.length] }}
                  ></div>
                  <span className="font-medium">{item.type}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold">{item.patients} pacientes</div>
                  <div className="text-sm text-gray-600">{item.percentage.toFixed(1)}%</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
