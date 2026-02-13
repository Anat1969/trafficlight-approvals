import { useState } from "react";
import { mockRequests, SignageRequest } from "@/lib/mockData";
import { StatsCards } from "@/components/StatsCards";
import { RequestsTable } from "@/components/RequestsTable";
import { Landmark, FileText } from "lucide-react";

const Index = () => {
  const [requests, setRequests] = useState<SignageRequest[]>(mockRequests);

  const handleUpdateRequest = (id: string, updates: Partial<SignageRequest>) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updates } : r))
    );
  };

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
          <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-1.5 text-sm text-muted-foreground">
            <FileText className="h-4 w-4" />
            <span>{requests.length} בקשות</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground">לוח בקרה</h2>
          <p className="mt-1 text-sm text-muted-foreground">סקירה כללית של בקשות שילוט וסטטוס אישורים</p>
        </div>

        <div className="space-y-6">
          <StatsCards requests={requests} />
          <div>
            <h3 className="mb-3 text-lg font-semibold text-foreground">כל הבקשות</h3>
            <RequestsTable requests={requests} onUpdateRequest={handleUpdateRequest} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
