import React, { createContext, useContext, useState, useEffect } from "react";

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
  plans: {
    starter: number;
    business: number;
    enterprise: number;
    lifetime: number;
  };
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
  testimonial: {
    amountAr: string;
    amountEn: string;
    quoteAr: string;
    quoteEn: string;
    lifetimeQuoteAr: string;
    lifetimeQuoteEn: string;
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
    plans: {
      starter: 450,
      business: 1900,
      enterprise: 4500,
      lifetime: 10000,
    },
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
    testimonial: {
      amountAr: "295,000 جنيه مصري",
      amountEn: "295,000 EGP",
      quoteAr: "وفرنا أكثر من 295,000 جنيه مصري شهرياً كانت تضيع في تسويات الجرد العشوائية والمخازن المشبوهة! رصدنا تلاعب الكاشير في الورديات بفضل الـ Audit Trail وحسنّا من الأداء العام بفريق العمل.",
      quoteEn: "We saved over 295,000 EGP monthly that was lost in random inventory adjustments! We tracked cashier manipulation using Audit Trail and improved overall team performance.",
      lifetimeQuoteAr: "باقة التمليك Offline Lifetime كانت معجزة لمحلاتنا. خصوصية تامة للبيانات وسرعة فائقة في الكاشير والمبيعات دون التخوف من انقطاع خطوط الإنترنت، ووفرنا مئات آلاف الجنيهات من مصاريف الاشتراكات المكلفة.",
      lifetimeQuoteEn: "The Offline Lifetime package was a miracle for our stores. Absolute data privacy, blazing fast POS & Sales without internet issues, and we saved hundreds of thousands of EGP in costly subscriptions.",
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
    plans: {
      starter: 149,
      business: 449,
      enterprise: 999,
      lifetime: 3725,
    },
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
    testimonial: {
      amountAr: "22,500 ريال",
      amountEn: "22,500 SAR",
      quoteAr: "وفرنا أكثر من 22,500 ريال شهرياً كانت تضيع في تسويات الجرد العشوائية والمخازن المشبوهة! رصدنا تلاعب الكاشير في الورديات بفضل الـ Audit Trail وحسنّا من الأداء العام بفريق العمل.",
      quoteEn: "We saved over 22,500 SAR monthly that was lost in random inventory adjustments! We tracked cashier manipulation using Audit Trail and improved overall team performance.",
      lifetimeQuoteAr: "باقة التمليك Offline Lifetime كانت معجزة لمحلاتنا. خصوصية تامة للبيانات وسرعة فائقة في الكاشير والمبيعات دون التخوف من انقطاع خطوط الإنترنت، ووفرنا آلاف ريالات الاشتراكات المكلفة المستمرة.",
      lifetimeQuoteEn: "The Offline Lifetime package was a miracle for our stores. Absolute data privacy, blazing fast POS & Sales without fear of internet cuts, and we saved thousands in costly monthly subscriptions.",
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
    plans: {
      starter: 159,
      business: 479,
      enterprise: 1059,
      lifetime: 3975,
    },
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
    testimonial: {
      amountAr: "22,000 درهم",
      amountEn: "22,000 AED",
      quoteAr: "وفرنا أكثر من 22,000 درهم إماراتي شهرياً كانت تضيع في فوارق الجرد غير المبررة! رصدنا تلاعب الكاشير بفضل الـ Audit Trail وحسنّا الربحية العامة.",
      quoteEn: "We saved over 22,000 AED monthly in unjustified inventory adjustments! We tracked cashier manipulation using Audit Trail and improved overall profitability.",
      lifetimeQuoteAr: "باقة التمليك Offline Lifetime كانت معجزة لفروعنا في الإمارات. خصوصية تامة للبيانات ووفرنا آلاف الدراهم من رسوم الاشتراكات السحابية المتكررة.",
      lifetimeQuoteEn: "The Offline Lifetime package was a miracle for our UAE branches. Absolute data privacy, and we saved thousands of AED in recurring SaaS costs.",
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
    plans: {
      starter: 159,
      business: 479,
      enterprise: 1059,
      lifetime: 3975,
    },
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
    testimonial: {
      amountAr: "22,500 ريال قطري",
      amountEn: "22,500 QAR",
      quoteAr: "وفرنا أكثر من 22,500 ريال قطري شهرياً كانت تضيع في أخطاء الجرد اليدوي وتسويات الورديات العشوائية. النظام وفر علينا مجهودات هائلة.",
      quoteEn: "We saved over 22,500 QAR monthly that was lost in manual inventory errors and random shift reconciliations.",
      lifetimeQuoteAr: "باقة التمليك كانت خيارنا الاستراتيجي في قطر، وفرت استقراراً تاماً وسرعة فائقة في نقاط البيع ووفرت علينا اشتراكات سنوية مكلفة.",
      lifetimeQuoteEn: "The Lifetime package was our strategic choice in Qatar, providing full stability and saving us costly recurring subscriptions.",
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
    plans: {
      starter: 13,
      business: 39,
      enterprise: 89,
      lifetime: 325,
    },
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
    testimonial: {
      amountAr: "1,850 دينار كويتي",
      amountEn: "1,850 KWD",
      quoteAr: "وفرنا أكثر من 1,850 دينار كويتي شهرياً كانت تضيع في تسويات الجرد العشوائية والمخازن. تتبع النقدية وكي نت أصبح دقيقاً 100%.",
      quoteEn: "We saved over 1,850 KWD monthly from inventory discrepancies and cash leaks. Cash and K-Net tracking is now 100% accurate.",
      lifetimeQuoteAr: "باقة التمليك Offline Lifetime كانت معجزة لمحلاتنا في الكويت. خصوصية تامة وسرعة فائقة ووفرنا آلاف الدنانير من الاشتراكات.",
      lifetimeQuoteEn: "The Offline Lifetime package was a miracle for our stores in Kuwait. Absolute privacy, blazing speed and thousands of KWD saved.",
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
    plans: {
      starter: 15,
      business: 45,
      enterprise: 99,
      lifetime: 375,
    },
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
    testimonial: {
      amountAr: "2,250 دينار بحريني",
      amountEn: "2,250 BHD",
      quoteAr: "وفرنا أكثر من 2,250 دينار بحريني شهرياً كانت تضيع في التسويات العشوائية والتسريبات النقدية غير المسجلة.",
      quoteEn: "We saved over 2,250 BHD monthly that was lost in inventory leaks and unrecorded cashier gaps.",
      lifetimeQuoteAr: "باقة التمليك وفرت لمتاجرنا في البحرين أماناً تشغيلياً كاملاً وميزانية ضخمة كنا ندفعها كاشتراكات شهرية.",
      lifetimeQuoteEn: "The Lifetime license gave our Bahrain stores complete operational security and saved substantial monthly SaaS fees.",
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
    plans: {
      starter: 15,
      business: 45,
      enterprise: 99,
      lifetime: 375,
    },
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
    testimonial: {
      amountAr: "2,300 ريال عماني",
      amountEn: "2,300 OMR",
      quoteAr: "وفرنا أكثر من 2,300 ريال عماني شهرياً كانت تضيع في الفروقات الجردية. نظام التدقيق الصارم حمانا من التسريب تماماً.",
      quoteEn: "We saved over 2,300 OMR monthly from inventory gaps. Strict audit trails prevented financial leakages entirely.",
      lifetimeQuoteAr: "النسخة المحلية التمليك كانت الحل الأمثل في سلطنة عُمان؛ خصوصية وسرعة فائقة بدون انقطاع وتوفير بالريال العماني.",
      lifetimeQuoteEn: "The local Lifetime copy was the perfect solution in Oman; absolute privacy, blazing speed and significant OMR savings.",
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
    plans: {
      starter: 28,
      business: 85,
      enterprise: 190,
      lifetime: 700,
    },
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
    testimonial: {
      amountAr: "4,250 دينار أردني",
      amountEn: "4,250 JOD",
      quoteAr: "وفرنا أكثر من 4,250 دينار أردني شهرياً كانت تضيع في تسويات الجرد العشوائية والمخازن. النظام ضبط لنا كل قرش.",
      quoteEn: "We saved over 4,250 JOD monthly from inventory discrepancies. The system tracked every penny strictly.",
      lifetimeQuoteAr: "باقة التمليك وفرت لنا آلاف الدنانير الأردنية التي كانت تبتلعها الاشتراكات الشهرية التقليدية.",
      lifetimeQuoteEn: "The Lifetime plan saved us thousands of JOD traditionally consumed by recurring SaaS fees.",
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
    plans: {
      starter: 52000,
      business: 156000,
      enterprise: 350000,
      lifetime: 1300000,
    },
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
    testimonial: {
      amountAr: "7,850,000 دينار عراقي",
      amountEn: "7,850,000 IQD",
      quoteAr: "وفرنا أكثر من 7,850,000 دينار عراقي شهرياً كانت تضيع في التسويات العشوائية والمخازن. النظام أعطانا رقابة مطلقة.",
      quoteEn: "We saved over 7,850,000 IQD monthly from inventory leaks. The system gave us absolute audit control.",
      lifetimeQuoteAr: "باقة التمليك Offline حلت مشكلة انقطاع الإنترنت تماماً في متاجرنا بالعراق وسرعة خيالية بالكاشير.",
      lifetimeQuoteEn: "The Offline Lifetime package solved all internet cut concerns in our Iraq stores with blazing POS speed.",
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
    plans: {
      starter: 39,
      business: 119,
      enterprise: 269,
      lifetime: 975,
    },
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
    testimonial: {
      amountAr: "6,000 $",
      amountEn: "6,000 USD",
      quoteAr: "وفرنا أكثر من 6,000 دولار شهرياً كانت تضيع في تسويات الجرد العشوائية والمخازن المشبوهة بفضل الـ Audit Trail.",
      quoteEn: "We saved over $6,000 monthly that was lost in random inventory adjustments! We tracked cashier manipulation using Audit Trail.",
      lifetimeQuoteAr: "باقة التمليك Offline Lifetime كانت معجزة لمحلاتنا. خصوصية تامة للبيانات وسرعة فائقة ووفرنا آلاف الدولارات سنوياً.",
      lifetimeQuoteEn: "The Offline Lifetime package was a miracle for our stores. Absolute data privacy, blazing fast POS, and thousands saved annually.",
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
  } catch {
    // Ignore error
  }
  return "SAR"; // Default to SAR in Arab region
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
    const saved = localStorage.getItem("zsystems_currency_code");
    if (saved && saved in CURRENCY_CONFIGS) {
      return saved as CurrencyCode;
    }
    return detectCurrencyFromTimezone();
  });

  const [detectedCountry, setDetectedCountry] = useState<string>(() => {
    return localStorage.getItem("zsystems_detected_country") || "";
  });

  const [isAutoDetected, setIsAutoDetected] = useState<boolean>(() => {
    return !localStorage.getItem("zsystems_currency_code");
  });

  // Detect location on mount
  useEffect(() => {
    // If user already explicitly set their currency, respect that preference
    const savedCurrency = localStorage.getItem("zsystems_currency_code");

    const detectLocation = async () => {
      try {
        const response = await fetch("https://get.geojs.io/v1/ip/geo.json");
        const data = await response.json();
        
        if (data) {
          const countryCode = (data.country_code || "").toUpperCase();
          const countryName = data.country || "";
          
          if (countryName) {
            setDetectedCountry(countryName);
            localStorage.setItem("zsystems_detected_country", countryName);
          }

          if (!savedCurrency) {
            const mappedCurrency =
              COUNTRY_CODE_TO_CURRENCY[countryCode] ||
              COUNTRY_NAME_TO_CURRENCY[countryName] ||
              detectCurrencyFromTimezone();
            
            setCurrencyCodeState(mappedCurrency);
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
      localStorage.setItem("zsystems_currency_code", code);
    }
  };

  const currentConfig = CURRENCY_CONFIGS[currencyCode] || CURRENCY_CONFIGS.SAR;

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
