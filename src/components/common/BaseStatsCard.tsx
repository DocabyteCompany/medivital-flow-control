
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface BaseStatsCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  iconColor?: string;
  children: React.ReactNode;
  className?: string;
  colSpan?: string;
}

export const BaseStatsCard = ({ 
  title, 
  description, 
  icon: Icon, 
  iconColor = 'text-brand-blue',
  children, 
  className = '',
  colSpan = ''
}: BaseStatsCardProps) => {
  return (
    <Card className={`transition-all duration-300 hover:shadow-lg ${colSpan} ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {Icon && <Icon className={`w-5 h-5 ${iconColor}`} />}
          {title}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};
