
# Documentación de APIs y Servicios

## Arquitectura de Servicios

### Capas de Abstracción

```
UI Layer (Components)
    ↓
Custom Hooks Layer
    ↓
Service Layer
    ↓
Data Layer (TanStack Query + Zustand)
```

## Servicios Principales

### StatisticsService
Servicio centralizado para obtener estadísticas de la clínica.

```typescript
// Funciones principales
getPatientStatistics(): PatientStats
getPersonnelStatistics(): PersonnelStats
getAppointmentStatistics(): AppointmentStats
getFinancialStatistics(): FinancialStats
```

**Ejemplo de uso:**
```typescript
import { getPatientStatistics } from '@/services/statisticsService';

const stats = getPatientStatistics();
console.log(`Total patients: ${stats.total}`);
```

### PatientService
Gestión completa de pacientes (pendiente implementación completa).

```typescript
// Operaciones CRUD
getPatients(filters?: PatientFilters): Promise<Patient[]>
getPatient(id: string): Promise<Patient>
createPatient(patient: CreatePatientData): Promise<Patient>
updatePatient(id: string, data: UpdatePatientData): Promise<Patient>
deletePatient(id: string): Promise<void>

// Operaciones especializadas
searchPatients(query: string): Promise<Patient[]>
getPatientHistory(id: string): Promise<PatientHistory[]>
```

### SystemConfigService
Gestión de configuración del sistema.

```typescript
// Configuración principal
getConfig(): SystemConfig
updateConfig(config: Partial<SystemConfig>): void

// Configuraciones específicas
getFinancialSectionConfig(): FinancialConfig
getDashboardConfig(): DashboardConfig
```

**Configuraciones disponibles:**
```typescript
interface SystemConfig {
  institutionType: 'small_clinic' | 'medium_clinic' | 'large_hospital';
  enabledSections: {
    patients: boolean;
    personnel: boolean;
    appointments: boolean;
    financial: boolean;
    operational: boolean;
  };
  theme: 'light' | 'dark';
  language: 'es' | 'en';
}
```

## Calculadores de Estadísticas

### PatientStatsCalculator
Calculador especializado para estadísticas de pacientes.

```typescript
class PatientStatsCalculator {
  static calculate(): PatientStats {
    // Implementación del cálculo
  }
}
```

**Resultado:**
```typescript
interface PatientStats {
  total: number;
  healthy: number;
  inTreatment: number;
  critical: number;
  newThisMonth: number;
  byGender: { male: number; female: number };
  byInsurance: InsuranceBreakdown;
}
```

### PersonnelStatsCalculator
Calculador para estadísticas de personal médico.

```typescript
interface PersonnelStats {
  total: number;
  doctors: number;
  nurses: number;
  technicians: number;
  administrative: number;
  radiologists: number;
  online: number;
  bySpecialty: Record<string, number>;
}
```

### AppointmentStatsCalculator
Calculador para estadísticas de citas.

```typescript
interface AppointmentStats {
  total: number;
  completed: number;
  scheduled: number;
  cancelled: number;
  rescheduled: number;
  completionRate: number;
  monthlyTrend: MonthlyTrendData[];
}
```

### FinancialStatsCalculator
Calculador para métricas financieras.

```typescript
interface FinancialStats {
  revenue: MonthlyRevenueData[];
  byInsurance: InsuranceFinancialBreakdown[];
}
```

## Custom Hooks para Datos

### usePatients
Hook optimizado para gestión de pacientes.

```typescript
const usePatients = (filters?: PatientFilters) => {
  // TanStack Query con cache optimizado
  return useQuery({
    queryKey: ['patients', filters],
    queryFn: () => getPatients(filters),
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000,   // 10 minutos
  });
};
```

**Filtros disponibles:**
```typescript
interface PatientFilters {
  searchTerm?: string;
  specialty?: string;
  status?: string;
  insuranceType?: string;
  dateRange?: { from: Date; to: Date };
}
```

### useStatistics
Hooks especializados para estadísticas.

```typescript
// Hooks individuales
usePatientStatistics(): UseQueryResult<PatientStats>
usePersonnelStatistics(): UseQueryResult<PersonnelStats>
useAppointmentStatistics(): UseQueryResult<AppointmentStats>
useFinancialStatistics(): UseQueryResult<FinancialStats>

// Hook combinado para dashboard
useStatisticsOverview(): {
  patient: UseQueryResult<PatientStats>;
  personnel: UseQueryResult<PersonnelStats>;
  appointment: UseQueryResult<AppointmentStats>;
  isLoading: boolean;
  error: Error | null;
}
```

### useOptimizedQueries
Hook para múltiples queries coordinadas.

```typescript
const useOptimizedQueries = <T>(
  queries: Array<UseQueryOptions & { key: keyof T }>
) => {
  return {
    data: T; // Datos combinados
    isLoading: boolean;
    hasError: boolean;
    errors: Error[];
    results: UseQueryResult[];
  };
};
```

## Gestión de Estado

### Zustand Stores

#### useGlobalState
Estado global de la aplicación.

```typescript
interface GlobalState {
  // Estado de carga
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  
  // Datos generales
  lastDataRefresh: Date | null;
  refreshData: () => void;
  
  // Configuración
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
}
```

#### useNotificationState
Sistema de notificaciones.

