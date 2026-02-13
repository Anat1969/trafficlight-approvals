import { SignageRequest, STATUS_CONFIG } from "@/lib/mockData";
import { StatusBadge } from "./StatusBadge";
import { Button } from "@/components/ui/button";
import { Printer, FileText, Users } from "lucide-react";

interface Props {
  requests: SignageRequest[];
}

function generateRecommendationHTML(req: SignageRequest): string {
  const docsRows = req.documents
    .map(
      (d) =>
        `<tr><td style="padding:6px 12px;border:1px solid #ddd;">${d.name}</td><td style="padding:6px 12px;border:1px solid #ddd;text-align:center;">${d.uploaded ? "✅ הועלה" : "❌ חסר"}</td></tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
  <meta charset="UTF-8">
  <title>טופס המלצה - ${req.id}</title>
  <style>
    body { font-family: 'Heebo', Arial, sans-serif; max-width: 700px; margin: 40px auto; color: #1a1a2e; line-height: 1.7; }
    h1 { text-align: center; font-size: 22px; border-bottom: 3px solid #1e3a5f; padding-bottom: 12px; }
    h2 { font-size: 16px; color: #1e3a5f; margin-top: 24px; border-right: 4px solid #1e3a5f; padding-right: 10px; }
    table { width: 100%; border-collapse: collapse; margin-top: 8px; }
    th { background: #f0f4f8; padding: 8px 12px; border: 1px solid #ddd; text-align: right; font-size: 13px; }
    td { padding: 6px 12px; border: 1px solid #ddd; font-size: 13px; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 24px; font-size: 14px; }
    .info-grid strong { color: #1e3a5f; }
    .signature-area { margin-top: 60px; display: flex; justify-content: space-between; }
    .signature-box { text-align: center; width: 200px; }
    .signature-line { border-top: 1px solid #333; margin-top: 60px; padding-top: 6px; font-size: 13px; }
    .status-badge { display: inline-block; padding: 4px 16px; border-radius: 20px; font-weight: 600; font-size: 13px; }
    .status-approved { background: #e8f5e9; color: #2e7d32; }
    .status-other { background: #e3f2fd; color: #1565c0; }
    .notes-box { background: #f9f9f9; border: 1px solid #ddd; border-radius: 6px; padding: 12px; min-height: 60px; margin-top: 8px; font-size: 13px; }
    @media print { body { margin: 20px; } }
  </style>
</head>
<body>
  <h1>🏛️ טופס המלצה לוועדת שילוט</h1>
  <p style="text-align:center;color:#666;font-size:13px;">מספר בקשה: <strong>${req.id}</strong> | תאריך הפקה: ${new Date().toLocaleDateString("he-IL")}</p>

  <h2>פרטי העסק</h2>
  <div class="info-grid">
    <div><strong>שם עסק:</strong> ${req.businessName}</div>
    <div><strong>סוג שלט:</strong> ${req.signType}</div>
    <div><strong>מיקום:</strong> ${req.location}</div>
    <div><strong>תאריך הגשה:</strong> ${req.submittedAt}</div>
  </div>

  <h2>פרטי המגיש</h2>
  <div class="info-grid">
    <div><strong>שם:</strong> ${req.applicantName}</div>
    <div><strong>טלפון:</strong> ${req.applicantPhone}</div>
    <div><strong>אימייל:</strong> ${req.applicantEmail}</div>
    <div><strong>סטטוס:</strong> <span class="status-badge ${req.status === "approved" ? "status-approved" : "status-other"}">${STATUS_CONFIG[req.status].label}</span></div>
  </div>

  <h2>מסמכים</h2>
  <table>
    <thead><tr><th>מסמך</th><th>סטטוס</th></tr></thead>
    <tbody>${docsRows}</tbody>
  </table>

  <h2>הערות / החלטת מנהל</h2>
  <div class="notes-box">${req.notes || "—"}</div>

  <h2>המלצת הגורם המקצועי</h2>
  <div class="notes-box" style="min-height:80px;"></div>

  <div class="signature-area">
    <div class="signature-box"><div class="signature-line">חתימת הגורם המקצועי</div></div>
    <div class="signature-box"><div class="signature-line">חתימת יו״ר הוועדה</div></div>
    <div class="signature-box"><div class="signature-line">תאריך</div></div>
  </div>
</body>
</html>`;
}

function printRecommendation(req: SignageRequest) {
  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(generateRecommendationHTML(req));
  win.document.close();
  setTimeout(() => win.print(), 400);
}

export function CommitteeView({ requests }: Props) {
  // Committee-ready = approved with all docs complete
  const committeeReady = requests.filter(
    (r) => r.status === "approved" && r.documents.every((d) => d.uploaded)
  );

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">בקשות מוכנות לוועדה</h3>
          <span className="rounded-full bg-status-green-bg px-2.5 py-0.5 text-xs font-semibold text-status-green">
            {committeeReady.length}
          </span>
        </div>
      </div>

      {committeeReady.length === 0 ? (
        <div className="px-4 py-12 text-center text-muted-foreground">
          <FileText className="mx-auto mb-2 h-8 w-8 opacity-40" />
          <p>אין בקשות מוכנות לוועדה כרגע</p>
          <p className="mt-1 text-xs">בקשות מאושרות עם כל המסמכים יופיעו כאן</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-right font-semibold text-muted-foreground">מס׳ בקשה</th>
                <th className="px-4 py-3 text-right font-semibold text-muted-foreground">שם עסק</th>
                <th className="px-4 py-3 text-right font-semibold text-muted-foreground">סוג שלט</th>
                <th className="px-4 py-3 text-right font-semibold text-muted-foreground">מיקום</th>
                <th className="px-4 py-3 text-right font-semibold text-muted-foreground">סטטוס</th>
                <th className="px-4 py-3 text-right font-semibold text-muted-foreground">פעולות</th>
              </tr>
            </thead>
            <tbody>
              {committeeReady.map((req) => (
                <tr key={req.id} className="border-b border-border last:border-b-0">
                  <td className="px-4 py-3 font-mono text-xs font-semibold text-primary">{req.id}</td>
                  <td className="px-4 py-3 font-medium">{req.businessName}</td>
                  <td className="px-4 py-3">{req.signType}</td>
                  <td className="px-4 py-3 text-muted-foreground">{req.location}</td>
                  <td className="px-4 py-3"><StatusBadge status={req.status} /></td>
                  <td className="px-4 py-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => printRecommendation(req)}
                      className="gap-1.5"
                    >
                      <Printer className="h-3.5 w-3.5" />
                      הפק טופס המלצה
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
