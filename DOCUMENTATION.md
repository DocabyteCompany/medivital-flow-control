
# Documentación Completa - MediApp

## Información General de la Plataforma

### Descripción
MediApp es una plataforma web de gestión médica diseñada para clínicas y consultorios. Permite la administración integral de pacientes, personal médico, citas, expedientes médicos y comunicación entre profesionales de la salud.

### Tecnologías Utilizadas
- **Frontend**: React 18 con TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Components**: Shadcn/ui
- **Icons**: Lucide React
- **Routing**: React Router DOM v6
- **State Management**: React Context API
- **Data Fetching**: TanStack React Query
- **Forms**: React Hook Form con Zod validation
- **Internationalization**: i18next
- **Charts**: Recharts para visualización de datos

### Arquitectura General
- **Responsive Design**: Completamente adaptado a dispositivos móviles y escritorio
- **Component-Based**: Arquitectura modular con componentes reutilizables
- **Type Safety**: TypeScript estricto en toda la aplicación
- **Role-Based Access**: Sistema de permisos basado en roles de usuario

---

## Tipos de Usuarios y Roles

### 1. Doctor
**Descripción**: Profesionales médicos que atienden pacientes y gestionan sus expedientes clínicos.

**Funcionalidades principales**:
- Gestión de pacientes asignados
- Creación y edición de expedientes médicos
- Acceso completo a datos clínicos
- Comunicación con otros profesionales
- Gestión de citas y agenda personal
- Uso de herramientas de IA médica
- Creación de referidos médicos
- Subida de estudios externos

**Limitaciones**:
- No puede acceder a datos administrativos sensibles
- No puede gestionar personal
- No puede acceder a estadísticas globales
- No puede modificar configuraciones del sistema

### 2. Admin (Administrador)
**Descripción**: Personal administrativo con acceso completo al sistema para gestión operativa.

**Funcionalidades principales**:
- Gestión completa de pacientes (crear, editar, eliminar)
- Gestión de personal médico
- Acceso completo a estadísticas y reportes avanzados
- Configuración del sistema
- Supervisión de todas las actividades
- Gestión de usuarios y permisos
- Acceso a datos de facturación
- Control de recordatorios y notificaciones

**Acceso especial**:
- Puede editar datos demográficos de pacientes
- Acceso a información de seguros médicos
- Gestión de configuraciones globales
- **Acceso exclusivo a estadísticas detalladas con múltiples visualizaciones**

---

## Documentación por Sección del Menú

### 🏠 Dashboard

#### Funcionalidad General
Panel principal que muestra información relevante según el tipo de usuario.

#### Dashboard Doctor (`DashboardDoctor.tsx`)
**Widgets principales**:
- **Pacientes de Hoy**: Lista de citas programadas con estados
- **Próximas Actividades**: Recordatorios y tareas pendientes
- **Calendario**: Vista rápida de la agenda
- **Actividades IA**: Herramientas de inteligencia artificial
- **Chats Recientes**: Comunicación con colegas

**Acciones rápidas**:
- Añadir nuevo paciente
- Acceso rápido a expedientes
- Iniciar nueva conversación

#### Dashboard Admin (`DashboardAdmin.tsx`)
**Widgets principales**:
- **Estadísticas Administrativas**: Métricas generales del sistema
- **Gestión de Pacientes**: Resumen con estadísticas por estado
- **Gestión de Recordatorios**: Control de notificaciones
- **Calendario**: Vista global de todas las citas
- **Actividades IA**: Supervisión de herramientas IA

**Métricas mostradas**:
- Total de pacientes
- Pacientes críticos
- Pacientes en tratamiento
- Nuevos pacientes (últimos 30 días)

### 👥 Pacientes

#### Funcionalidad General
Gestión completa del registro de pacientes con información demográfica, médica y administrativa.

#### Permisos por Rol
**Doctor**:
- ✅ Ver todos los pacientes
- ✅ Crear nuevos pacientes
- ✅ Editar información médica y de contacto básico
- ❌ Editar datos demográficos sensibles
- ❌ Eliminar pacientes

**Admin**:
- ✅ Acceso completo a todas las funcionalidades
- ✅ Editar cualquier información del paciente
- ✅ Gestionar información de seguros
- ✅ Eliminar pacientes

#### Información Gestionada
**Datos básicos**:
- Nombre completo, DNI, fecha de nacimiento
- Información de contacto (teléfono, email, dirección)
- Género y ocupación

**Datos médicos**:
- Tipo de sangre, altura, peso
- Estado de salud actual
- Historial de visitas

