
# Guía de Desarrollo - MediApp

## Configuración del Entorno de Desarrollo

### Herramientas Requeridas
- **Editor**: VS Code (recomendado) con extensiones:
  - ES7+ React/Redux/React-Native snippets
  - TypeScript Importer
  - Tailwind CSS IntelliSense
  - Auto Rename Tag
  - Prettier - Code formatter
  - ESLint

### Configuración del Proyecto
```bash
# Clonar y configurar
git clone [repository]
cd mediapp
bun install
bun dev
```

## Estructura del Proyecto

### Organización de Archivos
```
src/
├── components/           # Componentes React organizados por dominio
│   ├── common/          # Componentes base reutilizables
│   ├── dashboard/       # Componentes del dashboard
│   ├── patients/        # Gestión de pacientes
│   ├── personnel/       # Gestión de personal
│   ├── statistics/      # Widgets de estadísticas
│   ├── messages/        # Sistema de mensajería
│   ├── performance/     # Componentes optimizados
│   └── ui/             # Componentes primitivos Shadcn
├── hooks/              # Custom hooks especializados
├── services/           # Lógica de negocio y APIs
├── stores/             # Estado global con Zustand
├── contexts/           # React Contexts
├── types/              # Definiciones TypeScript
├── data/               # Datos mock y constantes
├── utils/              # Funciones utilitarias
└── pages/              # Páginas principales
```

## Convenciones de Código

### Naming Conventions
```typescript
// Componentes: PascalCase
export const PatientCard = () => {};

// Hooks: camelCase con prefijo 'use'
export const usePatients = () => {};

// Servicios: PascalCase con sufijo 'Service'
export class PatientService {};

// Tipos: PascalCase
interface Patient {};

// Variables y funciones: camelCase
const patientData = {};
const handleSubmit = () => {};

// Constantes: UPPER_SNAKE_CASE
const MAX_PATIENTS = 1000;

// Archivos: kebab-case para utilidades, PascalCase para componentes
patient-utils.ts
PatientCard.tsx
```

### Estructura de Componentes
```typescript
// 1. Imports externos
import React, { useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

// 2. Imports internos
import { BaseStatsCard, MetricsGrid } from '@/components/common';
import { usePatients } from '@/hooks/usePatients';
import { PatientService } from '@/services/patientService';

// 3. Tipos e interfaces
interface PatientCardProps {
  patient: Patient;
  onEdit?: (patient: Patient) => void;
  className?: string;
}

// 4. Componente principal
export const PatientCard = ({ 
  patient, 
  onEdit, 
  className = '' 
}: PatientCardProps) => {
  // 5. Estado local
  const [isLoading, setIsLoading] = useState(false);
  
  // 6. Hooks personalizados
  const { t } = useTranslation();
  
  // 7. Valores memoizados
  const patientAge = useMemo(() => 
    calculateAge(patient.dateOfBirth), [patient.dateOfBirth]
  );
  
  // 8. Callbacks
  const handleEdit = useCallback(() => {
    onEdit?.(patient);
  }, [patient, onEdit]);
  
  // 9. Efectos (si los hay)
  useEffect(() => {
    // ...
  }, []);
  
  // 10. Render
  return (
    <div className={`patient-card ${className}`}>
      {/* JSX */}
    </div>
  );
};

// 11. Display name para debugging
PatientCard.displayName = 'PatientCard';
```

## Patrones de Desarrollo

### 1. Component Composition
```typescript
// Componente base
export const BaseStatsCard = ({ title, children, ...props }) => (
  <Card {...props}>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

// Composición específica
export const PatientStatsCard = () => (
  <BaseStatsCard title="Estadísticas de Pacientes">
    <MetricsGrid metrics={patientMetrics} />
  </BaseStatsCard>
);
```

### 2. Custom Hooks Pattern
```typescript
// Hook reutilizable
export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const setStoredValue = useCallback((newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  }, [key]);

  return [value, setStoredValue] as const;
};

// Uso en componente
const [preferences, setPreferences] = useLocalStorage('user-prefs', {});
```

### 3. Service Layer Pattern
```typescript
// Servicio especializado
export class PatientService {
  private static patients: Patient[] = [];

  static async getPatients(filters?: PatientFilters): Promise<Patient[]> {
    // Lógica de filtrado
    return this.applyFilters(this.patients, filters);
  }

  static async createPatient(data: CreatePatientData): Promise<Patient> {
    const newPatient = {
      ...data,
      id: this.generateUniqueId(),
      createdAt: new Date().toISOString()
    };
    
    this.patients.push(newPatient);
    return newPatient;
  }

  private static applyFilters(patients: Patient[], filters?: PatientFilters) {
    // Implementación de filtros
  }

  private static generateUniqueId(): string {
    // Lógica de generación de ID único
  }
}
```

### 4. State Management Pattern
```typescript
// Zustand store
interface GlobalState {
  isLoading: boolean;
  currentUser: User | null;
  setLoading: (loading: boolean) => void;
  setCurrentUser: (user: User | null) => void;
}

export const useGlobalState = create<GlobalState>((set) => ({
  isLoading: false,
  currentUser: null,
  setLoading: (loading) => set({ isLoading: loading }),
  setCurrentUser: (user) => set({ currentUser: user })
}));

// Uso en componentes
const { isLoading, setLoading } = useGlobalState();
```

