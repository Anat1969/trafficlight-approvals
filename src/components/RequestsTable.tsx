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
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => toggleSort(col.key)}
                    className="cursor-pointer select-none px-4 py-3 text-right font-semibold text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {col.label} <SortIcon col={col.key} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((req) => {
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
              {sorted.length === 0 && (
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
