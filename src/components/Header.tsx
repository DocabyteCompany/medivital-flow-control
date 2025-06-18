
import { Button } from "@/components/ui/button"
import { Bell, User } from "lucide-react"
import { LanguageSwitcher } from "./LanguageSwitcher"
import { RoleSelector } from "./RoleSelector"
import { useTranslation } from 'react-i18next'

export const Header = () => {
  const { t } = useTranslation()

  return (
    <header className="bg-card border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-brand-dark">
            {t('header.welcome', 'Bienvenido')}
          </h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <RoleSelector />
          <LanguageSwitcher />
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
              3
            </span>
          </Button>
          <Button variant="ghost" size="icon">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
