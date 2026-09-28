import React from "react";
import LegalLayout from "./LegalLayout";
import { useLanguage } from "../LanguageContext";
import { MapPin, Phone, Mail, Clock, Building, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const { lang } = useLanguage();

  if (lang === "en") {
    return (
      <LegalLayout
        titleAr="اتصل بنا"
        titleEn="Contact Us"
        subtitleAr="نسعد دائماً بالتواصل معكم وتقديم الاستشارات الفنية والحلول البرمجية المتكاملة"
        subtitleEn="Get in touch with our team for technical consultations, product demos, and inquiries"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Office Address</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              <strong>Z Systems for Software Solutions</strong><br />
              Commercial Office No. 3, 5000 Units Project, Bldg 14<br />
              Port Said Governorate, Egypt
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Phone &amp; WhatsApp</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Mobile / WhatsApp:{" "}
              <a href="tel:+201018017523" className="text-brand-600 font-mono font-bold hover:underline" dir="ltr">
                <span dir="ltr" className="inline-block font-mono">+20 1018017523</span>
              </a>
              <br />
              Office Landline:{" "}
              <a href="tel:0663640828" className="text-slate-800 font-mono font-bold hover:underline" dir="ltr">
                <span dir="ltr" className="inline-block font-mono">066-3640828</span>
              </a>
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Official Email</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              General &amp; Technical Support: <a href="mailto:info@zsystemai.com" className="text-brand-600 font-mono font-bold hover:underline">info@zsystemai.com</a>
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Working Hours</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Saturday – Thursday: 9:00 AM – 6:00 PM (Cairo Time)<br />
              Cloud Systems &amp; Technical Uptime: 24/7 continuous monitoring
            </p>
          </div>
        </div>
      </LegalLayout>
    );
  }

  return (
    <LegalLayout
      titleAr="اتصل بنا"
      titleEn="Contact Us"
      subtitleAr="نسعد دائماً بالتواصل معكم وتقديم الاستشارات الفنية والحلول البرمجية المتكاملة"
      subtitleEn="Get in touch with our team for technical consultations, product demos, and inquiries"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm sm:text-base">عنوان المقر</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            <strong>زد سستمز لحلول البرمجيات</strong> (Z Systems)<br />
            جمهورية مصر العربية - محافظة بورسعيد<br />
            مكتب تجاري رقم (3) مشروع الـ 5000 وحدة ع 14
          </p>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm sm:text-base">الهاتف المباشر وواتساب</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            الموبايل / واتساب:{" "}
            <a href="https://wa.me/201018017523" target="_blank" rel="noreferrer" className="text-brand-600 font-normal hover:underline" dir="ltr">
              <span dir="ltr" className="inline-block tracking-normal">+20 1018017523</span>
            </a>
            <br />
            الهاتف الأرضي / المكتب:{" "}
            <a href="tel:0663640828" className="text-slate-800 font-normal hover:underline" dir="ltr">
              <span dir="ltr" className="inline-block tracking-normal">066-3640828</span>
            </a>
          </p>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm sm:text-base">البريد الإلكتروني الرسمي</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            لخدمة العملاء والاستفسارات والدعم: <a href="mailto:info@zsystemai.com" className="text-brand-600 font-normal hover:underline">info@zsystemai.com</a>
          </p>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm sm:text-base">أوقات العمل</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            من السبت إلى الخميس: ٩:٠٠ صباحاً – ٦:٠٠ مساءً (بتوقيت القاهرة)<br />
            الأنظمة السحابية والتشغيلية: متابعة مستمرة على مدار الساعة 24/7
          </p>
        </div>
      </div>
    </LegalLayout>
  );
}