**Datos administrativos** (solo Admin):
- Tipo de seguro médico
- Información de facturación
- Datos de creación y modificación

### 🩺 Personal (Solo Admin)

#### Funcionalidad
Gestión del equipo médico y administrativo de la clínica.

#### Información del Personal
**Datos básicos**:
- Nombre completo
- Rol (Doctor, Enfermera, Técnico, Administrativo, Radiólogo)
- Especialidad médica
- Estado online/offline

**Información de contacto**:
- Teléfono y email
- Avatar/foto de perfil

#### Componentes
- **PersonnelCard**: Tarjeta individual con información del personal
- **Acciones**: Llamar, enviar mensaje, enviar email

### 📊 Estadísticas (Solo Admin)

#### Funcionalidad Completa
Sistema completo de análisis y reportes con múltiples categorías estadísticas.

#### Características Principales
- **Sistema de Tabs**: Navegación entre diferentes tipos de estadísticas
- **Visualizaciones Interactivas**: Gráficos de barras, líneas, pastel
- **Datos en Tiempo Real**: Información actualizada automáticamente
- **Diseño Responsive**: Adaptado a todos los dispositivos

#### Categorías de Estadísticas

**1. Estadísticas de Pacientes** (`PatientStatsWidget.tsx`):
- Métricas principales: Total, saludables, en tratamiento, críticos
- Nuevos pacientes por mes
- Distribución por género
- Distribución por estado de salud
- Tipos de seguro médico
- Gráficos: Pastel, barras horizontales y verticales

**2. Estadísticas de Personal** (`PersonnelStatsWidget.tsx`):
- Total de personal por rol (Doctores, Enfermeras, Técnicos, etc.)
- Estado de disponibilidad (online/offline)
- Distribución por especialidades médicas
- Porcentaje de personal en línea
- Gráficos: Barras con nombres rotados, barras horizontales

**3. Estadísticas de Citas** (`AppointmentStatsWidget.tsx`):
- Estados de citas: Completadas, programadas, canceladas, reprogramadas
- Tasa de completitud con barra de progreso
- Tendencia mensual de citas
- Distribución por estado en gráfico de pastel
- Métricas con iconos específicos

**4. Estadísticas Financieras** (`FinancialStatsWidget.tsx`):
- Ingresos totales y promedio mensual
- Crecimiento mensual con indicadores de tendencia
- Distribución de pacientes por tipo de seguro
- Evolución mensual de ingresos
- Detalle porcentual por tipo de seguro

#### Servicios de Datos
**`statisticsService.ts`**:
- Procesamiento de datos de pacientes, personal y citas
- Cálculo de métricas y KPIs
- Generación de datos para gráficos
- Funciones especializadas por categoría

#### Componentes Técnicos
- **ChartContainer**: Contenedor base para gráficos Recharts
- **Responsive Design**: Grids adaptativos para diferentes pantallas
- **Color Coding**: Esquema de colores consistente por categorías
- **Tooltips**: Información detallada al hacer hover

### 💬 Mensajes

#### Funcionalidad
Sistema de comunicación interna entre profesionales médicos.

#### Características
- **DoctorList**: Lista de contactos médicos disponibles
- **ChatView**: Interfaz de conversación en tiempo real
- **Estado online**: Indicador de disponibilidad
- **Historial**: Conservación de conversaciones previas

#### Datos de Prueba
Utilizamos datos mock del archivo `messages.ts` con doctores de ejemplo y conversaciones simuladas.

### 📅 Agenda

#### Funcionalidad General
Sistema de gestión de citas y calendario médico.

#### Vistas por Rol
**DoctorAgendaView**:
- Agenda personal del doctor
- Citas asignadas
- Gestión de disponibilidad

**AdminAgendaView**:
- Vista global de todas las citas
- Gestión de citas de todo el personal
- Supervisión de horarios

#### Componentes
- **Calendar**: Componente de calendario interactivo
- **Localización**: Soporte para español (locale `es`)

### 📋 Expedientes

#### Funcionalidad
Gestión completa de expedientes médicos y documentación clínica.

#### Permisos por Rol
**Doctor**:
- ✅ Acceso completo a datos clínicos
- ✅ Crear y gestionar referidos
- ✅ Generar resúmenes médicos
- ✅ Subir estudios externos
- ✅ Ver historial del paciente

**Admin**:
- ✅ Acceso a datos administrativos
- ⚠️ Vista limitada de datos clínicos
- ✅ Gestión de documentación administrativa

