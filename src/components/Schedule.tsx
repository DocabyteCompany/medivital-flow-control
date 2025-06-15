import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from 'react-i18next';

const appointments = [
  { 
    id: 1, 
    title: 'Covid Swab Test', 
    participants: 48, 
    color: 'bg-blue-500', 
    avatars: ["https://i.pravatar.cc/150?img=6", "https://i.pravatar.cc/150?img=7"], 
    day: 'Wed' 
  },
  { 
    id: 2, 
    title: 'Dental Check', 
    participants: 12, 
    color: 'bg-green-500', 
    avatars: ["https://i.pravatar.cc/150?img=8", "https://i.pravatar.cc/150?img=9", "https://i.pravatar.cc/150?img=10"], 
    day: 'Wed' 
  },
  { 
    id: 3, 
    title: 'Covid Rapid Test', 
    participants: 8, 
    color: 'bg-blue-500', 
    avatars: ["https://i.pravatar.cc/150?img=11", "https://i.pravatar.cc/150?img=12"], 
    day: 'Fri' 
  },
  { 
    id: 4, 
    title: 'Cardiac Test', 
    participants: 8, 
    color: 'bg-indigo-500', 
    avatars: ["https://i.pravatar.cc/150?img=13", "https://i.pravatar.cc/150?img=14"], 
    day: 'Fri' 
  },
];

const days = [
    { day: "Mon", date: 3 },
    { day: "Tue", date: 4 },
    { day: "Wed", date: 5, isToday: true },
    { day: "Thu", date: 6 },
    { day: "Fri", date: 7 },
    { day: "Sat", date: 8 },
];

export const Schedule = () => {
  const { t } = useTranslation();

  return (
  <Card className="shadow-soft border-0 rounded-2xl h-full flex flex-col">
    <CardHeader>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-brand-dark"><ChevronLeft/></button>
            <span className="font-semibold text-brand-dark">{t('schedule.monthYear', { month: t('schedule.months.september'), year: 2030 })}</span>
            <button className="text-gray-400 hover:text-brand-dark"><ChevronRight/></button>
        </div>
      </div>
    </CardHeader>
    <CardContent className="pr-10 flex-grow">
      <div className="grid grid-cols-6 gap-4 border-b pb-4">
        {days.map(({day, date, isToday}) => (
          <div key={day} className="text-center">
            <p className="text-xs text-gray-400">{day}</p>
            <p className={`font-semibold mt-1 ${isToday ? 'text-brand-blue' : 'text-brand-dark'}`}>{date}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-3 relative">
        <div className="absolute left-0 top-0 bottom-0 grid grid-cols-6 gap-4 w-full -z-10">
            {days.map(({day, isToday}) => <div key={day} className={`h-full ${isToday ? 'border-l-2 border-brand-blue' : ''} ml-6`}></div>)}
        </div>
        {appointments.map(app => (
          <div key={app.id} className={`p-3 rounded-lg flex items-center justify-between text-white ${app.color} ${app.day === 'Wed' ? 'col-start-3 col-span-2' : 'col-start-5 col-span-2'}`}>
            <div>
              <p className="font-semibold text-sm">{app.title}</p>
              <p className="text-xs opacity-80">{t('schedule.participants', { count: app.participants })}</p>
            </div>
            <div className="flex -space-x-2">
              {app.avatars.map((src, i) => (
                <Avatar key={i} className="w-6 h-6 border-2 border-white/50">
                  <AvatarImage src={src} />
                  <AvatarFallback>{i}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
  );
};
