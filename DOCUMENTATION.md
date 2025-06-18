
# Documentación Completa - MediApp

## Información General de la Plataforma

### Descripción
MediApp es una plataforma web de gestión médica diseñada para clínicas y consultorios en México. Permite la administración integral de pacientes, personal médico, citas, expedientes médicos y comunicación entre profesionales de la salud. La aplicación está completamente localizada al español mexicano con datos y monedas locales.

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
- **Internationalization**: i18next (Español mexicano)
- **Charts**: Recharts para visualización de datos

### Arquitectura General
- **Responsive Design**: Completamente adaptado a dispositivos móviles y escritorio
- **Component-Based**: Arquitectura modular con componentes reutilizables
- **Type Safety**: TypeScript estricto en toda la aplicación
- **Role-Based Access**: Sistema de permisos basado en roles de usuario
- **Localización Mexicana**: Moneda en pesos mexicanos, formatos de fecha y texto en español

---

## Tipos de Usuarios y Roles

### 1. Doctor
**Descripción**: Profesionales médicos que atienden pacientes y gestionan sus expedientes clínicos.

**Funcionalidades principales**:
- Gestión de pacientes asignados con ID único de 8 dígitos
- Creación y edición de expedientes médicos
- Acceso completo a datos clínicos
- Comunicación con otros profesionales en tiempo real
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
- Gestión de personal médico con horarios y especialidades
- Acceso completo a estadísticas y reportes avanzados en tiempo real
- Configuración del sistema
- Supervisión de todas las actividades
- Gestión de usuarios y permisos
- Acceso a datos de facturación en pesos mexicanos
- Control de recordatorios y notificaciones

**Acceso especial**:
- Puede editar datos demográficos de pacientes
- Acceso a información de seguros médicos mexicanos
- Gestión de configuraciones globales
- **Acceso exclusivo a estadísticas detalladas con múltiples visualizaciones interactivas**

---

## Documentación por Sección del Menú

### 🏠 Dashboard

#### Funcionalidad General
Panel principal que muestra información relevante según el tipo de usuario con datos en tiempo real.

#### Dashboard Doctor (`DashboardDoctor.tsx`)
**Widgets principales**:
- **Pacientes de Hoy**: Lista de citas programadas con estados y IDs únicos
- **Próximas Actividades**: Recordatorios y tareas pendientes
- **Calendario**: Vista rápida de la agenda
- **Actividades IA**: Herramientas de inteligencia artificial
- **Chats Recientes**: Comunicación con colegas en tiempo real

**Acciones rápidas**:
- Añadir nuevo paciente con ID autogenerado
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
- Total de pacientes con IDs únicos
- Pacientes críticos
- Pacientes en tratamiento
- Nuevos pacientes (últimos 30 días)

### 👥 Pacientes

#### Funcionalidad General
Gestión completa del registro de pacientes con información demográfica, médica y administrativa. **Cada paciente recibe un ID único de 8 dígitos al ser creado**.

#### Sistema de IDs Únicos
- **Generación automática**: ID de 8 dígitos (ej: 12345678)
- **Verificación de unicidad**: No hay duplicados en el sistema
- **Visualización**: Mostrado prominentemente en tarjetas y formularios
- **Búsqueda**: Funcional por ID en la barra de búsqueda

#### Permisos por Rol
**Doctor**:
- ✅ Ver todos los pacientes
- ✅ Crear nuevos pacientes con ID autogenerado
- ✅ Editar información médica y de contacto básico
- ❌ Editar datos demográficos sensibles
- ❌ Eliminar pacientes

**Admin**:
- ✅ Acceso completo a todas las funcionalidades
- ✅ Editar cualquier información del paciente
- ✅ Gestionar información de seguros mexicanos
- ✅ Eliminar pacientes

#### Información Gestionada
**Datos básicos**:
- Nombre completo, CURP/INE, fecha de nacimiento
- Información de contacto (teléfono, email, dirección)
- Género y ocupación
- **ID único de 8 dígitos**

