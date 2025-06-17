
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Users, AlertCircle, FileText, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { patients } from '@/data/patients';

export const AdminPatientManagement = () => {
  const navigate = useNavigate();

  // Calculate real patient statistics
  const totalPatients = patients.length;
  const criticalPatients = patients.filter(p => p.status === 'Crítico').length;
  const inTreatmentPatients = patients.filter(p => p.status === 'En tratamiento').length;
  
  // Calculate new patients in last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const newPatients = patients.filter(p => new Date(p.createdAt) >= thirtyDaysAgo).length;

  // Recent patient activities (mock data based on real patients)
  const recentActivities = [
    { 
      action: 'Paciente registrado', 
      patient: patients[0]?.name || 'Jorge Villareal', 
      time: '2 min', 
      type: 'registered' 
    },
    { 
      action: 'Estado actualizado', 
      patient: patients[4]?.name || 'Luis Martinez', 
      time: '15 min', 
      type: 'updated' 
    },
    { 
      action: 'Expediente creado', 
      patient: patients[1]?.name || 'Sofía Ramirez', 
      time: '1 hora', 
      type: 'record' 
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'registered': return <UserPlus className="w-4 h-4 text-green-600" />;
      case 'updated': return <AlertCircle className="w-4 h-4 text-orange-600" />;
      case 'record': return <FileText className="w-4 h-4 text-blue-600" />;
      default: return <Users className="w-4 h-4 text-gray-600" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'registered': return 'bg-green-100 text-green-700 border-green-200';
      case 'updated': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'record': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card className="shadow-soft border-0 rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" />
          Gestión de Pacientes
        </CardTitle>
        <Button 
          size="sm" 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => navigate('/pacientes')}
        >
          <Users className="w-4 h-4 mr-2" />
          Ver Todos
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Estadísticas de pacientes */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-2xl font-bold text-blue-700">{totalPatients}</p>
            <p className="text-xs text-blue-600">Total Pacientes</p>
          </div>
          <div className="bg-red-50 p-3 rounded-lg">
            <p className="text-2xl font-bold text-red-700">{criticalPatients}</p>
            <p className="text-xs text-red-600">Críticos</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-orange-50 p-3 rounded-lg">
            <p className="text-2xl font-bold text-orange-700">{inTreatmentPatients}</p>
            <p className="text-xs text-orange-600">En Tratamiento</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-2xl font-bold text-green-700">{newPatients}</p>
            <p className="text-xs text-green-600">Nuevos (30d)</p>
          </div>
        </div>

        {/* Actividad reciente de pacientes */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-700">Actividad Reciente</h4>
          {recentActivities.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                {getActivityIcon(item.type)}
                <div>
                  <p className="text-sm font-medium text-brand-dark">{item.action}</p>
                  <p className="text-xs text-gray-500">{item.patient}</p>
                </div>
              </div>
              <Badge variant="outline" className={getActivityColor(item.type)}>
                {item.time}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
