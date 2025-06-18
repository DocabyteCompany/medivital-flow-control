import { Badge } from "@/components/ui/badge";
interface NotificationBadgeProps {
  count: number;
  maxCount?: number;
}
export const NotificationBadge = ({
  count,
  maxCount = 99
}: NotificationBadgeProps) => {
  if (count === 0) return null;
  const displayCount = count > maxCount ? `${maxCount}+` : count.toString();
  return <Badge variant="destructive" className="absolute -top-0 -right-1/2 -right-8 h-5 flex items-center justify-center text-xs font-medium px-[8px]">
      {displayCount}
    </Badge>;
};