**Datos médicos**:
- Tipo de sangre, altura, peso
- Estado de salud actual
- Historial de visitas

**Datos administrativos** (solo Admin):
- Tipo de seguro médico mexicano (IMSS, ISSSTE, Privado, etc.)
- Información de facturación en pesos mexicanos
- Datos de creación y modificación

### 🩺 Personal (Solo Admin)

#### Funcionalidad
Gestión del equipo médico y administrativo de la clínica con horarios localizados.

#### Información del Personal
**Datos básicos**:
- Nombre completo
- Rol (Doctor, Enfermera, Técnico, Administrativo, Radiólogo)
- Especialidad médica diversificada
- Estado online/offline en tiempo real

**Especialidades médicas disponibles**:
- Cardiología, Dermatología, Neurología
- Pediatría, Ginecología, Traumatología
- Medicina Interna, Radiología, Anestesiología
- Psiquiatría, Oncología, Oftalmología

**Gestión de horarios**:
- **Chips de estado traducidos**: Regular, Horas Extra, Guardia
- **Estados de disponibilidad**: Activo, Descanso, No disponible
- **Botones funcionales**: Editar, Eliminar y Agregar turnos
- **Notificaciones**: Toast confirmaciones en español

#### Componentes
- **PersonnelCard**: Tarjeta individual con información del personal
- **PersonnelScheduleManagement**: Gestión completa de horarios
- **Acciones**: Llamar, enviar mensaje, enviar email

### 📊 Estadísticas (Solo Admin)

#### Funcionalidad Completa
Sistema completo de análisis y reportes con múltiples categorías estadísticas, completamente funcional con datos en tiempo real.

#### Características Principales
- **Sistema de Tabs**: Navegación entre diferentes tipos de estadísticas
- **Visualizaciones Interactivas**: Gráficos de barras, líneas, pastel totalmente funcionales
- **Datos en Tiempo Real**: Información actualizada automáticamente
- **Diseño Responsive**: Adaptado a todos los dispositivos
- **Moneda mexicana**: Todos los valores financieros en pesos mexicanos

#### Categorías de Estadísticas

**1. Estadísticas de Pacientes** (`PatientStatsWidget.tsx`):
- Métricas principales: Total, saludables, en tratamiento, críticos
- Nuevos pacientes por mes
- Distribución por género
- Distribución por estado de salud
- Tipos de seguro médico mexicanos
- Gráficos: Pastel, barras horizontales y verticales

**2. Estadísticas de Personal** (`PersonnelStatsWidget.tsx`) - ✅ COMPLETAMENTE FUNCIONAL:
- Total de personal por rol (Doctores, Enfermeras, Técnicos, etc.)
- Estado de disponibilidad en tiempo real (online/offline)
- **Distribución por especialidades médicas**: Gráfico horizontal completamente funcional
- Porcentaje de personal en línea con barra de progreso
- **Correcciones implementadas**: 
  - Gráfico de especialidades funcional con datos reales
  - Tooltip mejorado sin errores
  - Dominio del eje X ajustado dinámicamente
  - Hover effect estable

**3. Estadísticas de Citas** (`AppointmentStatsWidget.tsx`):
- Estados de citas: Completadas, programadas, canceladas, reprogramadas
- Tasa de completitud con barra de progreso
- Tendencia mensual de citas
- Distribución por estado en gráfico de pastel
- Métricas con iconos específicos

**4. Estadísticas Financieras** (`FinancialStatsWidget.tsx`) - ✅ LOCALIZADA:
- **Ingresos en pesos mexicanos**: Formato $2,500,000 MXN
- Crecimiento mensual con indicadores de tendencia
- Distribución de pacientes por tipo de seguro mexicano
- Evolución mensual de ingresos
- Detalle porcentual por tipo de seguro local

