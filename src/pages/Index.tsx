import { useState } from "react";
import { mockRequests, SignageRequest } from "@/lib/mockData";
import { StatsCards } from "@/components/StatsCards";
import { RequestsTable } from "@/components/RequestsTable";
import { CommitteeView } from "@/components/CommitteeView";
import { ProcessFlow } from "@/components/ProcessFlow";
import { PolicyGuide } from "@/components/PolicyGuide";
import { Landmark, FileText, Plus, Users, LayoutDashboard, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

type Tab = "dashboard" | "committee" | "policy";

const Index = () => {
  const [requests, setRequests] = useState<SignageRequest[]>(mockRequests);
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  const handleUpdateRequest = (id: string, updates: Partial<SignageRequest>) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updates } : r))
    );
  };

  const handleAddRequest = (request: SignageRequest) => {
    setRequests((prev) => [request, ...prev]);
  };

  const nextId = requests.length + 1;

  const tabs = [
    { key: "dashboard" as Tab, label: "לוח בקרה", icon: LayoutDashboard },
    { key: "policy" as Tab, label: "נוהל והנחיות", icon: BookOpen },
    { key: "committee" as Tab, label: "ועדה", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 shadow-soft-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-gradient-to-br from-primary to-primary/80 p-2.5 shadow-glow-primary">
              <Landmark className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-foreground">ניהול שילוט עירוני</h1>
              <p className="text-sm text-muted-foreground">מערכת ניהול בקשות ואישורים</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={() => window.location.href = '/new-request'} className="gap-2 shadow-soft-md hover:shadow-soft-lg transition-all">
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

      {/* Tab Navigation */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl gap-1 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`group flex items-center gap-2 border-b-2 px-5 py-4 text-sm font-medium transition-all duration-200 ${
                activeTab === tab.key
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
              }`}
            >
              <tab.icon className={`h-4 w-4 transition-transform duration-200 ${activeTab === tab.key ? "" : "group-hover:scale-110"}`} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        {activeTab === "dashboard" && (
          <div className="space-y-6 animate-fade-in">
            {/* Page title */}
            <div className="rounded-xl border border-border bg-card px-6 py-5 shadow-soft-sm">
              <h2 className="text-2xl font-bold text-foreground">לוח בקרה</h2>
              <p className="mt-1 text-sm text-muted-foreground">סקירה כללית של בקשות שילוט וסטטוס אישורים</p>
            </div>

            {/* Process Flow section */}
            <section className="rounded-xl border border-border bg-card shadow-soft-sm overflow-hidden">
              <div className="border-b border-border bg-muted/30 px-6 py-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">תהליך אישור</h3>
              </div>
              <div className="p-6">
                <ProcessFlow onNavigate={setActiveTab} />
              </div>
            </section>

            {/* Stats section */}
            <section className="rounded-xl border border-border bg-card shadow-soft-sm overflow-hidden">
              <div className="border-b border-border bg-muted/30 px-6 py-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">סטטיסטיקות</h3>
              </div>
              <div className="p-6">
                <StatsCards requests={requests} />
              </div>
            </section>

            {/* Requests Table section */}
            <section className="rounded-xl border border-border bg-card shadow-soft-sm overflow-hidden">
              <div className="border-b border-border bg-muted/30 px-6 py-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">כל הבקשות</h3>
                <span className="text-xs text-muted-foreground">{requests.length} רשומות</span>
              </div>
              <div className="p-6">
                <RequestsTable requests={requests} onUpdateRequest={handleUpdateRequest} />
              </div>
            </section>
          </div>
        )}

        {activeTab === "policy" && (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground">נוהל והנחיות עיצוביות</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                קטגוריות השילוט, סוגי השלטים, הנחיות עיצוביות ונוהל אישור לכל קטגוריה
              </p>
            </div>
            <ProcessFlow onNavigate={setActiveTab} />
            <div className="mt-6">
              <PolicyGuide />
            </div>
          </>
        )}

        {activeTab === "committee" && (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground">בקשות לוועדה</h2>
              <p className="mt-1 text-sm text-muted-foreground">בקשות מאושרות עם מסמכים מלאים - מוכנות לדיון בוועדה</p>
            </div>
            <CommitteeView requests={requests} />
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
