
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bot, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAIContext } from '@/hooks/useAIContext';
import { useAIPermissions } from '@/hooks/useAIPermissions';
import { getContextualActions, FABAction } from './FABActionDefinitions';

type FABState = 'collapsed' | 'expanded' | 'loading' | 'disabled';

export const ContextualAIFab = () => {
  const [state, setState] = useState<FABState>('collapsed');
  const context = useAIContext();
  const { canPerformAction } = useAIPermissions(context);

  const contextualActions = getContextualActions(context, canPerformAction);
  const hasActions = contextualActions.length > 0;

  const toggleFAB = () => {
    if (state === 'disabled' || state === 'loading') return;
    setState(state === 'collapsed' ? 'expanded' : 'collapsed');
  };

  const handleActionClick = (action: FABAction) => {
    setState('loading');
    console.log(`Executing AI action: ${action.id} (${action.label}) in context:`, context);
    
    // Simular acción
    setTimeout(() => {
      setState('collapsed');
    }, 1000);
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
                  "animate-scale-in min-w-[160px] justify-start"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => handleActionClick(action)}
              >
                {action.label}
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
            state === 'disabled' && "opacity-50 cursor-not-allowed"
          )}
          onClick={toggleFAB}
          disabled={state === 'disabled' || state === 'loading'}
        >
          {state === 'expanded' ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Bot className={cn(
              "w-6 h-6 text-white transition-transform duration-300",
              state === 'loading' && "animate-spin"
            )} />
          )}
        </Button>
      </div>
    </div>
  );
};
