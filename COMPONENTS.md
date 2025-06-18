
# Guía de Componentes

## Estructura y Organización

### Jerarquía de Componentes

```
components/
├── common/              # Componentes base reutilizables
├── performance/         # Componentes optimizados
├── ui/                 # Primitivos de Shadcn/UI
├── statistics/         # Widgets de estadísticas
├── dashboard/          # Componentes del dashboard
├── patients/           # Gestión de pacientes
├── personnel/          # Gestión de personal
└── [domain]/           # Otros dominios específicos
```

## Componentes Base (`common/`)

### BaseStatsCard
Componente base para todas las tarjetas de estadísticas.

```typescript
interface BaseStatsCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  iconColor?: string;
  colSpan?: string;
  children: React.ReactNode;
}
```

**Uso:**
```tsx
<BaseStatsCard 
  title="Pacientes Totales"
  description="Resumen general"
  icon={Users}
  iconColor="text-blue-600"
>
  <MetricsGrid metrics={metrics} />
</BaseStatsCard>
```

### MetricsGrid
Grid responsivo para mostrar métricas de forma consistente.

```typescript
interface MetricItem {
  title: string;
  value: string | number;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

interface MetricsGridProps {
  metrics: MetricItem[];
  columns?: number;
}
```

### ChartWrapper
Wrapper consistente para gráficos de Recharts.

```typescript
interface ChartWrapperProps {
  children: React.ReactNode;
  config: ChartConfig;
  height?: number;
  className?: string;
}
```

### BaseTable
Tabla base con estilos consistentes y funcionalidad común.

```typescript
interface BaseTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  onRowClick?: (item: T) => void;
  className?: string;
}
```

### BaseModal
Modal base para diálogos consistentes.

```typescript
interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}
```

## Componentes de Performance (`performance/`)

### MemoizedStatsCards
Componentes de estadísticas optimizados con `React.memo`.

```typescript
export const MemoizedPatientStatsWidget = memo(PatientStatsWidget);
export const MemoizedPersonnelStatsWidget = memo(PersonnelStatsWidget);
// ... otros componentes memoizados
```

**Características:**
- Previenen re-renders innecesarios
- DisplayName para debugging
- Optimizados para widgets pesados

### LazyPageLoader
Componente para lazy loading con fallbacks informativos.

```typescript
interface LazyPageLoaderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

// HOC para páginas
export const withLazyLoading = <T extends object>(
  WrappedComponent: ComponentType<T>,
  customFallback?: React.ReactNode
) => LazyWrappedComponent;
```

### VirtualScrollList
Lista virtualizada para grandes cantidades de datos.

```typescript
interface VirtualScrollListProps<T> {
  items: T[];
  itemHeight: number;
  height: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  searchTerm?: string;
  filterFn?: (item: T, searchTerm: string) => boolean;
}
```

**Cuándo usar:**
- Listas con >1000 elementos
- Datos que requieren scrolling pesado
- Cuando la performance es crítica

## Componentes de Estadísticas (`statistics/`)

### PatientStatsWidget
Widget principal para estadísticas de pacientes.

**Estructura:**
```typescript
// Métricas principales
const mainMetrics = [
  { title: 'Total', value: stats.total, color: 'blue' },
  // ...
];

// Subcomponentes especializados
<PatientHealthStatus stats={stats} />
<PatientGenderDistribution stats={stats} />
<PatientInsuranceBreakdown stats={stats} />
```

### PersonnelStatsWidget
Widget para estadísticas de personal médico.

**Subcomponentes:**
- `PersonnelRoleDistribution` - Gráfico de roles
- `PersonnelOnlineStatus` - Estado de disponibilidad
- `PersonnelSpecialtyBreakdown` - Distribución por especialidades

### Patrones de Widgets

**Estructura común:**
```typescript
export const StatsWidget = () => {
  const isLoading = useStatisticsLoading(delay);
  const stats = getStatistics();

  if (isLoading) {
    return <StatsSkeleton {...skeletonProps} />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Componentes específicos */}
    </div>
  );
};
```