## Performance Best Practices

### 1. Memoización Inteligente
```typescript
// Memoizar solo cuando sea necesario
const ExpensiveComponent = memo(({ data, onUpdate }) => {
  const processedData = useMemo(() => 
    expensiveCalculation(data), [data]
  );

  const handleUpdate = useCallback((newData) => {
    onUpdate(newData);
  }, [onUpdate]);

  return <div>{/* Render */}</div>;
}, (prevProps, nextProps) => {
  // Comparación personalizada si es necesario
  return prevProps.data.id === nextProps.data.id;
});
```

### 2. Lazy Loading
```typescript
// Componentes lazy
const LazyStatistics = lazy(() => import('@/pages/Estadisticas'));

// Con error boundary
<Suspense fallback={<StatisticsSkeleton />}>
  <ErrorBoundary>
    <LazyStatistics />
  </ErrorBoundary>
</Suspense>
```

### 3. Virtual Scrolling
```typescript
// Para listas grandes
<VirtualScrollList
  items={patients}
  itemHeight={60}
  height={400}
  renderItem={(patient) => (
    <PatientCard key={patient.id} patient={patient} />
  )}
/>
```

## Testing Strategy

### Configuración de Testing (Pendiente)
```bash
# Instalar dependencias de testing
bun add -D @testing-library/react @testing-library/jest-dom jest
```

### Unit Tests
```typescript
// PatientCard.test.tsx
describe('PatientCard', () => {
  test('renders patient information correctly', () => {
    const mockPatient = createMockPatient();
    
    render(<PatientCard patient={mockPatient} />);
    
    expect(screen.getByText(mockPatient.name)).toBeInTheDocument();
    expect(screen.getByText(mockPatient.id)).toBeInTheDocument();
  });

  test('calls onEdit when edit button is clicked', () => {
    const mockPatient = createMockPatient();
    const mockOnEdit = jest.fn();
    
    render(<PatientCard patient={mockPatient} onEdit={mockOnEdit} />);
    
    fireEvent.click(screen.getByText('Editar'));
    
    expect(mockOnEdit).toHaveBeenCalledWith(mockPatient);
  });
});
```

### Integration Tests
```typescript
// PatientManagement.test.tsx
describe('Patient Management Integration', () => {
  test('creates new patient and updates list', async () => {
    render(<PatientManagement />);
    
    // Abrir formulario
    fireEvent.click(screen.getByText('Nuevo Paciente'));
    
    // Llenar formulario
    fireEvent.change(screen.getByLabelText('Nombre'), {
      target: { value: 'Juan Pérez' }
    });
    
    // Enviar formulario
    fireEvent.click(screen.getByText('Guardar'));
    
    // Verificar que aparece en la lista
    await waitFor(() => {
      expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
    });
  });
});
```

## Debugging y Troubleshooting

### React DevTools
```typescript
// Componente con Profiler para debugging
import { Profiler } from 'react';

const ProfiledComponent = ({ children, id }) => (
  <Profiler
    id={id}
    onRender={(id, phase, actualDuration) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(`${id} ${phase}: ${actualDuration}ms`);
      }
    }}
  >
    {children}
  </Profiler>
);
```

### Custom Debug Hook
```typescript
export const useDebug = (componentName: string, props: any) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.group(`🔍 ${componentName} Debug`);
      console.log('Props:', props);
      console.log('Timestamp:', new Date().toISOString());
      console.groupEnd();
    }
  });
};

// Uso
const PatientCard = (props) => {
  useDebug('PatientCard', props);
  // ... resto del componente
};
```

### Error Boundaries
```typescript
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Enviar a servicio de logging
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}
```

## Scripts de Desarrollo

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext ts,tsx",
    "lint:fix": "eslint src --ext ts,tsx --fix",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "analyze": "npx vite-bundle-analyzer"
  }
}
```

### Hooks de Pre-commit
```bash
# Instalar husky
bun add -D husky lint-staged

# Configurar en package.json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{css,md}": ["prettier --write"]
  }
}
```

## Contribución al Proyecto

### Flujo de Trabajo
1. **Fork** del repositorio
2. **Crear rama** para feature/bugfix
3. **Desarrollar** con tests
4. **Commit** con mensajes descriptivos
5. **Push** y crear Pull Request
6. **Code Review** y merge

### Commit Messages
```bash
# Formato
type(scope): description

# Ejemplos
feat(patients): add unique ID generation
fix(statistics): resolve chart rendering issue
docs(api): update service documentation
refactor(components): split PatientCard into smaller components
test(hooks): add tests for usePatients hook
```

### Code Review Checklist
- [ ] ✅ Funcionalidad implementada correctamente
- [ ] ✅ Tests unitarios agregados
- [ ] ✅ Documentación actualizada
- [ ] ✅ Performance optimizada
- [ ] ✅ Accesibilidad considerada
- [ ] ✅ Responsive design verificado
- [ ] ✅ TypeScript sin errores
- [ ] ✅ ESLint rules cumplidas

---

**Tiempo estimado de setup:** 30 minutos  
**Curva de aprendizaje:** 1-2 días para desarrolladores React  
**Productividad completa:** 1 semana

**Última actualización:** 18 de junio, 2025
