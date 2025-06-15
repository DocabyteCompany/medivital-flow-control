
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center space-x-1 bg-card p-1 rounded-lg shadow-soft">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => changeLanguage('es')}
        className={cn(
          "px-3 py-1 text-sm font-semibold",
          i18n.language.startsWith('es') ? 'bg-brand-blue text-white rounded-md' : 'text-gray-500 hover:bg-brand-light hover:text-brand-blue'
        )}
      >
        ES
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => changeLanguage('en')}
        className={cn(
            "px-3 py-1 text-sm font-semibold",
            i18n.language.startsWith('en') ? 'bg-brand-blue text-white rounded-md' : 'text-gray-500 hover:bg-brand-light hover:text-brand-blue'
        )}
      >
        EN
      </Button>
    </div>
  );
};
