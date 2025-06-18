
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, BellRing, Check, X, Clock, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SmartNotification {
  id: string;
  type: 'reminder' | 'alert' | 'insight' | 'action_required';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  timestamp: Date;
  read: boolean;
  actionable: boolean;
  context?: {
    patientId?: string;
    appointmentId?: string;
    relatedAction?: string;
  };
}

interface IntelligentNotificationsProps {
  userRole: 'Doctor' | 'Admin';
}

export const IntelligentNotifications = ({ userRole }: IntelligentNotificationsProps) => {
  const [notifications, setNotifications] = useState<SmartNotification[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Generar notificaciones inteligentes basadas en el rol
    const generateNotifications = () => {
      const baseNotifications: SmartNotification[] = [
        {
          id: '1',
          type: 'reminder',
          title: 'Cita en 15 minutos',
          message: 'María González - Consulta de seguimiento',
          priority: 'medium',
          timestamp: new Date(Date.now() - 5 * 60 * 1000),
          read: false,
          actionable: true,
          context: { patientId: 'PAT-001', appointmentId: 'APT-001' }
        },
        {
          id: '2',
          type: 'alert',
          title: 'Paciente de alto riesgo',
          message: 'Carlos Ruiz ha faltado a 2 citas consecutivas',
          priority: 'high',
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          read: false,
          actionable: true,
          context: { patientId: 'PAT-002' }
        },
        {
          id: '3',
          type: 'insight',
          title: 'Patrón detectado',
          message: 'Aumento del 20% en consultas respiratorias esta semana',
          priority: 'low',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          read: true,
          actionable: false
        }
      ];

      // Agregar notificaciones específicas para Admin
      if (userRole === 'Admin') {
        baseNotifications.push(
          {
            id: '4',
            type: 'action_required',
            title: 'Aprobación pendiente',
            message: '2 acciones de IA requieren tu aprobación',
            priority: 'urgent',
            timestamp: new Date(Date.now() - 10 * 60 * 1000),
            read: false,
            actionable: true,
            context: { relatedAction: 'approval_required' }
          }
        );
      }

      return baseNotifications;
    };

    setNotifications(generateNotifications());

    // Simular notificaciones en tiempo real
    const interval = setInterval(() => {
      const newNotification: SmartNotification = {
        id: Date.now().toString(),
        type: Math.random() > 0.5 ? 'reminder' : 'insight',
        title: 'Nueva notificación',
        message: 'Notificación generada automáticamente por IA',
        priority: 'medium',
        timestamp: new Date(),
        read: false,
        actionable: Math.random() > 0.5
      };

      setNotifications(prev => [newNotification, ...prev.slice(0, 9)]);
    }, 30000); // Nueva notificación cada 30 segundos

    return () => clearInterval(interval);
  }, [userRole]);

  const getPriorityColor = (priority: SmartNotification['priority']) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: SmartNotification['type']) => {
    switch (type) {
      case 'reminder': return <Clock className="h-4 w-4" />;
      case 'alert': return <AlertCircle className="h-4 w-4" />;
      case 'insight': return <BellRing className="h-4 w-4" />;
      case 'action_required': return <Bell className="h-4 w-4" />;
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  };

  const dismissNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    toast({
      title: 'Notificación eliminada',
      description: 'La notificación ha sido eliminada.',
    });
  };

  const takeAction = (notification: SmartNotification) => {
    console.log('Taking action for notification:', notification);
    markAsRead(notification.id);
    
    toast({
      title: 'Acción realizada',
      description: `Procesando: ${notification.title}`,
    });
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-brand-blue" />
            Notificaciones Inteligentes
          </span>
          {unreadCount > 0 && (
            <Badge variant="destructive">
              {unreadCount} nuevas
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {notifications.length === 0 ? (
          <p className="text-sm text-gray-600 text-center py-4">
            No hay notificaciones en este momento
          </p>
        ) : (
          notifications.map(notification => (
            <div 
              key={notification.id} 
              className={`border rounded-lg p-3 ${!notification.read ? 'bg-blue-50 border-blue-200' : 'bg-white'}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getTypeIcon(notification.type)}
                  <h4 className={`text-sm ${!notification.read ? 'font-semibold' : 'font-medium'}`}>
                    {notification.title}
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getPriorityColor(notification.priority)}>
                    {notification.priority}
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => dismissNotification(notification.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <p className="text-xs text-gray-600 mb-2">{notification.message}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {notification.timestamp.toLocaleTimeString()}
                </span>
                
                <div className="flex gap-2">
                  {!notification.read && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <Check className="h-3 w-3 mr-1" />
                      Marcar leída
                    </Button>
                  )}
                  
                  {notification.actionable && (
                    <Button
                      size="sm"
                      onClick={() => takeAction(notification)}
                    >
                      Acción
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
