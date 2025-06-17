
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Settings, Database, Shield, Download, Upload, AlertTriangle } from 'lucide-react';

export const SystemSettings = () => {
  const handleBackup = () => {
    console.log('Iniciando backup del sistema');
  };

  const handleRestore = () => {
    console.log('Iniciando restauración');
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-brand-dark mb-2">Configuración del Sistema</h3>
        <p className="text-gray-600">Configuraciones globales y administración del sistema MediApp.</p>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Settings className="w-4 h-4 text-brand-blue" />
              Configuración General
            </CardTitle>
            <CardDescription>
              Ajustes generales de la clínica y el sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="clinic-name">Nombre de la Clínica</Label>
                <Input 
                  id="clinic-name" 
                  defaultValue="MediApp Clínica"
                  placeholder="Nombre de tu clínica" 
                />
              </div>
              <div>
                <Label htmlFor="clinic-address">Dirección</Label>
                <Input 
                  id="clinic-address" 
                  placeholder="Dirección de la clínica" 
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="clinic-phone">Teléfono Principal</Label>
                <Input 
                  id="clinic-phone" 
                  placeholder="+1 (555) 123-4567" 
                />
              </div>
              <div>
                <Label htmlFor="clinic-email">Email de Contacto</Label>
                <Input 
                  id="clinic-email" 
                  type="email"
                  placeholder="contacto@clinica.com" 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="w-4 h-4 text-brand-blue" />
              Configuración de Seguridad
            </CardTitle>
            <CardDescription>
              Políticas de seguridad y acceso al sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Autenticación de dos factores</Label>
                <p className="text-sm text-gray-600">Requerir 2FA para todos los usuarios</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Expiración automática de sesión</Label>
                <p className="text-sm text-gray-600">Cerrar sesión tras 30 minutos de inactividad</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Registro de auditoría</Label>
                <p className="text-sm text-gray-600">Registrar todas las acciones del sistema</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Database className="w-4 h-4 text-brand-blue" />
              Gestión de Datos
            </CardTitle>
            <CardDescription>
              Backup, restauración y gestión de la base de datos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button onClick={handleBackup} variant="outline" className="h-20 flex-col">
                <Download className="w-6 h-6 mb-2" />
                Crear Backup
                <span className="text-xs text-gray-500">Último: 15 Jun 2025</span>
              </Button>
              <Button onClick={handleRestore} variant="outline" className="h-20 flex-col">
                <Upload className="w-6 h-6 mb-2" />
                Restaurar Backup
                <span className="text-xs text-gray-500">Desde archivo</span>
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Backup automático diario</Label>
                <p className="text-sm text-gray-600">Crear respaldo automático a las 2:00 AM</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2 text-orange-800">
              <AlertTriangle className="w-4 h-4" />
              Zona de Peligro
            </CardTitle>
            <CardDescription className="text-orange-700">
              Acciones irreversibles que afectan todo el sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button variant="destructive" className="w-full">
                Restablecer Configuración de Fábrica
              </Button>
              <p className="text-xs text-orange-700">
                Esta acción eliminará todas las configuraciones personalizadas y restaurará los valores predeterminados.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end pt-4">
        <Button className="bg-brand-blue hover:bg-brand-blue/90">
          Guardar Configuración del Sistema
        </Button>
      </div>
    </div>
  );
};
