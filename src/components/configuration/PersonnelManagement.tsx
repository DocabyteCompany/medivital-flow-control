import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, UserPlus, Edit, Trash2, Shield, Eye } from 'lucide-react';
import { personnel as initialPersonnel, Personnel } from '@/data/personnel';
import { AddUserDialog } from './AddUserDialog';
import { EditUserDialog } from './EditUserDialog';
import { DeleteUserDialog } from './DeleteUserDialog';
import { PersonnelDetailView } from '../personnel/PersonnelDetailView';
import { useNavigate } from 'react-router-dom';

export const PersonnelManagement = () => {
  const navigate = useNavigate();
  const [personnelList, setPersonnelList] = useState(initialPersonnel);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDetailView, setShowDetailView] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Personnel | null>(null);

  const handleAddUser = (userData: {
    name: string;
    role: any;
    specialty?: string;
    phone: string;
    email: string;
  }) => {
    const newUser: Personnel = {
      id: (personnelList.length + 1).toString(),
      name: userData.name,
      role: userData.role,
      specialty: userData.specialty,
      avatar: `https://i.pravatar.cc/150?u=${userData.name.toLowerCase().replace(' ', '')}`,
      online: false,
      phone: userData.phone,
      email: userData.email,
    };
    
    setPersonnelList([...personnelList, newUser]);
  };

  const handleEditUser = (id: string, userData: Partial<Personnel>) => {
    setPersonnelList(personnelList.map(person => 
      person.id === id ? { ...person, ...userData } : person
    ));
  };

  const handleDeleteUser = (id: string) => {
    setPersonnelList(personnelList.filter(person => person.id !== id));
  };

  const handleEditClick = (user: Personnel) => {
    setSelectedUser(user);
    setShowEditDialog(true);
  };

  const handleDeleteClick = (user: Personnel) => {
    setSelectedUser(user);
    setShowDeleteDialog(true);
  };

  const handleViewClick = (user: Personnel) => {
    setSelectedUser(user);
    setShowDetailView(true);
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
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => navigate('/personal')}
            className="bg-brand-light hover:bg-brand-light/80"
          >
            <Users className="w-4 h-4 mr-2" />
            Ver Personal Completo
          </Button>
          <Button onClick={() => setShowAddDialog(true)} className="bg-brand-blue hover:bg-brand-blue/90">
            <UserPlus className="w-4 h-4 mr-2" />
            Agregar Usuario
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="w-4 h-4 text-brand-blue" />
              Personal Activo ({personnelList.length})
            </CardTitle>
            <CardDescription>
              Lista completa del personal con sus roles y estados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {personnelList.map((person) => (
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
                      onClick={() => handleViewClick(person)}
                    >
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditClick(person)}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteClick(person)}
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

      <AddUserDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAddUser={handleAddUser}
      />

      <EditUserDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        user={selectedUser}
        onEditUser={handleEditUser}
      />

      <DeleteUserDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        user={selectedUser}
        onDeleteUser={handleDeleteUser}
      />

      {showDetailView && selectedUser && (
        <PersonnelDetailView
          person={selectedUser}
          onClose={() => setShowDetailView(false)}
        />
      )}
    </div>
  );
};
