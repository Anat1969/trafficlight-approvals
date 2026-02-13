import { RequestStatus, STATUS_CONFIG } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const colorClasses = {
  green: "bg-status-green-bg text-status-green border-status-green/20",
  yellow: "bg-status-yellow-bg text-status-yellow border-status-yellow/20",
  red: "bg-status-red-bg text-status-red border-status-red/20",
  blue: "bg-status-blue-bg text-status-blue border-status-blue/20",
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
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold",
        colorClasses[config.color]
      )}
    >
      <span className={cn("h-2 w-2 rounded-full animate-pulse-gentle", dotClasses[config.color])} />
      {config.label}
    </span>
  );
}
