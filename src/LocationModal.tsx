import React, { useEffect, useState } from "react";
import { Globe, X, Coins } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { useCurrency, COUNTRY_CODE_TO_CURRENCY, COUNTRY_NAME_TO_CURRENCY, CurrencyCode } from "./CurrencyContext";

const COUNTRY_NAMES_AR: Record<string, string> = {
  Egypt: "مصر",
  "Saudi Arabia": "المملكة العربية السعودية",
  "United Arab Emirates": "الإمارات العربية المتحدة",
  Kuwait: "الكويت",
  Qatar: "قطر",
  Bahrain: "البحرين",
  Oman: "سلطنة عُمان",
  Jordan: "الأردن",
  Iraq: "العراق",
  Lebanon: "لبنان",
  Syria: "سوريا",
  Palestine: "فلسطين",
  Sudan: "السودان",
  Libya: "ليبيا",
  Morocco: "المغرب",
  Algeria: "الجزائر",
  Tunisia: "تونس",
  Yemen: "اليمن",
  Turkey: "تركيا",
  "United States": "الولايات المتحدة",
  "United Kingdom": "المملكة المتحدة",
  Canada: "كندا",
  Germany: "ألمانيا",
  France: "فرنسا",
  Italy: "إيطاليا",
  Spain: "إسبانيا",
};

export default function LocationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [country, setCountry] = useState<string | null>(null);
  const { lang, setLang } = useLanguage();
  const { currency, setCurrencyCode } = useCurrency();

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem("zsystems_has_seen_location_modal");
    if (hasSeenModal) return;

    const fetchLocation = async () => {
      try {
        const response = await fetch("https://get.geojs.io/v1/ip/geo.json");
        const data = await response.json();
        
        if (data && data.country) {
          setCountry(data.country);
          const cCode = (data.country_code || "").toUpperCase();
          const targetCurrency = COUNTRY_CODE_TO_CURRENCY[cCode] || COUNTRY_NAME_TO_CURRENCY[data.country];
          if (targetCurrency) {
            setCurrencyCode(targetCurrency);
          }
          setIsOpen(true);
        } else {
          setCountry("your region");
          setIsOpen(true);
        }
      } catch (err) {
        console.error("Failed to fetch location", err);
      }
    };

    fetchLocation();
  }, [setCurrencyCode]);

  if (!isOpen || !country) return null;

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("zsystems_has_seen_location_modal", "true");
  };

  const handleChooseArabic = () => {
    setLang("ar");
    setIsOpen(false);
    sessionStorage.setItem("zsystems_has_seen_location_modal", "true");
  };

  const handleChooseEnglish = () => {
    setLang("en");
    setIsOpen(false);
    sessionStorage.setItem("zsystems_has_seen_location_modal", "true");
  };

  const isArabic = lang === "ar";
  const displayCountry = isArabic ? (COUNTRY_NAMES_AR[country] || country) : country;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-[2px] font-sans" 
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-[420px] overflow-hidden relative animate-in fade-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button 
          onClick={handleClose}
          aria-label={isArabic ? "إغلاق" : "Close"}
          className="absolute top-4 end-4 text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 flex flex-col items-center text-center">
          {/* Globe Icon */}
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
            <Globe className="w-7 h-7" />
          </div>

          <h3 className="text-[22px] font-bold text-slate-900 mb-3 tracking-tight font-display">
            {isArabic 
              ? `يبدو أنك تتصفح من ${displayCountry}` 
              : `It looks like you're visiting from ${displayCountry}`}
          </h3>

          <p className="text-[15px] text-slate-500 leading-relaxed mb-4 px-2">
            {isArabic 
              ? "تم تخصيص العملة والباقات والبيانات المعروضة تلقائياً لتناسب بلدك."
              : "Pricing, currency, and packages have been customized for your country."}
          </p>

          <div className="mb-6 inline-flex items-center gap-2 bg-slate-50 border border-slate-200 py-1.5 px-3.5 rounded-full text-xs font-semibold text-slate-700">
            <span className="text-base">{currency.flag}</span>
            <span>{isArabic ? `العملة: ${currency.nameAr} (${currency.symbolAr})` : `Currency: ${currency.nameEn} (${currency.symbolEn})`}</span>
          </div>

          <div className="w-full flex flex-col gap-3">
            {isArabic ? (
              <>
                {/* Primary Button: Continue in Arabic (Current site language) */}
                <button
                  onClick={handleChooseArabic}
                  className="w-full bg-[#281b85] hover:bg-[#1e1363] text-white font-bold py-3.5 px-4 rounded-xl transition-colors shadow-sm cursor-pointer"
                >
                  المتابعة بالعربية
                </button>
                {/* Secondary Button: Switch to English */}
                <button
                  onClick={handleChooseEnglish}
                  className="w-full bg-white border border-slate-200 text-slate-800 font-bold py-3.5 px-4 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>التبديل إلى الإنجليزية</span>
                  <span className="text-xs text-slate-400 font-normal font-sans">(Switch to English)</span>
                </button>
              </>
            ) : (
              <>
                {/* Primary Button: Continue in English (Current site language) */}
                <button
                  onClick={handleChooseEnglish}
                  className="w-full bg-[#281b85] hover:bg-[#1e1363] text-white font-bold py-3.5 px-4 rounded-xl transition-colors shadow-sm cursor-pointer"
                >
                  Continue in English
                </button>
                {/* Secondary Button: Switch to Arabic */}
                <button
                  onClick={handleChooseArabic}
                  className="w-full bg-white border border-slate-200 text-slate-800 font-bold py-3.5 px-4 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-center gap-2"
                  dir="rtl"
                >
                  <span>التبديل إلى العربية</span>
                  <span className="text-xs text-slate-400 font-normal font-sans">(Switch to Arabic)</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
