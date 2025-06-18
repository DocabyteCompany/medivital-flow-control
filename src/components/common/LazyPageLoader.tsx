
import { Suspense, ComponentType } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

interface LazyPageLoaderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

// Componente de fallback por defecto para páginas
const DefaultPageSkeleton = () => (
  <div className="flex flex-col gap-6 mt-4">
    {/* Header skeleton */}
    <div className="flex justify-between items-center">
      <div>
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>
      <Skeleton className="h-10 w-32" />
    </div>
    
    {/* Content skeletons */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-6">
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <Skeleton className="h-32 w-full mt-4" />
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export const LazyPageLoader = ({ children, fallback }: LazyPageLoaderProps) => {
  return (
    <Suspense fallback={fallback || <DefaultPageSkeleton />}>
      {children}
    </Suspense>
  );
};

// HOC para envolver páginas con lazy loading
export const withLazyLoading = <T extends object>(
  WrappedComponent: ComponentType<T>,
  customFallback?: React.ReactNode
) => {
  const LazyWrappedComponent = (props: T) => (
    <LazyPageLoader fallback={customFallback}>
      <WrappedComponent {...props} />
    </LazyPageLoader>
  );

  LazyWrappedComponent.displayName = `LazyLoaded(${WrappedComponent.displayName || WrappedComponent.name})`;
  
  return LazyWrappedComponent;
};
