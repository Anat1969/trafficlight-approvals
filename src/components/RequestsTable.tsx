import { useState, useMemo } from "react";
import { SignageRequest, RequestStatus, STATUS_CONFIG, SIGN_TYPES } from "@/lib/mockData";
import { StatusBadge } from "./StatusBadge";
import { RequestDetailDialog } from "./RequestDetailDialog";
import { Search, Filter, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
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

type SortKey = "id" | "businessName" | "applicantName" | "signType" | "location" | "submittedAt" | "status" | "docs";
type SortDir = "asc" | "desc";

const STATUS_ORDER: Record<RequestStatus, number> = { new: 0, in_review: 1, approved: 2, rejected: 3 };

export function RequestsTable({ requests, onUpdateRequest }: RequestsTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedRequest, setSelectedRequest] = useState<SignageRequest | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("submittedAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ArrowUpDown className="inline h-3 w-3 opacity-30" />;
    return sortDir === "asc" ? <ArrowUp className="inline h-3 w-3" /> : <ArrowDown className="inline h-3 w-3" />;
  };

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

  const sorted = useMemo(() => {
    const arr = [...filtered];
    const dir = sortDir === "asc" ? 1 : -1;
    arr.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "id": cmp = a.id.localeCompare(b.id); break;
        case "businessName": cmp = a.businessName.localeCompare(b.businessName, "he"); break;
        case "applicantName": cmp = a.applicantName.localeCompare(b.applicantName, "he"); break;
        case "signType": cmp = a.signType.localeCompare(b.signType, "he"); break;
        case "location": cmp = a.location.localeCompare(b.location, "he"); break;
        case "submittedAt": cmp = a.submittedAt.localeCompare(b.submittedAt); break;
        case "status": cmp = STATUS_ORDER[a.status] - STATUS_ORDER[b.status]; break;
        case "docs": {
          const aCount = a.documents.filter((d) => d.uploaded).length;
          const bCount = b.documents.filter((d) => d.uploaded).length;
          cmp = aCount - bCount;
          break;
        }
      }
      return cmp * dir;
    });
    return arr;
  }, [filtered, sortKey, sortDir]);

  const columns: { key: SortKey; label: string }[] = [
    { key: "id", label: "מס׳ בקשה" },
    { key: "businessName", label: "שם עסק" },
    { key: "applicantName", label: "מגיש" },
    { key: "signType", label: "סוג שלט" },
    { key: "location", label: "מיקום" },
    { key: "submittedAt", label: "תאריך הגשה" },
    { key: "status", label: "סטטוס" },
    { key: "docs", label: "מסמכים" },
  ];

  return (
    <>
      <div className="card-elevated overflow-hidden">
        {/* Filters */}
        <div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center bg-muted/20">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="חיפוש לפי שם עסק, מגיש, מספר בקשה..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-10 bg-background border-border/60 focus-visible:ring-primary/30"
            />
          </div>
          <div className="flex gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px] bg-background">
                <Filter className="ml-2 h-4 w-4 text-muted-foreground" />
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
              <SelectTrigger className="w-[160px] bg-background">
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
          <table className="table-professional">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => toggleSort(col.key)}
                    className="cursor-pointer select-none transition-colors hover:text-foreground hover:bg-muted group"
                  >
                    <div className="flex items-center gap-1.5 justify-start">
                      {col.label} 
                      <span className={`transition-opacity ${sortKey === col.key ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}>
                        <SortIcon col={col.key} />
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sorted.map((req, index) => {
                const docsComplete = req.documents.every((d) => d.uploaded);
                const docsCount = req.documents.filter((d) => d.uploaded).length;
                const progressWidth = (docsCount / req.documents.length) * 100;
                
                return (
                  <tr
                    key={req.id}
                    onClick={() => setSelectedRequest(req)}
                    className="interactive-card border-none rounded-none shadow-none cursor-pointer transition-colors hover:bg-muted/40 animate-fade-in group"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <td className="font-mono text-xs font-semibold text-primary">{req.id}</td>
                    <td className="font-medium group-hover:text-primary transition-colors">{req.businessName}</td>
                    <td className="text-muted-foreground">{req.applicantName}</td>
                    <td>
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-secondary/50 text-xs font-medium text-secondary-foreground">
                        {req.signType}
                      </span>
                    </td>
                    <td className="text-muted-foreground text-xs truncate max-w-[150px]" title={req.location}>
                      {req.location}
                    </td>
                    <td className="text-muted-foreground text-sm">{req.submittedAt}</td>
                    <td>
                      <StatusBadge status={req.status} />
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="text-xs font-medium w-8 text-center">
                          {docsCount}/{req.documents.length}
                        </div>
                        <div className="h-2 w-20 overflow-hidden rounded-full bg-muted shadow-inner-soft">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ease-out ${
                              docsComplete ? 'bg-status-green' : 
                              docsCount > 0 ? 'bg-status-yellow' : 'bg-status-red'
                            }`}
                            style={{ width: `${progressWidth}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {sorted.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-16 text-center text-muted-foreground">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <Search className="h-8 w-8 opacity-20" />
                      <p className="text-lg font-medium">לא נמצאו תמונות</p>
                      <p className="text-sm opacity-60">נסה לשנות את סינון החיפוש</p>
                    </div>
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
