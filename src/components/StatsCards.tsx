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
      gradient: "from-status-blue to-blue-500",
      bgGlow: "bg-status-blue-bg",
      borderColor: "border-status-blue-border",
      iconColor: "text-status-blue",
    },
    {
      label: "חדשות / בבדיקה",
      value: requests.filter((r) => r.status === "new" || r.status === "in_review").length,
      icon: Clock,
      gradient: "from-status-yellow to-amber-400",
      bgGlow: "bg-status-yellow-bg",
      borderColor: "border-status-yellow-border",
      iconColor: "text-status-yellow",
    },
    {
      label: "מאושרות",
      value: requests.filter((r) => r.status === "approved").length,
      icon: CheckCircle2,
      gradient: "from-status-green to-emerald-400",
      bgGlow: "bg-status-green-bg",
      borderColor: "border-status-green-border",
      iconColor: "text-status-green",
    },
    {
      label: "נדחו - לתיקון",
      value: requests.filter((r) => r.status === "rejected").length,
      icon: AlertTriangle,
      gradient: "from-status-red to-rose-400",
      bgGlow: "bg-status-red-bg",
      borderColor: "border-status-red-border",
      iconColor: "text-status-red",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`relative overflow-hidden rounded-xl border-2 ${stat.borderColor} ${stat.bgGlow} p-6 animate-fade-in transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
        >
          {/* Gradient side bar */}
          <div className={`absolute top-0 right-0 bottom-0 w-1.5 bg-gradient-to-b ${stat.gradient}`} />
          
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-semibold ${stat.iconColor} mb-1`}>{stat.label}</p>
              <p className="text-4xl font-bold tracking-tight text-foreground">{stat.value}</p>
            </div>
            <div className={`rounded-2xl bg-gradient-to-br ${stat.gradient} p-3.5 shadow-lg`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
