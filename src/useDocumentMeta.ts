import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "./LanguageContext";

interface RouteMeta {
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  noIndex?: boolean;
}

const SITE_URL = "https://zsystemai.com";

const ROUTE_META: Record<string, RouteMeta> = {
  "/": {
    titleAr: "Z Systems | أنظمة Z-ERP المتكاملة لإدارة المنشآت ونقاط البيع",
    titleEn: "Z Systems | Next-Gen Enterprise Z-ERP & Point of Sale",
    descriptionAr:
      "نظام Z-ERP الإداري والمالي ونقاط البيع، سحابي ومع نسخة محلية قابلة للعمل دون إنترنت، لإدارة المخازن والفواتير والفروع.",
    descriptionEn:
      "Z-ERP: accounting, inventory, and point-of-sale system, cloud-hosted with a local edition that can work offline.",
  },
  "/erp": {
    titleAr: "Z-ERP | النظام الإداري والمالي المتكامل ونقاط البيع - Z Systems",
    titleEn: "Z-ERP | Enterprise POS & Management System - Z Systems",
    descriptionAr:
      "تفاصيل نظام Z-ERP والأسعار الحية والشروط، للقطاعات التجارية والخدمية، مع حاسبة عائد توضيحية.",
    descriptionEn:
      "Z-ERP details, live pricing, and terms for retail and service businesses, with an illustrative ROI calculator.",
  },
  "/pos-supermarket": {
    titleAr: "برنامج كاشير للسوبر ماركت | Z-ERP - Z Systems",
    titleEn: "Supermarket POS Software | Z-ERP - Z Systems",
    descriptionAr:
      "برنامج كاشير للسوبر ماركت من Z-ERP: بيع سريع بالباركود، مخزون يتحدث تلقائيًا مع كل فاتورة، رقابة على الكاشير، ونسخة محلية تعمل بدون إنترنت مع مزامنة تلقائية.",
    descriptionEn:
      "Supermarket POS software by Z-ERP: fast barcode checkout, stock that updates with every sale, cashier anti-theft controls, and an offline local edition with automatic sync.",
  },
  "/pos-restaurants": {
    titleAr: "برنامج كاشير للمطاعم والكافيهات | Z-ERP - Z Systems",
    titleEn: "Restaurant & Café POS Software | Z-ERP - Z Systems",
    descriptionAr:
      "برنامج كاشير للمطاعم والكافيهات والمخابز من Z-ERP: طلبات صالة وتيك أواي وتوصيل، فواتير ضريبية برمز QR وخدمة إرسال ZATCA، ونسخة محلية تعمل بدون إنترنت.",
    descriptionEn:
      "POS software for restaurants, cafés, and bakeries by Z-ERP: dine-in, takeaway, and delivery orders, tax invoices with QR codes and a ZATCA submission service, and an offline local edition.",
  },
  "/offline-pos": {
    titleAr: "برنامج كاشير يعمل بدون إنترنت | Z-ERP - Z Systems",
    titleEn: "Offline POS Software | Z-ERP - Z Systems",
    descriptionAr:
      "برنامج كاشير يعمل بدون إنترنت من Z-ERP: النسخة المحلية تستمر في البيع وإصدار الفواتير أثناء انقطاع الاتصال وتزامن البيانات تلقائيًا عند عودته.",
    descriptionEn:
      "Offline POS software by Z-ERP: the local edition keeps selling and invoicing during internet outages and syncs data automatically when the connection returns.",
  },
  "/pos-fashion": {
    titleAr: "برنامج كاشير لمحلات الملابس | Z-ERP - Z Systems",
    titleEn: "Fashion & Clothing Store POS Software | Z-ERP - Z Systems",
    descriptionAr:
      "برنامج كاشير لمحلات الملابس والأزياء من Z-ERP: مخزون منظم بالمقاس واللون، بيع بالباركود، تحويلات بين الفروع، رقابة على الإلغاءات والخصومات، ونسخة محلية تعمل بدون إنترنت.",
    descriptionEn:
      "POS software for fashion and clothing stores by Z-ERP: stock organised by size and colour, barcode checkout, inter-branch transfers, cashier controls, and an offline local edition.",
  },
  "/pos-pharmacy": {
    titleAr: "برنامج كاشير للصيدليات ومستحضرات التجميل | Z-ERP - Z Systems",
    titleEn: "Pharmacy & Cosmetics POS Software | Z-ERP - Z Systems",
    descriptionAr:
      "برنامج كاشير للصيدليات ومحلات مستحضرات التجميل من Z-ERP: تتبع دفعات يساعد على متابعة تواريخ الصلاحية، تنبيهات مخزون وحدود إعادة طلب، فروع ومخازن متعددة، ونسخة محلية تعمل بدون إنترنت.",
    descriptionEn:
      "POS software for pharmacies and cosmetics stores by Z-ERP: batch tracking that helps follow expiry dates, stock alerts and reorder points, multiple branches and warehouses, and an offline local edition.",
  },
  "/pos-auto-parts": {
    titleAr: "برنامج كاشير لقطع غيار السيارات | Z-ERP - Z Systems",
    titleEn: "Auto Parts POS Software | Z-ERP - Z Systems",
    descriptionAr:
      "برنامج كاشير وإدارة مخزون لقطع غيار السيارات من Z-ERP: كتالوج منظم برقم القطعة والباركود، مخازن وفروع متعددة، فواتير ضريبية برمز QR للتجزئة والجملة، ونسخة محلية تعمل بدون إنترنت.",
    descriptionEn:
      "POS and inventory software for auto parts stores and wholesale by Z-ERP: a catalogue organised by part number and barcode, multiple warehouses and branches, tax invoices with QR codes, and an offline local edition.",
  },
  "/terms": {
    titleAr: "الشروط والأحكام - Z Systems",
    titleEn: "Terms & Conditions - Z Systems",
    descriptionAr: "شروط استخدام موقع وأنظمة Z Systems.",
    descriptionEn: "Terms of use for the Z Systems website and systems.",
  },
  "/refund-policy": {
    titleAr: "سياسة الاسترداد والإلغاء - Z Systems",
    titleEn: "Refund & Cancellation Policy - Z Systems",
    descriptionAr: "سياسة استرداد الأموال والإلغاء لاشتراكات وتراخيص Z Systems.",
    descriptionEn: "Refund and cancellation policy for Z Systems subscriptions and licenses.",
  },
  "/privacy": {
    titleAr: "سياسة الخصوصية - Z Systems",
    titleEn: "Privacy Policy - Z Systems",
    descriptionAr: "سياسة الخصوصية لموقع وأنظمة Z Systems، وما البيانات التي نجمعها وكيف نستخدمها.",
    descriptionEn: "Privacy policy for the Z Systems website and systems: what data is collected and how it is used.",
  },
  "/contact": {
    titleAr: "تواصل معنا - Z Systems",
    titleEn: "Contact Us - Z Systems",
    descriptionAr: "تواصل مع Z Systems للاستفسار عن نظام Z-ERP والأسعار والتجربة.",
    descriptionEn: "Contact Z Systems about Z-ERP, pricing, and trials.",
  },
  "*": {
    titleAr: "الصفحة غير موجودة - Z Systems",
    titleEn: "Page Not Found - Z Systems",
    descriptionAr: "الصفحة المطلوبة غير موجودة على موقع Z Systems.",
    descriptionEn: "The requested page does not exist on the Z Systems website.",
    noIndex: true,
  },
};

function setMeta(selector: string, content: string, attr: "name" | "property") {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${selector}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, selector);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Single owner of per-route document metadata. Page components must not
 * set document.title themselves; this hook runs on route and language
 * changes and keeps title, description, Open Graph, and canonical in
 * sync with the current route.
 */
export default function useDocumentMeta() {
  const { pathname } = useLocation();
  const { lang } = useLanguage();

  useEffect(() => {
    const meta = ROUTE_META[pathname] || ROUTE_META["*"];
    const isArabic = lang === "ar";
    const title = isArabic ? meta.titleAr : meta.titleEn;
    const description = isArabic ? meta.descriptionAr : meta.descriptionEn;
    const canonical = `${SITE_URL}${pathname === "*" ? "/" : pathname}`;

    document.title = title;
    document.documentElement.lang = lang;
    setMeta("description", description, "name");
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", canonical, "property");
    setMeta("og:locale", isArabic ? "ar_AR" : "en_US", "property");
    setMeta("twitter:title", title, "name");
    setMeta("twitter:description", description, "name");
    setMeta("robots", meta.noIndex ? "noindex, follow" : "index, follow", "name");
    setCanonical(canonical);
  }, [pathname, lang]);
}