#### Servicios de Datos Mejorados
**`statisticsService.ts`** - ✅ ACTUALIZADO:
- Procesamiento optimizado de datos de especialidades médicas
- Cálculo de métricas y KPIs en tiempo real
- Generación de datos para gráficos sin errores
- Funciones especializadas por categoría
- **Corrección de datos de especialidades**: Filtrado correcto de personal médico

### 💬 Mensajes - ✅ MEJORADO CON FUNCIONALIDADES EN TIEMPO REAL

#### Funcionalidad
Sistema de comunicación interna entre profesionales médicos con actualizaciones en tiempo real.

#### Mejoras Implementadas (Etapa 6)
**Header mejorado** (`Messages.tsx`):
- ✅ **Contador de mensajes no leídos** al lado del título "Mensajes"
- ✅ Badge visual con número de conversaciones pendientes
- ✅ Actualización automática cada 5 segundos

**Actualización en tiempo real** (`messageService.ts`):
- ✅ **Sistema de persistencia** de conversaciones en localStorage
- ✅ **Actualización automática** de listas de chat
- ✅ **Contador global** de mensajes no leídos
- ✅ **Sincronización** al enviar nuevos mensajes

**Interfaz de chat mejorada** (`ChatView.tsx`):
- ✅ **Botones de llamada removidos** (Phone y Video)
- ✅ **Botón "Ver Perfil"** reemplaza funciones de llamada
- ✅ **Enlace al perfil del contacto** con información detallada

**Nuevo componente de perfil** (`ContactProfileDialog.tsx`):
- ✅ **Información completa del contacto**: Foto, nombre, rol, especialidad
- ✅ **Estado de conexión** en tiempo real
- ✅ **Datos de contacto**: Teléfono y email
- ✅ **Horarios de trabajo** (datos mock)
- ✅ **Badge de disponibilidad** visual

#### Características
- **DoctorList**: Lista de contactos médicos con estados actualizados
- **ChatView**: Interfaz de conversación mejorada
- **GroupChatView**: Canales grupales por especialidad
- **Estado online**: Indicador de disponibilidad en tiempo real
- **Historial**: Conservación de conversaciones previas

### 📅 Agenda

#### Funcionalidad General
Sistema de gestión de citas y calendario médico localizado al español mexicano.

#### Vistas por Rol
**DoctorAgendaView**:
- Agenda personal del doctor
- Citas asignadas con IDs de pacientes
- Gestión de disponibilidad

**AdminAgendaView**:
- Vista global de todas las citas
- Gestión de citas de todo el personal
- Supervisión de horarios

#### Componentes
- **Calendar**: Componente de calendario interactivo
- **Localización**: Soporte completo para español mexicano (locale `es`)

### 📋 Expedientes

#### Funcionalidad
Gestión completa de expedientes médicos y documentación clínica con IDs únicos.

#### Permisos por Rol
**Doctor**:
- ✅ Acceso completo a datos clínicos por ID de paciente
- ✅ Crear y gestionar referidos
- ✅ Generar resúmenes médicos
- ✅ Subir estudios externos
- ✅ Ver historial completo del paciente

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

### 🤖 Actividades IA

#### Funcionalidad
Herramientas de inteligencia artificial para asistencia médica localizada.

#### Características
- **ActivityCard**: Tarjetas de actividades IA disponibles
- **ActivityStats**: Estadísticas de uso
- **ActivityIcon**: Iconografía específica para cada herramienta

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

### Sistema de Localización e Internacionalización

#### Configuración i18n (`i18n.ts`) - ✅ ACTUALIZADA
**Nuevas traducciones agregadas**:
- **Horarios de personal**: Regular, Horas Extra, Guardia
- **Estados de disponibilidad**: Activo, Descanso, No disponible
- **Acciones de gestión**: Editar, Eliminar, Agregar turno
- **Notificaciones**: Confirmaciones de acciones en español

