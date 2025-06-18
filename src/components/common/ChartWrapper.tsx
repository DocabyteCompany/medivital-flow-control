
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ResponsiveContainer } from 'recharts';
import { ReactElement, JSXElementConstructor } from 'react';

interface ChartWrapperProps {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  config: Record<string, { label: string; color: string }>;
  height?: number;
  className?: string;
}

export const ChartWrapper = ({ 
  children, 
  config, 
  height = 250,
  className = '' 
}: ChartWrapperProps) => {
  return (
    <ChartContainer config={config} className={className}>
      <ResponsiveContainer width="100%" height={height}>
        {children}
      </ResponsiveContainer>
    </ChartContainer>
  );
};
