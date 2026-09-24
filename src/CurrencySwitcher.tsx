import React, { useState, useRef, useEffect } from "react";
import { Coins, Check, ChevronDown } from "lucide-react";
import { useCurrency, CURRENCY_CONFIGS, CurrencyCode } from "./CurrencyContext";
import { useLanguage } from "./LanguageContext";

interface CurrencySwitcherProps {
  variant?: "nav" | "compact" | "badge";
  className?: string;
}

export default function CurrencySwitcher({ variant = "nav", className = "" }: CurrencySwitcherProps) {
  const { currencyCode, currency, setCurrencyCode } = useCurrency();
  const { lang, isRTL } = useLanguage();
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

  const codes = Object.keys(CURRENCY_CONFIGS) as CurrencyCode[];

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-brand-600 transition-colors py-1.5 px-2.5 rounded-lg hover:bg-slate-100/80 border border-slate-200/80 shadow-xs cursor-pointer"
        title={lang === "ar" ? "تغيير العملة والدولة" : "Change Currency & Region"}
      >
        <span className="text-base leading-none">{currency.flag}</span>
        <span className="font-bold font-mono text-slate-800">
          {lang === "ar" ? currency.symbolAr : currency.symbolEn}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div
          className={`absolute top-full mt-2 w-56 sm:w-64 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-2 max-h-[380px] overflow-y-auto ${
            isRTL ? "left-0" : "right-0"
          }`}
        >
          <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 flex items-center justify-between">
            <span>{lang === "ar" ? "البلد والعملة" : "Country & Currency"}</span>
            <Coins className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <div className="py-1">
            {codes.map((code) => {
              const item = CURRENCY_CONFIGS[code];
              const isSelected = currencyCode === code;
              return (
                <button
                  key={code}
                  onClick={() => {
                    setCurrencyCode(code);
                    setIsOpen(false);
                  }}
                  className={`w-full text-start px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer ${
                    isSelected ? "text-brand-600 font-bold bg-brand-50/70" : "text-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-lg leading-none">{item.flag}</span>
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold truncate text-slate-800 text-[12px]">
                        {lang === "ar" ? item.countryNameAr : item.countryNameEn}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {item.code} - {lang === "ar" ? item.nameAr : item.nameEn}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 ms-2">
                    <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                      {lang === "ar" ? item.symbolAr : item.symbolEn}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-brand-600" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
