import { useRequests } from "@/hooks/useRequests";
import { RequestsTable } from "@/components/RequestsTable";
import { Landmark, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Review = () => {
  const { requests, updateRequest, isLoaded } = useRequests();
  const navigate = useNavigate();

  if (!isLoaded) return <div className="p-8 text-center">טוען...</div>;

  // Show new and in_review requests
  const reviewRequests = requests.filter(r => r.status === "new" || r.status === "in_review");

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 shadow-soft-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowRight className="h-5 w-5" />
            </Button>
            <div className="rounded-xl bg-status-yellow text-primary-foreground p-2.5 shadow-sm">
              <Landmark className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-foreground">בדיקה ובקרה</h1>
              <p className="text-sm text-muted-foreground">בדיקת מסמכים ואימות מול הנחיות הרשות</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="space-y-6 animate-fade-in">
          <section className="rounded-xl border border-border bg-card shadow-soft-sm overflow-hidden">
            <div className="border-b border-border bg-muted/30 px-6 py-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">בקשות לבדיקה</h3>
              <span className="text-xs text-muted-foreground">{reviewRequests.length} רשומות</span>
            </div>
            <div className="p-6">
              {reviewRequests.length > 0 ? (
                <RequestsTable requests={reviewRequests} onUpdateRequest={updateRequest} />
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  אין בקשות הממתינות לבדיקה כרגע.
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Review;