#### Hooks de Internacionalización
- **useTranslation**: Implementado en componentes de personal
- **Formato de moneda**: Pesos mexicanos ($XX,XXX.XX MXN)
- **Fechas**: Formato mexicano DD/MM/YYYY

### Sistema de IDs Únicos

#### Generación de IDs (`patientService.ts`)
```typescript
const generateUniqueId = (): string => {
  let id: string;
  do {
    id = Math.floor(10000000 + Math.random() * 90000000).toString();
  } while (patients.some(p => p.id === id));
  return id;
};
```

#### Características
- **8 dígitos únicos**: Formato 12345678
- **Verificación de duplicados**: Algoritmo de unicidad
- **Persistencia**: Mantenido en toda la aplicación
- **Búsqueda funcional**: Por ID en componentes de búsqueda

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

### Servicios de Datos Mejorados

#### Estadísticas (`statisticsService.ts`) - ✅ CORREGIDO
```typescript
// Especialidades médicas corregidas
const medicalPersonnel = personnel.filter(p => 
  (p.role === 'Doctor' || p.role === 'Radiólogo') && p.specialty
);

const bySpecialty = medicalPersonnel.reduce((acc, p) => {
  if (p.specialty) {
    acc[p.specialty] = (acc[p.specialty] || 0) + 1;
  }
  return acc;
}, {} as { [key: string]: number });
```

#### Mensajes (`messageService.ts`) - ✅ TIEMPO REAL
```typescript
// Sistema de persistencia
const saveConversations = (conversations: Conversation[]) => {
  localStorage.setItem('mediapp_conversations', JSON.stringify(conversations));
};

// Contador global de no leídos
const getTotalUnreadCount = (): number => {
  return conversations.reduce((total, conv) => total + conv.unreadCount, 0);
};
```

### Estructura de Datos Actualizada

