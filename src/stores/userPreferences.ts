
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserPreferences {
  // Preferencias de UI
  theme: 'light' | 'dark' | 'system';
  language: 'es' | 'en';
  timezone: string;
  
  // Preferencias de dashboard
  dashboardLayout: 'grid' | 'list';
  defaultView: 'patients' | 'statistics' | 'agenda';
  
  // Preferencias de notificaciones
  notifications: {
    email: boolean;
    push: boolean;
    appointments: boolean;
    alerts: boolean;
  };
  
  // Preferencias de tablas
  tablePreferences: {
    itemsPerPage: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
  };
  
  // Acciones
  setTheme: (theme: UserPreferences['theme']) => void;
  setLanguage: (language: UserPreferences['language']) => void;
  setDashboardLayout: (layout: UserPreferences['dashboardLayout']) => void;
  setDefaultView: (view: UserPreferences['defaultView']) => void;
  updateNotifications: (notifications: Partial<UserPreferences['notifications']>) => void;
  updateTablePreferences: (prefs: Partial<UserPreferences['tablePreferences']>) => void;
}

export const useUserPreferences = create<UserPreferences>()(
  persist(
    (set, get) => ({
      // Estado inicial
      theme: 'system',
      language: 'es',
      timezone: 'America/Mexico_City',
      dashboardLayout: 'grid',
      defaultView: 'patients',
      notifications: {
        email: true,
        push: true,
        appointments: true,
        alerts: true
      },
      tablePreferences: {
        itemsPerPage: 10,
        sortBy: 'name',
        sortOrder: 'asc'
      },
      
      // Acciones
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setDashboardLayout: (layout) => set({ dashboardLayout: layout }),
      setDefaultView: (view) => set({ defaultView: view }),
      
      updateNotifications: (notifications) => 
        set((state) => ({
          notifications: { ...state.notifications, ...notifications }
        })),
        
      updateTablePreferences: (prefs) =>
        set((state) => ({
          tablePreferences: { ...state.tablePreferences, ...prefs }
        }))
    }),
    {
      name: 'user-preferences',
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        timezone: state.timezone,
        dashboardLayout: state.dashboardLayout,
        defaultView: state.defaultView,
        notifications: state.notifications,
        tablePreferences: state.tablePreferences
      })
    }
  )
);
