
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Personnel } from "@/data/personnel";
import { 
  TrendingUp, 
  Users, 
  Clock, 
  Star,
  Calendar,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PersonnelProductivityStatsProps {
  person: Personnel;
}

export const PersonnelProductivityStats = ({ person }: PersonnelProductivityStatsProps) => {
  // Mock data para estadísticas
  const stats = {
    monthlyPatients: 187,
    avgAppointmentTime: 25,
    satisfactionRating: 4.8,
    completedAppointments: 95,
    cancelledAppointments: 3,
    noShowAppointments: 2,
    efficiency: 92,
    punctuality: 98
  };

  const monthlyTrend = [
    { month: 'Ene', patients: 165, satisfaction: 4.6 },
    { month: 'Feb', patients: 172, satisfaction: 4.7 },
    { month: 'Mar', patients: 158, satisfaction: 4.5 },
    { month: 'Abr', patients: 181, satisfaction: 4.8 },
    { month: 'May', patients: 187, satisfaction: 4.8 },
  ];

  const recentAchievements = [
    { type: 'excellence', description: 'Calificación perfecta en satisfacción del paciente', date: '2025-06-15' },
    { type: 'efficiency', description: 'Superó la meta de consultas mensuales', date: '2025-06-10' },
    { type: 'training', description: 'Completó curso de actualización profesional', date: '2025-06-05' },
  ];

  return (
    <div className="space-y-6">
      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pacientes este mes</p>
                <p className="text-2xl font-bold text-brand-dark">{stats.monthlyPatients}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600">+8% vs mes anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tiempo promedio</p>
                <p className="text-2xl font-bold text-brand-dark">{stats.avgAppointmentTime} min</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-gray-600">Dentro del objetivo</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Satisfacción</p>
                <p className="text-2xl font-bold text-brand-dark">{stats.satisfactionRating}/5</p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-green-600">Excelente</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Eficiencia</p>
                <p className="text-2xl font-bold text-brand-dark">{stats.efficiency}%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-green-600">Por encima del promedio</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Desglose de citas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Desglose de Citas - Este Mes
          </CardTitle>
          <CardDescription>
            Análisis detallado del rendimiento en citas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{stats.completedAppointments}</div>
              <div className="text-sm text-gray-600 mb-3">Citas Completadas</div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                95% tasa de finalización
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">{stats.cancelledAppointments}</div>
              <div className="text-sm text-gray-600 mb-3">Citas Canceladas</div>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                3% del total
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">{stats.noShowAppointments}</div>
              <div className="text-sm text-gray-600 mb-3">No se presentaron</div>
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                2% del total
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tendencia mensual */}
      <Card>
        <CardHeader>
          <CardTitle>Tendencia de Rendimiento</CardTitle>
          <CardDescription>Evolución de pacientes y satisfacción en los últimos 5 meses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyTrend.map((month, index) => (
              <div key={month.month} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 text-center font-medium">{month.month}</div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span>{month.patients} pacientes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{month.satisfaction}/5</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {index > 0 && month.patients > monthlyTrend[index - 1].patients && (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Logros recientes */}
      <Card>
        <CardHeader>
          <CardTitle>Logros y Reconocimientos Recientes</CardTitle>
          <CardDescription>Destacados y reconocimientos del personal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentAchievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="p-2 bg-brand-light rounded-lg">
                  {achievement.type === 'excellence' && <Star className="w-4 h-4 text-yellow-600" />}
                  {achievement.type === 'efficiency' && <TrendingUp className="w-4 h-4 text-green-600" />}
                  {achievement.type === 'training' && <CheckCircle className="w-4 h-4 text-blue-600" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{achievement.description}</p>
                  <p className="text-sm text-gray-500">{new Date(achievement.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
