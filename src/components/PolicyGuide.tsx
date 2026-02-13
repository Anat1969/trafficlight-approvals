import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Store,
  Building2,
  Megaphone,
  Monitor,
  TreePine,
  Ruler,
  Lightbulb,
  FileWarning,
  ScrollText,
  ShieldCheck,
  Wrench,
} from "lucide-react";

interface SignTypeInfo {
  name: string;
  specs: string[];
}

interface CategoryData {
  id: string;
  title: string;
  icon: React.ElementType;
  iconBg: string;
  description: string;
  signTypes: SignTypeInfo[];
  designGuidelines: string[];
  procedure: string[];
  requiredDocuments: string[];
}

const CATEGORIES: CategoryData[] = [
  {
    id: "business",
    title: "שלט עסק",
    icon: Store,
    iconBg: "bg-status-blue-bg text-status-blue",
    description: "שילוט עבור בתי עסק, חנויות ומסחר – כולל שלטים מוארים ומרקיזות",
    signTypes: [
      { name: "שלט חזית עסק", specs: ["אותיות בודדות בלבד", "מיקום אחיד בחזית המבנה", "שלט אחד לעסק"] },
      { name: "שלט מרקיזה / סוכך", specs: ["הדבקה בחלק התחתון בלבד", "גובה שדה עד 30 ס\"מ", "תוכן: שם העסק בלבד"] },
      { name: "שלט חלון ראווה", specs: ["מדבקות עד 30% משטח החלון", "שילוט דיגיטלי בתיאום אדר' העיר"] },
    ],
    designGuidelines: [
      "השלט ימוקם בגבולות הפתחים המקוריים של בית העסק",
      "גובה תחתון של השלט לא יפחת מ-2.5 מטר",
      "תאורה במישור החזית, תופעל כל שעות היממה",
      "גוון תאורה צהוב חם או צבעוני בהתאם ללוגו העסק",
      "סוג שילוט: אותיות בודדות בלבד",
      "לוגו העסק יוכל לבלוט עד 10 ס\"מ מעל גובה האותיות",
      "לא יותר פרסום חברות אחרות על השילוט",
    ],
    procedure: [
      "הגשת בקשה מקוונת עם טופס מלא",
      "צירוף הדמיית השלט ותצלום חזית העסק",
      "בדיקת התאמה להנחיות העיצוביות",
      "אישור/דחייה ע\"י אדריכלית העיר",
      "העברה לוועדת שילוט לאישור סופי",
      "תשלום אגרה וקבלת רישיון",
    ],
    requiredDocuments: [
      "תצלום חזית העסק",
      "הדמיית השלט (מימד תלת)",
      "תוכנית מדידה",
      "אישור קונסטרוקטור",
      "רישיון עסק בתוקף",
    ],
  },
  {
    id: "construction",
    title: "שילוט באתר בנייה",
    icon: Building2,
    iconBg: "bg-status-yellow-bg text-status-yellow",
    description: "שלטי אתר, גדרות מדברות והדמיות פרויקט בזמן בנייה",
    signTypes: [
      { name: "שלט אתר", specs: ["גודל 2×4 מטר", "תוכן: שם פרויקט, יועצים", "פנל קשיח עם מדבקה"] },
      { name: "גדר מדברת", specs: ["50% תכנים עירוניים (בתיאום דוברות)", "50% תכנים רלוונטיים לפרויקט", "רוחב 2 מ', אורך חזית ראשית"] },
      { name: "שלט הדמיה על פיגומים", specs: ["הדמיית הפרויקט המאושר בהיתר", "שילוט ע\"ג פיגומים בלבד"] },
    ],
    designGuidelines: [
      "שימוש בגופנים ובגדלים לפי הפורמט שנקבע ע\"י אדר' העיר",
      "ניתן לשנות רק פרטי הפרויקט והיועצים",
      "מבנה ועיצובים אחידים בכל שלטי הבנייה",
      "גובה תחתון לא יפחת מ-2.5 מטר",
    ],
    procedure: [
      "מילוי טופס בקשה כולל הדמיה תלת-ממדית",
      "ציון מיקום ופריסת השילוט",
      "הגשה לאדריכלית העיר לאישור",
      "אישור מהנדס עמידות לגידור/גדר",
      "התחייבות לתחזוקה שוטפת ותקינות",
      "התחייבות לתיקון ליקויים תוך 72 שעות",
      "כתב התחייבות נגד תביעות צד שלישי",
    ],
    requiredDocuments: [
      "טופס בקשה מלא עם פרטים",
      "הדמיית השלט תלת-ממדית",
      "אישור מהנדס לעמידות הגדר",
      "כתב התחייבות לתחזוקה",
    ],
  },
  {
    id: "billboard",
    title: "שילוט חוצות / כרזות ענק",
    icon: Megaphone,
    iconBg: "bg-status-red-bg text-status-red",
    description: "כרזות ענק על חזיתות מבנים, טוטמים ושילוט גדול במרחב הציבורי",
    signTypes: [
      { name: "כרזת ענק על חזית מבנה", specs: ["לא יותר משלט אחד לחזית", "ללא חריגה מגבולות החזית", "על חזית אטומה בלבד"] },
      { name: "טוטם", specs: ["מותר באזורים מיוחדים בלבד", "פארק ההייטק, מרכזי מסחר, רובע מיוחד", "שינוי תוכן מחייב אישור מחדש"] },
    ],
    designGuidelines: [
      "השלט לא יפגע בפנורמות ובמבטי העיר",
      "לא יסתיר אלמנטים אדריכליים של המבנה",
      "תוכן הפרסום לא יכלול צילומים/אמירות הפוגעים בכבוד הציבור",
      "לא יכלול מסר פוליטי או שם גוף פוליטי",
      "השלט תורם לשיפור חזות המבנה",
    ],
    procedure: [
      "הגשת טופס בקשה עם הדמיה תלת-ממדית",
      "ציון מיקום ופריסת השילוט",
      "אישור עקרוני מוועדת שילוט",
      "הגשת מסמכים: אישור בעל מבנה, הצהרת מהנדס",
      "ביטוח וערבות בנקאית",
      "קבלת רישיון שילוט",
    ],
    requiredDocuments: [
      "טופס בקשה עם הדמיה תלת-ממדית",
      "אישור והסכמת בעל המבנה",
      "הצהרת מהנדס על תקינות המתקן",
      "כתב התחייבות לאחזקה ולהסרה",
      "אישור קיום ביטוחים",
      "ערבות בנקאית אוטונומית",
    ],
  },
  {
    id: "electronic",
    title: "שילוט אלקטרוני",
    icon: Monitor,
    iconBg: "bg-primary/10 text-primary",
    description: "מסכים דיגיטליים ושלטים אלקטרוניים בשטח פרטי וציבורי",
    signTypes: [
      { name: "מסך דיגיטלי על חזית עסק", specs: ["בחזית פעילה הפונה לעורקי תחבורה", "מרחק 50 מ' ממבנה מגורים", "לא על מבנה ייחודי/לשימור"] },
      { name: "שילוט אלקטרוני ציבורי", specs: ["כפוף להנחיות פרטניות", "לא בשכונות מגורים", "לא ליד רמזורים ועצירות"] },
    ],
    designGuidelines: [
      "מיקום: רק בחזיתות פעילות הפונות לעורקי תחבורה ראשיים",
      "מרחק מינימלי 50 מטר ממבני מגורים",
      "לא יותקן על מבנה בעל ערך אדריכלי ייחודי או לשימור",
      "לא יותקן באזורי נוף ייחודי, חוף הים, אתרי תצפית",
      "לא יוצב מול עיני נהג בקו עצירה ליד רמזור",
      "יש להימנע לאורך כבישים מהירים",
      "אסור באזורי מגורים (לפי הנחיות משרד התחבורה)",
      "לשמור על ניקיון השטח בעת ההתקנה",
    ],
    procedure: [
      "הגשת בקשה מקוונת",
      "וידוא עמידה בכל הוראות חוק העזר",
      "הצהרה שהפרסום אינו נוגד דין",
      "היתר להצבה לתקופה של שנה",
      "אישור וועדת שילוט",
      "לעירייה הזכות לדרוש שינויים או לפסול",
    ],
    requiredDocuments: [
      "טופס בקשה מלא",
      "הדמיית השלט במיקום",
      "הצהרה על עמידה בדרישות חוק",
      "אישור בעל הנכס",
    ],
  },
  {
    id: "public",
    title: "שילוט במרחב הציבורי",
    icon: TreePine,
    iconBg: "bg-status-green-bg text-status-green",
    description: "שילוט התמצאות, מספרי בתים, שמות רחובות ושילוט עירוני",
    signTypes: [
      { name: "שלט מספר בית", specs: ["לוחית אלומיניום 25×20 ס\"מ, עובי 2 מ\"מ", "פילם מחזיר אור בצבע כחול", "פונט \"נרקיס בלוק\", גובה 7 ס\"מ"] },
      { name: "שלט שם רחוב + מספר", specs: ["בגובה 3 מטר מכניסה", "מואר, בכל חזית הפונה לרחוב"] },
      { name: "שלט שם פרויקט על בניין", specs: ["שם הפרויקט בלבד (לא שם יזם/קבלן)", "בקומה העליונה של החזית", "אותיות בודדות בלבד"] },
    ],
    designGuidelines: [
      "שילוט לא מעבר לגובה החזית הפעילה",
      "לא יותר שילוט על עמודי קולונדה",
      "השילוט לא יסתיר חלונות או פתחי אוורור",
      "לא יהווה מפגע בטיחותי ולא יפריע לשכנים",
      "תאורה לא תהווה מטרד לציבור",
      "מיקום אחיד לכל בתי העסק באותו מבנה (רצועת שילוט)",
      "גובה תחתון לא יפחת מ-2.5 מטר",
      "במתחמים עם קו עיצובי – השילוט יותאם לסגנון הקיים",
    ],
    procedure: [
      "הגשת בקשה מקוונת כולל טופס מלא",
      "הדמיית השלט תלת-ממדית על גבי המבנה",
      "בדיקת אדריכלית העיר",
      "העברה לוועדת שילוט",
      "תשלום אגרה",
      "התקנה לאחר הסרת שלט קיים",
    ],
    requiredDocuments: [
      "תצלום חזית המבנה",
      "הדמיית השלט",
      "אישור קונסטרוקטור (לשלטים מוארים)",
      "אישור חשמלאי מוסמך (לשלטים מוארים)",
    ],
  },
];

