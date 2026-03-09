import { useState } from "react";
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
import { SIGN_TYPES, REQUIRED_DOCUMENTS } from "@/lib/mockData";
import { ArrowRight, Info, Upload } from "lucide-react";
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

export default function NewRequest() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
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
  });

  const isConstruction = form.signType === "שלט באתר בנייה";

  const handleSubmit = () => {
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
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowRight className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">הגשת בקשה לשילוט</h1>
            <p className="text-muted-foreground">אנא מלא את כל פרטי הבקשה בהתאם להנחיות</p>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm space-y-8">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold border-b pb-2">פרטים כלליים</h2>
            
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

          {isConstruction && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold border-b pb-2">פרטי אתר בנייה</h2>
              
              <Alert className="bg-blue-50/50 text-blue-900 border-blue-200">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-800">הנחיות לשילוט פרויקט / יועצים באתרי בנייה</AlertTitle>
                <AlertDescription className="text-blue-700/80 mt-2 space-y-2">
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
                <div className="rounded-md bg-muted p-4 mt-4 text-sm text-center">
                  <p>חלוקת <strong>גדר מדברת</strong> נדרשת עבור {fenceNum} מטרים:</p>
                  <div className="flex justify-center gap-8 mt-2 text-base">
                    <div className="font-semibold text-primary">{fenceNum / 2} מטר - תכנים עירוניים</div>
                    <div className="font-semibold text-blue-600">{fenceNum / 2} מטר - תוכן יזמי</div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="space-y-4">
            <h2 className="text-lg font-semibold border-b pb-2">מסמכים נדרשים</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {REQUIRED_DOCUMENTS.map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between border rounded p-3">
                  <span className="text-sm font-medium">{doc}</span>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Upload className="h-4 w-4" />
                    העלה קובץ
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button variant="outline" onClick={() => navigate("/")}>ביטול חזרה</Button>
            <Button onClick={handleSubmit} className="px-8">שליחת בקשה</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
