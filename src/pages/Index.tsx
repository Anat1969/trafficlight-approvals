import { StatsCards } from "@/components/StatsCards";
import { RequestsTable } from "@/components/RequestsTable";
import { ProcessFlow } from "@/components/ProcessFlow";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRequests } from "@/hooks/useRequests";

const Index = () => {
  const { requests, updateRequest, isLoaded } = useRequests();

  if (!isLoaded) return <div className="p-8 text-center text-muted-foreground">טוען...</div>;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-sm font-semibold tracking-wide text-foreground">ניהול שילוט עירוני</h1>
            <p className="text-[10px] text-muted-foreground tracking-wider mt-0.5">מערכת ניהול בקשות ואישורים</p>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => window.location.href = '/track'} className="text-[11px] text-muted-foreground hover:text-foreground transition-colors">
              אזור אישי
            </button>
            <button onClick={() => window.location.href = '/policy'} className="text-[11px] text-muted-foreground hover:text-foreground transition-colors">
              מדיניות שילוט
            </button>
            <Button size="sm" onClick={() => window.location.href = '/new-request'} className="h-7 px-3 text-[11px] rounded-sm gap-1">
              <Plus className="h-3 w-3" />
              בקשה חדשה
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="space-y-8">
          {/* Stats */}
          <StatsCards requests={requests} />

          {/* Process Flow */}
          <section>
            <h3 className="text-[10px] font-medium text-muted-foreground tracking-widest uppercase mb-3">תהליך אישור</h3>
            <div className="rounded-sm border border-border overflow-hidden">
              <ProcessFlow />
            </div>
          </section>

          {/* Requests Table */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[10px] font-medium text-muted-foreground tracking-widest uppercase">כל הבקשות</h3>
              <span className="text-[10px] text-muted-foreground/50 font-mono">{requests.length}</span>
            </div>
            <div className="rounded-sm border border-border bg-card overflow-hidden">
              <div className="p-5">
                <RequestsTable requests={requests} onUpdateRequest={updateRequest} />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;
