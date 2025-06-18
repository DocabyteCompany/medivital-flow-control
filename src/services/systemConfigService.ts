import { StorageService } from './storage/StorageService';

export interface SystemConfig {
  showFinancialSection: boolean;
  institutionType: 'small_clinic' | 'medium_clinic' | 'large_hospital';
  enabledSections: {
    patients: boolean;
    personnel: boolean;
    appointments: boolean;
    financial: boolean;
    operational: boolean;
  };
  customSectionNames: {
    financial: string;
    operational: string;
  };
}

const DEFAULT_CONFIG: SystemConfig = {
  showFinancialSection: true,
  institutionType: 'medium_clinic',
  enabledSections: {
    patients: true,
    personnel: true,
    appointments: true,
    financial: true,
    operational: true,
  },
  customSectionNames: {
    financial: 'Financiero',
    operational: 'Métricas Operativas',
  },
};

export class SystemConfigService {
  private static CONFIG_KEY = 'system_config';

  static getConfig(): SystemConfig {
    try {
      const stored = StorageService.getSystemConfig<SystemConfig>();
      if (stored) {
        return { ...DEFAULT_CONFIG, ...stored };
      }
    } catch (error) {
      console.error('Error loading system config:', error);
    }
    return DEFAULT_CONFIG;
  }

  static updateConfig(updates: Partial<SystemConfig>): void {
    try {
      const current = this.getConfig();
      const updated = { ...current, ...updates };
      StorageService.setSystemConfig(updated);
    } catch (error) {
      console.error('Error saving system config:', error);
    }
  }

  static getInstitutionPresets(type: SystemConfig['institutionType']): Partial<SystemConfig> {
    switch (type) {
      case 'small_clinic':
        return {
          showFinancialSection: true,
          enabledSections: {
            patients: true,
            personnel: true,
            appointments: true,
            financial: true,
            operational: false,
          },
        };
      case 'medium_clinic':
        return {
          showFinancialSection: true,
          enabledSections: {
            patients: true,
            personnel: true,
            appointments: true,
            financial: true,
            operational: true,
          },
        };
      case 'large_hospital':
        return {
          showFinancialSection: false,
          enabledSections: {
            patients: true,
            personnel: true,
            appointments: true,
            financial: false,
            operational: true,
          },
          customSectionNames: {
            financial: 'Financiero',
            operational: 'Métricas Operativas',
          },
        };
      default:
        return {};
    }
  }

  static shouldShowSection(section: keyof SystemConfig['enabledSections']): boolean {
    const config = this.getConfig();
    return config.enabledSections[section];
  }

  static getFinancialSectionConfig() {
    const config = this.getConfig();
    return {
      show: config.showFinancialSection && config.enabledSections.financial,
      title: config.customSectionNames.financial,
      isOperationalMode: config.institutionType === 'large_hospital',
    };
  }
}
