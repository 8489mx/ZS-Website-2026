import React, { useState, useRef, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export default function LanguageSwitcher() {
  const { lang, setLang, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-brand-600 transition-colors p-2 rounded-lg hover:bg-slate-50"
        title={lang === 'ar' ? 'تغيير اللغة' : 'Change Language'}
      >
        <Globe className="w-5 h-5 flex-shrink-0" />
        <span className="hidden sm:inline">{lang === "ar" ? "العربية" : "English"}</span>
      </button>

      {isOpen && (
        <div className={`absolute top-full mt-2 w-40 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-2 ${isRTL ? 'left-0' : 'right-0'}`}>
          <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            {lang === 'ar' ? 'اختر اللغة' : 'Select Language'}
          </div>
          <button
            onClick={() => { setLang("ar"); setIsOpen(false); }}
            className={`w-full text-start px-4 py-2 text-sm flex items-center justify-between hover:bg-slate-50 transition-colors ${lang === 'ar' ? 'text-brand-600 font-bold bg-brand-50/50' : 'text-slate-700'}`}
          >
            العربية
            {lang === 'ar' && <Check className="w-4 h-4" />}
          </button>
          
          <button
            onClick={() => { setLang("en"); setIsOpen(false); }}
            className={`w-full text-start px-4 py-2 text-sm flex items-center justify-between hover:bg-slate-50 transition-colors ${lang === 'en' ? 'text-brand-600 font-bold bg-brand-50/50' : 'text-slate-700'}`}
          >
            English
            {lang === 'en' && <Check className="w-4 h-4" />}
          </button>
        </div>
      )}
    </div>
  );
}
