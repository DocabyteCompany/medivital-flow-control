
interface MetricItem {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: string;
}

interface MetricsGridProps {
  metrics: MetricItem[];
  columns?: number;
}

export const MetricsGrid = ({ metrics, columns = 4 }: MetricsGridProps) => {
  const getColorClasses = (color?: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-50 text-blue-700';
      case 'green': return 'bg-green-50 text-green-700';
      case 'yellow': return 'bg-yellow-50 text-yellow-700';
      case 'red': return 'bg-red-50 text-red-700';
      case 'purple': return 'bg-purple-50 text-purple-700';
      case 'orange': return 'bg-orange-50 text-orange-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-5'
  }[columns] || 'grid-cols-2 md:grid-cols-4';

  return (
    <div className={`grid ${gridCols} gap-4`}>
      {metrics.map((metric, index) => (
        <div key={index} className={`text-center p-4 rounded-lg transition-all duration-300 hover:scale-105 ${getColorClasses(metric.color)}`}>
          {metric.icon && <div className="mx-auto mb-1">{metric.icon}</div>}
          <div className="text-2xl font-bold">{metric.value}</div>
          <div className="text-sm">{metric.title}</div>
        </div>
      ))}
    </div>
  );
};
