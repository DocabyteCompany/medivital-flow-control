
# Guía de Instalación - MediApp

## Requisitos del Sistema

### Requisitos Mínimos
- **Node.js**: v18.0.0 o superior
- **npm**: v8.0.0 o superior (o bun/yarn equivalente)
- **Navegador**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **RAM**: 4GB mínimo, 8GB recomendado
- **Espacio en disco**: 1GB libre

### Requisitos Recomendados
- **Node.js**: v20.0.0 LTS
- **npm**: v10.0.0 o superior
- **Sistema operativo**: Windows 10+, macOS 12+, Ubuntu 20.04+
- **RAM**: 16GB para desarrollo
- **SSD**: Para mejor performance

## Instalación Local

### 1. Clonar el Repositorio
```bash
# Clonar desde el repositorio
git clone [URL_DEL_REPOSITORIO]
cd mediapp

# O si ya tienes el código
cd path/to/mediapp
```

### 2. Instalar Dependencias
```bash
# Usando npm
npm install

# O usando bun (recomendado para mejor performance)
bun install

# O usando yarn
yarn install
```

### 3. Configuración del Entorno
```bash
# Copiar archivo de configuración
cp .env.example .env.local

# Editar variables de entorno
nano .env.local
```

#### Variables de Entorno Disponibles
```env
# Configuración básica
VITE_APP_NAME=MediApp
VITE_APP_VERSION=1.0.0

# Configuración de la clínica
VITE_INSTITUTION_TYPE=medium_clinic
VITE_DEFAULT_LANGUAGE=es
VITE_DEFAULT_CURRENCY=MXN

# URLs de APIs (cuando se implementen)
VITE_API_BASE_URL=http://localhost:3001
VITE_WEBSOCKET_URL=ws://localhost:3001

# Configuración de desarrollo
VITE_DEBUG_MODE=true
VITE_MOCK_DATA=true
```

### 4. Ejecutar en Desarrollo
```bash
# Iniciar servidor de desarrollo
npm run dev

# O con bun
bun dev

# La aplicación estará disponible en:
# http://localhost:5173
```

### 5. Construir para Producción
```bash
# Construir aplicación
npm run build

# Previsualizar build
npm run preview

# Los archivos se generan en la carpeta 'dist/'
```

## Configuración por Tipo de Institución

### Clínica Pequeña (small_clinic)
```javascript
// En src/config/systemConfig.ts
export const SMALL_CLINIC_CONFIG = {
  maxPatients: 500,
  enabledSections: {
    patients: true,
    personnel: true,
    appointments: true,
    financial: false, // Simplificado
    operational: false
  },
  features: {
    statistics: 'basic',
    messaging: 'simple',
    aiTools: 'limited'
  }
};
```

### Clínica Mediana (medium_clinic)
```javascript
export const MEDIUM_CLINIC_CONFIG = {
  maxPatients: 2000,
  enabledSections: {
    patients: true,
    personnel: true,
    appointments: true,
    financial: true,
    operational: true
  },
  features: {
    statistics: 'advanced',
    messaging: 'full',
    aiTools: 'standard'
  }
};
```

### Hospital Grande (large_hospital)
```javascript
export const LARGE_HOSPITAL_CONFIG = {
  maxPatients: 10000,
  enabledSections: {
    patients: true,
    personnel: true,
    appointments: true,
    financial: true,
    operational: true
  },
  features: {
    statistics: 'enterprise',
    messaging: 'enterprise',
    aiTools: 'full'
  }
};
```

## Configuración de Base de Datos

### Datos Mock (Desarrollo)
La aplicación incluye datos mock para desarrollo:
- **Pacientes**: 50+ pacientes de ejemplo con IDs únicos
- **Personal**: 15+ profesionales médicos
- **Mensajes**: Conversaciones de ejemplo
- **Estadísticas**: Datos calculados en tiempo real

### Datos Reales (Producción)
Para usar datos reales, configurar:

