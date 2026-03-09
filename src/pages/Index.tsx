import { StatsCards } from "@/components/StatsCards";
import { RequestsTable } from "@/components/RequestsTable";
import { ProcessFlow } from "@/components/ProcessFlow";
import { Landmark, FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRequests } from "@/hooks/useRequests";

const Index = () => {
  const { requests, updateRequest, isLoaded } = useRequests();

  if (!isLoaded) return <div className="p-8 text-center">טוען...</div>;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary p-2">
              <Landmark className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-base font-semibold text-foreground">ניהול שילוט עירוני</h1>
              <p className="text-xs text-muted-foreground">מערכת ניהול בקשות ואישורים</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => window.location.href = '/track'}>
              אזור אישי
            </Button>
            <Button variant="ghost" size="sm" onClick={() => window.location.href = '/policy'}>
              מדיניות שילוט
            </Button>
            <Button size="sm" onClick={() => window.location.href = '/new-request'} className="gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              בקשה חדשה
            </Button>
            <div className="flex items-center gap-1.5 rounded-md bg-muted px-3 py-1.5 text-xs text-muted-foreground">
              <FileText className="h-3.5 w-3.5" />
              <span className="font-medium">{requests.length}</span>
              <span>בקשות</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-6 py-6">
        <div className="space-y-5">
          {/* Stats */}
          <StatsCards requests={requests} />

          {/* Process Flow */}
          <section className="rounded-lg border border-border bg-card overflow-hidden">
            <div className="border-b border-border px-5 py-2.5">
              <h3 className="text-xs font-medium text-muted-foreground">תהליך אישור</h3>
            </div>
            <div className="p-5">
              <ProcessFlow />
            </div>
          </section>

          {/* Requests Table */}
          <section className="rounded-lg border border-border bg-card overflow-hidden">
            <div className="border-b border-border px-5 py-2.5 flex items-center justify-between">
              <h3 className="text-xs font-medium text-muted-foreground">כל הבקשות</h3>
              <span className="text-xs text-muted-foreground/60">{requests.length} רשומות</span>
            </div>
            <div className="p-5">
              <RequestsTable requests={requests} onUpdateRequest={updateRequest} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;