#### Componentes Principales
**ReferralsSection**: Gestión de referidos médicos
**ExternalStudiesSection**: Subida y gestión de estudios externos
**RecordHistorySection**: Historial de actividades del expediente
**CreateReferralDialog**: Crear nuevos referidos
**UploadStudyDialog**: Subir estudios externos

#### Datos Relacionados
- `referrals.ts`: Gestión de referidos médicos
- `externalStudies.ts`: Estudios externos subidos
- `recordHistory.ts`: Historial de actividades

### 🤖 Actividades IA

#### Funcionalidad
Herramientas de inteligencia artificial para asistencia médica.

#### Características
- **ActivityCard**: Tarjetas de actividades IA disponibles
- **ActivityStats**: Estadísticas de uso
- **ActivityIcon**: Iconografía específica para cada herramienta

#### Contexto
Utiliza `ActivityContext` para gestión de estado de actividades IA.

### ⚙️ Configuración (Solo Admin)

#### Estado Actual
En desarrollo - Página placeholder preparada.

#### Funcionalidades Planificadas
- Configuración global del sistema
- Gestión de usuarios y permisos
- Configuraciones de clínica
- Parámetros del sistema

---

## Consideraciones Técnicas

### Sistema de Permisos

#### Contextos
**RoleContext** (`RoleContext.tsx`):
- Gestión del rol actual del usuario
- Cambio dinámico entre roles para testing
- Persistencia del estado de rol

#### Hooks de Permisos
**usePermissions** (`usePermissions.tsx`):
- Hook general para verificación de permisos
- Métodos para verificar acceso por rol

**usePatientPermissions** (`usePatientPermissions.tsx`):
- Permisos específicos para gestión de pacientes
- Control granular de operaciones CRUD

**useRecordsPermissions** (`useRecordsPermissions.tsx`):
- Permisos para gestión de expedientes
- Separación entre datos clínicos y administrativos

### Componentes de Protección
**ProtectedRoute** (`ProtectedRoute.tsx`):
- Wrapper para rutas que requieren permisos específicos
- Redirección automática para usuarios sin permisos

### Servicios de Datos

#### Estadísticas (`statisticsService.ts`)
```typescript
interface PatientStats {
  total: number;
  healthy: number;
  inTreatment: number;
  critical: number;
  newThisMonth: number;
  byGender: { male: number; female: number };
  byInsurance: { [key: string]: number };
}

interface PersonnelStats {
  total: number;
  doctors: number;
  nurses: number;
  technicians: number;
  administrative: number;
  radiologists: number;
  online: number;
  bySpecialty: { [key: string]: number };
}

interface AppointmentStats {
  total: number;
  completed: number;
  scheduled: number;
  cancelled: number;
  rescheduled: number;
  completionRate: number;
  monthlyTrend: { month: string; count: number }[];
}

interface FinancialStats {
  byInsurance: { type: string; patients: number; percentage: number }[];
  revenue: { month: string; amount: number }[];
}
```

### Estructura de Datos

#### Pacientes (`patients.ts`)
```typescript
interface Patient {
  id: string;
  name: string;
  dni?: string;
  email?: string;
  phone?: string;
  dob: string;
  gender: 'Masculino' | 'Femenino';
  lastVisit: string;
  bloodType: string;
  height: number;
  weight: number;
  occupation: string;
  status: 'Saludable' | 'En tratamiento' | 'Crítico';
  address?: string;
  insuranceType?: 'none' | 'public' | 'private' | 'mixed' | 'international';
  createdAt: string;
  createdBy: string;
}
```

#### Personal (`personnel.ts`)
```typescript
interface Personnel {
  id: string;
  name: string;
  role: 'Doctor' | 'Enfermera' | 'Técnico' | 'Administrativo' | 'Radiólogo';
  specialty?: string;
  avatar: string;
  online: boolean;
  phone: string;
  email: string;
}
```

### Layout y Navegación

#### MainLayout (`MainLayout.tsx`)
- Layout principal con sidebar y header
- Responsive design
- Integración con sistema de roles

#### Sidebar (`Sidebar.tsx`)
- Navegación principal adaptada por rol
- Logo en la parte superior
- Menú contextual según permisos

---

## Registro de Cambios por Horas

### 17 de Junio de 2025