```javascript
// En src/services/config.ts
export const API_CONFIG = {
  baseURL: process.env.VITE_API_BASE_URL,
  endpoints: {
    patients: '/api/patients',
    personnel: '/api/personnel',
    statistics: '/api/statistics',
    messages: '/api/messages'
  }
};
```

## Configuración de Roles y Usuarios

### Usuarios de Prueba
La aplicación incluye usuarios de prueba:

```javascript
// Doctor de prueba
const testDoctor = {
  id: 'doctor-001',
  name: 'Dr. Juan Pérez',
  role: 'doctor',
  specialty: 'Cardiología'
};

// Admin de prueba
const testAdmin = {
  id: 'admin-001',
  name: 'Ana Rodríguez',
  role: 'admin',
  permissions: 'all'
};
```

### Configurar Usuarios Reales
Para agregar usuarios reales, editar:

```javascript
// En src/data/users.ts
export const users = [
  {
    id: 'unique-id',
    name: 'Nombre Completo',
    email: 'email@clinica.com',
    role: 'doctor' | 'admin',
    specialty?: 'Especialidad médica',
    permissions: ['patients:read', 'patients:write', ...]
  }
];
```

## Personalización

### Temas y Colores
```css
/* En src/index.css */
:root {
  --brand-blue: #3b82f6;
  --brand-green: #10b981;
  --brand-purple: #8b5cf6;
  --brand-orange: #f59e0b;
  --brand-red: #ef4444;
  --brand-dark: #1f2937;
  --brand-light: #f9fafb;
}
```

### Logo y Branding
1. Reemplazar `public/logo.svg` con el logo de la clínica
2. Actualizar `public/favicon.ico`
3. Modificar título en `index.html`

### Configuración Regional
```javascript
// En src/i18n.ts
export const LOCALE_CONFIG = {
  language: 'es-MX',
  currency: 'MXN',
  dateFormat: 'DD/MM/YYYY',
  timeFormat: 'HH:mm',
  timezone: 'America/Mexico_City'
};
```

## Verificación de Instalación

### Tests de Funcionalidad
```bash
# Verificar que todas las páginas cargan
npm run test:pages

# Verificar componentes críticos
npm run test:components

# Verificar servicios de datos
npm run test:services
```

### Checklist de Verificación
- [ ] ✅ Dashboard carga correctamente
- [ ] ✅ Sistema de roles funciona
- [ ] ✅ Gestión de pacientes operativa
- [ ] ✅ Estadísticas se generan
- [ ] ✅ Mensajería funcional
- [ ] ✅ Responsive design en móviles
- [ ] ✅ Performance optimizada
- [ ] ✅ Datos mock cargados

## Solución de Problemas

### Errores Comunes

**Error: Module not found**
```bash
# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

**Error: Port already in use**
```bash
# Usar puerto diferente
npm run dev -- --port 3000
```

**Error: Build fails**
```bash
# Verificar TypeScript
npm run type-check

# Verificar sintaxis
npm run lint
```

**Performance lenta**
```bash
# Usar bun en lugar de npm
npm install -g bun
bun install
bun dev
```

### Logs de Depuración
```javascript
// Activar logs detallados
localStorage.setItem('debug', 'true');

// Ver logs en consola del navegador
console.log('MediApp Debug Mode Active');
```

## Despliegue

### Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel

# Configurar dominio personalizado
vercel --prod
```

### Netlify
```bash
# Build y desplegar
npm run build
netlify deploy --prod --dir=dist
```

### Hosting Manual
```bash
# Build para producción
npm run build

# Subir carpeta 'dist/' a servidor web
# Configurar servidor para SPA (Single Page Application)
```

---

**Instalación completa estimada:** 10-15 minutos  
**Configuración personalizada:** 30-60 minutos  
**Tiempo total de setup:** 1-2 horas

**Última actualización:** 18 de junio, 2025