function InfoTag({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="flex items-start gap-2 text-sm">
      <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
      <span>{text}</span>
    </div>
  );
}

export function PolicyGuide() {
  return (
    <div className="space-y-4">
      <Accordion type="multiple" className="space-y-3">
        {CATEGORIES.map((cat) => (
          <AccordionItem
            key={cat.id}
            value={cat.id}
            className="rounded-xl border border-border bg-card shadow-sm overflow-hidden"
          >
            <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-accent/50">
              <div className="flex items-center gap-3 text-right">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${cat.iconBg}`}>
                  <cat.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">{cat.title}</h3>
                  <p className="text-xs text-muted-foreground">{cat.description}</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-5">
              <div className="grid gap-5 md:grid-cols-2">
                {/* Sign Types */}
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground">
                    <ScrollText className="h-4 w-4 text-primary" />
                    סוגי שלטים
                  </h4>
                  <div className="space-y-3">
                    {cat.signTypes.map((st) => (
                      <div key={st.name} className="rounded-md border border-border bg-card p-3">
                        <h5 className="mb-1.5 text-sm font-semibold text-foreground">{st.name}</h5>
                        <ul className="space-y-1">
                          {st.specs.map((spec) => (
                            <li key={spec} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                              <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                              {spec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Design Guidelines */}
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground">
                    <Ruler className="h-4 w-4 text-primary" />
                    הנחיות עיצוביות
                  </h4>
                  <div className="space-y-2">
                    {cat.designGuidelines.map((g) => (
                      <InfoTag key={g} icon={Lightbulb} text={g} />
                    ))}
                  </div>
                </div>

                {/* Procedure */}
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    נוהל אישור
                  </h4>
                  <ol className="space-y-2">
                    {cat.procedure.map((step, i) => (
                      <li key={step} className="flex items-start gap-2 text-sm">
                        <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                          {i + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Required Documents */}
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground">
                    <FileWarning className="h-4 w-4 text-primary" />
                    מסמכים נדרשים
                  </h4>
                  <div className="space-y-2">
                    {cat.requiredDocuments.map((doc) => (
                      <InfoTag key={doc} icon={Wrench} text={doc} />
                    ))}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
