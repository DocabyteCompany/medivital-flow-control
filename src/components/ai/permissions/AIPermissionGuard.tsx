
import { ReactNode } from 'react';
import { useAIPermissions, AIPermissions } from '@/hooks/useAIPermissions';
import { ActivityContext } from '@/components/ia/ActivityCard';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useTranslation } from 'react-i18next';

interface AIPermissionGuardProps {
  permission: keyof AIPermissions;
  children: ReactNode;
  context?: ActivityContext;
  actionType?: string;
  fallback?: ReactNode;
  showTooltip?: boolean;
}

export const AIPermissionGuard = ({ 
  permission, 
  children, 
  context, 
  actionType,
  fallback = null,
  showTooltip = true
}: AIPermissionGuardProps) => {
  const { canPerformAction, role } = useAIPermissions(context);
  const { t } = useTranslation();
  
  const hasPermission = canPerformAction(permission, actionType);

  if (!hasPermission) {
    if (!showTooltip) return <>{fallback}</>;

    const tooltipMessage = t(`permissions.ai.${permission}.denied.${role}`, 
      `No tienes permisos para realizar esta acción como ${role}`);

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="opacity-50 cursor-not-allowed">
              {fallback || children}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltipMessage}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return <>{children}</>;
};
