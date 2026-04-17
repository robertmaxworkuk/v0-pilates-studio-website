import { MapPin, Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

interface SessionCardProps {
  session: {
    id: string;
    title: string;
    start_time: string;
    end_time: string;
    location: string;
    max_capacity: number;
    price: number;
    status: string;
    type_id: string;
  };
  onClick?: () => void;
  className?: string;
  compact?: boolean;
}

export function SessionCard({ session, onClick, className, compact = false }: SessionCardProps) {
  const startTime = new Date(session.start_time);
  const endTime = new Date(session.end_time);
  const formattedTime = format(startTime, "HH:mm");
  const duration = Math.round((endTime.getTime() - startTime.getTime()) / 60000);

  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md cursor-pointer hover:border-primary/30",
        className
      )}
    >
      <div className="p-5 flex flex-col gap-4">
        {/* Header: Time and Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
              {formattedTime}
            </div>
            <div className="text-xs text-muted-foreground flex items-center font-medium">
              <Clock className="w-3 h-3 mr-1" />
              {duration} мин
            </div>
          </div>
          {session.status === 'scheduled' && (
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
          )}
        </div>

        {/* Title */}
        <div>
          <h3 className="text-lg font-bold tracking-tight group-hover:text-primary transition-colors">
            {session.title}
          </h3>
          {!compact && (
            <div className="mt-2 text-sm text-muted-foreground line-clamp-2">
              Групповая тренировка
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground mt-2">
          <div className="flex items-center">
            <MapPin className="w-3.5 h-3.5 mr-1.5" />
            {session.location}
          </div>
          <div className="flex items-center">
            <Users className="w-3.5 h-3.5 mr-1.5" />
            До {session.max_capacity} чел.
          </div>
        </div>
      </div>
      
      {/* Decorative gradient overlay on hover */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}
