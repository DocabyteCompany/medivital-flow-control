
# TODO - Plan de Refactorización del Sistema de Clínica

## 🚨 ERRORES CRÍTICOS A CORREGIR (PRIORIDAD MÁXIMA)
**Estado: ✅ RESUELTO**

- [x] **Error de hooks**: Hook `useStatistics` exportado sin existir
- [x] **Tipos de datos inconsistentes**: Datos en español vs tipos en inglés
- [x] **Propiedades faltantes**: Patient sin `healthStatus` e `insurance`
- [x] **Tipos no exportados**: Calculadores sin exportar tipos
- [x] **Error de permisos**: Tipo de string no asignable a permisos específicos
- [x] **Error de exportación**: useActivity no exportado correctamente

---

## 📋 FASE 2: Refactorización de Componentes UI
**Estado: ✅ COMPLETADA**

### Dividir componentes grandes
- [x] Separar `PersonnelStatsWidget` en subcomponentes reutilizables
  - [x] `PersonnelRoleDistribution` (gráfico de roles)
  - [x] `PersonnelOnlineStatus` (estado en línea)
  - [x] `PersonnelSpecialtyBreakdown` (distribución por especialidad)
- [x] Crear componentes base para estadísticas comunes
  - [x] `BaseStatsCard` ✅ (ya existe)
  - [x] `BaseTable` para tablas consistentes ✅
  - [x] `BaseModal` para diálogos reutilizables ✅

### Crear sistema de componentes base
- [x] `BaseStatsCard` para todas las estadísticas ✅
- [x] `MetricsGrid` para layouts de métricas ✅
- [x] `ChartWrapper` para gráficos consistentes ✅
- [x] `BaseTable` para tablas consistentes ✅
- [x] `BaseModal` para diálogos reutilizables ✅

### Optimizar hooks personalizados
- [x] Consolidar hooks de permisos en uno solo optimizado
  - [x] Unificar `usePermissions`, `usePatientPermissions`, `useRecordsPermissions`
  - [x] Crear `useUnifiedPermissions` con cache optimizado ✅
- [x] Crear hooks de data fetching específicos ✅
- [x] Implementar hooks de validación reutilizables ✅

---

## 📊 FASE 3: Refactorización de Datos y Estado
**Estado: 🔄 EN PROGRESO**

### Mejorar gestión de estado
- [x] Implementar Zustand para estado global complejo ✅
  - [x] `useGlobalState` para estado de aplicación ✅
  - [x] `useUserPreferences` para configuraciones de usuario ✅
  - [x] `useNotificationState` para gestión de notificaciones ✅
- [ ] Optimizar React Query para datos del servidor
- [ ] Crear custom hooks para estado local común

### Normalizar estructura de datos
- [x] Crear interfaces TypeScript consistentes ✅
- [x] Implementar factory functions para datos mock ✅
- [x] Separar datos de configuración de datos dinámicos ✅
  - [x] Mover configuración del sistema a archivos separados ✅
  - [x] Crear `ConfigurationProvider` context ✅
- [ ] Crear hooks de data fetching específicos
- [ ] Implementar validación de datos consistente

---

## ⚡ FASE 4: Optimización y Performance (PRÓXIMA)

### Lazy loading y code splitting
- [ ] Implementar lazy loading para páginas principales
  - [ ] `React.lazy()` para páginas principales
  - [ ] `Suspense` boundaries con loaders
- [ ] Dividir chunks por funcionalidad
  - [ ] Separar chunks de estadísticas
  - [ ] Separar chunks de pacientes
  - [ ] Separar chunks de configuración
- [ ] Optimizar bundle size
  - [ ] Tree shaking de dependencias no utilizadas
  - [ ] Análisis de bundle con `webpack-bundle-analyzer`

### Memoización y optimizaciones
- [ ] Implementar `React.memo` donde sea necesario
  - [ ] Componentes de estadísticas pesados
  - [ ] Listas de pacientes y personal
- [ ] Optimizar re-renders con `useMemo` y `useCallback`
  - [ ] Cálculos complejos de estadísticas
  - [ ] Funciones de filtrado y búsqueda
- [ ] Crear virtual scrolling para listas grandes
  - [ ] Lista de pacientes (>1000 items)
  - [ ] Historia de actividades

---

## 📚 FASE 5: Actualización de Documentación

### Refactorizar documentación técnica
- [ ] Dividir `DOCUMENTATION.md` en archivos especializados
  - [ ] `ARCHITECTURE.md` para decisiones técnicas
  - [ ] `API.md` para documentación de APIs
  - [ ] `COMPONENTS.md` para guía de componentes
- [ ] Crear `ARCHITECTURE.md` para decisiones técnicas
  - [ ] Patrones de diseño utilizados
  - [ ] Estructura de carpetas
  - [ ] Convenciones de código
- [ ] Documentar patrones de diseño utilizados
  - [ ] Factory Pattern para datos mock
  - [ ] Observer Pattern para notificaciones
  - [ ] Provider Pattern para contextos

### Documentación de componentes
- [ ] Agregar JSDoc a todos los componentes públicos
  - [ ] Componentes de estadísticas
  - [ ] Hooks personalizados
  - [ ] Servicios principales
- [ ] Crear Storybook para componentes UI
  - [ ] Stories para componentes base
  - [ ] Stories para widgets de estadísticas
- [ ] Documentar APIs y hooks personalizados
  - [ ] Guía de uso de hooks
  - [ ] Ejemplos de implementación

---

## 🔧 TAREAS ADICIONALES DE MANTENIMIENTO

### Refactorización de archivos largos
- [ ] `src/data/patients.ts` (209 líneas) - Dividir en:
  - [ ] `types/patient.ts` para interfaces
  - [ ] `data/patientsData.ts` para datos
  - [ ] `utils/patientUtils.ts` para funciones helper

### Optimizaciones de TypeScript
- [ ] Configurar strict mode completo
- [ ] Añadir exhaustive-deps a todas las reglas de ESLint
- [ ] Implementar tipos más estrictos para APIs

### Testing (Futuro)
- [ ] Configurar Jest y React Testing Library
- [ ] Tests unitarios para hooks críticos
- [ ] Tests de integración para páginas principales
- [ ] Tests E2E con Playwright

---

## 📈 MÉTRICAS DE PROGRESO

### Completado
- ✅ Fase 1: Corrección de errores críticos (100%)
- ✅ Fase 2: Refactorización UI (100%)
- ⏳ Fase 3: Datos y Estado (70%)

### En Progreso
- ⏳ Fase 3: Datos y Estado (pendiente optimización React Query y hooks)

### Pendiente
- ⏳ Fase 4: Performance (0%)
- ⏳ Fase 5: Documentación (0%)

---

## 🎯 PRÓXIMOS PASOS INMEDIATOS - CONTINUAR FASE 3

1. **Optimizar React Query** para datos del servidor
2. **Crear custom hooks** para estado local común
3. **Implementar hooks de data fetching** específicos
4. **Validación de datos** consistente
5. **Terminar normalización** de estructura de datos

---

**Última actualización:** 18 de junio, 2025  
**Responsable:** Equipo de desarrollo  
**Revisión:** Semanal