#### 14:00 - Implementación Completa de Estadísticas
**Cambios realizados**:
- ✅ Creado servicio completo de estadísticas (`statisticsService.ts`)
- ✅ Implementado widget de estadísticas de pacientes (`PatientStatsWidget.tsx`)
- ✅ Implementado widget de estadísticas de personal (`PersonnelStatsWidget.tsx`)
- ✅ Implementado widget de estadísticas de citas (`AppointmentStatsWidget.tsx`)
- ✅ Implementado widget de estadísticas financieras (`FinancialStatsWidget.tsx`)
- ✅ Creada página principal de estadísticas (`Estadisticas.tsx`)
- ✅ Actualizada ruta en `App.tsx` para reemplazar placeholder

**Nuevas funcionalidades**:
- **Sistema de tabs** para navegar entre diferentes categorías
- **Gráficos interactivos** con Recharts (barras, líneas, pastel)
- **Métricas en tiempo real** basadas en datos actuales
- **Diseño responsive** con grids adaptativos
- **Código de colores** consistente por categorías
- **Tooltips informativos** en todos los gráficos

**Archivos creados**:
- `src/services/statisticsService.ts`: Lógica de procesamiento de datos
- `src/components/statistics/PatientStatsWidget.tsx`: Estadísticas de pacientes
- `src/components/statistics/PersonnelStatsWidget.tsx`: Estadísticas de personal
- `src/components/statistics/AppointmentStatsWidget.tsx`: Estadísticas de citas
- `src/components/statistics/FinancialStatsWidget.tsx`: Estadísticas financieras
- `src/pages/Estadisticas.tsx`: Página principal de estadísticas

**Archivos modificados**:
- `src/App.tsx`: Actualizada ruta de estadísticas y agregado import

**Impacto**:
- Sección de estadísticas completamente funcional para administradores
- Visualización avanzada de datos con múltiples tipos de gráficos
- Análisis completo de pacientes, personal, citas y finanzas
- Dashboard ejecutivo para toma de decisiones informadas

#### 10:00 - Reorganización del Sidebar
**Cambios realizados**:
- ✅ Movido el Dashboard al primer lugar del menú
- ✅ Colocado el logo de MediApp en la parte superior
- ✅ Expandido el sidebar para mostrar nombres de secciones junto a íconos
- ✅ Mantenida la diferenciación de menús por rol (Doctor vs Admin)

**Archivos modificados**:
- `src/components/Sidebar.tsx`: 
  - Agregado componente `LogoSection`
  - Reorganizado orden de elementos del menú
  - Dashboard ahora es el primer elemento en ambos roles
- `src/components/MainLayout.tsx`:
  - Ajustado el ancho del sidebar para acomodar texto

**Impacto**:
- Mejor usabilidad con etiquetas visibles
- Navegación más intuitiva
- Logo prominente para branding

#### 09:30 - Análisis de Permisos
**Revisión realizada**:
- ✅ Confirmado sistema de permisos funcionando correctamente
- ✅ Verificada separación de funcionalidades por rol
- ✅ Documentadas restricciones específicas por usuario

#### 09:00 - Inicio de Documentación
**Actividades**:
- ✅ Análisis completo del código base
- ✅ Identificación de componentes principales
- ✅ Mapeo de funcionalidades por rol
- ✅ Estructura de datos documentada

---

## Próximos Pasos Recomendados

### Desarrollo Pendiente
1. **Completar Configuración**: Sistema de settings administrativos
2. **Mejorar Mensajes**: Implementar chat en tiempo real
3. **Optimizar Agenda**: Integrar con sistema de citas real
4. **Expandir Estadísticas**: Agregar filtros por fecha y exportación de reportes

### Mejoras Técnicas
1. **Testing**: Implementar pruebas unitarias y de integración
2. **Performance**: Optimización de renders y lazy loading de gráficos
3. **Accesibilidad**: Mejorar soporte para lectores de pantalla en gráficos
4. **SEO**: Meta tags y estructura semántica

### Funcionalidades de Estadísticas
1. **Filtros Avanzados**: Por fecha, personal, especialidad
2. **Exportación**: Generación de PDFs y Excel
3. **Alertas**: Notificaciones basadas en métricas
4. **Comparativas**: Análisis período a período

### Seguridad
1. **Autenticación**: Integrar sistema de login real
2. **Autorización**: Fortalecer sistema de permisos
3. **Encriptación**: Proteger datos sensibles
4. **Auditoría**: Registro de actividades del usuario

---

## Contacto y Soporte

Para dudas sobre la implementación o extensión de funcionalidades, consultar:
- Documentación de componentes en `src/components/`
- Servicios en `src/services/`
- Tipos de datos en `src/data/`
- Hooks de permisos en `src/hooks/`
- Contextos en `src/contexts/`

**Última actualización**: 17 de Junio de 2025, 14:00 PM
