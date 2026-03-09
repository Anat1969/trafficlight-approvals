import { FileText, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import { SignageRequest } from "@/lib/mockData";

interface StatsCardsProps {
  requests: SignageRequest[];
}

export function StatsCards({ requests }: StatsCardsProps) {
  const stats = [
    {
      label: "סה״כ בקשות",
      value: requests.length,
      icon: FileText,
      iconBg: "bg-primary/8",
      iconColor: "text-primary",
      accent: "bg-primary",
    },
    {
      label: "חדשות / בבדיקה",
      value: requests.filter((r) => r.status === "new" || r.status === "in_review").length,
      icon: Clock,
      iconBg: "bg-status-yellow/8",
      iconColor: "text-status-yellow",
      accent: "bg-status-yellow",
    },
    {
      label: "מאושרות",
      value: requests.filter((r) => r.status === "approved").length,
      icon: CheckCircle2,
      iconBg: "bg-status-green/8",
      iconColor: "text-status-green",
      accent: "bg-status-green",
    },
    {
      label: "נדחו - לתיקון",
      value: requests.filter((r) => r.status === "rejected").length,
      icon: AlertTriangle,
      iconBg: "bg-status-red/8",
      iconColor: "text-status-red",
      accent: "bg-status-red",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="relative overflow-hidden rounded-lg border border-border bg-card p-5 transition-all duration-200 hover:shadow-soft-md"
        >
          {/* Subtle right accent */}
          <div className={`absolute top-0 right-0 bottom-0 w-0.5 ${stat.accent} opacity-40`} />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-bold tracking-tight text-foreground">{stat.value}</p>
            </div>
            <div className={`rounded-lg p-2.5 ${stat.iconBg}`}>
              <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
