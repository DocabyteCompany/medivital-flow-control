
import {
  Users,
  Calendar,
  ClipboardList,
  MessageSquare,
  LifeBuoy,
  UserCircle,
  Bot,
  Home,
  Stethoscope,
  BarChart3,
  Settings,
} from 'lucide-react';
import { cn } from "@/lib/utils";
import type { ComponentType } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useRole } from '@/contexts/RoleContext';

const SidebarIcon = ({ icon: Icon, label, isActive = false, isLogo = false }: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  isActive?: boolean;
  isLogo?: boolean;
}) => (
  <div className={cn(
    "flex items-center justify-center w-12 h-12 rounded-lg transition-colors duration-200",
    isActive ? "bg-brand-blue text-white" : "text-gray-400 hover:bg-brand-light hover:text-brand-blue",
    isLogo ? "text-brand-blue" : ""
  )}>
    <Icon className="w-6 h-6" />
    <span className="sr-only">{label}</span>
  </div>
);

export const Sidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { selectedRole } = useRole();

  const doctorMenuItems = [
    { icon: Home, label: t('sidebar.logo'), path: '/dashboard' },
    { icon: Users, label: t('sidebar.patients'), path: '/pacientes' },
    { icon: MessageSquare, label: t('sidebar.messages'), path: '/mensajes' },
    { icon: Calendar, label: t('sidebar.agenda'), path: '/agenda' },
    { icon: ClipboardList, label: t('sidebar.records'), path: '/expedientes' },
    { icon: Bot, label: 'Actividades IA', path: '/ia-activities' },
  ];

  const adminMenuItems = [
    { icon: Home, label: t('sidebar.logo'), path: '/dashboard' },
    { icon: Users, label: t('sidebar.patients'), path: '/pacientes' },
    { icon: Stethoscope, label: t('sidebar.personnel', 'Personal'), path: '/personal' },
    { icon: BarChart3, label: 'Estadísticas', path: '/estadisticas' },
    { icon: MessageSquare, label: t('sidebar.messages'), path: '/mensajes' },
    { icon: Calendar, label: t('sidebar.agenda'), path: '/agenda' },
    { icon: ClipboardList, label: t('sidebar.records'), path: '/expedientes' },
    { icon: Bot, label: 'Actividades IA', path: '/ia-activities' },
    { icon: Settings, label: 'Configuración', path: '/configuracion' },
  ];

  const menuItems = selectedRole === 'Admin' ? adminMenuItems : doctorMenuItems;
  
  const bottomItems = [
      { icon: LifeBuoy, label: t('sidebar.support') },
      { icon: UserCircle, label: t('sidebar.profile') },
  ];

  return (
    <aside className="bg-card w-20 flex flex-col items-center py-6 shadow-soft">
      <nav className="flex flex-col items-center space-y-4 flex-1">
        <Link to={menuItems[0].path}>
          <SidebarIcon icon={menuItems[0].icon} label={menuItems[0].label} isLogo />
        </Link>
        <div className="h-8"></div>
        {menuItems.slice(1).map((item) => (
          <Link key={item.label} to={item.path}>
            <SidebarIcon icon={item.icon} label={item.label} isActive={location.pathname === item.path} />
          </Link>
        ))}
      </nav>
      <div className="flex flex-col items-center space-y-4">
        {bottomItems.map((item) => (
          <button key={item.label} className="focus:outline-none">
            <SidebarIcon icon={item.icon} label={item.label} />
          </button>
        ))}
      </div>
    </aside>
  );
};
