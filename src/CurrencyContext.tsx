import React, { createContext, useContext, useState, useEffect } from "react";
import { safeLocalStorage } from "./utils/safeStorage";

export type CurrencyCode = "EGP" | "SAR" | "AED" | "QAR" | "KWD" | "BHD" | "OMR" | "JOD" | "IQD" | "USD";

export interface CurrencyConfig {
  code: CurrencyCode;
  countryCode: string;
  symbolAr: string;
  symbolEn: string;
  nameAr: string;
  nameEn: string;
  flag: string;
  countryNameAr: string;
  countryNameEn: string;
  rateFromSAR: number;
  whatsapp: {
    totalAr: string;
    taxAr: string;
    totalEn: string;
    taxEn: string;
  };
  shift: {
    opening: number;
    cash: number;
    card: number;
    networkAr: string;
    networkEn: string;
  };
  posProducts: {
    rice: number;
    juice: number;
    water: number;
    milk: number;
    oil: number;
    sugar: number;
  };
  roi: {
    defaultTurnover: number;
    minTurnover: number;
    maxTurnover: number;
    turnoverStep: number;
  };
}

export const CURRENCY_CONFIGS: Record<CurrencyCode, CurrencyConfig> = {
  EGP: {
    code: "EGP",
    countryCode: "EG",
    symbolAr: "ج.م",
    symbolEn: "EGP",
    nameAr: "جنيه مصري",
    nameEn: "Egyptian Pound",
    flag: "🇪🇬",
    countryNameAr: "مصر",
    countryNameEn: "Egypt",
    rateFromSAR: 13.3,
    whatsapp: {
      totalAr: "٤,٤٥٠ ج.م",
      taxAr: "٦٢٣ ج.م",
      totalEn: "4,450 EGP",
      taxEn: "623 EGP",
    },
    shift: {
      opening: 5000,
      cash: 45000,
      card: 112500,
      networkAr: "مدفوعات فوري، ميزة وبطاقات بنكية",
      networkEn: "Fawry, Meeza & Bank Cards",
    },
    posProducts: {
      rice: 475,
      juice: 160,
      water: 240,
      milk: 780,
      oil: 390,
      sugar: 430,
    },
    roi: {
      defaultTurnover: 1200000,
      minTurnover: 200000,
      maxTurnover: 15000000,
      turnoverStep: 100000,
    },
  },

  SAR: {
    code: "SAR",
    countryCode: "SA",
    symbolAr: "ر.س",
    symbolEn: "SAR",
    nameAr: "ريال سعودي",
    nameEn: "Saudi Riyal",
    flag: "🇸🇦",
    countryNameAr: "المملكة العربية السعودية",
    countryNameEn: "Saudi Arabia",
    rateFromSAR: 1.0,
    whatsapp: {
      totalAr: "٣٣٣ ر.س",
      taxAr: "٤٩,٥ ر.س",
      totalEn: "333 SAR",
      taxEn: "49.5 SAR",
    },
    shift: {
      opening: 500,
      cash: 4500,
      card: 10340.5,
      networkAr: "مدفوعات مدى والشبكة وبطاقات",
      networkEn: "Mada, Network & Cards",
    },
    posProducts: {
      rice: 35.5,
      juice: 12.0,
      water: 18.0,
      milk: 58.5,
      oil: 29.0,
      sugar: 32.0,
    },
    roi: {
      defaultTurnover: 250000,
      minTurnover: 50000,
      maxTurnover: 3000000,
      turnoverStep: 25000,
    },
  },

  AED: {
    code: "AED",
    countryCode: "AE",
    symbolAr: "د.إ",
    symbolEn: "AED",
    nameAr: "درهم إماراتي",
    nameEn: "UAE Dirham",
    flag: "🇦🇪",
    countryNameAr: "الإمارات العربية المتحدة",
    countryNameEn: "United Arab Emirates",
    rateFromSAR: 0.98,
    whatsapp: {
      totalAr: "٣٢٦ د.إ",
      taxAr: "١٦,٣ د.إ",
      totalEn: "326 AED",
      taxEn: "16.3 AED",
    },
    shift: {
      opening: 500,
      cash: 4500,
      card: 10340.5,
      networkAr: "مدفوعات البطاقات وآبل باي",
      networkEn: "Cards & Apple Pay",
    },
    posProducts: {
      rice: 35.5,
      juice: 12.0,
      water: 18.0,
      milk: 58.5,
      oil: 29.0,
      sugar: 32.0,
    },
    roi: {
      defaultTurnover: 250000,
      minTurnover: 50000,
      maxTurnover: 3000000,
      turnoverStep: 25000,
    },
  },

  QAR: {
    code: "QAR",
    countryCode: "QA",
    symbolAr: "ر.ق",
    symbolEn: "QAR",
    nameAr: "ريال قطري",
    nameEn: "Qatari Riyal",
    flag: "🇶🇦",
    countryNameAr: "قطر",
    countryNameEn: "Qatar",
    rateFromSAR: 0.97,
    whatsapp: {
      totalAr: "٣٣٠ ر.ق",
      taxAr: "٠ ر.ق",
      totalEn: "330 QAR",
      taxEn: "0 QAR",
    },
    shift: {
      opening: 500,
      cash: 4500,
      card: 10340.5,
      networkAr: "مدفوعات NAPS وبطاقات بنكية",
      networkEn: "NAPS & Bank Cards",
    },
    posProducts: {
      rice: 35.5,
      juice: 12.0,
      water: 18.0,
      milk: 58.5,
      oil: 29.0,
      sugar: 32.0,
    },
    roi: {
      defaultTurnover: 250000,
      minTurnover: 50000,
      maxTurnover: 3000000,
      turnoverStep: 25000,
    },
  },

  KWD: {
    code: "KWD",
    countryCode: "KW",
    symbolAr: "د.ك",
    symbolEn: "KWD",
    nameAr: "دينار كويتي",
    nameEn: "Kuwaiti Dinar",
    flag: "🇰🇼",
    countryNameAr: "الكويت",
    countryNameEn: "Kuwait",
    rateFromSAR: 0.082,
    whatsapp: {
      totalAr: "٢٧ د.ك",
      taxAr: "٠ د.ك",
      totalEn: "27 KWD",
      taxEn: "0 KWD",
    },
    shift: {
      opening: 40,
      cash: 365,
      card: 840,
      networkAr: "مدفوعات كي نت K-Net وبطاقات",
      networkEn: "K-Net & Bank Cards",
    },
    posProducts: {
      rice: 2.9,
      juice: 1.0,
      water: 1.5,
      milk: 4.8,
      oil: 2.4,
      sugar: 2.6,
    },
    roi: {
      defaultTurnover: 20000,
      minTurnover: 4000,
      maxTurnover: 250000,
      turnoverStep: 2000,
    },
  },

  BHD: {
    code: "BHD",
    countryCode: "BH",
    symbolAr: "د.ب",
    symbolEn: "BHD",
    nameAr: "دينار بحريني",
    nameEn: "Bahraini Dinar",
    flag: "🇧🇭",
    countryNameAr: "البحرين",
    countryNameEn: "Bahrain",
    rateFromSAR: 0.1,
    whatsapp: {
      totalAr: "٣٣ د.ب",
      taxAr: "٣,٣ د.ب",
      totalEn: "33 BHD",
      taxEn: "3.3 BHD",
    },
    shift: {
      opening: 50,
      cash: 450,
      card: 1035,
      networkAr: "مدفوعات بنفت بي BenefitPay وبطاقات",
      networkEn: "BenefitPay & Bank Cards",
    },
    posProducts: {
      rice: 3.5,
      juice: 1.2,
      water: 1.8,
      milk: 5.8,
      oil: 2.9,
      sugar: 3.2,
    },
    roi: {
      defaultTurnover: 25000,
      minTurnover: 5000,
      maxTurnover: 300000,
      turnoverStep: 2500,
    },
  },

  OMR: {
    code: "OMR",
    countryCode: "OM",
    symbolAr: "ر.ع",
    symbolEn: "OMR",
    nameAr: "ريال عماني",
    nameEn: "Omani Rial",
    flag: "🇴🇲",
    countryNameAr: "سلطنة عُمان",
    countryNameEn: "Oman",
    rateFromSAR: 0.102,
    whatsapp: {
      totalAr: "٣٤ ر.ع",
      taxAr: "١,٧ ر.ع",
      totalEn: "34 OMR",
      taxEn: "1.7 OMR",
    },
    shift: {
      opening: 50,
      cash: 460,
      card: 1050,
      networkAr: "مدفوعات عمان نت والبطاقات",
      networkEn: "OmanNet & Cards",
    },
    posProducts: {
      rice: 3.6,
      juice: 1.2,
      water: 1.8,
      milk: 5.9,
      oil: 3.0,
      sugar: 3.3,
    },
    roi: {
      defaultTurnover: 25000,
      minTurnover: 5000,
      maxTurnover: 300000,
      turnoverStep: 2500,
    },
  },

  JOD: {
    code: "JOD",
    countryCode: "JO",
    symbolAr: "د.أ",
    symbolEn: "JOD",
    nameAr: "دينار أردني",
    nameEn: "Jordanian Dinar",
    flag: "🇯🇴",
    countryNameAr: "الأردن",
    countryNameEn: "Jordan",
    rateFromSAR: 0.19,
    whatsapp: {
      totalAr: "٦٣ د.أ",
      taxAr: "١٠ د.أ",
      totalEn: "63 JOD",
      taxEn: "10 JOD",
    },
    shift: {
      opening: 95,
      cash: 850,
      card: 1960,
      networkAr: "مدفوعات كليك CliQ والبطاقات المصرفية",
      networkEn: "CliQ & Bank Cards",
    },
    posProducts: {
      rice: 6.7,
      juice: 2.3,
      water: 3.4,
      milk: 11.1,
      oil: 5.5,
      sugar: 6.1,
    },
    roi: {
      defaultTurnover: 50000,
      minTurnover: 10000,
      maxTurnover: 600000,
      turnoverStep: 5000,
    },
  },

  IQD: {
    code: "IQD",
    countryCode: "IQ",
    symbolAr: "د.ع",
    symbolEn: "IQD",
    nameAr: "دينار عراقي",
    nameEn: "Iraqi Dinar",
    flag: "🇮🇶",
    countryNameAr: "العراق",
    countryNameEn: "Iraq",
    rateFromSAR: 350,
    whatsapp: {
      totalAr: "١١٥,٠٠٠ د.ع",
      taxAr: "٠ د.ع",
      totalEn: "115,000 IQD",
      taxEn: "0 IQD",
    },
    shift: {
      opening: 175000,
      cash: 1575000,
      card: 3620000,
      networkAr: "مدفوعات كي كارد وزين كاش وبطاقات",
      networkEn: "Qi Card, ZainCash & Cards",
    },
    posProducts: {
      rice: 12500,
      juice: 4200,
      water: 6300,
      milk: 20500,
      oil: 10200,
      sugar: 11200,
    },
    roi: {
      defaultTurnover: 85000000,
      minTurnover: 15000000,
      maxTurnover: 1000000000,
      turnoverStep: 5000000,
    },
  },

  USD: {
    code: "USD",
    countryCode: "US",
    symbolAr: "$",
    symbolEn: "$",
    nameAr: "دولار أمريكي",
    nameEn: "US Dollar",
    flag: "🌐",
    countryNameAr: "الولايات المتحدة والدولية",
    countryNameEn: "United States & International",
    rateFromSAR: 0.27,
    whatsapp: {
      totalAr: "89 $",
      taxAr: "13 $",
      totalEn: "89 USD",
      taxEn: "13 USD",
    },
    shift: {
      opening: 135,
      cash: 1200,
      card: 2760,
      networkAr: "بطاقات الائتمان ومدفوعات Stripe",
      networkEn: "Credit Cards & Stripe",
    },
    posProducts: {
      rice: 9.5,
      juice: 3.2,
      water: 4.8,
      milk: 15.6,
      oil: 7.7,
      sugar: 8.5,
    },
    roi: {
      defaultTurnover: 65000,
      minTurnover: 15000,
      maxTurnover: 800000,
      turnoverStep: 5000,
    },
  },
};

