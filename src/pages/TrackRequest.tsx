import { useState } from "react";
import { useRequests } from "@/hooks/useRequests";
import { Landmark, ArrowRight, UploadCloud, FileCheck, FileX, Send, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { StatusBadge } from "@/components/StatusBadge";
import { toast } from "sonner";
import { SignageRequest } from "@/lib/mockData";

const TrackRequest = () => {
  const { requests, updateRequest, isLoaded } = useRequests();
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState("");
  const [request, setRequest] = useState<SignageRequest | null>(null);
  
  // States for fixing a rejected request
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, boolean>>({});
  const [applicantNote, setApplicantNote] = useState("");

  if (!isLoaded) return <div className="p-8 text-center">טוען...</div>;

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!searchId.trim()) return;
    
    const found = requests.find((r) => r.id === searchId.trim());
    if (found) {
      setRequest(found);
      const docsState: Record<string, boolean> = {};
      found.documents.forEach((d) => {
        if (d.uploaded) docsState[d.name] = true;
      });
      setUploadedDocs(docsState);
      setApplicantNote("");
    } else {
      toast.error("בקשה לא נמצאה", {
        description: "אנא ודא שמספר הבקשה שהזנת נכון (למשל SH-2024-003).",
      });
      setRequest(null);
    }
  };

  const handleUpload = (docName: string) => {
    setUploadedDocs((prev) => ({ ...prev, [docName]: true }));
    toast.success("קובץ הועלה בהצלחה", {
      description: docName,
    });
  };

  const handleSubmitFixes = () => {
    if (!request) return;
    
    // Update documents
    const updatedDocs = request.documents.map((d) => ({
      name: d.name,
      uploaded: !!uploadedDocs[d.name],
    }));

    const allUploaded = updatedDocs.every((d) => d.uploaded);
    
    if (!allUploaded) {
      toast.error("יש להעלות את כל המסמכים החסרים", {
        description: "לא ניתן להגיש את הבקשה לבדיקה חוזרת ללא כל המסמכים.",
      });
      return;
    }

    const previousNotes = request.notes || "";
    const newNotes = applicantNote.trim() 
      ? previousNotes + `\n\n--- תגובת המבקש (${new Date().toLocaleDateString('he-IL')}) ---\n${applicantNote}`
      : previousNotes;

    updateRequest(request.id, {
      status: "in_review",
      documents: updatedDocs,
      notes: newNotes,
      updatedAt: new Date().toISOString().split("T")[0],
    });

    toast.success("הבקשה נשלחה לבדיקה חוזרת", {
      description: "המסמכים החדשים ופירוט התיקונים הועברו לטיפול הרשות.",
    });
    
    // Refresh local state to show new status
    setRequest((prev) => prev ? { ...prev, status: "in_review", documents: updatedDocs, notes: newNotes } : null);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 shadow-soft-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowRight className="h-5 w-5" />
            </Button>
            <div className="rounded-xl bg-gradient-to-br from-primary to-primary/80 p-2.5 shadow-glow-primary">
              <Landmark className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-foreground">מעקב ותיקון בקשה</h1>
              <p className="text-sm text-muted-foreground">אזור אישי לבעלי עסקים</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12">
        <div className="space-y-8 animate-fade-in">
          
          <div className="rounded-xl border border-border bg-card p-6 shadow-soft-sm">
            <h2 className="text-lg font-semibold mb-4">חיפוש בקשה קיימת</h2>
            <form onSubmit={handleSearch} className="flex gap-3">
              <Input
                placeholder="הכנס מספר בקשה (למשל SH-2024-003)..."
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="flex-1 bg-background"
                dir="ltr"
              />
              <Button type="submit" className="gap-2">
                <Search className="h-4 w-4" />
                חפש
              </Button>
            </form>
          </div>

          {request && (
            <div className="rounded-xl border border-border bg-card shadow-soft-sm overflow-hidden animate-fade-in">
              <div className="border-b border-border bg-muted/30 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground">בקשה {request.id}</h3>
                  <p className="text-sm text-muted-foreground">{request.businessName} - {request.signType}</p>
                </div>
                <StatusBadge status={request.status} />
              </div>

              <div className="p-6 space-y-6">
                <div className="rounded-lg border border-border bg-muted/20 p-4">
                  <h4 className="font-semibold text-sm mb-2 text-muted-foreground">הערות מהרשות / סיבת דחייה:</h4>
                  <p className="text-sm whitespace-pre-wrap">{request.notes || "אין הערות."}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">סטטוס מסמכים</h4>
                  <div className="space-y-3">
                    {request.documents.map((doc) => {
                      const isUploaded = uploadedDocs[doc.name];
                      return (
                        <div key={doc.name} className="flex items-center justify-between rounded-lg border border-border p-3 bg-background">
                          <span className="text-sm font-medium">{doc.name}</span>
                          
                          {isUploaded ? (
                            <span className="flex items-center gap-2 text-status-green text-sm">
                              <FileCheck className="h-4 w-4" /> הועלה
                            </span>
                          ) : (
                            <div className="flex items-center gap-3">
                              <span className="flex items-center gap-1 text-status-red text-sm">
                                <FileX className="h-4 w-4" /> חסר
                              </span>
                              {request.status === "rejected" && (
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="h-8 gap-1 border-primary/30 text-primary hover:bg-primary/5"
                                  onClick={() => handleUpload(doc.name)}
                                >
                                  <UploadCloud className="h-3.5 w-3.5" />
                                  העלה עכשיו
                                </Button>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {request.status === "rejected" && (
                  <div className="pt-6 border-t border-border space-y-4">
                    <h4 className="font-semibold">פירוט התיקונים שבוצעו (למילוי על ידי בעל העסק)</h4>
                    <p className="text-sm text-muted-foreground">
                      אנא תאר בקצרה אילו שינויים עשית בשלט או במסמכים כדי לעמוד בדרישות.
                    </p>
                    <Textarea
                      placeholder="לדוגמה: המידות עודכנו ל-2x1 מטר בהתאם להנחיות, וצורף אישור קונסטרוקטור עדכני..."
                      value={applicantNote}
                      onChange={(e) => setApplicantNote(e.target.value)}
                      className="min-h-[100px] bg-background"
                    />
                    
                    <Button 
                      onClick={handleSubmitFixes} 
                      className="w-full gap-2 mt-2"
                      size="lg"
                    >
                      <Send className="h-4 w-4" />
                      שלח בקשה לבדיקה חוזרת
                    </Button>
                  </div>
                )}
                
                {request.status === "in_review" && (
                  <div className="p-4 bg-status-yellow/10 rounded-lg text-center border border-status-yellow/20">
                    <p className="text-sm font-medium text-status-yellow">הבקשה נמצאת כעת בבדיקה אצל גורמי המקצוע ברשות.</p>
                  </div>
                )}
                
                {request.status === "approved" && (
                  <div className="p-4 bg-status-green/10 rounded-lg text-center border border-status-green/20">
                    <p className="text-sm font-medium text-status-green">הבקשה מאושרת והועברה לדיון בוועדת השילוט.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TrackRequest;
