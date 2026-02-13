import { useState } from "react";
import { SignageRequest, RequestStatus, STATUS_CONFIG, SIGN_TYPES } from "@/lib/mockData";
import { StatusBadge } from "./StatusBadge";
import { RequestDetailDialog } from "./RequestDetailDialog";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RequestsTableProps {
  requests: SignageRequest[];
  onUpdateRequest: (id: string, updates: Partial<SignageRequest>) => void;
}

export function RequestsTable({ requests, onUpdateRequest }: RequestsTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedRequest, setSelectedRequest] = useState<SignageRequest | null>(null);

  const filtered = requests.filter((r) => {
    const matchesSearch =
      r.businessName.includes(search) ||
      r.applicantName.includes(search) ||
      r.id.includes(search) ||
      r.location.includes(search);
    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    const matchesType = typeFilter === "all" || r.signType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <>
      <div className="rounded-xl border border-border bg-card shadow-sm">
        {/* Filters */}
        <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="חיפוש לפי שם עסק, מגיש, מספר בקשה..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-9"
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <Filter className="ml-2 h-4 w-4" />
                <SelectValue placeholder="סטטוס" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">כל הסטטוסים</SelectItem>
                {Object.entries(STATUS_CONFIG).map(([key, val]) => (
                  <SelectItem key={key} value={key}>{val.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="סוג שלט" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">כל הסוגים</SelectItem>
                {SIGN_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-right font-semibold text-muted-foreground">מס׳ בקשה</th>
                <th className="px-4 py-3 text-right font-semibold text-muted-foreground">שם עסק</th>
                <th className="px-4 py-3 text-right font-semibold text-muted-foreground">מגיש</th>
                <th className="px-4 py-3 text-right font-semibold text-muted-foreground">סוג שלט</th>
                <th className="px-4 py-3 text-right font-semibold text-muted-foreground">מיקום</th>
                <th className="px-4 py-3 text-right font-semibold text-muted-foreground">תאריך הגשה</th>
                <th className="px-4 py-3 text-right font-semibold text-muted-foreground">סטטוס</th>
                <th className="px-4 py-3 text-right font-semibold text-muted-foreground">מסמכים</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((req) => {
                const docsComplete = req.documents.every((d) => d.uploaded);
                const docsCount = req.documents.filter((d) => d.uploaded).length;
                return (
                  <tr
                    key={req.id}
                    onClick={() => setSelectedRequest(req)}
                    className="cursor-pointer border-b border-border transition-colors hover:bg-accent/50 last:border-b-0"
                  >
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-primary">{req.id}</td>
                    <td className="px-4 py-3 font-medium">{req.businessName}</td>
                    <td className="px-4 py-3 text-muted-foreground">{req.applicantName}</td>
                    <td className="px-4 py-3">{req.signType}</td>
                    <td className="px-4 py-3 text-muted-foreground">{req.location}</td>
                    <td className="px-4 py-3 text-muted-foreground">{req.submittedAt}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={req.status} />
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium ${docsComplete ? "text-status-green" : "text-status-red"}`}>
                        {docsCount}/{req.documents.length}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-muted-foreground">
                    לא נמצאו בקשות
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <RequestDetailDialog
        request={selectedRequest}
        onClose={() => setSelectedRequest(null)}
        onUpdate={onUpdateRequest}
      />
    </>
  );
}
