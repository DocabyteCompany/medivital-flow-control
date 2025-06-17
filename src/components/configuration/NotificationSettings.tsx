
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Bell, Mail, Clock, Pill } from 'lucide-react';
import { getUserConfiguration, saveUserConfiguration, NotificationSettings as NotificationSettingsType } from '@/services/configurationService';
import { useToast } from '@/components/ui/use-toast';

export const NotificationSettings = () => {
  const [settings, setSettings] = useState<NotificationSettingsType>({
    appointmentReminders: true,
    messageAlerts: true,
    medicationReminders: true,
    emailNotifications: false,
  });
  const { toast } = useToast();

  useEffect(() => {
    const config = getUserConfiguration();
    setSettings(config.notifications);
  }, []);

  const handleSettingChange = (key: keyof NotificationSettingsType, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
  };

  const handleSave = () => {
    saveUserConfiguration({ notifications: settings });
    toast({
      title: "Configuración guardada",
      description: "Tus preferencias de notificaciones han sido actualizadas.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-brand-dark mb-2">Configuración de Notificaciones</h3>
        <p className="text-gray-600">Personaliza cómo y cuándo quieres recibir notificaciones.</p>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-blue" />
              Recordatorios de Citas
            </CardTitle>
            <CardDescription>
              Recibe notificaciones sobre citas próximas y confirmaciones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Switch
                id="appointment-reminders"
                checked={settings.appointmentReminders}
                onCheckedChange={(checked) => handleSettingChange('appointmentReminders', checked)}
              />
              <Label htmlFor="appointment-reminders">Activar recordatorios de citas</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="w-4 h-4 text-brand-blue" />
              Alertas de Mensajes
            </CardTitle>
            <CardDescription>
              Notificaciones cuando recibas nuevos mensajes de colegas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Switch
                id="message-alerts"
                checked={settings.messageAlerts}
                onCheckedChange={(checked) => handleSettingChange('messageAlerts', checked)}
              />
              <Label htmlFor="message-alerts">Activar alertas de mensajes</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Pill className="w-4 h-4 text-brand-blue" />
              Recordatorios de Medicamentos
            </CardTitle>
            <CardDescription>
              Alertas para medicamentos y tratamientos de pacientes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Switch
                id="medication-reminders"
                checked={settings.medicationReminders}
                onCheckedChange={(checked) => handleSettingChange('medicationReminders', checked)}
              />
              <Label htmlFor="medication-reminders">Activar recordatorios de medicamentos</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Mail className="w-4 h-4 text-brand-blue" />
              Notificaciones por Email
            </CardTitle>
            <CardDescription>
              Recibe resúmenes y notificaciones importantes por correo electrónico
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Switch
                id="email-notifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
              />
              <Label htmlFor="email-notifications">Activar notificaciones por email</Label>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={handleSave} className="bg-brand-blue hover:bg-brand-blue/90">
          Guardar Configuración
        </Button>
      </div>
    </div>
  );
};
