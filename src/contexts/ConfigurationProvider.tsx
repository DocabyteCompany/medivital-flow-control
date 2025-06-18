
import React, { createContext, useContext, ReactNode } from 'react';
import { SYSTEM_CONFIG } from '@/config/systemConfig';

interface ConfigurationContextType {
  config: typeof SYSTEM_CONFIG;
  getRoleName: (role: string) => string;
  getSpecialtyName: (specialty: string) => string;
  getHealthStatusName: (status: string) => string;
  getInsuranceTypeName: (type: string) => string;
  hasPermission: (userRole: string, permission: string) => boolean;
}

const ConfigurationContext = createContext<ConfigurationContextType | undefined>(undefined);

interface ConfigurationProviderProps {
  children: ReactNode;
}

export const ConfigurationProvider = ({ children }: ConfigurationProviderProps) => {
  const getRoleName = (role: string) => {
    return SYSTEM_CONFIG.roles[role as keyof typeof SYSTEM_CONFIG.roles]?.name || role;
  };
  
  const getSpecialtyName = (specialty: string) => {
    return SYSTEM_CONFIG.specialties[specialty as keyof typeof SYSTEM_CONFIG.specialties] || specialty;
  };
  
  const getHealthStatusName = (status: string) => {
    return SYSTEM_CONFIG.healthStatuses[status as keyof typeof SYSTEM_CONFIG.healthStatuses] || status;
  };
  
  const getInsuranceTypeName = (type: string) => {
    return SYSTEM_CONFIG.insuranceTypes[type as keyof typeof SYSTEM_CONFIG.insuranceTypes] || type;
  };
  
  const hasPermission = (userRole: string, permission: string) => {
    const roleConfig = SYSTEM_CONFIG.roles[userRole as keyof typeof SYSTEM_CONFIG.roles];
    return roleConfig?.permissions.includes(permission) || false;
  };

  const value: ConfigurationContextType = {
    config: SYSTEM_CONFIG,
    getRoleName,
    getSpecialtyName,
    getHealthStatusName,
    getInsuranceTypeName,
    hasPermission
  };

  return (
    <ConfigurationContext.Provider value={value}>
      {children}
    </ConfigurationContext.Provider>
  );
};

export const useConfiguration = () => {
  const context = useContext(ConfigurationContext);
  if (context === undefined) {
    throw new Error('useConfiguration must be used within a ConfigurationProvider');
  }
  return context;
};
