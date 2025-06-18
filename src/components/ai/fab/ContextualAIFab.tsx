
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bot, X, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAIContext } from '@/hooks/useAIContext';
import { useAIPermissions } from '@/hooks/useAIPermissions';
import { useActivities } from '@/contexts/ActivityContext';
import { getContextualActions, FABAction } from './FABActionDefinitions';
import { FABActionService } from '@/services/ai/FABActionService';
import { useToast } from '@/components/ui/use-toast';

type FABState = 'collapsed' | 'expanded' | 'loading' | 'success' | 'error';

export const ContextualAIFab = () => {
  const [state, setState] = useState<FABState>('collapsed');
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  
  const context = useAIContext();
  const { canPerformAction, role } = useAIPermissions(context);
  const { addActivity } = useActivities();
  const { toast } = useToast();

  const contextualActions = getContextualActions(context, canPerformAction);
  const hasActions = contextualActions.length > 0;

  const toggleFAB = () => {
    if (state === 'loading') return;
    setState(state === 'collapsed' ? 'expanded' : 'collapsed');
  };

  const handleActionClick = async (action: FABAction) => {
    setLoadingAction(action.id);
    setState('loading');

    try {
      // Ejecutar la acción a través del servicio
      const result = await FABActionService.executeAction(action, context, role);

      if (result.success) {
        // Agregar actividad al contexto global
        addActivity({
          type: getActivityType(action.id),
          title: action.label,
          description: result.message,
          details: {
            accion_ia: action.id,
            contexto: context.currentPage,
            rol: role,
            resultado: result.data,
            ejecutado_desde: 'FAB'
          }
        });

        // Mostrar toast de éxito
        toast({
          title: "Acción Completada",
          description: result.message,
          duration: 4000
        });

        setState('success');
        
        // Volver a collapsed después de mostrar éxito
        setTimeout(() => {
          setState('collapsed');
        }, 2000);

      } else {
        throw new Error(result.message);
      }

    } catch (error) {
      console.error('Error executing FAB action:', error);
      
      toast({
        title: "Error en Acción IA",
        description: error instanceof Error ? error.message : "Error desconocido",
        variant: "destructive",
        duration: 5000
      });

      setState('error');
      
      // Volver a collapsed después de mostrar error
      setTimeout(() => {
        setState('collapsed');
      }, 3000);
    } finally {
      setLoadingAction(null);
    }
  };

  // Función para mapear acciones a tipos de actividad
  const getActivityType = (actionId: string): 'call' | 'summary' | 'schedule' | 'reminder' | 'follow-up' | 'transcription' | 'referral' | 'patient-intake' => {
    if (actionId.includes('call') || actionId.includes('confirm')) return 'call';
    if (actionId.includes('summary') || actionId.includes('summarize')) return 'summary';
    if (actionId.includes('schedule') || actionId.includes('agenda')) return 'schedule';
    if (actionId.includes('reminder') || actionId.includes('recordatorio')) return 'reminder';
    if (actionId.includes('followup') || actionId.includes('seguimiento')) return 'follow-up';
    if (actionId.includes('transcrib')) return 'transcription';
    if (actionId.includes('referral') || actionId.includes('referencia')) return 'referral';
    if (actionId.includes('intake') || actionId.includes('ingreso')) return 'patient-intake';
    return 'summary'; // default
  };

  if (!hasActions) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Backdrop para cerrar cuando está expandido */}
      {state === 'expanded' && (
        <div 
          className="fixed inset-0 -z-10"
          onClick={() => setState('collapsed')}
        />
      )}

      <div className="flex flex-col items-end gap-3">
        {/* Menu de acciones - solo visible cuando está expandido */}
        {state === 'expanded' && (
          <div className="flex flex-col gap-2 animate-fade-in">
            {contextualActions.map((action, index) => (
              <Button
                key={action.id}
                variant="outline"
                size="sm"
                className={cn(
                  "bg-white shadow-lg border-brand-blue/20 text-brand-blue hover:bg-brand-light",
                  "transform transition-all duration-200",
                  "animate-scale-in min-w-[160px] justify-start",
                  loadingAction === action.id && "opacity-50 cursor-not-allowed"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => handleActionClick(action)}
                disabled={loadingAction === action.id || state === 'loading'}
              >
                {loadingAction === action.id ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin" />
                    Procesando...
                  </div>
                ) : (
                  action.label
                )}
              </Button>
            ))}
          </div>
        )}

        {/* Botón principal del FAB */}
        <Button
          size="lg"
          className={cn(
            "w-14 h-14 rounded-full shadow-lg transition-all duration-300",
            "bg-brand-blue hover:bg-brand-blue/90",
            state === 'expanded' && "rotate-45",
            state === 'loading' && "animate-pulse",
            state === 'success' && "bg-green-500 hover:bg-green-600",
            state === 'error' && "bg-red-500 hover:bg-red-600"
          )}
          onClick={toggleFAB}
          disabled={state === 'loading'}
        >
          {state === 'expanded' ? (
            <X className="w-6 h-6 text-white" />
          ) : state === 'success' ? (
            <CheckCircle className="w-6 h-6 text-white" />
          ) : state === 'error' ? (
            <AlertCircle className="w-6 h-6 text-white" />
          ) : (
            <Bot className={cn(
              "w-6 h-6 text-white transition-transform duration-300",
              state === 'loading' && "animate-spin"
            )} />
          )}
        </Button>

        {/* Contador de acciones disponibles */}
        {state === 'collapsed' && contextualActions.length > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-semibold">
            {contextualActions.length}
          </div>
        )}
      </div>
    </div>
  );
};
