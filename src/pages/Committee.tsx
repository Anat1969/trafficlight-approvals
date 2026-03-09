import { useRequests } from "@/hooks/useRequests";
import { CommitteeView } from "@/components/CommitteeView";
import { Landmark, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CommitteePage = () => {
  const { requests, isLoaded } = useRequests();
  const navigate = useNavigate();

  if (!isLoaded) return <div className="p-8 text-center">טוען...</div>;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 shadow-soft-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowRight className="h-5 w-5" />
            </Button>
            <div className="rounded-xl bg-primary text-primary-foreground p-2.5 shadow-sm">
              <Landmark className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-foreground">ועדת שילוט</h1>
              <p className="text-sm text-muted-foreground">דיון מקצועי בחריגים ואישור סופי</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="space-y-6 animate-fade-in">
          <section className="rounded-xl border border-border bg-card shadow-soft-sm overflow-hidden">
            <div className="border-b border-border bg-muted/30 px-6 py-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">רשימת בקשות לדיון</h3>
            </div>
            <div className="p-6">
              <CommitteeView requests={requests} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default CommitteePage;
