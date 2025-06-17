
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Bell, Calendar, Bot, Users, Database } from 'lucide-react';
import { useRole } from '@/contexts/RoleContext';
import { NotificationSettings } from '@/components/configuration/NotificationSettings';
import { ScheduleSettings } from '@/components/configuration/ScheduleSettings';
import { AIToolsSettings } from '@/components/configuration/AIToolsSettings';
import { PersonnelManagement } from '@/components/configuration/PersonnelManagement';
import { SystemSettings } from '@/components/configuration/SystemSettings';
import { DoctorScheduleManagement } from '@/components/configuration/DoctorScheduleManagement';

const Configuracion = () => {
  const { selectedRole } = useRole();

  return (
    <div className="flex flex-col gap-6 mt-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark flex items-center gap-2">
            <Settings className="w-6 h-6 text-brand-blue" />
            Configuración
          </h1>
          <p className="text-gray-600 mt-1">
            Personaliza tu experiencia en MediApp según tus preferencias
          </p>
        </div>
      </div>

      {/* Tabs para diferentes configuraciones */}
      <Tabs defaultValue="notificaciones" className="w-full">
        <TabsList className={`grid w-full ${selectedRole === 'Admin' ? 'grid-cols-5' : 'grid-cols-3'}`}>
          <TabsTrigger value="notificaciones" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notificaciones
          </TabsTrigger>
          <TabsTrigger value="agenda" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {selectedRole === 'Admin' ? 'Horarios' : 'Mi Agenda'}
          </TabsTrigger>
          <TabsTrigger value="ia" className="flex items-center gap-2">
            <Bot className="w-4 h-4" />
            Herramientas IA
          </TabsTrigger>
          {selectedRole === 'Admin' && (
            <>
              <TabsTrigger value="personal" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Personal
              </TabsTrigger>
              <TabsTrigger value="sistema" className="flex items-center gap-2">
                <Database className="w-4 h-4" />
                Sistema
              </TabsTrigger>
            </>
          )}
        </TabsList>

        <TabsContent value="notificaciones" className="mt-6">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="agenda" className="mt-6">
          {selectedRole === 'Admin' ? (
            <DoctorScheduleManagement />
          ) : (
            <ScheduleSettings />
          )}
        </TabsContent>

        <TabsContent value="ia" className="mt-6">
          <AIToolsSettings />
        </TabsContent>

        {selectedRole === 'Admin' && (
          <>
            <TabsContent value="personal" className="mt-6">
              <PersonnelManagement />
            </TabsContent>

            <TabsContent value="sistema" className="mt-6">
              <SystemSettings />
            </TabsContent>
          </>
        )}
      </Tabs>

      {/* Información del rol */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <div className="flex items-center gap-2 text-blue-800">
          <Settings className="w-4 h-4" />
          <span className="font-medium">Configuración para {selectedRole}</span>
        </div>
        <p className="text-sm text-blue-700 mt-1">
          {selectedRole === 'Admin' 
            ? 'Como administrador, puedes gestionar personal y proponer cambios de horarios a los doctores. También tienes acceso a la configuración del sistema.'
            : 'Como doctor, puedes personalizar tus notificaciones, configurar tu agenda personal y ajustar las herramientas de trabajo.'
          }
        </p>
      </div>
    </div>
  );
};

export default Configuracion;
