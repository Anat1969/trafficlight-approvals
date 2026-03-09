import { useRequests } from "@/hooks/useRequests";
import { RequestsTable } from "@/components/RequestsTable";
import { Landmark, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Decision = () => {
  const { requests, updateRequest, isLoaded } = useRequests();
  const navigate = useNavigate();

  if (!isLoaded) return <div className="p-8 text-center">טוען...</div>;

  // Show requests that are in_review (ready for decision) or recently approved/rejected
  const decisionRequests = requests.filter(r => r.status !== "new");

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 shadow-soft-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowRight className="h-5 w-5" />
            </Button>
            <div className="rounded-xl bg-status-green text-primary-foreground p-2.5 shadow-sm">
              <Landmark className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-foreground">החלטה - אישור/דחייה</h1>
              <p className="text-sm text-muted-foreground">החלטה מקצועית על בסיס הבדיקה</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="space-y-6 animate-fade-in">
          <section className="rounded-xl border border-border bg-card shadow-soft-sm overflow-hidden">
            <div className="border-b border-border bg-muted/30 px-6 py-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">בקשות להחלטה</h3>
              <span className="text-xs text-muted-foreground">{decisionRequests.length} רשומות</span>
            </div>
            <div className="p-6">
              {decisionRequests.length > 0 ? (
                <RequestsTable requests={decisionRequests} onUpdateRequest={updateRequest} />
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  אין בקשות הממתינות להחלטה כרגע.
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Decision;