// Map ISO 2-letter Country Code to Currency Code
export const COUNTRY_CODE_TO_CURRENCY: Record<string, CurrencyCode> = {
  EG: "EGP", // Egypt
  SA: "SAR", // Saudi Arabia
  AE: "AED", // United Arab Emirates
  QA: "QAR", // Qatar
  KW: "KWD", // Kuwait
  BH: "BHD", // Bahrain
  OM: "OMR", // Oman
  JO: "JOD", // Jordan
  IQ: "IQD", // Iraq
  US: "USD", // USA
  GB: "USD",
  CA: "USD",
  DE: "USD",
  FR: "USD",
  IT: "USD",
  ES: "USD",
  TR: "USD",
};

// Map Country Name (from geo IP) to Currency Code
export const COUNTRY_NAME_TO_CURRENCY: Record<string, CurrencyCode> = {
  Egypt: "EGP",
  "Saudi Arabia": "SAR",
  "United Arab Emirates": "AED",
  Qatar: "QAR",
  Kuwait: "KWD",
  Bahrain: "BHD",
  Oman: "OMR",
  Jordan: "JOD",
  Iraq: "IQD",
  "United States": "USD",
};

// Fallback timezone to country mapping
export function detectCurrencyFromTimezone(): CurrencyCode {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (tz.includes("Cairo") || tz.includes("Egypt")) return "EGP";
    if (tz.includes("Riyadh") || tz.includes("Saudi")) return "SAR";
    if (tz.includes("Dubai")) return "AED";
    if (tz.includes("Qatar")) return "QAR";
    if (tz.includes("Kuwait")) return "KWD";
    if (tz.includes("Bahrain")) return "BHD";
    if (tz.includes("Muscat")) return "OMR";
    if (tz.includes("Amman")) return "JOD";
    if (tz.includes("Baghdad")) return "IQD";
    return "EGP"; // Default to EGP for Egyptian Central Bank & XPay Gateway compliance
  } catch {
    // Ignore error
  }
  return "EGP"; // Default to EGP
}