```typescript
interface NotificationState {
  notifications: AppNotification[];
  addNotification: (notification: Omit<AppNotification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
  markAsRead: (id: string) => void;
}

interface AppNotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  timestamp: Date;
  read: boolean;
}
```

#### useUserPreferences
Preferencias del usuario.

```typescript
interface UserPreferences {
  theme: 'light' | 'dark';
  language: 'es' | 'en';
  dashboardLayout: DashboardLayout;
  notificationSettings: NotificationSettings;
  
  updateTheme: (theme: Theme) => void;
  updateLanguage: (language: Language) => void;
  updateDashboardLayout: (layout: DashboardLayout) => void;
}
```

## Validación y Tipos

### ValidationRules
Reglas de validación reutilizables.

```typescript
const ValidationRules = {
  email: (email: string) => boolean;
  phone: (phone: string) => boolean;
  required: (value: any) => boolean;
  minLength: (min: number) => (value: string) => boolean;
  maxLength: (max: number) => (value: string) => boolean;
};
```

### useValidation
Hook para validación de formularios.

```typescript
const useValidation = <T>(
  schema: ValidationSchema<T>
) => {
  validate: (data: T) => ValidationResult;
  validateField: (field: keyof T, value: any) => FieldValidationResult;
  isValid: boolean;
  errors: ValidationErrors<T>;
};
```

## Factory Patterns

### StatisticsFactory
Factory para crear datos de estadísticas consistentes.

```typescript
class StatisticsFactory {
  static createEmptyPatientStats(): PatientStats;
  static createEmptyPersonnelStats(): PersonnelStats;
  static createEmptyAppointmentStats(): AppointmentStats;
  static createEmptyFinancialStats(): FinancialStats;
  
  static createMockPatientStats(): PatientStats;
  static createMockPersonnelStats(): PersonnelStats;
  // ... otros métodos mock
}
```

## Configuración de TanStack Query

### Query Keys
Estructura consistente para las claves de cache.

```typescript
const QueryKeys = {
  // Pacientes
  patients: ['patients'] as const,
  patient: (id: string) => ['patients', id] as const,
  patientSearch: (query: string) => ['patients', 'search', query] as const,
  
  // Estadísticas
  patientStats: ['statistics', 'patients'] as const,
  personnelStats: ['statistics', 'personnel'] as const,
  appointmentStats: ['statistics', 'appointments'] as const,
  financialStats: ['statistics', 'financial'] as const,
};
```

### Configuración de Cache
Estrategias de cache por tipo de dato.

```typescript
const CacheConfig = {
  // Datos frecuentemente actualizados
  realtime: {
    staleTime: 30 * 1000,      // 30 segundos
    gcTime: 2 * 60 * 1000,     // 2 minutos
  },
  
  // Datos medianamente actualizados
  frequent: {
    staleTime: 5 * 60 * 1000,  // 5 minutos
    gcTime: 10 * 60 * 1000,    // 10 minutos
  },
  
  // Datos poco actualizados
  static: {
    staleTime: 30 * 60 * 1000, // 30 minutos
    gcTime: 60 * 60 * 1000,    // 1 hora
  },
};
```

## Patrones de Error Handling

### Error Types
Tipos de errores categorizados.

```typescript
interface ApiError {
  code: string;
  message: string;
  details?: any;
}

type ErrorCategory = 
  | 'NETWORK_ERROR'
  | 'VALIDATION_ERROR'
  | 'PERMISSION_ERROR'
  | 'NOT_FOUND_ERROR'
  | 'SERVER_ERROR';
```

### Error Boundaries (Pendiente)
Componentes para captura de errores.

```typescript
// Error boundary para APIs
<ApiErrorBoundary fallback={<ErrorFallback />}>
  <DataComponent />
</ApiErrorBoundary>

// Error boundary para lazy loading
<LazyErrorBoundary fallback={<LazyLoadingError />}>
  <Suspense fallback={<Loading />}>
    <LazyComponent />
  </Suspense>
</LazyErrorBoundary>
```

## Performance Optimizations

### Cache Strategies
Estrategias de cache inteligente.

```typescript
// Cache con invalidación automática
const useSmartCache = (
  key: string,
  dependencies: any[],
  ttl: number = 5 * 60 * 1000
) => {
  // Configuración dinámica basada en dependencias
};

// Prefetching estratégico
const usePrefetchData = (condition: boolean) => {
  // Prefetch cuando sea probable que se necesiten los datos
};
```

### Batching de Requests
Agrupación de múltiples requests.

```typescript
// Batch de queries relacionadas
const useBatchedQueries = (queryConfigs: QueryConfig[]) => {
  // Ejecuta múltiples queries de forma optimizada
};
```

## Testing APIs (Pendiente)

### Mock Services
Servicios mock para testing.

```typescript
// Mock del PatientService
const mockPatientService = {
  getPatients: jest.fn(),
  getPatient: jest.fn(),
  createPatient: jest.fn(),
  // ...
};

// Mock data factories
const createMockPatient = (overrides?: Partial<Patient>): Patient => {
  // ...
};
```

### API Testing Patterns
Patrones para testing de APIs.

```typescript
// Test de hook de datos
describe('usePatients', () => {
  test('fetches patients successfully', async () => {
    // Setup mock
    // Execute hook
    // Assert results
  });
  
  test('handles error states', async () => {
    // Test error scenarios
  });
});
```

---

**Última actualización:** 18 de junio, 2025  
**Mantenido por:** Equipo de desarrollo
