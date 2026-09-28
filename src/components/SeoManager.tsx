import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../LanguageContext";

interface PageMeta {
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
}

const ROUTE_META_MAP: Record<string, PageMeta> = {
  "/": {
    titleAr: "Z Systems | منظومة الحلول البرمجية المؤسسية والأنظمة المتخصصة",
    titleEn: "Z Systems | Enterprise Software Architecture & Industry Platforms",
    descAr: "منظومة Z Systems المتطورة لتقديم أنظمة تشغيل متخصصة: ZS-ERP للتجزئة ونقاط البيع، Z Coaching لإدارة التدريب الرياضي، وZ Construction للمقاولات والمشاريع.",
    descEn: "Z Systems engineering specialized enterprise ecosystems: ZS-ERP for multi-branch retail & POS, Z Coaching for fitness operations, and Z Construction for project management."
  },
  "/erp": {
    titleAr: "ZS-ERP | النظام الإداري والمالي ونقاط البيع المتكامل - Z Systems",
    titleEn: "ZS-ERP | Enterprise POS, Accounting & Multi-Branch Retail System",
    descAr: "نظام ZS-ERP السحابي المتكامل لإدارة المبيعات، المخازن، الحسابات، ومنع السرقات مع العمل الكامل دون إنترنت ومزامنة فورية بين الفروع.",
    descEn: "ZS-ERP: The resilient retail management platform featuring offline-first POS, real-time branch synchronization, anti-theft controls, and tax compliance."
  },
  "/contact": {
    titleAr: "اتصل بنا | الدعم الفني واستشارات الأنظمة - Z Systems",
    titleEn: "Contact Us | Enterprise Support & Consultation - Z Systems",
    descAr: "تواصل مع فريق الدعم الفني والمبيعات في Z Systems للاستفسار وحجز العروض التوضيحية لنظام ZS-ERP.",
    descEn: "Get in touch with Z Systems technical advisors for live software demonstrations, consultations, and enterprise support."
  },
  "/terms": {
    titleAr: "الشروط والأحكام | Z Systems",
    titleEn: "Terms of Service | Z Systems",
    descAr: "اتفاقية الاستخدام والبنود القانونية لتشغيل وخدمات أنظمة Z Systems.",
    descEn: "Terms of service and legal agreement governing the usage of Z Systems software platforms."
  },
  "/privacy": {
    titleAr: "سياسة الخصوصية وأمن البيانات | Z Systems",
    titleEn: "Privacy & Data Security Policy | Z Systems",
    descAr: "التزام Z Systems بحماية وتشفير بيانات المعاملات وسرية حسابات العملاء.",
    descEn: "Z Systems privacy framework outlining data encryption, privacy protection, and user rights."
  },
  "/refund-policy": {
    titleAr: "سياسة الاسترجاع والضمان | Z Systems",
    titleEn: "Refund & Warranty Policy | Z Systems",
    descAr: "سياسة الاسترداد والضمان التشغيلي المالي المعتمد لعملاء Z Systems.",
    descEn: "Operational warranty and refund guidelines for Z Systems subscribers and licenses."
  }
};

export default function SeoManager() {
  const { pathname } = useLocation();
  const { lang, isRTL } = useLanguage();

  useEffect(() => {
    try {
      if (typeof document === "undefined") return;

      // Sync HTML document language and direction
      document.documentElement.lang = lang;
      document.documentElement.dir = isRTL ? "rtl" : "ltr";

      const meta = ROUTE_META_MAP[pathname] || ROUTE_META_MAP["/"];
      const title = lang === "en" ? meta.titleEn : meta.titleAr;
      const description = lang === "en" ? meta.descEn : meta.descAr;
      const canonicalUrl = `https://zsystemai.com${pathname === "/" ? "" : pathname}`;

      // Set document title
      document.title = title;

      // Safe helper to update meta tags
      const setMetaTag = (selector: string, attr: string, value: string) => {
        try {
          let el = document.querySelector(selector);
          if (!el) {
            el = document.createElement("meta");
            if (selector.startsWith('meta[name="')) {
              const name = selector.replace('meta[name="', "").replace('"]', "");
              el.setAttribute("name", name);
            } else if (selector.startsWith('meta[property="')) {
              const property = selector.replace('meta[property="', "").replace('"]', "");
              el.setAttribute("property", property);
            }
            document.head.appendChild(el);
          }
          el.setAttribute(attr, value);
        } catch {}
      };

      setMetaTag('meta[name="description"]', "content", description);
      setMetaTag('meta[property="og:title"]', "content", title);
      setMetaTag('meta[property="og:description"]', "content", description);
      setMetaTag('meta[property="og:url"]', "content", canonicalUrl);
      setMetaTag('meta[name="twitter:title"]', "content", title);
      setMetaTag('meta[name="twitter:description"]', "content", description);

      // Update canonical link safely
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", canonicalUrl);
    } catch (e) {
      // Gracefully prevent any error from interrupting UI render
    }
  }, [pathname, lang, isRTL]);

  return null;
}
