
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface StatsSkeletonProps {
  showChart?: boolean;
  showMetrics?: boolean;
  colSpan?: string;
}

export const StatsSkeleton = ({ 
  showChart = true, 
  showMetrics = true,
  colSpan = ""
}: StatsSkeletonProps) => {
  return (
    <Card className={colSpan}>
      <CardHeader>
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-32" />
      </CardHeader>
      <CardContent>
        {showMetrics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center p-4 bg-gray-50 rounded-lg">
                <Skeleton className="h-8 w-16 mx-auto mb-2" />
                <Skeleton className="h-4 w-20 mx-auto" />
              </div>
            ))}
          </div>
        )}
        {showChart && (
          <div className="space-y-4">
            <Skeleton className="h-64 w-full" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
