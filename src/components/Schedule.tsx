
import { useTranslation } from 'react-i18next';
import { Patient } from '@/data/patients';
import { appointments, getDoctorForAppointment, Appointment } from '@/data/appointments';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Phone, MessageSquare, Bot } from 'lucide-react';
import { Card, CardContent } from './ui/card';

interface ScheduleProps {
  patient: Patient;
}

const AppointmentItem = ({ appointment }: { appointment: Appointment }) => {
  const doctor = getDoctorForAppointment(appointment.personnelId);
  const appointmentDate = new Date(`${appointment.date}T${appointment.time}`);

  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100">
      <div className="flex items-center gap-4">
        <div className="text-center w-12 flex-shrink-0">
          <p className="text-sm text-gray-500">{appointmentDate.toLocaleDateString(undefined, { weekday: 'short' })}</p>
          <p className="text-lg font-bold text-brand-dark">{appointmentDate.getDate()}</p>
        </div>
        <div>
          <p className="font-semibold text-brand-dark">{appointment.type}</p>
          <p className="text-sm text-gray-500">{appointmentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Avatar className="w-8 h-8">
          <AvatarImage src={doctor?.avatar} alt={doctor?.name} />
          <AvatarFallback>{doctor?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium hidden sm:inline">{doctor?.name}</span>
      </div>
    </div>
  )
}

const NextAppointment = ({ appointment }: { appointment: Appointment }) => {
    const { t } = useTranslation();
    const doctor = getDoctorForAppointment(appointment.personnelId);
    const appointmentDate = new Date(`${appointment.date}T${appointment.time}`);

    return (
        <Card className="bg-brand-blue text-white rounded-2xl shadow-lg">
            <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                    <p className="text-sm opacity-80">{t('schedule.nextAppointment', 'Próxima Cita')}</p>
                    <p className="text-xl font-bold">{appointmentDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                    <p className="text-lg">{appointment.type}</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <Avatar className="w-12 h-12 border-2 border-white/50">
                        <AvatarImage src={doctor?.avatar} />
                        <AvatarFallback>{doctor?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <p className="font-semibold">{doctor?.name}</p>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white w-full sm:w-auto">
                            <Bot className="mr-2 h-4 w-4" />
                            {t('schedule.aiReminder', 'Recordatorio con IA')}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuItem>
                            <Phone className="mr-2 h-4 w-4" />
                            <span>{t('schedule.callPatient', 'Llamar paciente')}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            <span>{t('schedule.sendWhatsApp', 'Enviar WhatsApp')}</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardContent>
        </Card>
    )
}

export const Schedule = ({ patient }: ScheduleProps) => {
  const { t } = useTranslation();
  
  const patientAppointments = appointments
    .filter(a => a.patientId === patient.id)
    .sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime());
  
  const now = new Date();
  const upcomingAppointments = patientAppointments.filter(a => new Date(`${a.date}T${a.time}`) >= now);
  const pastAppointments = patientAppointments.filter(a => new Date(`${a.date}T${a.time}`) < now).reverse();

  const nextAppointment = upcomingAppointments[0];

  return (
    <div className="space-y-8">
        {nextAppointment ? <NextAppointment appointment={nextAppointment} /> : (
            <div className="text-center py-8 px-4 bg-gray-50 rounded-2xl">
                <p className="font-semibold text-brand-dark">{t('schedule.noUpcomingFull', 'No hay próximas citas programadas.')}</p>
                <p className="text-sm text-gray-500">{t('schedule.checkLater', 'Vuelve a consultar más tarde o agenda una nueva cita.')}</p>
            </div>
        )}
        
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-brand-dark">{t('schedule.upcoming', 'Próximas Citas')}</h3>
            {upcomingAppointments.length > 0 ? (
                <div className="space-y-3">
                    {upcomingAppointments.map(app => <AppointmentItem key={app.id} appointment={app} />)}
                </div>
            ) : (
                <p className="text-gray-500">{t('schedule.noUpcoming', 'No hay próximas citas programadas.')}</p>
            )}
        </div>

        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-brand-dark">{t('schedule.past', 'Citas Anteriores')}</h3>
            {pastAppointments.length > 0 ? (
                <div className="space-y-3">
                    {pastAppointments.map(app => <AppointmentItem key={app.id} appointment={app} />)}
                </div>
            ) : (
                <p className="text-gray-500">{t('schedule.noPast', 'No hay historial de citas.')}</p>
            )}
        </div>
    </div>
  );
};
