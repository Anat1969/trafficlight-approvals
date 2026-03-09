import { StatsCards } from "@/components/StatsCards";
import { RequestsTable } from "@/components/RequestsTable";
import { ProcessFlow } from "@/components/ProcessFlow";
import { Landmark, FileText, Plus, BarChart3, ListChecks, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRequests } from "@/hooks/useRequests";

const Index = () => {
  const { requests, updateRequest, isLoaded } = useRequests();

  if (!isLoaded) return <div className="p-8 text-center">טוען...</div>;

  return (
    <div className="min-h-screen bg-background">
      {/* Header with gradient */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 shadow-soft-md">
        <div className="absolute inset-0 bg-gradient-to-l from-status-blue/5 via-status-yellow/5 via-status-green/5 to-primary/5 pointer-events-none" />
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-gradient-to-br from-primary to-indigo-500 p-2.5 shadow-glow-primary">
              <Landmark className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-foreground">ניהול שילוט עירוני</h1>
              <p className="text-sm text-muted-foreground">מערכת ניהול בקשות ואישורים</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => window.location.href = '/track'} className="gap-2 shadow-soft-sm hover:shadow-soft-md transition-all">
              אזור אישי (מעקב)
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/policy'} className="gap-2 shadow-soft-sm hover:shadow-soft-md transition-all">
              מדיניות שילוט
            </Button>
            <Button onClick={() => window.location.href = '/new-request'} className="gap-2 bg-gradient-to-l from-primary to-indigo-500 shadow-soft-md hover:shadow-soft-lg transition-all hover:opacity-90">
              <Plus className="h-4 w-4" />
              בקשה חדשה
            </Button>
            <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-4 py-2 text-sm text-muted-foreground border border-border/50">
              <FileText className="h-4 w-4" />
              <span className="font-medium">{requests.length}</span>
              <span>בקשות</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="space-y-6 animate-fade-in">
          {/* Page title with gradient accent */}
          <div className="relative overflow-hidden rounded-xl border border-border bg-card px-6 py-5 shadow-soft-sm">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-l from-status-blue via-status-yellow via-status-green to-primary" />
            <h2 className="text-2xl font-bold text-foreground">לוח בקרה</h2>
            <p className="mt-1 text-sm text-muted-foreground">סקירה כללית של בקשות שילוט וסטטוס אישורים</p>
          </div>

          {/* Process Flow section */}
          <section className="rounded-xl border border-border bg-card shadow-soft-sm overflow-hidden">
            <div className="border-b border-border bg-muted/30 px-6 py-3 flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">תהליך אישור</h3>
            </div>
            <div className="p-6">
              <ProcessFlow />
            </div>
          </section>

          {/* Stats section */}
          <section className="rounded-xl border border-border bg-card shadow-soft-sm overflow-hidden">
            <div className="border-b border-border bg-muted/30 px-6 py-3 flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">סטטיסטיקות</h3>
            </div>
            <div className="p-6">
              <StatsCards requests={requests} />
            </div>
          </section>

          {/* Requests Table section */}
          <section className="rounded-xl border border-border bg-card shadow-soft-sm overflow-hidden">
            <div className="border-b border-border bg-muted/30 px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ListChecks className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">כל הבקשות</h3>
              </div>
              <span className="text-xs text-muted-foreground">{requests.length} רשומות</span>
            </div>
            <div className="p-6">
              <RequestsTable requests={requests} onUpdateRequest={updateRequest} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;
