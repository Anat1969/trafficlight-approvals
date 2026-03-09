export type RequestStatus = "new" | "in_review" | "approved" | "rejected";

export interface SignageRequest {
  id: string;
  businessName: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  signType: string;
  location: string;
  status: RequestStatus;
  submittedAt: string;
  updatedAt: string;
  notes: string;
  documents: { name: string; uploaded: boolean }[];
}

export const SIGN_TYPES = [
  "שלט עסק",
  "שלט חוצות",
  "שלט אלקטרוני",
  "כרזת ענק",
  "שלט באתר בנייה",
  "שלט במרחב הציבורי",
];

export const STATUS_CONFIG: Record<RequestStatus, { label: string; color: "green" | "yellow" | "red" | "blue" }> = {
  new: { label: "חדש", color: "blue" },
  in_review: { label: "בבדיקה", color: "yellow" },
  approved: { label: "מאושר", color: "green" },
  rejected: { label: "נדחה - לתיקון", color: "red" },
};

export const REQUIRED_DOCUMENTS = [
  "תצלום חזית העסק",
  "הדמיית השלט",
  "תוכנית מדידה",
  "אישור קונסטרוקטור",
  "רישיון עסק",
];

export const mockRequests: SignageRequest[] = [
  {
    id: "SH-2024-001",
    businessName: "קפה שמש",
    applicantName: "יוסי כהן",
    applicantEmail: "yossi@cafe-shemesh.co.il",
    applicantPhone: "050-1234567",
    signType: "שלט עסק",
    location: "רח׳ הנשיא 12, אשדוד",
    status: "approved",
    submittedAt: "2024-11-15",
    updatedAt: "2024-12-01",
    notes: "אושר לאחר בדיקת ועדה. הותאם להנחיות העירוניות.",
    documents: [
      { name: "תצלום חזית העסק", uploaded: true },
      { name: "הדמיית השלט", uploaded: true },
      { name: "תוכנית מדידה", uploaded: true },
      { name: "אישור קונסטרוקטור", uploaded: true },
      { name: "רישיון עסק", uploaded: true },
    ],
  },
  {
    id: "SH-2024-003",
    businessName: "מסעדת הים",
    applicantName: "דוד אברהם",
    applicantEmail: "david@hayam.co.il",
    applicantPhone: "054-5551234",
    signType: "שלט אלקטרוני",
    location: "רח׳ החוף 8, אשדוד",
    status: "rejected",
    submittedAt: "2024-12-05",
    updatedAt: "2024-12-08",
    notes: "הבקשה נדחתה. השלט חורג מהמידות המותרות (מקסימום 2x1 מטר) ולא הוגש אישור קונסטרוקטור בתוקף.",
    documents: [
      { name: "תצלום חזית העסק", uploaded: true },
      { name: "הדמיית השלט", uploaded: true },
      { name: "תוכנית מדידה", uploaded: false },
      { name: "אישור קונסטרוקטור", uploaded: false },
      { name: "רישיון עסק", uploaded: true },
    ],
  }
];
