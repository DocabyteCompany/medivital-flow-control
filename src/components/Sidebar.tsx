import {
  Users,
  Calendar,
  HeartPulse,
  ClipboardList,
  MessageSquare,
  LifeBuoy,
  UserCircle
} from 'lucide-react';
import { cn } from "@/lib/utils";
import type { ComponentType } from 'react';
import { useTranslation } from 'react-i18next';

const menuItems = [
  { icon: HeartPulse, label: 'Logo' },
  { icon: Users, label: 'Pacientes' },
  { icon: MessageSquare, label: 'Mensajes' },
  { icon: Calendar, label: 'Agenda' },
  { icon: ClipboardList, label: 'Expedientes' },
];

const bottomItems = [
    { icon: LifeBuoy, label: 'Soporte' },
    { icon: UserCircle, label: 'Perfil' },
];

const SidebarIcon = ({ icon: Icon, label, isActive = false, isLogo = false }: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  isActive?: boolean;
  isLogo?: boolean;
}) => (
  <button className={cn(
    "flex items-center justify-center w-12 h-12 rounded-lg transition-colors duration-200",
    isActive ? "bg-brand-blue text-white" : "text-gray-400 hover:bg-brand-light hover:text-brand-blue",
    isLogo ? "text-brand-blue" : ""
  )}>
    <Icon className="w-6 h-6" />
    <span className="sr-only">{label}</span>
  </button>
);

export const Sidebar = () => {
  const { t } = useTranslation();

  const menuItems = [
    { icon: HeartPulse, label: t('sidebar.logo') },
    { icon: Users, label: t('sidebar.patients') },
    { icon: MessageSquare, label: t('sidebar.messages') },
    { icon: Calendar, label: t('sidebar.agenda') },
    { icon: ClipboardList, label: t('sidebar.records') },
  ];
  
  const bottomItems = [
      { icon: LifeBuoy, label: t('sidebar.support') },
      { icon: UserCircle, label: t('sidebar.profile') },
  ];

  return (
    <aside className="bg-card w-20 flex flex-col items-center py-6 shadow-soft">
      <nav className="flex flex-col items-center space-y-4 flex-1">
        <SidebarIcon icon={menuItems[0].icon} label={menuItems[0].label} isLogo />
        <div className="h-8"></div>
        {menuItems.slice(1).map((item) => (
          <SidebarIcon key={item.label} icon={item.icon} label={item.label} isActive={item.label === t('sidebar.patients')} />
        ))}
      </nav>
      <div className="flex flex-col items-center space-y-4">
        {bottomItems.map((item) => (
            <SidebarIcon key={item.label} icon={item.icon} label={item.label} />
        ))}
      </div>
    </aside>
  );
};
