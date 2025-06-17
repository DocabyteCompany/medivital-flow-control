
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, UserPlus, Edit, Trash2, Shield } from 'lucide-react';
import { personnel } from '@/data/personnel';

export const PersonnelManagement = () => {
  const handleAddUser = () => {
    console.log('Agregar nuevo usuario');
  };

  const handleEditUser = (id: string) => {
    console.log('Editar usuario:', id);
  };

  const handleDeleteUser = (id: string) => {
    console.log('Eliminar usuario:', id);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Doctor': return 'bg-blue-100 text-blue-800';
      case 'Enfermera': return 'bg-green-100 text-green-800';
      case 'Técnico': return 'bg-purple-100 text-purple-800';
      case 'Administrativo': return 'bg-orange-100 text-orange-800';
      case 'Radiólogo': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-brand-dark mb-2">Gestión de Personal</h3>
          <p className="text-gray-600">Administra usuarios, roles y permisos del personal médico.</p>
        </div>
        <Button onClick={handleAddUser} className="bg-brand-blue hover:bg-brand-blue/90">
          <UserPlus className="w-4 h-4 mr-2" />
          Agregar Usuario
        </Button>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="w-4 h-4 text-brand-blue" />
              Personal Activo
            </CardTitle>
            <CardDescription>
              Lista completa del personal con sus roles y estados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {personnel.map((person) => (
                <div key={person.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <img 
                        src={person.avatar} 
                        alt={person.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900">{person.name}</span>
                        <div className={`w-2 h-2 rounded-full ${person.online ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Badge variant="outline" className={getRoleBadgeColor(person.role)}>
                          {person.role}
                        </Badge>
                        {person.specialty && (
                          <span>• {person.specialty}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditUser(person.id)}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteUser(person.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="w-4 h-4 text-brand-blue" />
              Configuración de Roles
            </CardTitle>
            <CardDescription>
              Define permisos y accesos por tipo de usuario
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Doctor</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Gestión completa de pacientes</li>
                    <li>• Acceso a expedientes médicos</li>
                    <li>• Herramientas de IA médica</li>
                    <li>• Configuración personal</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Admin</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Acceso completo al sistema</li>
                    <li>• Gestión de personal</li>
                    <li>• Estadísticas y reportes</li>
                    <li>• Configuración del sistema</li>
                  </ul>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <Shield className="w-4 h-4 mr-2" />
                Gestionar Permisos Detallados
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
