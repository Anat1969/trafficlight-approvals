import { RequestStatus, STATUS_CONFIG } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const colorClasses = {
  green: "badge-success",
  yellow: "badge-warning",
  red: "badge-error",
  blue: "badge-info",
};

const dotClasses = {
  green: "bg-status-green",
  yellow: "bg-status-yellow",
  red: "bg-status-red",
  blue: "bg-status-blue",
};

export function StatusBadge({ status }: { status: RequestStatus }) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs transition-all duration-200",
        colorClasses[config.color]
      )}
    >
      <span className={cn("h-2 w-2 rounded-full animate-pulse-gentle", dotClasses[config.color])} />
      {config.label}
    </span>
  );
}
