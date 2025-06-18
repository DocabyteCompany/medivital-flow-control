
import { lazy } from 'react';

// Lazy loading de páginas principales con chunks específicos
export const LazyEstadisticas = lazy(() => 
  import('@/pages/Estadisticas').then(module => ({
    default: module.default
  }))
);

export const LazyPatients = lazy(() => 
  import('@/pages/Patients').then(module => ({
    default: module.default
  }))
);

export const LazyPersonnel = lazy(() => 
  import('@/pages/Personnel').then(module => ({
    default: module.default
  }))
);

export const LazyAgenda = lazy(() => 
  import('@/pages/Agenda').then(module => ({
    default: module.default
  }))
);

export const LazyMessages = lazy(() => 
  import('@/pages/Messages').then(module => ({
    default: module.default
  }))
);

export const LazyRecords = lazy(() => 
  import('@/pages/Records').then(module => ({
    default: module.default
  }))
);

export const LazyConfiguracion = lazy(() => 
  import('@/pages/Configuracion').then(module => ({
    default: module.default
  }))
);

export const LazyIaActivities = lazy(() => 
  import('@/pages/IaActivities').then(module => ({
    default: module.default
  }))
);

export const LazyDashboard = lazy(() => 
  import('@/pages/Dashboard').then(module => ({
    default: module.default
  }))
);
