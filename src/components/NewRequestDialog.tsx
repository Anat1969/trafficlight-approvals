import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SIGN_TYPES, REQUIRED_DOCUMENTS, SignageRequest } from "@/lib/mockData";
import { Plus } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (request: SignageRequest) => void;
  nextId: number;
}

export function NewRequestDialog({ open, onClose, onAdd, nextId }: Props) {
  const [form, setForm] = useState({
    businessName: "",
    applicantName: "",
    applicantEmail: "",
    applicantPhone: "",
    signType: "",
    location: "",
    notes: "",
  });

  const handleSubmit = () => {
    if (!form.businessName || !form.applicantName || !form.signType || !form.location) return;

    const today = new Date().toISOString().split("T")[0];
    const newRequest: SignageRequest = {
      id: `SH-${new Date().getFullYear()}-${String(nextId).padStart(3, "0")}`,
      ...form,
      status: "new",
      submittedAt: today,
      updatedAt: today,
      documents: REQUIRED_DOCUMENTS.map((name) => ({ name, uploaded: false })),
    };
    onAdd(newRequest);
    setForm({
      businessName: "",
      applicantName: "",
      applicantEmail: "",
      applicantPhone: "",
      signType: "",
      location: "",
      notes: "",
    });
    onClose();
  };

  const isValid = form.businessName && form.applicantName && form.signType && form.location;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">קליטת בקשה חדשה</DialogTitle>
        </DialogHeader>

        <div className="mt-2 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>שם עסק *</Label>
              <Input
                value={form.businessName}
                onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                placeholder="שם העסק"
              />
            </div>
            <div className="space-y-1.5">
              <Label>שם המגיש *</Label>
              <Input
                value={form.applicantName}
                onChange={(e) => setForm({ ...form, applicantName: e.target.value })}
                placeholder="שם מלא"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>אימייל</Label>
              <Input
                type="email"
                value={form.applicantEmail}
                onChange={(e) => setForm({ ...form, applicantEmail: e.target.value })}
                placeholder="email@example.com"
                dir="ltr"
              />
            </div>
            <div className="space-y-1.5">
              <Label>טלפון</Label>
              <Input
                value={form.applicantPhone}
                onChange={(e) => setForm({ ...form, applicantPhone: e.target.value })}
                placeholder="050-0000000"
                dir="ltr"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>סוג שלט *</Label>
              <Select value={form.signType} onValueChange={(v) => setForm({ ...form, signType: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="בחר סוג" />
                </SelectTrigger>
                <SelectContent>
                  {SIGN_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>מיקום *</Label>
              <Input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="כתובת מלאה"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>הערות</Label>
            <Textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="הערות נוספות..."
              rows={2}
            />
          </div>

          <div className="flex gap-2 border-t border-border pt-4">
            <Button onClick={handleSubmit} disabled={!isValid}>
              <Plus className="ml-2 h-4 w-4" />
              קלוט בקשה
            </Button>
            <Button variant="outline" onClick={onClose}>ביטול</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