## Convenciones de Desarrollo

### Principios de Diseño

1. **Composición sobre Herencia**
   - Componentes pequeños y enfocados
   - Combinación para funcionalidades complejas

2. **Separation of Concerns**
   - UI separada de lógica de negocio
   - Hooks para lógica reutilizable

3. **Progressive Enhancement**
   - Funcionalidad básica primero
   - Mejoras incrementales

### Naming Conventions

```typescript
// Componentes base
BaseComponentName

// Widgets específicos
DomainNameWidget

// Subcomponentes
ParentComponentChildName

// Componentes memoizados
MemoizedComponentName

// HOCs
withFunctionality
```

### Props Patterns

#### Children Pattern
```typescript
interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}
```

#### Render Props Pattern
```typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
}
```

#### Compound Components Pattern
```typescript
// Componente principal
export const Card = ({ children }: CardProps) => (
  <div className="card">{children}</div>
);

// Subcomponentes
Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;
```

### Performance Best Practices

#### 1. Memoización Selectiva
```typescript
// Memoizar solo cuando sea necesario
const ExpensiveComponent = memo(Component, (prevProps, nextProps) => {
  return prevProps.heavyData === nextProps.heavyData;
});
```

#### 2. Lazy Loading
```typescript
// Para páginas completas
const LazyPage = lazy(() => import('./Page'));

// Para componentes pesados
const LazyWidget = lazy(() => import('./HeavyWidget'));
```

#### 3. Virtual Scrolling
```typescript
// Para listas grandes
<VirtualScrollList
  items={largeDataset}
  itemHeight={60}
  height={400}
  renderItem={(item) => <ItemComponent item={item} />}
/>
```

#### 4. Code Splitting
```typescript
// Por rutas
const routes = [
  {
    path: '/patients',
    component: lazy(() => import('./pages/Patients'))
  }
];

// Por funcionalidad
const ChartComponent = lazy(() => import('./ChartComponent'));
```

## Testing de Componentes

### Categorías de Tests

1. **Unit Tests** - Componentes aislados
2. **Integration Tests** - Interacción entre componentes
3. **Visual Tests** - Apariencia y responsive design

### Testing Patterns (Pendiente)

```typescript
// Unit test básico
describe('BaseStatsCard', () => {
  test('renders title and description', () => {
    render(
      <BaseStatsCard title="Test" description="Description">
        Content
      </BaseStatsCard>
    );
    
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });
});

// Integration test
describe('PatientStatsWidget', () => {
  test('loads and displays patient statistics', async () => {
    render(<PatientStatsWidget />);
    
    await waitFor(() => {
      expect(screen.getByText('Total Pacientes')).toBeInTheDocument();
    });
  });
});
```

## Migración y Refactoring

### Splitting de Componentes Grandes

**Antes:**
```typescript
// Componente monolítico de 200+ líneas
const LargeWidget = () => {
  // Todo en un solo componente
};
```

**Después:**
```typescript
// Componente principal enfocado
const Widget = () => (
  <div>
    <WidgetHeader />
    <WidgetContent />
    <WidgetFooter />
  </div>
);

// Subcomponentes especializados
const WidgetHeader = () => { /* ... */ };
const WidgetContent = () => { /* ... */ };
const WidgetFooter = () => { /* ... */ };
```

### Extracción de Lógica

**Antes:**
```typescript
const Component = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  
  useEffect(() => {
    // Lógica compleja aquí
  }, []);
  
  // Render
};
```

**Después:**
```typescript
const Component = () => {
  const { data, loading } = useComponentData();
  
  // Solo render
};

// Hook especializado
const useComponentData = () => {
  // Lógica extraída
};
```

---

**Última actualización:** 18 de junio, 2025  
**Mantenido por:** Equipo de desarrollo
