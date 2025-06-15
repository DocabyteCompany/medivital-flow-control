
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface VitalsCardProps {
  title: string;
  value: string;
  unit: string;
  data: any[];
  strokeColor: string;
  fillColor: string;
}

export const VitalsCard = ({ title, value, unit, data, strokeColor, fillColor }: VitalsCardProps) => {
  // Create a URL-friendly ID from the title to avoid issues with spaces and special characters
  const gradientId = `gradient-${title.replace(/[^a-zA-Z0-9]/g, '-')}`;

  return (
    <Card className="shadow-soft border-0 rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-brand-dark">{value} <span className="text-xs text-gray-400 font-normal">{unit}</span></div>
        <div className="h-20 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={fillColor} stopOpacity={0.4}/>
                  <stop offset="95%" stopColor={fillColor} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="uv" stroke={strokeColor} strokeWidth={2} fillOpacity={1} fill={`url(#${gradientId})`} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
