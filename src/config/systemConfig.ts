
// Configuración del sistema separada de datos dinámicos
export const SYSTEM_CONFIG = {
  // Configuración de roles y permisos
  roles: {
    admin: {
      name: 'Administrador',
      permissions: ['read', 'write', 'delete', 'manage_users', 'view_financial'],
      color: 'red'
    },
    doctor: {
      name: 'Doctor',
      permissions: ['read', 'write', 'view_patients', 'create_records'],
      color: 'blue'
    },
    nurse: {
      name: 'Enfermera',
      permissions: ['read', 'write', 'view_patients'],
      color: 'green'
    },
    technician: {
      name: 'Técnico',
      permissions: ['read', 'view_equipment'],
      color: 'purple'
    }
  },
  
  // Configuración de especialidades médicas
  specialties: {
    cardiology: 'Cardiología',
    pediatrics: 'Pediatría',
    neurology: 'Neurología',
    orthopedics: 'Ortopedia',
    gynecology: 'Ginecología',
    general: 'Medicina General',
    radiology: 'Radiología',
    emergency: 'Urgencias'
  },
  
  // Configuración de tipos de citas
  appointmentTypes: {
    consultation: 'Consulta',
    followup: 'Seguimiento',
    surgery: 'Cirugía',
    emergency: 'Urgencia',
    checkup: 'Revisión'
  },
  
  // Configuración de estados de salud
  healthStatuses: {
    healthy: 'Saludable',
    treatment: 'En tratamiento',
    critical: 'Crítico',
    recovery: 'En recuperación'
  },
  
  // Configuración de tipos de seguro
  insuranceTypes: {
    none: 'Sin seguro',
    public: 'Público',
    private: 'Privado',
    mixed: 'Mixto',
    international: 'Internacional'
  },
  
  // Configuración de la aplicación
  app: {
    name: 'Sistema de Gestión Clínica',
    version: '2.0.0',
    supportedLanguages: ['es', 'en'],
    defaultLanguage: 'es',
    timezone: 'America/Mexico_City',
    currency: 'MXN'
  }
} as const;

export type SystemRole = keyof typeof SYSTEM_CONFIG.roles;
export type SystemSpecialty = keyof typeof SYSTEM_CONFIG.specialties;
export type AppointmentType = keyof typeof SYSTEM_CONFIG.appointmentTypes;
export type HealthStatus = keyof typeof SYSTEM_CONFIG.healthStatuses;
export type InsuranceType = keyof typeof SYSTEM_CONFIG.insuranceTypes;
