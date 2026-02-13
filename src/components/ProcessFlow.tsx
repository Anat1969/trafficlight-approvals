import { FileText, Search, CheckCircle2, Users, ArrowLeft } from "lucide-react";

const steps = [
  {
    icon: FileText,
    label: "הגשת בקשה",
    description: "קליטת פרטי העסק, מסמכים נדרשים וסוג השלט",
    color: "bg-status-blue text-primary-foreground",
    dotColor: "bg-status-blue",
  },
  {
    icon: Search,
    label: "בדיקה ובקרה",
    description: "בדיקת מסמכים, התאמה להנחיות ודרישות תיקון",
    color: "bg-status-yellow text-primary-foreground",
    dotColor: "bg-status-yellow",
  },
  {
    icon: CheckCircle2,
    label: "אישור / דחייה",
    description: "אישור הבקשה או החזרה לתיקון עם פירוט",
    color: "bg-status-green text-primary-foreground",
    dotColor: "bg-status-green",
  },
  {
    icon: Users,
    label: "ועדת שילוט",
    description: "הפקת טופס המלצה והעברה לאישור הוועדה",
    color: "bg-primary text-primary-foreground",
    dotColor: "bg-primary",
  },
];

export function ProcessFlow() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h3 className="mb-6 text-lg font-bold text-foreground">תהליך אישור שילוט</h3>
      <div className="flex items-start justify-between gap-2">
        {steps.map((step, i) => (
          <div key={step.label} className="flex flex-1 items-start gap-2">
            <div className="flex flex-col items-center text-center">
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${step.color} shadow-md`}>
                <step.icon className="h-5 w-5" />
              </div>
              <h4 className="mt-2 text-sm font-bold text-foreground">{step.label}</h4>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{step.description}</p>
            </div>
            {i < steps.length - 1 && (
              <div className="mt-5 flex-shrink-0">
                <ArrowLeft className="h-5 w-5 text-muted-foreground/40" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
