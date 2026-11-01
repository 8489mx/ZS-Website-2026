export type SectorId = "retail" | "showrooms" | "restaurants" | "companies" | "contracting";

export type BillingMode = "monthly" | "annual" | "offline";




// ----------------------------------------------------
// Official Pricing Matrix (September 25, 2026 Release)
// ----------------------------------------------------

export const OFFLINE_TERMS = {
  ar: {
    title: "الشروط والضوابط المعتمدة للترخيص الدائم (نسخة أوفلاين):",
    points: [
      "عقد الدعم والتحديثات: 18% سنوياً من قيمة الترخيص بدءاً من السنة الثانية (السنة الأولى مشمولة مجاناً بالكامل).",
      "إمكانية التقسيط: سداد 40% دفعة مقدمة + المتبقي على 6 أقساط شهرية متساوية وميسرة.",
      "طرفية كاشير إضافية: 2,500 ج.م (لقطاعي التجزئة والمعارض) · 3,000 ج.م (لقطاعي المطاعم والشركات).",
      "مستخدم إضافي دائم: 1,200 ج.م (تجزئة) · 1,600 ج.م (معارض) · 2,200 ج.م (مطاعم) · 2,800 ج.م (شركات) · 3,500 ج.م (مقاولات).",
      "فرع إضافي دائم: 40% من قيمة ترخيص الحزمة المختارة.",
      "خدمات بطبيعتها سحابية: (المتجر الإلكتروني، بوابات الدفع، ربط أمازون ونون، بوت واتساب، شركات الشحن) تتطلب اشتراك سحابي مستقل (1,900 ج.م/شهرياً) لعميل الأوفلاين.",
      "قاعدة الترخيص الدائم في دول الخليج: تُحتسب بقيمة 2.5 ضعف السعر السنوي لنفس القطاع والمستوى، مع 18% دعم سنوي بدءاً من السنة الثانية."
    ]
  },
  en: {
    title: "Terms & Conditions for Lifetime Offline License:",
    points: [
      "Annual Support & Updates SLA: 18% annually of license value starting Year 2 (Year 1 is 100% free).",
      "Easy Installment Plan: 40% down payment + 6 equal monthly installments.",
      "Extra POS Terminal: 2,500 EGP (Retail & Showrooms) · 3,000 EGP (Restaurants & Corporate).",
      "Extra Permanent User: 1,200 EGP (Retail) · 1,600 EGP (Showrooms) · 2,200 EGP (F&B) · 2,800 EGP (Corporate) · 3,500 EGP (Contracting).",
      "Extra Permanent Branch: 40% of the selected tier license value.",
      "Cloud-native modules: (Online store, payment gateways, Amazon/Noon sync, WhatsApp bot, shipping couriers) require a standalone cloud subscription (1,900 EGP/mo) for offline clients.",
      "Gulf Offline License Formula: Calculated as 2.5x the annual subscription price for the same sector and tier, plus 18% annual support from year 2."
    ]
  }
};
