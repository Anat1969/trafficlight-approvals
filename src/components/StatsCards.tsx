import { SignageRequest } from "@/lib/mockData";

interface StatsCardsProps {
  requests: SignageRequest[];
}

export function StatsCards({ requests }: StatsCardsProps) {
  const stats = [
    {
      label: "סה״כ בקשות",
      value: requests.length,
      dotColor: "bg-foreground",
    },
    {
      label: "חדשות / בבדיקה",
      value: requests.filter((r) => r.status === "new" || r.status === "in_review").length,
      dotColor: "bg-status-yellow",
    },
    {
      label: "מאושרות",
      value: requests.filter((r) => r.status === "approved").length,
      dotColor: "bg-status-green",
    },
    {
      label: "נדחו — לתיקון",
      value: requests.filter((r) => r.status === "rejected").length,
      dotColor: "bg-status-red",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-sm overflow-hidden">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className={`h-1.5 w-1.5 rounded-full ${stat.dotColor}`} />
            <p className="text-[11px] font-medium text-muted-foreground tracking-wide">{stat.label}</p>
          </div>
          <p className="text-3xl font-light tracking-tight text-foreground font-mono">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
