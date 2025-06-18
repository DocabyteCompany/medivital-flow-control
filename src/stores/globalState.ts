
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface GlobalState {
  // Estado de la aplicación
  isLoading: boolean;
  currentUser: {
    id: string;
    name: string;
    role: 'admin' | 'doctor' | 'nurse' | 'technician';
    permissions: string[];
  } | null;
  
  // Estado de navegación
  currentPage: string;
  previousPage: string;
  
  // Estado de datos
  lastDataRefresh: Date | null;
  
  // Acciones
  setLoading: (loading: boolean) => void;
  setCurrentUser: (user: GlobalState['currentUser']) => void;
  setCurrentPage: (page: string) => void;
  refreshData: () => void;
}

export const useGlobalState = create<GlobalState>()(
  subscribeWithSelector((set, get) => ({
    // Estado inicial
    isLoading: false,
    currentUser: null,
    currentPage: '',
    previousPage: '',
    lastDataRefresh: null,
    
    // Acciones
    setLoading: (loading) => set({ isLoading: loading }),
    
    setCurrentUser: (user) => set({ currentUser: user }),
    
    setCurrentPage: (page) => {
      const currentPage = get().currentPage;
      set({ 
        previousPage: currentPage,
        currentPage: page 
      });
    },
    
    refreshData: () => set({ lastDataRefresh: new Date() })
  }))
);
