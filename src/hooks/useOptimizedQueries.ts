
import { useQuery, useQueries, UseQueryOptions } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useGlobalState } from '@/stores/globalState';

// Hook para optimizar múltiples queries relacionadas
export const useOptimizedQueries = <T extends Record<string, any>>(
  queries: Array<UseQueryOptions & { key: keyof T }>
) => {
  const { isLoading: globalLoading, setLoading } = useGlobalState();

  const results = useQueries({
    queries: queries.map(query => ({
      ...query,
      onSettled: () => {
        // Actualizar estado global cuando todas las queries terminen
        const allSettled = queries.every(q => 
          query.queryKey && query.queryKey.length > 0
        );
        if (allSettled) {
          setLoading(false);
        }
      }
    }))
  });

  const combinedData = useMemo(() => {
    const data = {} as T;
    results.forEach((result, index) => {
      const key = queries[index].key;
      data[key] = result.data as T[keyof T];
    });
    return data;
  }, [results, queries]);

  const isLoading = results.some(result => result.isLoading) || globalLoading;
  const hasError = results.some(result => result.error);
  const errors = results.filter(result => result.error).map(result => result.error);

  return {
    data: combinedData,
    isLoading,
    hasError,
    errors,
    results
  };
};

// Hook para cache inteligente con invalidación automática
export const useSmartCache = (
  key: string,
  dependencies: any[] = [],
  ttl: number = 5 * 60 * 1000 // 5 minutos por defecto
) => {
  const { lastDataRefresh } = useGlobalState();

  return useMemo(() => {
    const shouldInvalidate = 
      !lastDataRefresh || 
      Date.now() - lastDataRefresh.getTime() > ttl;

    return {
      staleTime: shouldInvalidate ? 0 : ttl,
      gcTime: ttl * 2,
      refetchOnWindowFocus: shouldInvalidate,
      refetchOnReconnect: true
    };
  }, [lastDataRefresh, ttl, ...dependencies]);
};
