import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
} from "lucide-react";

interface Props {
  request: SignageRequest | null;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<SignageRequest>) => void;
}

export function RequestDetailDialog({ request, onClose, onUpdate }: Props) {
  const [rejectionNote, setRejectionNote] = useState("");
  const [showRejectForm, setShowRejectForm] = useState(false);

  if (!request) return null;

  const docsComplete = request.documents.every((d) => d.uploaded);

  const handleApprove = () => {
    onUpdate(request.id, { status: "approved", notes: "אושר", updatedAt: new Date().toISOString().split("T")[0] });
    onClose();
  };

  const handleReject = () => {
    if (rejectionNote.trim()) {
      onUpdate(request.id, {
        status: "rejected",
        notes: rejectionNote,
        updatedAt: new Date().toISOString().split("T")[0],
      });
      setRejectionNote("");
      setShowRejectForm(false);
      onClose();
    }
  };

  const handleStartReview = () => {
    onUpdate(request.id, { status: "in_review", updatedAt: new Date().toISOString().split("T")[0] });
  };

  return (
    <Dialog open={!!request} onOpenChange={() => { setShowRejectForm(false); onClose(); }}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">בקשה {request.id}</DialogTitle>
            <StatusBadge status={request.status} />
          </div>
        </DialogHeader>

        <div className="mt-4 space-y-6">
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
              <div className="flex items-center gap-1.5">
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

          {/* Notes */}
          {request.notes && (
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <h3 className="mb-2 text-sm font-semibold text-muted-foreground">הערות</h3>
              <p className="text-sm">{request.notes}</p>
            </div>
          )}

          {/* Rejection form */}
          {showRejectForm && (
            <div className="rounded-lg border-2 border-status-red/30 bg-status-red-bg p-4">
              <h3 className="mb-2 text-sm font-semibold text-status-red">פירוט הסיבה לדחייה / תיקונים נדרשים</h3>
              <Textarea
                value={rejectionNote}
                onChange={(e) => setRejectionNote(e.target.value)}
                placeholder="פרט את התיקונים הנדרשים שיישלחו למבקש..."
                className="mb-3"
                rows={3}
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleReject}
                  disabled={!rejectionNote.trim()}
                  className="bg-status-red text-primary-foreground hover:bg-status-red/90"
                >
                  <Send className="ml-2 h-4 w-4" />
                  שלח הודעת דחייה
                </Button>
                <Button variant="outline" onClick={() => setShowRejectForm(false)}>
                  ביטול
                </Button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-2 border-t border-border pt-4">
            {request.status === "new" && (
              <Button onClick={handleStartReview} className="bg-status-blue text-primary-foreground hover:bg-status-blue/90">
                התחל בדיקה
              </Button>
            )}
            {(request.status === "new" || request.status === "in_review") && (
              <>
                <Button
                  onClick={handleApprove}
                  disabled={!docsComplete}
                  className="bg-status-green text-primary-foreground hover:bg-status-green/90"
                >
                  <CheckCircle2 className="ml-2 h-4 w-4" />
                  {docsComplete ? "אשר בקשה" : "לא ניתן לאשר - מסמכים חסרים"}
                </Button>
                {!showRejectForm && (
                  <Button
                    variant="outline"
                    onClick={() => setShowRejectForm(true)}
                    className="border-status-red/30 text-status-red hover:bg-status-red-bg"
                  >
                    <XCircle className="ml-2 h-4 w-4" />
                    דחה / בקש תיקונים
                  </Button>
                )}
              </>
            )}
            {request.status === "rejected" && (
              <Button onClick={handleStartReview} className="bg-status-blue text-primary-foreground hover:bg-status-blue/90">
                העבר לבדיקה חוזרת
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
