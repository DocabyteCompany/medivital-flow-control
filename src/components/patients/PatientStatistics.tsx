import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { usePatientPermissions } from '@/hooks/usePatientPermissions';
import { TrendingUp, Calendar, DollarSign, Activity } from 'lucide-react';
import { Patient } from '@/data/patients';

interface PatientStatisticsProps {
  patient: Patient;
}

// Mock data específico por paciente - actualizado a pesos mexicanos
const getPatientStats = (patientId: string) => {
  const statsData = {
    '1': { // Jorge Villareal
      visits: [
        { month: 'Ene', count: 2 },
        { month: 'Feb', count: 1 },
        { month: 'Mar', count: 3 },
        { month: 'Abr', count: 1 },
        { month: 'May', count: 2 },
        { month: 'Jun', count: 1 }
      ],
      vitals: [
        { date: '01/06', presion: 120, peso: 80 },
        { date: '08/06', presion: 118, peso: 79 },
        { date: '15/06', presion: 115, peso: 80 },
      ],
      totalSpent: 17000,
      totalVisits: 10,
      lastPayment: '2025-06-15'
    },
    '2': { // Sofía Ramirez
      visits: [
        { month: 'Ene', count: 1 },
        { month: 'Feb', count: 2 },
        { month: 'Mar', count: 2 },
        { month: 'Abr', count: 3 },
        { month: 'May', count: 2 },
        { month: 'Jun', count: 2 }
      ],
      vitals: [
        { date: '01/06', temperatura: 36.5, peso: 15 },
        { date: '07/06', temperatura: 36.8, peso: 15 },
        { date: '14/06', temperatura: 36.6, peso: 15 },
      ],
      totalSpent: 8400,
      totalVisits: 12,
      lastPayment: '2025-06-14'
    }
  };
  
  return statsData[patientId as keyof typeof statsData] || statsData['1'];
};

export const PatientStatistics = ({ patient }: PatientStatisticsProps) => {
  const { t } = useTranslation();
  const { isAdmin, isDoctor } = usePatientPermissions();
  const stats = getPatientStats(patient.id);

  if (isAdmin) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Gastado</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalSpent.toLocaleString()} MXN</div>
              <p className="text-xs text-muted-foreground">Último pago: {stats.lastPayment}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Visitas</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalVisits}</div>
              <p className="text-xs text-muted-foreground">Desde primera consulta</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Frecuencia</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.1</div>
              <p className="text-xs text-muted-foreground">Visitas por mes</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Historial de Visitas de {patient.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.visits}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#7AC0FF" name="Visitas" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isDoctor) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Estado Actual</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{patient.status}</div>
              <p className="text-xs text-muted-foreground">Última actualización: {patient.lastVisit}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Peso Actual</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{patient.weight}kg</div>
              <p className="text-xs text-muted-foreground">IMC: {(patient.weight / Math.pow(patient.height/100, 2)).toFixed(1)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Consultas</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalVisits}</div>
              <p className="text-xs text-muted-foreground">Total registradas</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Evolución de Signos Vitales - {patient.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.vitals}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  {stats.vitals.length > 0 && 'presion' in stats.vitals[0] && (
                    <Line type="monotone" dataKey="presion" stroke="#7AC0FF" name="Presión Sistólica" />
                  )}
                  {stats.vitals.length > 0 && 'temperatura' in stats.vitals[0] && (
                    <Line type="monotone" dataKey="temperatura" stroke="#FF7A9F" name="Temperatura" />
                  )}
                  <Line type="monotone" dataKey="peso" stroke="#FFB87A" name="Peso (kg)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};
