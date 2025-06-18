import { StorageService } from './storage/StorageService';

export interface NotificationSettings {
  appointmentReminders: boolean;
  messageAlerts: boolean;
  medicationReminders: boolean;
  emailNotifications: boolean;
}

export interface ScheduleSettings {
  workingHours: { start: string; end: string };
  workingDays: string[];
  defaultAppointmentDuration: number;
  lunchBreak: { start: string; end: string };
}

export interface AIToolsSettings {
  diagnosticAssistant: boolean;
  prescriptionSuggestions: boolean;
  clinicalNotes: boolean;
  patientRiskAnalysis: boolean;
}

export interface UserConfiguration {
  notifications: NotificationSettings;
  schedule: ScheduleSettings;
  aiTools: AIToolsSettings;
}

// Valores por defecto para nuevos usuarios
export const defaultNotificationSettings: NotificationSettings = {
  appointmentReminders: true,
  messageAlerts: true,
  medicationReminders: true,
  emailNotifications: false,
};

export const defaultScheduleSettings: ScheduleSettings = {
  workingHours: { start: '08:00', end: '17:00' },
  workingDays: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
  defaultAppointmentDuration: 30,
  lunchBreak: { start: '12:00', end: '13:00' },
};

export const defaultAIToolsSettings: AIToolsSettings = {
  diagnosticAssistant: true,
  prescriptionSuggestions: true,
  clinicalNotes: false,
  patientRiskAnalysis: true,
};

export const defaultUserConfiguration: UserConfiguration = {
  notifications: defaultNotificationSettings,
  schedule: defaultScheduleSettings,
  aiTools: defaultAIToolsSettings,
};

// Funciones para gestionar configuración (localStorage por ahora)
export const getUserConfiguration = (): UserConfiguration => {
  const stored = StorageService.getUserConfig<UserConfiguration>();
  if (stored) {
    return { ...defaultUserConfiguration, ...stored };
  }
  return defaultUserConfiguration;
};

export const saveUserConfiguration = (config: Partial<UserConfiguration>): void => {
  const current = getUserConfiguration();
  const updated = { ...current, ...config };
  StorageService.setUserConfig(updated);
  console.log('User configuration saved:', updated);
};

export const resetUserConfiguration = (): void => {
  StorageService.remove('userConfiguration');
  console.log('User configuration reset to defaults');
};
