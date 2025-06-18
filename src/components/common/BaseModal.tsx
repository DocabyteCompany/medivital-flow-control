
import { ReactNode } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LucideIcon, X } from 'lucide-react';

interface BaseModalProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  iconColor?: string;
  trigger?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  preventClose?: boolean;
  className?: string;
}

export const BaseModal = ({
  title,
  description,
  icon: Icon,
  iconColor = 'text-brand-blue',
  trigger,
  children,
  footer,
  open,
  onOpenChange,
  size = 'md',
  showCloseButton = true,
  preventClose = false,
  className = ''
}: BaseModalProps) => {
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[95vw] max-h-[95vh]'
  };

  const handleClose = () => {
    if (!preventClose && onOpenChange) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent 
        className={`${sizeClasses[size]} ${className}`}
        onPointerDownOutside={preventClose ? (e) => e.preventDefault() : undefined}
        onEscapeKeyDown={preventClose ? (e) => e.preventDefault() : undefined}
      >
        {(title || description || showCloseButton) && (
          <DialogHeader className="relative">
            {(title || Icon) && (
              <DialogTitle className="flex items-center gap-2">
                {Icon && <Icon className={`w-5 h-5 ${iconColor}`} />}
                {title}
              </DialogTitle>
            )}
            {description && <DialogDescription>{description}</DialogDescription>}
            {showCloseButton && !preventClose && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-6 w-6"
                onClick={handleClose}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </DialogHeader>
        )}
        
        <div className="py-4">
          {children}
        </div>

        {footer && (
          <DialogFooter>
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
