
# Arquitectura del Sistema de Clínica

## Visión General

Este sistema de gestión clínica está construido con React, TypeScript y un conjunto de tecnologías modernas enfocadas en performance, mantenibilidad y escalabilidad.

## Stack Tecnológico

### Frontend Core
- **React 18** - Biblioteca principal con Concurrent Features
- **TypeScript** - Tipado estático para mayor seguridad
- **Vite** - Build tool y dev server optimizado
- **React Router DOM** - Navegación del lado del cliente

### UI y Estilos
- **Tailwind CSS** - Framework de utilidades CSS
- **Shadcn/UI** - Componentes pre-construidos accesibles
- **Lucide React** - Iconografía consistente
- **Recharts** - Visualización de datos y gráficos

### Gestión de Estado
- **Zustand** - Estado global ligero y performante
- **TanStack Query (React Query)** - Estado del servidor y cache
- **React Hook Form** - Gestión de formularios
- **Context API** - Estado específico de contexto

### Performance y Optimización
- **React.memo** - Memoización de componentes
- **React.lazy** - Code splitting automático
- **React Window** - Virtual scrolling para listas grandes
- **useMemo/useCallback** - Optimización de re-renders

## Arquitectura de Carpetas

```
src/
├── components/           # Componentes React organizados por dominio
│   ├── common/          # Componentes base reutilizables
│   ├── performance/     # Componentes optimizados con memo
│   ├── statistics/      # Widgets de estadísticas
│   ├── dashboard/       # Componentes del dashboard
│   ├── patients/        # Gestión de pacientes
│   ├── personnel/       # Gestión de personal
│   └── ui/             # Componentes primitivos de Shadcn
├── hooks/              # Custom hooks organizados por funcionalidad
├── stores/             # Estado global con Zustand
├── contexts/           # React Contexts para estado específico
├── services/           # Lógica de negocio y APIs
├── types/              # Definiciones de TypeScript
├── data/               # Datos mock y constantes
├── utils/              # Funciones utilitarias
└── config/             # Configuración del sistema
```

## Patrones de Diseño Utilizados

### 1. Component Composition Pattern
- Componentes base que se componen para crear funcionalidades complejas
- Ejemplo: `BaseStatsCard` + específicos = `PatientStatsWidget`

### 2. Custom Hooks Pattern
- Encapsulación de lógica reutilizable en hooks personalizados
- Separación de concerns entre UI y lógica de negocio

### 3. Factory Pattern
- `StatisticsFactory` para crear datos mock consistentes
- Facilita testing y desarrollo

### 4. Provider Pattern
- `ConfigurationProvider` para configuración global
- Contextos específicos para estado compartido

### 5. Memoization Pattern
- Componentes memoizados para optimización de performance
- Cache inteligente con TanStack Query

## Flujo de Datos

### Estado Global (Zustand)
```typescript
useGlobalState     // Estado general de la aplicación
useUserPreferences // Configuración del usuario
useNotificationState // Sistema de notificaciones
```

### Estado del Servidor (TanStack Query)
```typescript
usePatients       // Datos de pacientes con cache
useStatistics     // Estadísticas optimizadas
useOptimizedQueries // Múltiples queries coordinadas
```

### Estado Local
```typescript
useState          // Estado específico del componente
useLocalFilters   // Filtros locales reutilizables
```

## Optimizaciones de Performance

### 1. Code Splitting
- Lazy loading de páginas principales
- Suspense boundaries con skeletons informativos
- HOC `withLazyLoading` para envolver páginas

### 2. Memoización
- `React.memo` en componentes de estadísticas pesados
- `useMemo` para cálculos complejos
- `useCallback` para funciones estables

### 3. Virtual Scrolling
- `VirtualScrollList` para listas de >1000 elementos
- Soporte integrado para filtrado y búsqueda

### 4. Cache Inteligente
- TanStack Query con `staleTime` y `gcTime` optimizados
- Invalidación selectiva de cache
- Prefetching estratégico

## Convenciones de Código

### Nombres de Archivos
- **Componentes**: PascalCase (`PatientCard.tsx`)
- **Hooks**: camelCase con prefijo `use` (`usePatients.ts`)
- **Servicios**: PascalCase con sufijo `Service` (`PatientService.ts`)
- **Tipos**: PascalCase (`Patient.ts`)

### Estructura de Componentes
```typescript
// 1. Imports
import { ... } from 'react';
import { ... } from '@/components/ui';

// 2. Types/Interfaces
interface ComponentProps {
  // ...
}

// 3. Component
export const Component = ({ props }: ComponentProps) => {
  // 4. Hooks y estado
  // 5. Funciones auxiliares
  // 6. Effects
  // 7. Render
};
```

### Organización de Hooks
```typescript
// 1. React hooks básicos
const [state, setState] = useState();

// 2. Custom hooks
const { data } = usePatients();

// 3. Memoized values
const memoizedValue = useMemo(() => {}, [deps]);

// 4. Callbacks
const handleClick = useCallback(() => {}, [deps]);
```

## Gestión de Errores

### Boundaries de Error
- Suspense boundaries para lazy loading
- Error boundaries para captura de errores (pendiente)

### Manejo de Estados de Carga
- Skeletons consistentes con `StatsSkeleton`
- Estados de loading coordinados
- Fallbacks informativos

## Accesibilidad

### Estándares Seguidos
- ARIA labels en componentes interactivos
- Navegación por teclado
- Contraste de colores apropiado
- Estructura semántica HTML

### Herramientas
- Shadcn/UI components con accesibilidad integrada
- Lucide React icons con labels apropados

## Configuración del Sistema

### Tipos de Institución
```typescript
'small_clinic'    // Clínica pequeña
'medium_clinic'   // Clínica mediana  
'large_hospital'  // Hospital grande
```

### Secciones Configurables
- Pacientes, Personal, Citas
- Financiero (configurable según tipo)
- Métricas operativas

## Testing Strategy (Pendiente)

### Niveles de Testing
1. **Unit Tests** - Hooks y utilidades
2. **Integration Tests** - Componentes complejos
3. **E2E Tests** - Flujos principales

### Herramientas Planificadas
- Jest + React Testing Library
- Playwright para E2E
- MSW para mocking de APIs

## Métricas y Monitoreo

### Performance Metrics
- Bundle size analysis
- Lighthouse scores
- Core Web Vitals

### Development Metrics
- TypeScript strict mode
- ESLint compliance
- Component coupling analysis

---

**Última actualización:** 18 de junio, 2025  
**Mantenido por:** Equipo de desarrollo
