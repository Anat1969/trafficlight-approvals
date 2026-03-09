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
    color: "bg-status-blue text-primary-foreground hover:bg-status-blue/90",
  },
  {
    id: "review",
    icon: Search,
    label: "בדיקה ובקרה",
    description: "בדיקת מסמכים, אימות מול הנחיות הרשות, ודרישת השלמות או תיקונים.",
    authorized: "בודק תוכניות / מפקח עירייה",
    color: "bg-status-yellow text-primary-foreground hover:bg-status-yellow/90",
  },
  {
    id: "decision",
    icon: CheckCircle2,
    label: "אישור / דחייה",
    description: "החלטה מקצועית על בסיס הבדיקה: אישור הבקשה להמשך או דחייתה עם פירוט.",
    authorized: "גורם מאשר / מנהל מחלקה",
    color: "bg-status-green text-primary-foreground hover:bg-status-green/90",
  },
  {
    id: "committee",
    icon: Users,
    label: "ועדת שילוט",
    description: "דיון מקצועי בחריגים, אישור סופי, והפקת טופס המלצה רשמי להדפסה.",
    authorized: "חברי ועדת שילוט",
    color: "bg-primary text-primary-foreground hover:bg-primary/90",
  },
];

export function ProcessFlow({ onNavigate }: ProcessFlowProps = {}) {
  const handleStepClick = (id: string) => {
    if (id === "new") {
      window.location.href = "/new-request";
    } else if (onNavigate) {
      onNavigate(id as any);
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
      <h3 className="mb-8 text-2xl font-bold text-foreground">תהליך אישור שילוט</h3>
      <div className="flex flex-col md:flex-row items-start justify-between gap-4">
        {steps.map((step, i) => (
          <div key={step.label} className="flex flex-1 items-start gap-4">
            <button 
              onClick={() => handleStepClick(step.id)}
              className="group flex w-full flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 focus:outline-none"
            >
              <div className={`flex h-16 w-16 items-center justify-center rounded-full shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg ${step.color}`}>
                <step.icon className="h-7 w-7" />
              </div>
              <h4 className="mt-5 text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                {step.label}
              </h4>
              <div className="mt-3 inline-block rounded-full border border-border/50 bg-muted/50 px-3 py-1 text-sm font-semibold text-muted-foreground shadow-sm">
                באחריות: {step.authorized}
              </div>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground/90">
                {step.description}
              </p>
            </button>
            {i < steps.length - 1 && (
              <div className="mt-8 hidden flex-shrink-0 md:flex">
                <ArrowLeft className="h-6 w-6 text-muted-foreground/30 transition-colors group-hover:text-muted-foreground/50" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
