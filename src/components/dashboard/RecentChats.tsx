
import { doctors } from '@/data/messages';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const RecentChats = () => {
  const { t } = useTranslation();
  const recentDoctors = doctors.slice(0, 4);

  return (
    <Card className="shadow-soft border-0 rounded-2xl h-full flex flex-col">
      <CardHeader>
        <CardTitle>{t('dashboard.recentChats.title', 'Chats Recientes')}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-2">
          {recentDoctors.map(doctor => (
            <Link to="/mensajes" key={doctor.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Avatar className="h-10 w-10">
                <AvatarImage src={doctor.avatar} alt={doctor.name} />
                <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                {doctor.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>}
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="font-semibold text-sm text-brand-dark">{doctor.name}</p>
                <p className="text-xs text-gray-500 truncate">{doctor.lastMessage.text}</p>
              </div>
              <p className="text-xs text-gray-400 flex-shrink-0">{doctor.lastMessage.time}</p>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
