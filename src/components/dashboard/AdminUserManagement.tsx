
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserPlus, UserCheck, UserX, Shield } from 'lucide-react';

export const AdminUserManagement = () => {
  // Mock data - se conectará con datos reales más adelante
  const userStats = {
    totalUsers: 24,
    activeUsers: 22,
    pendingApprovals: 2,
    adminUsers: 3
  };

  const recentActions = [
    { action: 'Usuario aprobado', user: 'Dr. Martín López', time: '2 min', type: 'approved' },
    { action: 'Nuevo registro', user: 'Dra. Carmen Silva', time: '15 min', type: 'pending' },
    { action: 'Permisos actualizados', user: 'Dr. José García', time: '1 hora', type: 'updated' },
  ];

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'approved': return <UserCheck className="w-4 h-4 text-green-600" />;
      case 'pending': return <UserPlus className="w-4 h-4 text-orange-600" />;
      case 'updated': return <Shield className="w-4 h-4 text-blue-600" />;
      default: return <UserX className="w-4 h-4 text-gray-600" />;
    }
  };

  const getActionColor = (type: string) => {
    switch (type) {
      case 'approved': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'updated': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card className="shadow-soft border-0 rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-purple-600" />
          Gestión de Usuarios
        </CardTitle>
        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
          Ver Todos
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats rápidas */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-purple-50 p-3 rounded-lg">
            <p className="text-2xl font-bold text-purple-700">{userStats.totalUsers}</p>
            <p className="text-xs text-purple-600">Total Usuarios</p>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg">
            <p className="text-2xl font-bold text-orange-700">{userStats.pendingApprovals}</p>
            <p className="text-xs text-orange-600">Pendientes</p>
          </div>
        </div>

        {/* Acciones recientes */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-700">Actividad Reciente</h4>
          {recentActions.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                {getActionIcon(item.type)}
                <div>
                  <p className="text-sm font-medium text-brand-dark">{item.action}</p>
                  <p className="text-xs text-gray-500">{item.user}</p>
                </div>
              </div>
              <Badge variant="outline" className={getActionColor(item.type)}>
                {item.time}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
