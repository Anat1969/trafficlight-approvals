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
    id: "SH-2025-007",
    businessName: "כנען חברה לבנייה בע״מ",
    applicantName: "נחום דנג",
    applicantEmail: "office@cnaan-build.co.il",
    applicantPhone: "03-5270549",
    signType: "שלט באתר בנייה",
    location: "רח׳ הגדוד 45, אשדוד",
    status: "new",
    submittedAt: "2025-02-15",
    updatedAt: "2025-02-15",
    notes: "בקשה חדשה - טופס בקשה להצבת שילוט באתר בנייה. מס׳ אסמכתא: 20221448. כולל הדמיה, תוכנית מדידה ואישור קונסטרוקטור.",
    documents: [
      { name: "תצלום חזית העסק", uploaded: true },
      { name: "הדמיית השלט", uploaded: true },
      { name: "תוכנית מדידה", uploaded: true },
      { name: "אישור קונסטרוקטור", uploaded: true },
      { name: "רישיון עסק", uploaded: true },
    ],
  },
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
    notes: "אושר לאחר תיקון מידות",
    documents: [
      { name: "תצלום חזית העסק", uploaded: true },
      { name: "הדמיית השלט", uploaded: true },
      { name: "תוכנית מדידה", uploaded: true },
      { name: "אישור קונסטרוקטור", uploaded: true },
      { name: "רישיון עסק", uploaded: true },
    ],
  },
  {
    id: "SH-2024-002",
    businessName: "סופר פארם",
    applicantName: "מיכל לוי",
    applicantEmail: "michal@super-pharm.co.il",
    applicantPhone: "052-9876543",
    signType: "שלט חוצות",
    location: "שד׳ בני ברית 45, אשדוד",
    status: "in_review",
    submittedAt: "2024-12-10",
    updatedAt: "2024-12-12",
    notes: "ממתין לבדיקת קונסטרוקטור",
    documents: [
      { name: "תצלום חזית העסק", uploaded: true },
      { name: "הדמיית השלט", uploaded: true },
      { name: "תוכנית מדידה", uploaded: true },
      { name: "אישור קונסטרוקטור", uploaded: false },
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
    notes: "השלט חורג מהמידות המותרות. יש להקטין ל-2x1 מטר",
    documents: [
      { name: "תצלום חזית העסק", uploaded: true },
      { name: "הדמיית השלט", uploaded: true },
      { name: "תוכנית מדידה", uploaded: false },
      { name: "אישור קונסטרוקטור", uploaded: false },
      { name: "רישיון עסק", uploaded: true },
    ],
  },
  {
    id: "SH-2024-004",
    businessName: "חנות הספורט",
    applicantName: "רונן שמעוני",
    applicantEmail: "ronen@sport-shop.co.il",
    applicantPhone: "053-7778899",
    signType: "כרזת ענק",
    location: "רח׳ העצמאות 30, אשדוד",
    status: "new",
    submittedAt: "2024-12-14",
    updatedAt: "2024-12-14",
    notes: "",
    documents: [
      { name: "תצלום חזית העסק", uploaded: true },
      { name: "הדמיית השלט", uploaded: false },
      { name: "תוכנית מדידה", uploaded: false },
      { name: "אישור קונסטרוקטור", uploaded: false },
      { name: "רישיון עסק", uploaded: false },
    ],
  },
  {
    id: "SH-2024-005",
    businessName: "בנק הפועלים",
    applicantName: "שרה גולדשטיין",
    applicantEmail: "sarah@bankhapoalim.co.il",
    applicantPhone: "050-6667788",
    signType: "שלט עסק",
    location: "שד׳ הרצל 2, אשדוד",
    status: "approved",
    submittedAt: "2024-11-20",
    updatedAt: "2024-11-28",
    notes: "אושר",
    documents: [
      { name: "תצלום חזית העסק", uploaded: true },
      { name: "הדמיית השלט", uploaded: true },
      { name: "תוכנית מדידה", uploaded: true },
      { name: "אישור קונסטרוקטור", uploaded: true },
      { name: "רישיון עסק", uploaded: true },
    ],
  },
  {
    id: "SH-2024-006",
    businessName: "מספרת טיפ טופ",
    applicantName: "נועה פרץ",
    applicantEmail: "noa@tiptop.co.il",
    applicantPhone: "058-1112233",
    signType: "שלט עסק",
    location: "רח׳ רוגוזין 15, אשדוד",
    status: "in_review",
    submittedAt: "2024-12-11",
    updatedAt: "2024-12-13",
    notes: "בבדיקה - ממתין לאישור הנחיות עיצוביות",
    documents: [
      { name: "תצלום חזית העסק", uploaded: true },
      { name: "הדמיית השלט", uploaded: true },
      { name: "תוכנית מדידה", uploaded: true },
      { name: "אישור קונסטרוקטור", uploaded: true },
      { name: "רישיון עסק", uploaded: false },
    ],
  },
];