// Reconcile a saved currency against a fresh IP-geolocation result.
//
// A saved currency is an explicit choice ONLY within the country it was
// chosen in. When fresh detection reports a different country than the
// one the saved choice belongs to, the saved value is stale (picked while
// travelling, or saved by an older default) and the detected country's
// currency wins, so the location modal's heading, its currency chip, and
// the fetched prices can never disagree. Returns the currency to adopt,
// or null to keep the saved one.
export function resolveDetectedCurrency(args: {
  savedCurrency: string | null;
  storedCountryCode: string;
  detectedCountryCode: string;
  detectedCountryName: string;
}): CurrencyCode | null {
  const mappedCurrency =
    COUNTRY_CODE_TO_CURRENCY[args.detectedCountryCode] ||
    COUNTRY_NAME_TO_CURRENCY[args.detectedCountryName] ||
    detectCurrencyFromTimezone();
  if (!args.savedCurrency || !(args.savedCurrency in CURRENCY_CONFIGS)) {
    return mappedCurrency;
  }
  // No stored code (pre-fix visits stored only the country name) means the
  // saved choice predates country tracking: reconcile on this detection.
  if (args.detectedCountryCode && args.detectedCountryCode !== args.storedCountryCode) {
    return mappedCurrency;
  }
  return null;
}

