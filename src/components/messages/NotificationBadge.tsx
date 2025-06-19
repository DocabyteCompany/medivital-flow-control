
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

  return (
    <Badge 
      variant="destructive" 
      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs font-medium p-0 min-w-[20px] border-2 border-white"
    >
      {displayCount}
    </Badge>
  );
};
