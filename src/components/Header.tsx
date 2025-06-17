
import { Search, Bell, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';
import { RoleSelector } from './RoleSelector';

export const Header = () => {
  const { t } = useTranslation();
  return (
    <header className="flex items-center justify-between mb-6">
      <div className="relative w-full max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input placeholder={t('header.searchPlaceholder')} className="pl-10 bg-card rounded-lg border-0 shadow-soft" />
      </div>
      <div className="flex items-center space-x-4">
        <RoleSelector />
        <LanguageSwitcher />
        <Button variant="ghost" size="icon" className="text-gray-400 hover:bg-brand-light hover:text-brand-blue rounded-lg">
          <Bell className="w-6 h-6" />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:bg-brand-light hover:text-brand-blue rounded-lg">
          <Settings className="w-6 h-6" />
        </Button>
      </div>
    </header>
  );
};
