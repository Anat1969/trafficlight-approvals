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
      bgClass: "bg-primary/10",
      iconClass: "text-primary",
    },
    {
      label: "חדשות / בבדיקה",
      value: requests.filter((r) => r.status === "new" || r.status === "in_review").length,
      icon: Clock,
      bgClass: "bg-status-yellow-bg",
      iconClass: "text-status-yellow",
    },
    {
      label: "מאושרות",
      value: requests.filter((r) => r.status === "approved").length,
      icon: CheckCircle2,
      bgClass: "bg-status-green-bg",
      iconClass: "text-status-green",
    },
    {
      label: "נדחו - לתיקון",
      value: requests.filter((r) => r.status === "rejected").length,
      icon: AlertTriangle,
      bgClass: "bg-status-red-bg",
      iconClass: "text-status-red",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="card-elevated p-6 animate-fade-in transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-3xl font-bold tracking-tight text-foreground">{stat.value}</p>
            </div>
            <div className={`rounded-xl p-3.5 shadow-inner-soft border border-white/50 ${stat.bgClass}`}>
              <stat.icon className={`h-6 w-6 ${stat.iconClass}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
