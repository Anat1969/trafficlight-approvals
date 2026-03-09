import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ImagePlus, X } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export default function Policy() {
  const [images, setImages] = useState<Record<string, string>>({});
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    const saved = localStorage.getItem("policy-images");
    if (saved) setImages(JSON.parse(saved));
  }, []);

  const handleImageUpload = (policyId: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const newImages = { ...images, [policyId]: e.target?.result as string };
      setImages(newImages);
      localStorage.setItem("policy-images", JSON.stringify(newImages));
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (policyId: string) => {
    const newImages = { ...images };
    delete newImages[policyId];
    setImages(newImages);
    localStorage.setItem("policy-images", JSON.stringify(newImages));
  };
  const policies = [
    {
      id: "1",
      title: "שלט מספר בית על גבי מבנה (שם ומס' רחוב- התמצאות)",
      imageNumber: 1,
      guidelines: [
        "א. שלט שם רחוב ומספר בית מואר: ימוקם בגובה 3 מטרים ממפלס הכניסה בכל חזית הפונה לרחוב או מרחב ציבורי.",
        "ב. שלט מס' בית: לוחית אלומיניום בגודל 20X25 ס\"מ, עובי הלוחית 2 מ\"מ.",
        "ג. פילם מחזיר אור: בצבע כחול יודבק בחזית הלוחית.",
        "ד. פונט: \"נרקיס בלוק\", עיצוב רגיל, גובה 7 ס\"מ."
      ]
    },
    {
      id: "2",
      title: "שילוט שם פרויקט על בניין",
      imageNumber: 2,
      guidelines: [
        "הצבת שילוט מסוג זה תותר בפנים המבנה (מבואה ראשית) בלבד בגודל שלא יעלה על 1.2 מ\"ר.",
        "א. מיקום: יתוכנן שלט אחד לחזית. ימוקם בקומה העליונה של חזית המבנה.",
        "ב. גובה: הסף התחתון של השלט לא יפחת מ-2.5 מטרים.",
        "ג. תאורה: תאורה תהיה במישור החזית ותופעל למשך כל שעות היממה.",
        "ד. גוון התאורה: צהוב חם או צבעוני בהתאם לגווני לוגו בית העסק.",
        "ה. סוג השילוט: אותיות בודדות בלבד.",
        "ו. לוגו העסק: יכול לבלוט עד 10 ס\"מ מעל גובה האותיות."
      ]
    },
    {
      id: "3",
      title: "שילוט בתי עסק, חנויות",
      imageNumber: 3,
      guidelines: [
        "א. מיקום השילוט: יתוכנן במיקום אחיד עבור כל בתי העסק בחזית הבניין ומעל בית העסק.",
        "ב. השלט ימוקם בגבולות הפתחים המקוריים של בית העסק.",
        "ג. גובה השלט: הסף התחתון לא יפחת מ-2.5 מטרים.",
        "ד. תאורה: תאורה תהיה במישור החזית ותופעל כל שעות היממה.",
        "ה. גוון התאורה: צהוב חם או צבעוני.",
        "ו. סוג השילוט: אותיות בודדות בלבד."
      ]
    },
    {
      id: "4",
      title: "שילוט על פרגוד (סוכך) / מרקיזה",
      imageNumber: 4,
      guidelines: [
        "א. תוכן השלט: יכיל את שם בית העסק בלבד, ולא יכיל פרסום חברות אחרות.",
        "ב. גוון השלט: בהתאם לגווני לוגו בית העסק.",
        "ג. סוגי השילוט: בפרגוד (סוכך/מרקיזה) ניתן להציב שילוט הדבקה בלבד, אותיות בודדות, ובלבד שדה השילוט יהיה בחלקו התחתון."
      ]
    },
    {
      id: "5",
      title: "שילוט חוצות - כרזות ענק / טוטם",
      imageNumber: 5,
      guidelines: [
        "א. יגלה רגישויות לאיכויות הקיימות בסביבה.",
        "ב. תורם לשיפור חזות המבנה ו/או אין בהצבתו לפגוע בחזית המבנה.",
        "ג. לא יפגע במבטים פנורמיים של העיר.",
        "ד. חזית אטומה בלבד.",
        "ה. לא יסתיר אלמנטים אדריכליים.",
        "ו. ללא חריגה מגבולות חזית המבנה."
      ]
    },
    {
      id: "6",
      title: "שילוט אלקטרוני (בשטח פרטי/ציבורי)",
      imageNumber: 6,
      guidelines: [
        "א. יוצב במגרשים בעלי חזית פעילה הפונים לעורקי תחבורה ראשיים בלבד.",
        "ב. שילוט אלקטרוני יוצב רק בסביבה מסחרית ויותאם להנחיות חזית המבנה.",
        "השילוט יותקן במרחק שלא יפחת מ-50 מ' ממבנה מגורים בסביבה מסחרית."
      ]
    },
    {
      id: "7",
      title: "שילוט באתרי בניה: שלט אתר, גדר מדברת",
      imageNumber: 7,
      guidelines: [
        "1) שלט אתר:",
        "א. תוכן: שם פרויקט/אתר/יועצים.",
        "ב. גודל: 4*2.",
        "ג. חומר: מדבקה שתודבק כשלט אחד כחלק מהגדר המדברת.",
        "2) גדר מדברת:",
        "א. תוכן: 50% תכנים עירוניים ו-50% תוכן יזמי."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">מערכת רישוי שילוט</h1>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" className={navigationMenuTriggerStyle()}>
                  חזרה לדף הבית
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-4">הנחיות ומדיניות שילוט</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            מידע מקיף אודות סוגי השלטים המותרים, הנחיות עיצוביות, ונהלי הצבת שילוט ברחבי העיר.
          </p>
        </div>

        <div className="grid gap-8 max-w-5xl mx-auto">
          {policies.map((policy) => (
            <Card key={policy.id} className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-muted flex flex-col items-center justify-center p-6 relative overflow-hidden min-h-[200px]">
                  <Badge className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center text-lg rounded-full">
                    {policy.imageNumber}
                  </Badge>
                  {images[policy.id] ? (
                    <>
                      <img 
                        src={images[policy.id]} 
                        alt={policy.title}
                        className="w-full h-full object-contain rounded"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-4 left-4 z-10 h-7 w-7"
                        onClick={() => removeImage(policy.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-muted-foreground">
                      <ImagePlus className="h-12 w-12" />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRefs.current[policy.id]?.click()}
                      >
                        העלה תמונה
                      </Button>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={(el) => { fileInputRefs.current[policy.id] = el; }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(policy.id, file);
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="md:w-2/3">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">{policy.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {policy.guidelines.map((guideline, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm">
                          <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                          <span className="leading-relaxed">{guideline}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}