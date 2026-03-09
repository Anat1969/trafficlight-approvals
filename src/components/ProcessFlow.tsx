import { FileText, Search, CheckCircle2, Users, ArrowLeft } from "lucide-react";

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
    gradient: "from-status-blue to-blue-500",
    bgGlow: "bg-status-blue-bg",
    borderColor: "border-status-blue-border",
    iconColor: "text-status-blue",
    step: 1,
  },
  {
    id: "review",
    icon: Search,
    label: "בדיקה ובקרה",
    description: "בדיקת מסמכים, אימות מול הנחיות הרשות, ודרישת השלמות או תיקונים.",
    authorized: "בודק תוכניות / מפקח עירייה",
    gradient: "from-status-yellow to-amber-400",
    bgGlow: "bg-status-yellow-bg",
    borderColor: "border-status-yellow-border",
    iconColor: "text-status-yellow",
    step: 2,
  },
  {
    id: "decision",
    icon: CheckCircle2,
    label: "אישור / דחייה",
    description: "החלטה מקצועית על בסיס הבדיקה: אישור הבקשה להמשך או דחייתה עם פירוט.",
    authorized: "גורם מאשר / מנהל מחלקה",
    gradient: "from-status-green to-emerald-400",
    bgGlow: "bg-status-green-bg",
    borderColor: "border-status-green-border",
    iconColor: "text-status-green",
    step: 3,
  },
  {
    id: "committee",
    icon: Users,
    label: "ועדת שילוט",
    description: "דיון מקצועי בחריגים, אישור סופי, והפקת טופס המלצה רשמי להדפסה.",
    authorized: "חברי ועדת שילוט",
    gradient: "from-primary to-indigo-500",
    bgGlow: "bg-primary/5",
    borderColor: "border-primary/30",
    iconColor: "text-primary",
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
    <div className="flex flex-col md:flex-row items-stretch justify-between gap-5">
      {steps.map((step, i) => (
        <div key={step.label} className="flex flex-1 items-start gap-3">
          <button
            onClick={() => handleStepClick(step.id)}
            className={`group flex w-full flex-col items-center text-center rounded-xl border-2 ${step.borderColor} ${step.bgGlow} p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none relative overflow-hidden`}
          >
            {/* Gradient top bar */}
            <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-l ${step.gradient}`} />
            
            {/* Step number */}
            <div className={`absolute top-4 left-4 w-7 h-7 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center text-xs font-bold text-white shadow-md`}>
              {step.step}
            </div>

            <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.gradient} shadow-lg transition-transform duration-300 group-hover:scale-110`}>
              <step.icon className="h-7 w-7 text-white" />
            </div>
            <h4 className="mt-4 text-lg font-bold text-foreground transition-colors group-hover:text-primary">
              {step.label}
            </h4>
            <div className={`mt-2 inline-block rounded-full border ${step.borderColor} ${step.bgGlow} px-3 py-1 text-xs font-semibold ${step.iconColor}`}>
              {step.authorized}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground/80">
              {step.description}
            </p>
          </button>
          {i < steps.length - 1 && (
            <div className="mt-14 hidden flex-shrink-0 md:flex">
              <ArrowLeft className="h-6 w-6 text-muted-foreground/40" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
