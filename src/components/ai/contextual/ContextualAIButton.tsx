
import { Button } from '@/components/ui/button';
import { AIPermissionGuard } from '@/components/ai/permissions/AIPermissionGuard';
import { useAIPermissions, AIPermissions } from '@/hooks/useAIPermissions';
import { ActivityContext } from '@/components/ia/ActivityCard';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContextualAIButtonProps {
  permission: keyof AIPermissions;
  context?: ActivityContext;
  actionType?: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  disabled?: boolean;
}

export const ContextualAIButton = ({
  permission,
  context,
  actionType,
  icon: Icon,
  children,
  onClick,
  variant = "default",
  size = "default",
  className,
  disabled = false
}: ContextualAIButtonProps) => {
  const { canPerformAction } = useAIPermissions(context);
  
  const hasPermission = canPerformAction(permission, actionType);
  const isDisabled = disabled || !hasPermission;

  const ButtonContent = () => (
    <Button
      variant={variant}
      size={size}
      className={cn(className)}
      onClick={onClick}
      disabled={isDisabled}
    >
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </Button>
  );

  return (
    <AIPermissionGuard
      permission={permission}
      context={context}
      actionType={actionType}
      fallback={<ButtonContent />}
    >
      <ButtonContent />
    </AIPermissionGuard>
  );
};
