import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "./StatusBadge";
import { SignageRequest, RequestStatus } from "@/lib/mockData";
import {
  CheckCircle2,
  XCircle,
  Mail,
  Phone,
  MapPin,
  FileCheck,
  FileX,
  Send,
  ClipboardList,
} from "lucide-react";

interface Props {
  request: SignageRequest | null;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<SignageRequest>) => void;
}

const CHECKLIST_ITEMS = [
  { id: "dimensions", label: "מידות השלט תואמות להנחיות" },
  { id: "building_line", label: "אין חריגה מקו הבניין (עד 50 ס״מ)" },
  { id: "architecture", label: "השלט אינו מסתיר אלמנטים אדריכליים" },
  { id: "hebrew", label: "טקסט השלט כולל עברית כנדרש (לפחות 50%)" },
  { id: "constructor", label: "אישור קונסטרוקטור תקין ובתוקף" },
];

export function RequestDetailDialog({ request, onClose, onUpdate }: Props) {
  const [rejectionNote, setRejectionNote] = useState("");
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Reset checklist when request changes
    setChecklist({});
    setShowRejectForm(false);
    setRejectionNote("");
  }, [request]);

  if (!request) return null;

  const docsComplete = request.documents.every((d) => d.uploaded);
  const checklistComplete = CHECKLIST_ITEMS.every((item) => checklist[item.id]);

  const handleApprove = () => {
    onUpdate(request.id, { 
      status: "approved", 
      notes: "עמד בכל תנאי הבדיקה ואושר.", 
      updatedAt: new Date().toISOString().split("T")[0] 
    });
    
    // Simulate sending email
    toast(`מייל אישור נשלח לכתובת ${request.applicantEmail}`, {
      description: "בעל העסק עודכן שהבקשה עברה את שלב הבדיקה בהצלחה.",
    });
    
    onClose();
  };

  const handleReject = () => {
    if (rejectionNote.trim()) {
      const failedItems = CHECKLIST_ITEMS.filter(item => !checklist[item.id]).map(i => i.label);
      let finalNote = rejectionNote;
      if (failedItems.length > 0) {
        finalNote += "\n\nסעיפים שלא עמדו בבדיקה:\n- " + failedItems.join("\n- ");
      }
      
      onUpdate(request.id, {
        status: "rejected",
        notes: finalNote,
        updatedAt: new Date().toISOString().split("T")[0],
      });

      // Simulate sending email
      toast(`מייל דחייה נשלח לכתובת ${request.applicantEmail}`, {
        description: "בעל העסק עודכן בסיבות הדחייה ובתיקונים הנדרשים.",
      });

      onClose();
    }
  };

  const handleStartReview = () => {
    onUpdate(request.id, { status: "in_review", updatedAt: new Date().toISOString().split("T")[0] });
  };

  const toggleChecklist = (id: string) => {
    setChecklist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Dialog open={!!request} onOpenChange={() => { setShowRejectForm(false); onClose(); }}>
      <DialogContent className="max-h-[85vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">בקשה {request.id}</DialogTitle>
            <StatusBadge status={request.status} />
          </div>
        </DialogHeader>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            {/* Business Info */}
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">פרטי העסק</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="font-medium">שם עסק:</span> {request.businessName}
                </div>
                <div>
                  <span className="font-medium">סוג שלט:</span> {request.signType}
                </div>
                <div className="flex items-center gap-1.5 col-span-2">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                  {request.location}
                </div>
                <div>
                  <span className="font-medium">תאריך הגשה:</span> {request.submittedAt}
                </div>
              </div>
            </div>

            {/* Applicant */}
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">פרטי המגיש</h3>
              <div className="space-y-2 text-sm">
                <div className="font-medium">{request.applicantName}</div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" /> {request.applicantEmail}
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Phone className="h-3.5 w-3.5" /> {request.applicantPhone}
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="rounded-lg border border-border p-4">
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">מסמכים נדרשים</h3>
              <div className="space-y-2">
                {request.documents.map((doc) => (
                  <div
                    key={doc.name}
                    className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm"
                  >
                    <span>{doc.name}</span>
                    {doc.uploaded ? (
                      <span className="flex items-center gap-1 text-status-green">
                        <FileCheck className="h-4 w-4" /> הועלה
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-status-red">
                        <FileX className="h-4 w-4" /> חסר
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Notes from previous status */}
            {request.notes && request.status !== "new" && (
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <h3 className="mb-2 text-sm font-semibold text-muted-foreground">הערות מערכת / בודק</h3>
                <p className="text-sm whitespace-pre-wrap">{request.notes}</p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {/* Review Checklist */}
            {(request.status === "in_review" || request.status === "new") ? (
              <div className="rounded-lg border border-border p-4 bg-card shadow-soft-sm">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
                  <ClipboardList className="h-5 w-5 text-primary" />
                  <h3 className="text-base font-semibold">צ'ק ליסט בדיקה והנחיות</h3>
                </div>
                
                <div className="space-y-4 mb-6">
                  {CHECKLIST_ITEMS.map((item) => (
                    <div key={item.id} className="flex items-start space-x-3 space-x-reverse">
                      <Checkbox 
                        id={item.id} 
                        checked={!!checklist[item.id]} 
                        onCheckedChange={() => toggleChecklist(item.id)}
                        disabled={request.status === "new"}
                        className="mt-1"
                      />
                      <Label 
                        htmlFor={item.id} 
                        className={`text-sm leading-tight cursor-pointer ${request.status === "new" ? "opacity-50" : ""}`}
                      >
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </div>

                {request.status === "new" ? (
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-3">יש להתחיל את תהליך הבדיקה כדי למלא את הצ'ק ליסט</p>
                    <Button onClick={handleStartReview} className="w-full bg-status-blue text-primary-foreground hover:bg-status-blue/90">
                      התחל תהליך בדיקה
                    </Button>
                  </div>
                ) : (
                  <>
                    {!showRejectForm ? (
                      <div className="space-y-3 pt-4 border-t border-border">
                        <Button
                          onClick={handleApprove}
                          disabled={!docsComplete || !checklistComplete}
                          className="w-full bg-status-green text-primary-foreground hover:bg-status-green/90"
                        >
                          <CheckCircle2 className="ml-2 h-4 w-4" />
                          {!docsComplete ? "לא ניתן לאשר - מסמכים חסרים" : 
                           !checklistComplete ? "לא ניתן לאשר - חסרים סעיפי בדיקה" : 
                           "אשר בקשה והעבר לוועדה"}
                        </Button>
                        
                        <Button
                          variant="outline"
                          onClick={() => setShowRejectForm(true)}
                          className="w-full border-status-red/30 text-status-red hover:bg-status-red-bg"
                        >
                          <XCircle className="ml-2 h-4 w-4" />
                          דחה / דרוש תיקונים
                        </Button>
                      </div>
                    ) : (
                      <div className="rounded-lg border-2 border-status-red/30 bg-status-red-bg p-4 mt-4 animate-fade-in">
                        <h3 className="mb-2 text-sm font-semibold text-status-red">פירוט הסיבה לדחייה</h3>
                        <p className="text-xs text-muted-foreground mb-2">
                          הסעיפים שלא סומנו יצורפו אוטומטית להודעת הדחייה.
                        </p>
                        <Textarea
                          value={rejectionNote}
                          onChange={(e) => setRejectionNote(e.target.value)}
                          placeholder="פרט את התיקונים הנדרשים שיישלחו למבקש (מעבר לסעיפים החסרים)..."
                          className="mb-3 bg-background"
                          rows={3}
                        />
                        <div className="flex gap-2">
                          <Button
                            onClick={handleReject}
                            disabled={!rejectionNote.trim() && CHECKLIST_ITEMS.every(i => checklist[i.id])}
                            className="flex-1 bg-status-red text-primary-foreground hover:bg-status-red/90"
                          >
                            <Send className="ml-2 h-4 w-4" />
                            שלח דחייה
                          </Button>
                          <Button variant="outline" onClick={() => setShowRejectForm(false)}>
                            ביטול
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : (
              <div className="rounded-lg border border-border p-6 bg-card text-center flex flex-col items-center justify-center h-full">
                {request.status === "approved" ? (
                  <>
                    <div className="rounded-full bg-status-green/10 p-3 mb-4">
                      <CheckCircle2 className="h-8 w-8 text-status-green" />
                    </div>
                    <h3 className="text-lg font-semibold text-status-green mb-2">הבקשה אושרה</h3>
                    <p className="text-sm text-muted-foreground">הבקשה עמדה בכל תנאי הבדיקה והועברה לדיון בוועדת שילוט.</p>
                  </>
                ) : (
                  <>
                    <div className="rounded-full bg-status-red/10 p-3 mb-4">
                      <XCircle className="h-8 w-8 text-status-red" />
                    </div>
                    <h3 className="text-lg font-semibold text-status-red mb-2">הבקשה נדחתה</h3>
                    <p className="text-sm text-muted-foreground mb-4">הבקשה חזרה למבקש לביצוע תיקונים.</p>
                    <Button onClick={handleStartReview} className="bg-status-blue text-primary-foreground hover:bg-status-blue/90">
                      התחל בדיקה חוזרת
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