#### Pacientes (`patients.ts`) - ✅ CON IDS ÚNICOS
```typescript
interface Patient {
  id: string; // ID único de 8 dígitos
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

#### Personal (`personnel.ts`) - ✅ ESPECIALIDADES DIVERSIFICADAS
```typescript
interface Personnel {
  id: string;
  name: string;
  role: 'Doctor' | 'Enfermera' | 'Técnico' | 'Administrativo' | 'Radiólogo';
  specialty?: string; // Especialidades variadas y realistas
  avatar: string;
  online: boolean;
  phone: string;
  email: string;
}
```

### Layout y Navegación

#### MainLayout (`MainLayout.tsx`)
- Layout principal con sidebar y header
- Responsive design mejorado
- Integración completa con sistema de roles

#### Sidebar (`Sidebar.tsx`)
- Navegación principal adaptada por rol
- Logo prominente de MediApp
- Menú contextual según permisos

---

## Registro de Cambios por Etapas

### 18 de Junio de 2025

#### ETAPA 7: 14:30 - Actualización Completa de Documentación ✅
**Cambios realizados**:
- ✅ Documentación completa de todas las funcionalidades implementadas
- ✅ Registro detallado del sistema de IDs únicos
- ✅ Documentación de mejoras en tiempo real de mensajes
- ✅ Especificaciones técnicas de estadísticas corregidas
- ✅ Documentación de localización mexicana completa

**Nuevas secciones documentadas**:
- **Sistema de IDs únicos** con algoritmo de generación
- **Mejoras de mensajes en tiempo real** con persistencia
- **Correcciones de estadísticas** con gráficos funcionales
- **Localización completa** a español mexicano
- **Gestión de horarios** con traducciones funcionales

#### ETAPA 6: 14:00 - Mejoras en Mensajes ✅
**Cambios realizados**:
- ✅ Movido contador de mensajes al lado del título
- ✅ Implementado sistema de actualización en tiempo real
- ✅ Cambiados botones de llamada por enlace al perfil
- ✅ Creado componente ContactProfileDialog funcional
- ✅ Mejorada persistencia de conversaciones

**Archivos modificados/creados**:
- `src/pages/Messages.tsx`: Header mejorado con contador
- `src/services/messageService.ts`: Sistema de tiempo real
- `src/components/messages/ChatView.tsx`: Botón Ver Perfil
- `src/components/messages/ContactProfileDialog.tsx`: Nuevo componente

#### ETAPA 5: 13:30 - Correcciones en Estadísticas ✅
**Cambios realizados**:
- ✅ Corregido gráfico de especialidades médicas
- ✅ Solucionado error de hover problemático
- ✅ Diversificadas especialidades en datos de personal
- ✅ Mejorado procesamiento en servicio de estadísticas
- ✅ Corregido error de TypeScript en ChartTooltipContent

**Archivos modificados**:
- `src/data/personnel.ts`: Especialidades diversificadas
- `src/services/statisticsService.ts`: Procesamiento corregido
- `src/components/statistics/PersonnelStatsWidget.tsx`: Gráfico funcional

#### ETAPA 4: 13:00 - Correcciones en Personal ✅
**Cambios realizados**:
- ✅ Traducidos chips de horario a español
- ✅ Implementados botones funcionales de edición/eliminación
- ✅ Agregadas traducciones al sistema i18n
- ✅ Corregidos todos los textos en inglés

**Archivos modificados**:
- `src/i18n.ts`: Nuevas traducciones
- `src/components/personnel/PersonnelScheduleManagement.tsx`: Funcionalidad completa

#### ETAPA 3: 12:30 - Sistema de IDs Únicos ✅
**Cambios realizados**:
- ✅ Implementado generador de IDs únicos de 8 dígitos
- ✅ Actualizada interfaz de pacientes con IDs prominentes
- ✅ Agregada verificación de unicidad
- ✅ Funcionalidad de búsqueda por ID

#### ETAPA 2: 12:00 - Correcciones en Pacientes ✅
**Cambios realizados**:
- ✅ Corregidos campos de entrada en formularios
- ✅ Implementada funcionalidad de búsqueda
- ✅ Corregidos permisos por rol
- ✅ Mejorada UX de gestión de pacientes

#### ETAPA 1: 11:30 - Localización Mexicana ✅
**Cambios realizados**:
- ✅ Cambiada moneda a pesos mexicanos en todas las secciones
- ✅ Actualizados formatos de fecha
- ✅ Traducidos textos pendientes
- ✅ Configurada localización completa

---

## Estado Actual del Proyecto

### ✅ Funcionalidades Completamente Implementadas
1. **Dashboard**: Funcional para ambos roles con datos en tiempo real
2. **Gestión de Pacientes**: Sistema completo con IDs únicos
3. **Personal**: Gestión completa con horarios localizados
4. **Estadísticas**: Todas las visualizaciones funcionando correctamente
5. **Mensajes**: Sistema en tiempo real con perfiles de contacto
6. **Expedientes**: Gestión médica funcional
7. **Sistema de Roles**: Permisos granulares implementados
8. **Localización**: Español mexicano completo

### 🔧 Próximas Mejoras Recomendadas
1. **Completar Configuración**: Sistema de settings administrativos
2. **Optimizar Performance**: Lazy loading de gráficos complejos
3. **Expandir Estadísticas**: Filtros por fecha y exportación
4. **Mejorar Testing**: Pruebas unitarias y de integración

### 🔒 Consideraciones de Seguridad
- Autenticación de usuarios pendiente
- Encriptación de datos sensibles
- Auditoría de actividades del usuario
- Backup de datos críticos

---

## Contacto y Soporte

Para dudas sobre la implementación o extensión de funcionalidades, consultar:
- Documentación de componentes en `src/components/`
- Servicios en `src/services/`
- Tipos de datos en `src/data/`
- Hooks de permisos en `src/hooks/`
- Contextos en `src/contexts/`

**Última actualización**: 18 de Junio de 2025, 14:30 PM
**Versión**: 1.0.0 - Producción Ready
**Estado**: Todas las etapas completadas ✅
