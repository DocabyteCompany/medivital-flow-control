
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

const SidebarItem = ({ icon: Icon, label, path, isActive = false, isLogo = false }: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  path?: string;
  isActive?: boolean;
  isLogo?: boolean;
}) => {
  const content = (
    <div className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 w-full",
      isActive ? "bg-brand-blue text-white" : "text-gray-600 hover:bg-brand-light hover:text-brand-blue",
      isLogo ? "text-brand-blue font-semibold" : ""
    )}>
      <Icon className="w-5 h-5 flex-shrink-0" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );

  if (path) {
    return (
      <Link to={path} className="block">
        {content}
      </Link>
    );
  }

  return (
    <button className="w-full text-left">
      {content}
    </button>
  );
};

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
    <aside className="bg-card w-64 flex flex-col py-6 px-4 shadow-soft">
      <nav className="flex flex-col space-y-2 flex-1">
        <SidebarItem 
          icon={menuItems[0].icon} 
          label={menuItems[0].label} 
          path={menuItems[0].path}
          isLogo 
        />
        <div className="h-6"></div>
        {menuItems.slice(1).map((item) => (
          <SidebarItem 
            key={item.label} 
            icon={item.icon} 
            label={item.label} 
            path={item.path}
            isActive={location.pathname === item.path} 
          />
        ))}
      </nav>
      <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
        {bottomItems.map((item) => (
          <SidebarItem 
            key={item.label} 
            icon={item.icon} 
            label={item.label} 
          />
        ))}
      </div>
    </aside>
  );
};
