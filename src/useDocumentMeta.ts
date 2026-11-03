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
  "/pos-electronics": {
    titleAr: "برنامج كاشير لمحلات الإلكترونيات والموبايلات | Z-ERP - Z Systems",
    titleEn: "Electronics & Mobile Store POS Software | Z-ERP - Z Systems",
    descriptionAr:
      "برنامج كاشير لمحلات الإلكترونيات والموبايلات من Z-ERP: تتبع كل جهاز برقمه التسلسلي، سجل بيع لمتابعة الضمان، فروع ومخازن متعددة، ونسخة محلية تعمل بدون إنترنت.",
    descriptionEn:
      "POS software for electronics and mobile stores by Z-ERP: serial-number tracking for every device, a sales record for warranty follow-up, multiple branches and warehouses, and an offline local edition.",
  },
  "/inventory-management": {
    titleAr: "برنامج إدارة المخزون متعدد الفروع والمخازن | Z-ERP - Z Systems",
    titleEn: "Multi-Branch Inventory Management Software | Z-ERP - Z Systems",
    descriptionAr:
      "برنامج إدارة مخزون متعدد الفروع والمخازن من Z-ERP: أرصدة لحظية موحدة، تحويلات موثقة بين الفروع والمخازن، تنبيهات وحدود إعادة طلب، وتتبع دفعات وأرقام تسلسلية.",
    descriptionEn:
      "Multi-branch, multi-warehouse inventory management by Z-ERP: real-time unified balances, documented transfers between branches and warehouses, reorder alerts and points, and batch and serial tracking.",
  },
  "/zatca-invoicing": {
    titleAr: "الفاتورة الإلكترونية السعودية ZATCA | Z-ERP - Z Systems",
    titleEn: "Saudi ZATCA E-Invoicing | Z-ERP - Z Systems",
    descriptionAr:
      "الفاتورة الإلكترونية السعودية مع Z-ERP: فواتير ضريبية برمز QR وحساب لضريبة القيمة المضافة، وخدمة إرسال للفوترة الإلكترونية إلى ZATCA، بالريال السعودي ومن نظام واحد لنقاط البيع والمحاسبة.",
    descriptionEn:
      "Saudi ZATCA e-invoicing with Z-ERP: tax invoices with QR codes and VAT calculation, a ZATCA e-invoicing submission service, in Saudi riyals, from one POS and accounting system.",
  },
  "/pos-security": {
    titleAr: "حماية الكاشير من السرقة والتلاعب | Z-ERP - Z Systems",
    titleEn: "Stop Cashier Theft & Manipulation | Z-ERP - Z Systems",
    descriptionAr:
      "حماية الكاشير من السرقة والتلاعب مع Z-ERP: صلاحيات منفصلة لكل كاشير للإلغاءات والخصومات وتعديلات الأسعار وفتح الدرج، وسجل تدقيق يوثق كل عملية استثنائية.",
    descriptionEn:
      "Stop cashier theft and manipulation with Z-ERP: separate permissions per cashier for voids, discounts, price edits, and drawer openings, with an audit log recording every exceptional action.",
  },
  "/alternative-daftra": {
    titleAr: "بديل دفترة لإدارة المحلات والفروع | Z-ERP - Z Systems",
    titleEn: "Daftra Alternative for Retail Stores | Z-ERP - Z Systems",
    descriptionAr:
      "بديل دفترة للمحلات والفروع من Z-ERP: كاشير ومخزون ومحاسبة في نظام واحد، نسخة محلية تعمل بالكامل بدون إنترنت، وصلاحيات وسجل تدقيق ضد تلاعب الكاشير.",
    descriptionEn:
      "A Daftra alternative for stores and branches by Z-ERP: POS, inventory, and accounting in one system, a local edition that works fully offline, and per-cashier permissions with an audit log.",
  },
  "/alternative-foodics": {
    titleAr: "بديل فودكس للمطاعم والمقاهي | Z-ERP - Z Systems",
    titleEn: "Foodics Alternative for Restaurants & Cafés | Z-ERP - Z Systems",
    descriptionAr:
      "بديل فودكس للمطاعم والمقاهي من Z-ERP: نقاط بيع للمطاعم ضمن نظام ERP يدير أنشطة التجزئة والجملة لنفس المالك، ونسخة محلية تعمل بدون إنترنت، وفواتير ضريبية برمز QR وخدمة ZATCA.",
    descriptionEn:
      "A Foodics alternative by Z-ERP: restaurant POS inside a full ERP that also runs the owner's retail and wholesale activities, an offline local edition, tax invoices with QR codes, and a ZATCA service.",
  },
  "/erp-vs-excel": {
    titleAr: "إكسل أم برنامج محاسبة وكاشير؟ | Z-ERP - Z Systems",
    titleEn: "Excel vs POS & Accounting Software | Z-ERP - Z Systems",
    descriptionAr:
      "إكسل أم برنامج محاسبة وكاشير؟ مقارنة صادقة بين الجداول والدفاتر ونظام مثل Z-ERP: مخزون يتحدث مع كل فاتورة، صلاحيات وسجل تدقيق، وفروع ومخازن في صورة واحدة.",
    descriptionEn:
      "Excel or POS and accounting software? An honest comparison of spreadsheets and notebooks with a system like Z-ERP: stock that updates with every invoice, permissions and an audit log, branches in one picture.",
  },
  "/best-pos-egypt": {
    titleAr: "أفضل برامج الكاشير في مصر 2026 | دليل المشتري - Z Systems",
    titleEn: "Best POS Software in Egypt 2026 | Buyer's Guide - Z Systems",
    descriptionAr:
      "دليل المشتري لأفضل برامج الكاشير في مصر 2026: ستة معايير للاختيار — العمل دون إنترنت، مخزون الفروع، رقابة الكاشير، الفوترة الإلكترونية، الأجهزة، والتخصص — ومقارنة فئات السوق بإنصاف.",
    descriptionEn:
      "A buyer's guide to the best POS software in Egypt in 2026: six selection criteria — offline work, branch stock, cashier control, e-invoicing, hardware, and specialisation — and a fair comparison of market categories.",
  },
  "/blog": {
    titleAr: "مدونة Z-ERP: إجابات لصاحب المحل - Z Systems",
    titleEn: "Z-ERP Blog: Straight Answers for Shop Owners - Z Systems",
    descriptionAr:
      "مدونة Z-ERP: أدلة عملية وإجابات مباشرة لصاحب المحل عن أسعار برامج الكاشير، والعمل دون إنترنت، وإدارة الفروع والمخزون.",
    descriptionEn:
      "The Z-ERP blog: practical guides and straight answers for shop owners on POS software prices, working without internet, and running branches and stock.",
  },
  "/blog/pos-software-prices-egypt": {
    titleAr: "كم سعر برنامج الكاشير في مصر؟ دليل المشتري 2026 - Z Systems",
    titleEn: "How Much Does POS Software Cost in Egypt? 2026 Buyer's Guide - Z Systems",
    descriptionAr:
      "كم سعر برنامج الكاشير في مصر؟ ما يحدد السعر فعلًا: عدد الفروع والأجهزة، الاشتراك السحابي مقابل الترخيص المحلي، التكاليف الخفية، وقائمة فحص لمقارنة أي عرضين بإنصاف.",
    descriptionEn:
      "How much does POS software cost in Egypt? What actually sets the price: branches and tills, cloud subscription vs local licence, hidden costs, and a checklist for comparing any two quotes fairly.",
  },
  "/blog/offline-pos-guide": {
    titleAr: "برنامج كاشير يعمل بدون إنترنت: يعني إيه وإمتى تحتاجه؟ - Z Systems",
    titleEn: "POS That Works Without Internet: What It Means & When You Need It - Z Systems",
    descriptionAr:
      "برنامج كاشير يعمل بدون إنترنت: ماذا يعني فعليًا، وكيف تتم المزامنة عند عودة الاتصال، والفرق بين النسختين السحابية والمحلية، ومن يحتاجه فعلًا، وأسئلة تكشف الحقيقة لأي بائع.",
    descriptionEn:
      "POS software that works without internet: what it actually means, how sync works when the connection returns, cloud vs local editions, who genuinely needs it, and questions that reveal the truth to ask any vendor.",
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
