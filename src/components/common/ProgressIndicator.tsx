
interface ProgressIndicatorProps {
  percentage: number;
  color?: string;
  showPercentage?: boolean;
  height?: string;
  animated?: boolean;
}

export const ProgressIndicator = ({ 
  percentage, 
  color = 'bg-green-600',
  showPercentage = true,
  height = 'h-2',
  animated = true
}: ProgressIndicatorProps) => {
  return (
    <div className="w-full">
      {showPercentage && (
        <div className="text-center mb-2">
          <span className="text-3xl font-bold text-current">
            {percentage.toFixed(1)}%
          </span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${height}`}>
        <div 
          className={`${color} ${height} rounded-full ${animated ? 'transition-all duration-1000 ease-out' : ''}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
};
