import { FileText, Search, CheckCircle2, Users, ChevronLeft } from "lucide-react";

interface ProcessFlowProps {
  onNavigate?: (tab: "dashboard" | "committee" | "policy") => void;
}

const steps = [
  {
    id: "new",
    icon: FileText,
    label: "הגשת בקשה",
    description: "קליטת פרטי העסק, מילוי טפסים נדרשים, והעלאת תוכניות והדמיות לשלט.",
    authorized: "מבקש שילוט / יזם",
    accentColor: "text-status-blue",
    iconBg: "bg-status-blue/10",
    topBorder: "bg-status-blue",
    step: 1,
  },
  {
    id: "review",
    icon: Search,
    label: "בדיקה ובקרה",
    description: "בדיקת מסמכים, אימות מול הנחיות הרשות, ודרישת השלמות או תיקונים.",
    authorized: "בודק תוכניות / מפקח עירייה",
    accentColor: "text-status-yellow",
    iconBg: "bg-status-yellow/10",
    topBorder: "bg-status-yellow",
    step: 2,
  },
  {
    id: "decision",
    icon: CheckCircle2,
    label: "אישור / דחייה",
    description: "החלטה מקצועית על בסיס הבדיקה: אישור הבקשה להמשך או דחייתה עם פירוט.",
    authorized: "גורם מאשר / מנהל מחלקה",
    accentColor: "text-status-green",
    iconBg: "bg-status-green/10",
    topBorder: "bg-status-green",
    step: 3,
  },
  {
    id: "committee",
    icon: Users,
    label: "ועדת שילוט",
    description: "דיון מקצועי בחריגים, אישור סופי, והפקת טופס המלצה רשמי להדפסה.",
    authorized: "חברי ועדת שילוט",
    accentColor: "text-primary",
    iconBg: "bg-primary/10",
    topBorder: "bg-primary",
    step: 4,
  },
];

export function ProcessFlow({ onNavigate }: ProcessFlowProps = {}) {
  const handleStepClick = (id: string) => {
    if (id === "new") {
      window.location.href = "/new-request";
    } else {
      window.location.href = `/${id}`;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-stretch gap-0">
      {steps.map((step, i) => (
        <>
          <button
            key={step.id}
            onClick={() => handleStepClick(step.id)}
            className="group flex h-full flex-col items-center text-center rounded-lg border border-border bg-card p-5 transition-all duration-200 hover:shadow-soft-md focus:outline-none relative overflow-hidden"
          >
            <div className={`absolute top-0 left-0 right-0 h-0.5 ${step.topBorder} opacity-60`} />
            <span className={`absolute top-3 left-3 text-xs font-medium ${step.accentColor} opacity-50`}>
              {step.step}
            </span>
            <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${step.iconBg}`}>
              <step.icon className={`h-5 w-5 ${step.accentColor}`} />
            </div>
            <h4 className="mt-3 text-sm font-semibold text-foreground">{step.label}</h4>
            <span className="mt-1.5 text-2xs text-muted-foreground">{step.authorized}</span>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground/80">{step.description}</p>
          </button>
          {i < steps.length - 1 && (
            <div key={`arrow-${i}`} className="hidden md:flex items-center justify-center px-1">
              <ChevronLeft className="h-4 w-4 text-border" />
            </div>
          )}
        </>
      ))}
    </div>
  );
}
