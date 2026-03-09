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
  const [showNewRequest, setShowNewRequest] = useState(false);
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
      <header className="border-b border-border bg-card shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary p-2">
              <Landmark className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">ניהול שילוט עירוני</h1>
              <p className="text-xs text-muted-foreground">מערכת ניהול בקשות ואישורים</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={() => window.location.href = '/new-request'} className="gap-1.5">
              <Plus className="h-4 w-4" />
              בקשה חדשה
            </Button>
            <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-1.5 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span>{requests.length} בקשות</span>
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
              className={`flex items-center gap-1.5 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        {activeTab === "dashboard" && (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground">לוח בקרה</h2>
              <p className="mt-1 text-sm text-muted-foreground">סקירה כללית של בקשות שילוט וסטטוס אישורים</p>
            </div>
            <div className="space-y-6">
              <ProcessFlow />
              <StatsCards requests={requests} />
              <div>
                <h3 className="mb-3 text-lg font-semibold text-foreground">כל הבקשות</h3>
                <RequestsTable requests={requests} onUpdateRequest={handleUpdateRequest} />
              </div>
            </div>
          </>
        )}

        {activeTab === "policy" && (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground">נוהל והנחיות עיצוביות</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                קטגוריות השילוט, סוגי השלטים, הנחיות עיצוביות ונוהל אישור לכל קטגוריה
              </p>
            </div>
            <ProcessFlow />
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

      <NewRequestDialog
        open={showNewRequest}
        onClose={() => setShowNewRequest(false)}
        onAdd={handleAddRequest}
        nextId={nextId}
      />
    </div>
  );
};

export default Index;
