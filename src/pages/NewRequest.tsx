import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SIGN_TYPES, REQUIRED_DOCUMENTS, RequestStatus } from "@/lib/mockData";
import { ArrowRight, Info, Upload, BookOpen } from "lucide-react";

const SIGN_TYPE_GUIDELINES: Record<string, { title: string; guidelines: string[] }> = {
  "שלט עסק": {
    title: "שילוט בתי עסק, חנויות",
    guidelines: [
      "א. מיקום השילוט: יתוכנן במיקום אחיד עבור כל בתי העסק בחזית הבניין ומעל בית העסק.",
      "ב. השלט ימוקם בגבולות הפתחים המקוריים של בית העסק.",
      "ג. גובה השלט: הסף התחתון לא יפחת מ-2.5 מטרים.",
      "ד. תאורה: תאורה תהיה במישור החזית ותופעל כל שעות היממה.",
      "ה. גוון התאורה: צהוב חם או צבעוני.",
      "ו. סוג השילוט: אותיות בודדות בלבד.",
    ],
  },
  "שלט חוצות": {
    title: "שילוט חוצות - כרזות ענק / טוטם",
    guidelines: [
      "א. יגלה רגישויות לאיכויות הקיימות בסביבה.",
      "ב. תורם לשיפור חזות המבנה ו/או אין בהצבתו לפגוע בחזית המבנה.",
      "ג. לא יפגע במבטים פנורמיים של העיר.",
      "ד. חזית אטומה בלבד.",
      "ה. לא יסתיר אלמנטים אדריכליים.",
      "ו. ללא חריגה מגבולות חזית המבנה.",
    ],
  },
  "שלט אלקטרוני": {
    title: "שילוט אלקטרוני (בשטח פרטי/ציבורי)",
    guidelines: [
      "א. יוצב במגרשים בעלי חזית פעילה הפונים לעורקי תחבורה ראשיים בלבד.",
      "ב. שילוט אלקטרוני יוצב רק בסביבה מסחרית ויותאם להנחיות חזית המבנה.",
      "ג. השילוט יותקן במרחק שלא יפחת מ-50 מ' ממבנה מגורים בסביבה מסחרית.",
    ],
  },
  "כרזת ענק": {
    title: "שילוט חוצות - כרזות ענק / טוטם",
    guidelines: [
      "א. יגלה רגישויות לאיכויות הקיימות בסביבה.",
      "ב. תורם לשיפור חזות המבנה ו/או אין בהצבתו לפגוע בחזית המבנה.",
      "ג. לא יפגע במבטים פנורמיים של העיר.",
      "ד. חזית אטומה בלבד.",
      "ה. לא יסתיר אלמנטים אדריכליים.",
      "ו. ללא חריגה מגבולות חזית המבנה.",
    ],
  },
  "שלט באתר בנייה": {
    title: "שילוט באתרי בניה: שלט אתר, גדר מדברת",
    guidelines: [
      "1) שלט אתר:",
      "א. תוכן: שם פרויקט/אתר/יועצים.",
      "ב. גודל: 4*2.",
      "ג. חומר: מדבקה שתודבק כשלט אחד כחלק מהגדר המדברת.",
      "2) גדר מדברת:",
      "א. תוכן: 50% תכנים עירוניים ו-50% תוכן יזמי.",
    ],
  },
  "שלט במרחב הציבורי": {
    title: "שלט מספר בית על גבי מבנה (שם ומס' רחוב - התמצאות)",
    guidelines: [
      "א. שלט שם רחוב ומספר בית מואר: ימוקם בגובה 3 מטרים ממפלס הכניסה בכל חזית הפונה לרחוב או מרחב ציבורי.",
      "ב. שלט מס' בית: לוחית אלומיניום בגודל 20X25 ס\"מ, עובי הלוחית 2 מ\"מ.",
      "ג. פילם מחזיר אור: בצבע כחול יודבק בחזית הלוחית.",
      "ד. פונט: \"נרקיס בלוק\", עיצוב רגיל, גובה 7 ס\"מ.",
    ],
  },
};
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRequests } from "@/hooks/useRequests";

