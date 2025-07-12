
# Style Guide - Sistema de Gestión Clínica

## Tabla de Contenidos

1. [Paleta de Colores](#paleta-de-colores)
2. [Tipografía](#tipografía)
3. [Espaciado y Layout](#espaciado-y-layout)
4. [Componentes Base](#componentes-base)
5. [Iconografía](#iconografía)
6. [Estados y Feedback](#estados-y-feedback)
7. [Patrones de Diseño](#patrones-de-diseño)
8. [Responsive Design](#responsive-design)
9. [Animaciones](#animaciones)
10. [Buenas Prácticas](#buenas-prácticas)

---

## Paleta de Colores

### Colores Primarios

#### Brand Colors
```css
/* Azul Principal - Para elementos principales y acciones primarias */
--brand-blue: #4D8BFF;
--brand-light: #F0F6FF;  /* Fondos suaves */
--brand-dark: #0D1E42;   /* Textos principales */
```

#### Colores Vitales (Para métricas médicas)
```css
--vital-pink: #FF7A9F;    /* Frecuencia cardíaca, datos críticos */
--vital-blue: #7AC0FF;    /* Presión arterial, datos normales */
--vital-purple: #A87AFF;  /* Temperatura, datos especiales */
--vital-orange: #FFB87A;  /* Peso, datos de alerta */
```

#### Estados
```css
--status-green: #28A745;  /* Éxito, disponible, saludable */
```

### Colores del Sistema (HSL)

#### Modo Claro
```css
--background: 240 10% 99%;        /* Fondo principal */
--foreground: 222.2 84% 4.9%;     /* Texto principal */
--card: 0 0% 100%;                /* Fondo de tarjetas */
--primary: 222.2 47.4% 11.2%;     /* Elementos primarios */
--secondary: 210 40% 96.1%;       /* Elementos secundarios */
--muted: 210 40% 96.1%;           /* Elementos deshabilitados */
--accent: 210 40% 96.1%;          /* Elementos de acento */
--border: 214.3 31.8% 91.4%;      /* Bordes */
```

### Uso de Colores

| Color | Uso Recomendado | Evitar |
|-------|----------------|---------|
| `brand-blue` | Botones primarios, enlaces importantes, elementos de navegación activos | Fondos extensos, texto |
| `brand-light` | Fondos de secciones, hover states suaves | Texto, bordes |
| `vital-pink` | Métricas críticas, alertas médicas | Elementos decorativos |
| `vital-blue` | Datos normales, información general | Elementos de error |
| `status-green` | Estados de éxito, indicadores positivos | Elementos de advertencia |

---

## Tipografía

### Fuente Principal: Poppins

```css
font-family: 'Poppins', sans-serif;
```

### Jerarquía Tipográfica

#### Títulos
```css
/* H1 - Títulos principales de página */
.text-3xl.font-bold { font-size: 1.875rem; font-weight: 700; }

/* H2 - Títulos de sección */
.text-2xl.font-semibold { font-size: 1.5rem; font-weight: 600; }

/* H3 - Subtítulos */
.text-xl.font-medium { font-size: 1.25rem; font-weight: 500; }

/* H4 - Títulos de tarjetas */
.text-lg.font-medium { font-size: 1.125rem; font-weight: 500; }
```

#### Texto Corporal
```css
/* Texto base */
.text-sm { font-size: 0.875rem; }
.text-base { font-size: 1rem; }

/* Texto descriptivo */
.text-muted-foreground { color: hsl(var(--muted-foreground)); }

/* Texto pequeño */
.text-xs { font-size: 0.75rem; }
```

#### Métricas y Números
```css
/* Números grandes (estadísticas) */
.text-3xl.font-bold { font-size: 1.875rem; font-weight: 700; }

/* Números medianos (contadores) */
.text-2xl.font-bold { font-size: 1.5rem; font-weight: 700; }
```

---

## Espaciado y Layout

### Sistema de Espaciado (Tailwind)

```css
/* Espaciado interno */
p-2  = 0.5rem    /* 8px */
p-4  = 1rem      /* 16px */
p-6  = 1.5rem    /* 24px */
p-8  = 2rem      /* 32px */

/* Espaciado externo */
m-2  = 0.5rem    /* 8px */
m-4  = 1rem      /* 16px */
m-6  = 1.5rem    /* 24px */
m-8  = 2rem      /* 32px */

/* Gaps en grids y flex */
gap-4 = 1rem     /* 16px */
gap-6 = 1.5rem   /* 24px */
gap-8 = 2rem     /* 32px */
```

### Layout Principal

```css
/* Container principal */
.min-h-screen.bg-[#F9FAFF]

/* Sidebar */
.w-64         /* 256px width */

/* Contenido principal */
.flex-1.p-6  /* Flexible width, 24px padding */
```

### Grid System

```css
/* Grids responsivos */
.grid.grid-cols-1.md:grid-cols-2.lg:grid-cols-3.gap-6

/* Para estadísticas */
.grid.grid-cols-2.md:grid-cols-4.gap-4
```

---

## Componentes Base

### Botones

#### Botón Primario
```tsx
<Button className="bg-brand-blue text-white hover:bg-brand-blue/90">
  Acción Principal
</Button>
```

#### Botón Secundario
```tsx
<Button variant="outline" className="border-brand-blue text-brand-blue">
  Acción Secundaria
</Button>
```

#### Botón de Éxito
```tsx
<Button className="bg-status-green text-white hover:bg-status-green/90">
  Confirmar
</Button>
```

### Tarjetas (Cards)

#### Tarjeta Base
```tsx
<Card className="transition-all duration-300 hover:shadow-lg">
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <Icon className="w-5 h-5 text-brand-blue" />
      Título
    </CardTitle>
    <CardDescription>Descripción opcional</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Contenido */}
  </CardContent>
</Card>
```

#### Tarjeta de Estadísticas
```tsx
<div className="text-center p-4 rounded-lg bg-blue-50 text-blue-700">
  <div className="text-2xl font-bold">123</div>
  <div className="text-sm">Métrica</div>
</div>
```

### Formularios

#### Campo de Entrada
```tsx
<div className="space-y-2">
  <Label htmlFor="input">Etiqueta</Label>
  <Input 
    id="input" 
    placeholder="Placeholder" 
    className="focus:ring-brand-blue focus:border-brand-blue"
  />
</div>
```

#### Select/Dropdown
```tsx
<Select>
  <SelectTrigger className="focus:ring-brand-blue">
    <SelectValue placeholder="Seleccionar..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Opción 1</SelectItem>
  </SelectContent>
</Select>
```

---

## Iconografía

### Librería: Lucide React

#### Iconos Médicos Comunes
```tsx
import { 
  Stethoscope,    // Consultas médicas
  Heart,          // Cardiología
  Brain,          // Neurología
  User,           // Pacientes
  Users,          // Personal
  Calendar,       // Citas
  Activity,       // Signos vitales
  FileText,       // Historiales
  Bell,           // Notificaciones
  Settings,       // Configuración
} from 'lucide-react';
```

#### Tamaños Estándar
```css
w-4 h-4   /* 16px - Iconos pequeños en texto */
w-5 h-5   /* 20px - Iconos en títulos y botones */
w-6 h-6   /* 24px - Iconos medianos */
w-8 h-8   /* 32px - Iconos grandes */
```

#### Colores de Iconos
```tsx
{/* Iconos primarios */}
<Icon className="w-5 h-5 text-brand-blue" />

{/* Iconos de estado */}
<Icon className="w-5 h-5 text-status-green" />

{/* Iconos vitales */}
<Icon className="w-5 h-5 text-vital-pink" />
```

---

## Estados y Feedback

### Estados de Componentes

#### Hover
```css
.hover:bg-brand-light
.hover:shadow-lg
.hover:scale-105
```

#### Focus
```css
.focus:ring-2.focus:ring-brand-blue
.focus:outline-none
```

#### Disabled
```css
.disabled:opacity-50
.disabled:cursor-not-allowed
```

### Feedback Visual

#### Loading States
```tsx
<div className="flex items-center gap-2">
  <div className="w-4 h-4 border-2 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin" />
  Cargando...
</div>
```

#### Toast/Notificaciones
```tsx
// Éxito
<Toast className="bg-status-green text-white">
  Operación exitosa
</Toast>

// Error
<Toast variant="destructive">
  Error en la operación
</Toast>

// Información
<Toast className="bg-brand-blue text-white">
  Información importante
</Toast>
```

### Badges de Estado

```tsx
{/* En línea */}
<Badge className="bg-status-green text-white">Activo</Badge>

{/* Fuera de línea */}
<Badge variant="secondary">Inactivo</Badge>

{/* Pendiente */}
<Badge className="bg-vital-orange text-white">Pendiente</Badge>
```

---

## Patrones de Diseño

### Dashboard Layout

```tsx
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  {/* Contenido principal - 2/3 */}
  <div className="lg:col-span-2 space-y-6">
    <StatsCards />
    <MainContent />
  </div>
  
  {/* Sidebar derecho - 1/3 */}
  <div className="space-y-6">
    <QuickActions />
    <RecentActivity />
  </div>
</div>
```

### Lista con Acciones

```tsx
<Card>
  <CardHeader>
    <div className="flex justify-between items-center">
      <CardTitle>Lista de Pacientes</CardTitle>
      <Button size="sm">
        <Plus className="w-4 h-4 mr-2" />
        Nuevo
      </Button>
    </div>
  </CardHeader>
  <CardContent>
    <div className="space-y-2">
      {items.map(item => (
        <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded">
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost">Editar</Button>
            <Button size="sm" variant="ghost">Ver</Button>
          </div>
        </div>
      ))}
    </div>
  </CardContent>
</Card>
```

### Modal/Dialog Pattern

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Abrir Modal</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Título del Modal</DialogTitle>
      <DialogDescription>
        Descripción opcional del contenido
      </DialogDescription>
    </DialogHeader>
    
    {/* Contenido del modal */}
    <div className="space-y-4">
      {/* Formulario o contenido */}
    </div>
    
    <DialogFooter>
      <Button variant="outline">Cancelar</Button>
      <Button>Confirmar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

## Responsive Design

### Breakpoints

```css
sm:   640px   /* Tablets pequeñas */
md:   768px   /* Tablets */
lg:   1024px  /* Desktop */
xl:   1280px  /* Desktop grande */
2xl:  1536px  /* Desktop extra grande */
```

### Patrones Responsivos

#### Grid Responsivo
```css
/* Mobile first */
.grid.grid-cols-1.md:grid-cols-2.lg:grid-cols-3.xl:grid-cols-4
```

#### Sidebar Responsivo
```css
/* Hidden en mobile, visible en desktop */
.hidden.lg:block

/* Sidebar colapsable */
.w-16.lg:w-64
```

#### Espaciado Responsivo
```css
.p-4.lg:p-6    /* Padding adaptable */
.gap-4.lg:gap-6 /* Gap adaptable */
```

---

## Animaciones

### Transiciones Base

```css
.transition-all.duration-300    /* Transición general */
.transition-colors.duration-200 /* Solo colores */
.transition-transform.duration-300 /* Solo transformaciones */
```

### Animaciones Personalizadas (Tailwind Config)

```css
/* Entrada suave */
.animate-fade-in

/* Escala al hover */
.hover:scale-105

/* Rotación */
.animate-spin

/* Pulse para loading */
.animate-pulse
```

### Estados de Hover Avanzados

```css
/* Efecto de elevación */
.hover:shadow-lg

/* Cambio de color suave */
.hover:bg-brand-light

/* Efecto de brillo */
.hover:bg-gradient-to-r.hover:from-brand-blue.hover:to-brand-blue/80
```

---

## Buenas Prácticas

### Consistencia

1. **Usa siempre las variables CSS definidas** en lugar de colores hardcodeados
2. **Mantén la jerarquía tipográfica** consistente en toda la aplicación
3. **Usa los espaciados estándar** del sistema de design
4. **Aplica los mismos patrones** para componentes similares

### Accesibilidad

```css
/* Contrast ratio mínimo 4.5:1 */
/* Focus visible en todos los elementos interactivos */
.focus:ring-2.focus:ring-brand-blue.focus:outline-none

/* Tamaños mínimos de toque 44px */
.min-h-[44px].min-w-[44px]

/* Labels en formularios */
/* Alt text en imágenes */
/* Estados ARIA apropiados */
```

### Performance

1. **Lazy loading** para componentes pesados
2. **Memoización** para componentes que re-renderizan frecuentemente
3. **Optimización de imágenes** y assets
4. **Tree shaking** de librerías

### Código Limpio

```tsx
// Estructura clara de componentes
const Component = () => {
  // Hooks primero
  const [state, setState] = useState();
  
  // Handlers después
  const handleClick = () => {};
  
  // Render último
  return (
    <div className="organized-classes">
      {/* Comentarios descriptivos cuando sea necesario */}
    </div>
  );
};
```

### Nombres de Clases CSS

```css
/* Orden sugerido */
.layout-positioning.display.size.spacing.colors.effects.animations

/* Ejemplo */
.flex.items-center.w-full.p-4.bg-white.border.rounded-lg.shadow-sm.hover:shadow-md.transition-shadow
```

---

## Ejemplos de Implementación

### Página de Dashboard

```tsx
const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-brand-dark">Dashboard</h1>
        <Button className="bg-brand-blue hover:bg-brand-blue/90">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Cita
        </Button>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Pacientes Hoy"
          value="24"
          icon={Users}
          color="blue"
        />
        {/* Más stats... */}
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PatientsList />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  );
};
```

---

## Versión y Mantenimiento

**Versión:** 1.0  
**Última actualización:** Diciembre 2024  
**Mantenido por:** Equipo de Desarrollo

Para sugerencias o actualizaciones del style guide, crear un issue en el repositorio del proyecto.
