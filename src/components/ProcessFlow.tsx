import { FileText, Search, CheckCircle2, Users, ChevronLeft } from "lucide-react";

const steps = [
  {
    id: "new",
    icon: FileText,
    label: "הגשת בקשה",
    description: "קליטת פרטי העסק, מילוי טפסים נדרשים, והעלאת תוכניות והדמיות לשלט.",
    authorized: "מבקש שילוט / יזם",
    color: "bg-status-blue",
    step: 1,
  },
  {
    id: "review",
    icon: Search,
    label: "בדיקה ובקרה",
    description: "בדיקת מסמכים, אימות מול הנחיות הרשות, ודרישת השלמות או תיקונים.",
    authorized: "בודק תוכניות / מפקח עירייה",
    color: "bg-status-yellow",
    step: 2,
  },
  {
    id: "decision",
    icon: CheckCircle2,
    label: "אישור / דחייה",
    description: "החלטה מקצועית על בסיס הבדיקה: אישור הבקשה להמשך או דחייתה עם פירוט.",
    authorized: "גורם מאשר / מנהל מחלקה",
    color: "bg-status-green",
    step: 3,
  },
  {
    id: "committee",
    icon: Users,
    label: "ועדת שילוט",
    description: "דיון מקצועי בחריגים, אישור סופי, והפקת טופס המלצה רשמי להדפסה.",
    authorized: "חברי ועדת שילוט",
    color: "bg-foreground",
    step: 4,
  },
];

export function ProcessFlow() {
  const handleStepClick = (id: string) => {
    if (id === "new") {
      window.location.href = "/new-request";
    } else {
      window.location.href = `/${id}`;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-border">
      {steps.map((step) => (
        <button
          key={step.id}
          onClick={() => handleStepClick(step.id)}
          className="group flex flex-col bg-card p-6 text-right transition-colors duration-150 hover:bg-muted/40 focus:outline-none"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono tracking-widest text-muted-foreground/40">
              {String(step.step).padStart(2, "0")}
            </span>
            <div className={`h-1.5 w-1.5 rounded-full ${step.color}`} />
          </div>
          <step.icon className="h-4 w-4 text-foreground/70 mb-3" strokeWidth={1.5} />
          <h4 className="text-sm font-semibold text-foreground mb-1">{step.label}</h4>
          <span className="text-[10px] text-muted-foreground/60 mb-3">{step.authorized}</span>
          <p className="text-xs leading-relaxed text-muted-foreground">{step.description}</p>
        </button>
      ))}
    </div>
  );
}