export default function NewRequest() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addRequest } = useRequests();
  
  const [form, setForm] = useState({
    businessName: "",
    applicantName: "",
    applicantEmail: "",
    applicantPhone: "",
    signType: "שלט באתר בנייה",
    location: "",
    notes: "",
    
    // Construction specific
    permitNumber: "",
    permitEssence: "",
    projectName: "",
    consultants: "",
    fenceLength: "",
    costPerMeter: "",
  });

  const isConstruction = form.signType === "שלט באתר בנייה";

  const handleSubmit = () => {
    // Generate a random ID
    const newId = `SH-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    
    addRequest({
      id: newId,
      businessName: form.businessName || "עסק חדש",
      applicantName: form.applicantName || "מגיש חדש",
      applicantEmail: form.applicantEmail,
      applicantPhone: form.applicantPhone,
      signType: form.signType,
      location: form.location,
      status: "new",
      submittedAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      notes: form.notes,
      documents: REQUIRED_DOCUMENTS.map(doc => ({ name: doc, uploaded: false }))
    });

    toast({
      title: "בקשה נשלחה בהצלחה",
      description: "בקשתך לשילוט נקלטה במערכת.",
    });
    navigate("/");
  };

  const fenceNum = Number(form.fenceLength) || 0;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center gap-4 animate-fade-in">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="hover:bg-primary/10 hover:text-primary transition-colors">
            <ArrowRight className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground gradient-text">הגשת בקשה לשילוט</h1>
             <p className="text-muted-foreground mt-1 text-balance">אנא מלא את כל פרטי הבקשה בהתאם להנחיות העירוניות</p>
          </div>
        </div>

        <div className="card-elevated p-8 space-y-10 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold border-b border-border/60 pb-3 flex items-center gap-2">
              <span className="bg-primary/10 text-primary p-1.5 rounded-md">1</span>
              פרטים כלליים
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>סוג שלט *</Label>
                <Select value={form.signType} onValueChange={(v) => setForm({ ...form, signType: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="בחר סוג" />
                  </SelectTrigger>
                  <SelectContent>
                    {SIGN_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>מיקום / כתובת *</Label>
                <Input
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="כתובת מלאה של יוזמת השילוט"
                />
              </div>
              
              <div className="space-y-1.5">
                <Label>{isConstruction ? "שם הקבלן / חברה יוזמת *" : "שם עסק *"}</Label>
                <Input
                  value={form.businessName}
                  onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                  placeholder={isConstruction ? "שם חברת הבנייה" : "שם העסק"}
                />
              </div>
              <div className="space-y-1.5">
                <Label>שם מגיש הבקשה *</Label>
                <Input
                  value={form.applicantName}
                  onChange={(e) => setForm({ ...form, applicantName: e.target.value })}
                  placeholder="שם מלא"
                />
              </div>

              <div className="space-y-1.5">
                <Label>אימייל ליצירת קשר</Label>
                <Input
                  type="email"
                  value={form.applicantEmail}
                  onChange={(e) => setForm({ ...form, applicantEmail: e.target.value })}
                  placeholder="email@example.com"
                  dir="ltr"
                />
              </div>
              <div className="space-y-1.5">
                <Label>טלפון</Label>
                <Input
                  value={form.applicantPhone}
                  onChange={(e) => setForm({ ...form, applicantPhone: e.target.value })}
                  placeholder="050-0000000"
                  dir="ltr"
                />
              </div>
            </div>
          </div>

          {SIGN_TYPE_GUIDELINES[form.signType] && (
            <Alert className="bg-accent/50 border-primary/20 shadow-soft-sm animate-fade-in">
              <BookOpen className="h-5 w-5 text-primary" />
              <AlertTitle className="font-bold text-lg mb-2 text-primary">
                הנחיות: {SIGN_TYPE_GUIDELINES[form.signType].title}
              </AlertTitle>
              <AlertDescription>
                <ul className="space-y-1.5 pr-4 mt-2">
                  {SIGN_TYPE_GUIDELINES[form.signType].guidelines.map((g, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      <span className="leading-relaxed">{g}</span>
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {isConstruction && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-semibold border-b border-border/60 pb-3 flex items-center gap-2">
                <span className="bg-primary/10 text-primary p-1.5 rounded-md">2</span>
                פרטי אתר בנייה
              </h2>
              
              <Alert className="bg-status-blue-bg text-status-blue border-status-blue-border shadow-soft-sm">
                <Info className="h-5 w-5" />
                <AlertTitle className="font-bold text-lg mb-2">הנחיות לשילוט פרויקט / יועצים באתרי בנייה</AlertTitle>
                <AlertDescription className="mt-2 space-y-2 opacity-90">
                  <ul className="list-disc list-inside space-y-1 pr-4">
                    <li><strong>גודל מותר:</strong> 2x4 מטר (רוחבי). חריגה דורשת אישור ועדת שילוט.</li>
                    <li><strong>גדר מדברת:</strong> גובה 2 מטר. 50% תכנים עירוניים ו-50% תוכן יזמי.</li>
                    <li><strong>פונטים חובה:</strong>
                      <br/>- Almoni Tzar DL 4.0 AAA Regular לטקסט רגיל
                      <br/>- Almoni Tzar DL 4.0 AAA Medium לשם הפרויקט
                    </li>
                  </ul>
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>מספר היתר בנייה *</Label>
                  <Input
                    value={form.permitNumber}
                    onChange={(e) => setForm({ ...form, permitNumber: e.target.value })}
                    placeholder="לדוגמה: 20240123"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>מהות ההיתר</Label>
                  <Input
                    value={form.permitEssence}
                    onChange={(e) => setForm({ ...form, permitEssence: e.target.value })}
                    placeholder="לדוגמה: הריסה ובנייה מחדש, תמ״א 38"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>שם הפרויקט</Label>
                  <Input
                    value={form.projectName}
                    onChange={(e) => setForm({ ...form, projectName: e.target.value })}
                    placeholder="לדוגמה: מגדלי הים"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>אורך גדר מבוקש (במטרים)</Label>
                  <Input
                    type="number"
                    value={form.fenceLength}
                    onChange={(e) => setForm({ ...form, fenceLength: e.target.value })}
                    placeholder="לחישוב חלוקת גדר מדברת"
                  />
                </div>
              </div>

              {fenceNum > 0 && (
                <div className="card-flat p-6 mt-6 bg-gradient-to-br from-background to-muted/30 border-primary/20">
                  <h3 className="font-semibold text-lg mb-5 text-primary flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-40"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                    </span>
                    חישוב חלוקת גדר מדברת ואגרת שילוט
                  </h3>
                  
                  <div className="overflow-hidden rounded-lg border border-border/60 bg-background shadow-soft-sm">
                    <Table>
                      <TableHeader className="bg-muted/40">
                        <TableRow className="hover:bg-transparent">
                        <TableHead className="text-right">סה"כ אורך מבוקש</TableHead>
                        <TableHead className="text-right">תכנים עירוניים (50%)</TableHead>
                        <TableHead className="text-right">תוכן יזמי (50%)</TableHead>
                        <TableHead className="text-right">עלות שילוט למטר (₪)</TableHead>
                        <TableHead className="text-right font-bold">סה"כ אגרת שילוט ליזם</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>{fenceNum} מטרים</TableCell>
                        <TableCell className="text-primary font-medium">{fenceNum / 2} מטרים</TableCell>
                        <TableCell className="text-blue-600 font-medium">{fenceNum / 2} מטרים</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={form.costPerMeter}
                            onChange={(e) => setForm({ ...form, costPerMeter: e.target.value })}
                            placeholder="הזן תעריף..."
                            className="w-32 bg-background font-medium focus-visible:ring-primary/40"
                          />
                        </TableCell>
                        <TableCell className="font-bold text-xl text-status-green bg-status-green-bg/30">
                          {form.costPerMeter ? `₪${((fenceNum / 2) * Number(form.costPerMeter)).toLocaleString()}` : "—"}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="space-y-6">
            <h2 className="text-xl font-semibold border-b border-border/60 pb-3 flex items-center gap-2">
              <span className="bg-primary/10 text-primary p-1.5 rounded-md">{isConstruction ? "3" : "2"}</span>
              מסמכים נדרשים
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {REQUIRED_DOCUMENTS.map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between border border-border/60 rounded-xl p-4 bg-muted/10 hover:bg-muted/30 transition-colors shadow-soft-sm">
                  <span className="text-sm font-medium text-foreground">{doc}</span>
                  <Button variant="outline" size="sm" className="gap-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                    <Upload className="h-4 w-4" />
                    העלה קובץ
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-border/60 mt-8">
            <Button variant="outline" onClick={() => navigate("/")} className="px-6 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors">
              ביטול וחזרה
            </Button>
            <Button onClick={handleSubmit} className="px-10 btn-primary shadow-soft-md">
              שליחת בקשה לאישור
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
