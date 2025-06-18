
import { Phone, FileText, CalendarClock, Bell, UserCheck, Mic, FileX, ClipboardList } from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import type { Activity } from './ActivityCard';

const iconMap = {
    call: Phone,
    summary: FileText,
    schedule: CalendarClock,
    reminder: Bell,
    'follow-up': UserCheck,
    transcription: Mic,
    referral: FileX,
    'patient-intake': ClipboardList,
};

type ActivityIconProps = {
    type: Activity['type'];
} & LucideProps;

export const ActivityIcon = ({ type, ...props }: ActivityIconProps) => {
    const Icon = iconMap[type];
    if (!Icon) return null;
    return <Icon {...props} />;
};