interface CurrencyContextType {
  currencyCode: CurrencyCode;
  currency: CurrencyConfig;
  detectedCountry: string;
  isAutoDetected: boolean;
  setCurrencyCode: (code: CurrencyCode) => void;
  formatPrice: (amount: number, overrideCode?: CurrencyCode) => string;
  getSymbol: (lang: "ar" | "en") => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currencyCode, setCurrencyCodeState] = useState<CurrencyCode>(() => {
    const saved = safeLocalStorage.getItem("zsystems_currency_code");
    if (saved && saved in CURRENCY_CONFIGS) {
      return saved as CurrencyCode;
    }
    return detectCurrencyFromTimezone();
  });

  const [detectedCountry, setDetectedCountry] = useState<string>(() => {
    return safeLocalStorage.getItem("zsystems_detected_country") || "";
  });

  const [isAutoDetected, setIsAutoDetected] = useState<boolean>(() => {
    return !safeLocalStorage.getItem("zsystems_currency_code");
  });

  // Detect location on mount
  useEffect(() => {
    // A saved currency is respected only while the visitor stays in the
    // country it belongs to; a different detected country reconciles it
    // (see resolveDetectedCurrency). The stored country code is read once
    // here, before this detection overwrites it.
    const savedCurrency = safeLocalStorage.getItem("zsystems_currency_code");
    const storedCountryCode = safeLocalStorage.getItem("zsystems_detected_country_code") || "";

    const detectLocation = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      try {
        const response = await fetch("https://get.geojs.io/v1/ip/geo.json", {
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        const data = await response.json();
        
        if (data) {
          const countryCode = (data.country_code || "").toUpperCase();
          const countryName = data.country || "";
          
          if (countryName) {
            setDetectedCountry(countryName);
            safeLocalStorage.setItem("zsystems_detected_country", countryName);
          }

          if (countryCode) {
            safeLocalStorage.setItem("zsystems_detected_country_code", countryCode);
          }

          const reconciledCurrency = resolveDetectedCurrency({
            savedCurrency,
            storedCountryCode,
            detectedCountryCode: countryCode,
            detectedCountryName: countryName,
          });
          if (reconciledCurrency) {
            setCurrencyCodeState(reconciledCurrency);
            // Persist the reconciled currency: without this, the stale
            // saved value would win again on the next load, because the
            // stored country code now matches the detected one.
            safeLocalStorage.setItem("zsystems_currency_code", reconciledCurrency);
            setIsAutoDetected(true);
          }
        }
      } catch (err) {
        // If fetch fails, use timezone fallback
        if (!savedCurrency) {
          const tzCurrency = detectCurrencyFromTimezone();
          setCurrencyCodeState(tzCurrency);
        }
      }
    };

    detectLocation();
  }, []);

  const setCurrencyCode = (code: CurrencyCode) => {
    if (code in CURRENCY_CONFIGS) {
      setCurrencyCodeState(code);
      setIsAutoDetected(false);
      safeLocalStorage.setItem("zsystems_currency_code", code);
    }
  };

  const currentConfig = CURRENCY_CONFIGS[currencyCode] || CURRENCY_CONFIGS.EGP;

  const getSymbol = (lang: "ar" | "en") => {
    return lang === "ar" ? currentConfig.symbolAr : currentConfig.symbolEn;
  };

  const formatPrice = (amount: number, overrideCode?: CurrencyCode) => {
    const config = overrideCode ? CURRENCY_CONFIGS[overrideCode] : currentConfig;
    return `${amount.toLocaleString()} ${config.code}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currencyCode,
        currency: currentConfig,
        detectedCountry,
        isAutoDetected,
        setCurrencyCode,
        formatPrice,
        getSymbol,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
