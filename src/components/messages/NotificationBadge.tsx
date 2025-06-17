
import { Badge } from "@/components/ui/badge";

interface NotificationBadgeProps {
  count: number;
  maxCount?: number;
}

export const NotificationBadge = ({ count, maxCount = 99 }: NotificationBadgeProps) => {
  if (count === 0) return null;

  const displayCount = count > maxCount ? `${maxCount}+` : count.toString();

  return (
    <Badge 
      variant="destructive" 
      className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 flex items-center justify-center text-xs font-medium px-1.5"
    >
      {displayCount}
    </Badge>
  );
};
