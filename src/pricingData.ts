export type SectorId = "retail" | "showrooms" | "restaurants" | "companies" | "contracting";

export type BillingMode = "monthly" | "annual" | "offline";

export interface PricingTierData {
  id: number;
  level: number;
  nameAr: string;
  nameEn: string;
  scopeAr: string;
  scopeEn: string;
  descriptionAr: string;
  descriptionEn: string;
  popular?: boolean;
  featuresAr: string[];
  featuresEn: string[];
  prices: {
    // [currencyCode]: { monthly: number; annual: number; offline: number }
    [currencyCode: string]: {
      monthly?: number;
      annual: number;
      offline: number;
    };
  };
  installationFeesEGP: number;
}

export interface SectorData {
  id: SectorId;
  nameAr: string;
  nameEn: string;
  subtitleAr: string;
  subtitleEn: string;
  iconName: string;
  annualOnly?: boolean;
  tiers: PricingTierData[];
  monthlyAddonsEGP: {
    extraUser: number;
    extraBranch: number;
  };
  offlineAddonsEGP: {
    extraUser: number;
    extraTerminal?: number;
    extraBranchPercent: number;
  };
}

export interface AddonModule {
  id: string;
  nameAr: string;
  nameEn: string;
  priceEGP: number | string;
  priceNoteAr: string;
  priceNoteEn: string;
  includedInLevel3: boolean;
  descriptionAr: string;
  descriptionEn: string;
}

// ----------------------------------------------------
// Official Pricing Matrix (September 25, 2026 Release)
// ----------------------------------------------------

export const SECTORS_DATA: SectorData[] = [
  // 1. التجزئة العامة
  {
    id: "retail",
    nameAr: "التجزئة العامة",
    nameEn: "General Retail",
    subtitleAr: "سوبرماركت · بقالة · عطارة · ملابس · عطور · تموينات",
    subtitleEn: "Supermarkets · Groceries · Spices · Clothing · Perfumes",
    iconName: "ShoppingBag",
    tiers: [
      {
        id: 1,
        level: 1,
        nameAr: "محل",
        nameEn: "Single Shop",
        scopeAr: "فرع واحد · 2 طرفية كاشير · 3 مستخدمين",
        scopeEn: "1 Branch · 2 POS Terminals · 3 Users",
        descriptionAr: "الحل السحابي الأمثل للمحلات والمتاجر الفردية للتحكم الفوري في الكاشير والمخزون.",
        descriptionEn: "Ideal cloud solution for single retail shops for instant cashier and stock control.",
        popular: false,
        featuresAr: [
          "نقطة بيع سريعة (POS) فائقة الأداء",
          "إدارة المخزون والباركود وحد الطلب",
          "الفواتير الضريبية والإلكترونية المعتمدة",
          "تقارير المبيعات وحركة النقدية اليومية",
          "تنبيهات نواقص الأصناف وصلاحيات الكاشير"
        ],
        featuresEn: [
          "Ultra-fast POS terminal",
          "Inventory, barcodes & reorder limits",
          "Certified electronic & tax invoicing",
          "Daily sales & cash movement reports",
          "Stock shortage alerts & cashier permissions"
        ],
        installationFeesEGP: 1500,
        prices: {
          EGP: { monthly: 450, annual: 4500, offline: 10000 },
          SAR: { monthly: 149, annual: 1490, offline: 3725 },
          AED: { monthly: 159, annual: 1590, offline: 3975 },
          QAR: { monthly: 159, annual: 1590, offline: 3975 },
          KWD: { monthly: 13, annual: 130, offline: 325 },
          BHD: { monthly: 15, annual: 150, offline: 375 },
          OMR: { monthly: 15, annual: 150, offline: 375 },
          USD: { monthly: 39, annual: 390, offline: 975 },
          JOD: { monthly: 28, annual: 280, offline: 700 },
          IQD: { monthly: 52000, annual: 520000, offline: 1300000 }
        }
      },
      {
        id: 2,
        level: 2,
        nameAr: "متعدد الفروع",
        nameEn: "Multi-Branch",
        scopeAr: "2 فروع · 4 طرفيات كاشير · 10 مستخدمين",
        scopeEn: "2 Branches · 4 POS Terminals · 10 Users",
        descriptionAr: "الباقة الأكثر مبيعاً للأنشطة المتوسعة مع ربط الفروع والتحويلات المخزنية ومطابقة الصناديق.",
        descriptionEn: "Best seller for expanding stores with inter-branch transfers and consolidated reconciliation.",
        popular: true,
        featuresAr: [
          "جميع ميزات باقة المحل",
          "إدارة فرعين و4 نقاط كاشير متزامنة",
          "التحويل الآلي بين المخازن والفروع",
          "حسابات الموردين والعملاء والآجل والديون",
          "تقارير مقارنة أرباح ومبيعات الفروع",
          "رادار تدقيق الكاشير ومنع التلاعب"
        ],
        featuresEn: [
          "All Single Shop features",
          "2 branches & 4 synchronized POS terminals",
          "Automated inter-branch transfers",
          "Suppliers, customer debts & credit accounts",
          "Branch profitability & comparative reports",
          "Cashier audit radar & leak prevention"
        ],
        installationFeesEGP: 4000,
        prices: {
          EGP: { monthly: 1900, annual: 19000, offline: 30000 },
          SAR: { monthly: 449, annual: 4490, offline: 11225 },
          AED: { monthly: 479, annual: 4790, offline: 11975 },
          QAR: { monthly: 479, annual: 4790, offline: 11975 },
          KWD: { monthly: 39, annual: 390, offline: 975 },
          BHD: { monthly: 45, annual: 450, offline: 1125 },
          OMR: { monthly: 45, annual: 450, offline: 1125 },
          USD: { monthly: 119, annual: 1190, offline: 2975 },
          JOD: { monthly: 85, annual: 850, offline: 2125 },
          IQD: { monthly: 156000, annual: 1560000, offline: 3900000 }
        }
      },
      {
        id: 3,
        level: 3,
        nameAr: "سلسلة ومؤسسة",
        nameEn: "Chain & Enterprise",
        scopeAr: "5 فروع · 25 مستخدم · كافة الطوابق الذكية",
        scopeEn: "5 Branches · 25 Users · All Smart Modules Included",
        descriptionAr: "التحكم المؤسسي الشامل لكبرى سلاسل التجزئة مع كافة طوابق الذكاء والربط مجاناً.",
        descriptionEn: "Complete enterprise control for retail chains with all smart add-ons included for free.",
        popular: false,
        featuresAr: [
          "جميع ميزات متعدد الفروع",
          "5 فروع متصلة مركزياً و25 مستخدماً",
          "مضمّن مجاناً: الفاتورة الضريبية والإلكترونية",
          "مضمّن مجاناً: رادار الكاشير وحماية الهامش",
          "مضمّن مجاناً: بوت واتساب الذكي بالذكاء الاصطناعي",
          "مضمّن مجاناً: ربط المتاجر الإلكترونية وشركات الشحن",
          "شجرة حسابات مالية متقدمة ومراكز تكلفة"
        ],
        featuresEn: [
          "All Multi-Branch features",
          "5 centrally managed branches & 25 users",
          "Free Included: Full E-Invoicing integration",
          "Free Included: Cashier radar & margin protector",
          "Free Included: AI WhatsApp Business Bot",
          "Free Included: E-commerce & shipping carrier integrations",
          "Advanced chart of accounts & cost centers"
        ],
        installationFeesEGP: 10000,
        prices: {
          EGP: { monthly: 4500, annual: 45000, offline: 68000 },
          SAR: { monthly: 999, annual: 9990, offline: 24975 },
          AED: { monthly: 1059, annual: 10590, offline: 26475 },
          QAR: { monthly: 1059, annual: 10590, offline: 26475 },
          KWD: { monthly: 89, annual: 890, offline: 2225 },
          BHD: { monthly: 99, annual: 990, offline: 2475 },
          OMR: { monthly: 99, annual: 990, offline: 2475 },
          USD: { monthly: 269, annual: 2690, offline: 6725 },
          JOD: { monthly: 190, annual: 1900, offline: 4750 },
          IQD: { monthly: 350000, annual: 3500000, offline: 8750000 }
        }
      }
    ],
    monthlyAddonsEGP: { extraUser: 120, extraBranch: 450 },
    offlineAddonsEGP: { extraUser: 1200, extraTerminal: 2500, extraBranchPercent: 40 }
  },

  // 2. المعارض عالية القيمة
  {
    id: "showrooms",
    nameAr: "المعارض عالية القيمة",
    nameEn: "High-Value Showrooms",
    subtitleAr: "صيدليات · موبايلات وإلكترونيات · أجهزة وأثاث بالتقسيط",
    subtitleEn: "Pharmacies · Mobiles & Electronics · Appliances & Installment Furniture",
    iconName: "Store",
    tiers: [
      {
        id: 1,
        level: 1,
        nameAr: "محل / معرض",
        nameEn: "Store / Showroom",
        scopeAr: "فرع واحد · 2 طرفية · 3 مستخدمين",
        scopeEn: "1 Branch · 2 Terminals · 3 Users",
        descriptionAr: "إدارة دقيقة للسيريال نمبر والأقساط وتواريخ الصلاحية وضمانات الأجهزة.",
        descriptionEn: "Precise tracking of serial numbers (IMEI), installments, expiries & warranties.",
        popular: false,
        featuresAr: [
          "تتبع دقيق للسيريال نمبر (IMEI) وتاريخ الصلاحية",
          "إدارة الضمانات وخدمات ما بعد البيع",
          "الفاتورة الإلكترونية المعتمدة وباركود QR",
          "إدارة مديونيات العملاء والتحصيل النقدي",
          "تقارير المخزون عالي القيمة وتنبيهات الرواكد"
        ],
        featuresEn: [
          "Serial / IMEI & batch expiry tracking",
          "Warranties & after-sales service management",
          "Certified e-invoicing & encrypted QR",
          "Customer credit & collections tracking",
          "High-value inventory & slow-moving alerts"
        ],
        installationFeesEGP: 2500,
        prices: {
          EGP: { monthly: 650, annual: 6500, offline: 15000 },
          SAR: { monthly: 199, annual: 1990, offline: 4975 },
          AED: { monthly: 209, annual: 2090, offline: 5225 },
          QAR: { monthly: 209, annual: 2090, offline: 5225 },
          KWD: { monthly: 17, annual: 170, offline: 425 },
          BHD: { monthly: 19, annual: 190, offline: 475 },
          OMR: { monthly: 19, annual: 190, offline: 475 },
          USD: { monthly: 55, annual: 550, offline: 1375 },
          JOD: { monthly: 39, annual: 390, offline: 975 },
          IQD: { monthly: 72000, annual: 720000, offline: 1800000 }
        }
      },
      {
        id: 2,
        level: 2,
        nameAr: "متعدد الفروع",
        nameEn: "Multi-Branch",
        scopeAr: "3 فروع · 6 طرفيات · 12 مستخدم",
        scopeEn: "3 Branches · 6 Terminals · 12 Users",
        descriptionAr: "الخيار الأقوى لمعارض الأجهزة والصيدليات وسلاسل الإلكترونيات لإدارة الفروع والأقساط.",
        descriptionEn: "Engineered for electronics & pharmacy branches with installment and warranty management.",
        popular: true,
        featuresAr: [
          "جميع ميزات باقة المعرض",
          "3 فروع و6 نقاط بيع متزامنة و12 مستخدماً",
          "نظام بيع الأقساط وجداول السداد والفوائد",
          "التحويل اللحظي للمخزون عالي القيمة بين الفروع",
          "نظام العمولات والحوافز لمسؤولي المبيعات",
          "تنبيهات استحقاق الأقساط والمتابعة"
        ],
        featuresEn: [
          "All Showroom features",
          "3 branches, 6 synced terminals & 12 users",
          "Installment sales, schedules & markup tracking",
          "Real-time inter-branch high-value transfers",
          "Sales rep commissions & incentive system",
          "Payment due date notifications & follow-up"
        ],
        installationFeesEGP: 6000,
        prices: {
          EGP: { monthly: 2200, annual: 22000, offline: 38000 },
          SAR: { monthly: 549, annual: 5490, offline: 13725 },
          AED: { monthly: 579, annual: 5790, offline: 14475 },
          QAR: { monthly: 579, annual: 5790, offline: 14475 },
          KWD: { monthly: 49, annual: 490, offline: 1225 },
          BHD: { monthly: 55, annual: 550, offline: 1375 },
          OMR: { monthly: 55, annual: 550, offline: 1375 },
          USD: { monthly: 149, annual: 1490, offline: 3725 },
          JOD: { monthly: 105, annual: 1050, offline: 2625 },
          IQD: { monthly: 195000, annual: 1950000, offline: 4875000 }
        }
      },
      {
        id: 3,
        level: 3,
        nameAr: "سلسلة ومؤسسة",
        nameEn: "Chain & Enterprise",
        scopeAr: "8 فروع · 25 مستخدم · كافة الطوابق الذكية",
        scopeEn: "8 Branches · 25 Users · All Smart Modules Included",
        descriptionAr: "إدارة سلاسل كبرى مع كافة طوابق الذكاء والمساعد الآلي والربط بالتقسيط وبوابات الدفع.",
        descriptionEn: "Enterprise scale for large retail chains with all smart modules and payment gateways.",
        popular: false,
        featuresAr: [
          "جميع ميزات متعدد الفروع",
          "8 فروع متصلة مركزياً و25 مستخدماً",
          "مضمّن مجاناً: ربط بوابات الدفع والمتجر الإلكتروني",
          "مضمّن مجاناً: بوت واتساب الذكي لمتابعة الأقساط",
          "مضمّن مجاناً: رادار الكاشير وحماية هوامش الربح",
          "مضمّن مجاناً: الربط مع شركات الشحن والتوصيل",
          "تصدير وتحليل مالي متقدم متعدد الشركات"
        ],
        featuresEn: [
          "All Multi-Branch features",
          "8 centrally linked branches & 25 users",
          "Free Included: Online payment & store integration",
          "Free Included: Smart AI WhatsApp for installment reminders",
          "Free Included: Cashier radar & profit margin protector",
          "Free Included: Shipping & courier integration",
          "Multi-company consolidated financial reporting"
        ],
        installationFeesEGP: 15000,
        prices: {
          EGP: { monthly: 5000, annual: 50000, offline: 80000 },
          SAR: { monthly: 1199, annual: 11990, offline: 29975 },
          AED: { monthly: 1269, annual: 12690, offline: 31725 },
          QAR: { monthly: 1269, annual: 12690, offline: 31725 },
          KWD: { monthly: 105, annual: 1050, offline: 2625 },
          BHD: { monthly: 119, annual: 1190, offline: 2975 },
          OMR: { monthly: 119, annual: 1190, offline: 2975 },
          USD: { monthly: 319, annual: 3190, offline: 7975 },
          JOD: { monthly: 225, annual: 2250, offline: 5625 },
          IQD: { monthly: 420000, annual: 4200000, offline: 10500000 }
        }
      }
    ],
    monthlyAddonsEGP: { extraUser: 150, extraBranch: 600 },
    offlineAddonsEGP: { extraUser: 1600, extraTerminal: 2500, extraBranchPercent: 40 }
  },

  // 3. المطاعم والكافيهات
  {
    id: "restaurants",
    nameAr: "المطاعم والكافيهات",
    nameEn: "Restaurants & Cafes",
    subtitleAr: "مطاعم وجبات سريعة · كافيهات · مطاعم فاخرة · سحابية (Cloud Kitchens)",
    subtitleEn: "Fast Food · Coffee Shops · Fine Dining · Cloud Kitchens",
    iconName: "Utensils",
    tiers: [
      {
        id: 1,
        level: 1,
        nameAr: "فرع واحد",
        nameEn: "Single Branch",
        scopeAr: "فرع واحد · شاشات مطبخ وطاولات وطلب بالـQR",
        scopeEn: "1 Branch · KDS, Table Management & QR Ordering",
        descriptionAr: "حل ضيافة متكامل مع شاشات المطبخ، خريطة الطاولات، الدليفري، والتيك أواي.",
        descriptionEn: "Complete F&B solution with Kitchen Display (KDS), table floorplans & takeaway.",
        popular: false,
        featuresAr: [
          "نظام كاشير مخصص للمطاعم سريع وبسيط",
          "شاشات المطبخ الذكية (KDS) وتوجيه الطلبات",
          "إدارة الطاولات، التيك أواي، وطلبات الدليفري",
          "قائمة الطعام الرقمية والطلب عبر كود QR",
          "إدارة تصنيع الوجبات ومكونات الوصفات (Recipe/BOM)"
        ],
        featuresEn: [
          "Specialized fast restaurant POS",
          "Smart Kitchen Display System (KDS)",
          "Dine-in tables, takeaway & delivery management",
          "Digital menu & QR code ordering",
          "Recipe management & ingredient inventory (BOM)"
        ],
        installationFeesEGP: 4000,
        prices: {
          EGP: { monthly: 1400, annual: 14000, offline: 28000 },
          SAR: { monthly: 349, annual: 3490, offline: 8725 },
          AED: { monthly: 369, annual: 3690, offline: 9225 },
          QAR: { monthly: 369, annual: 3690, offline: 9225 },
          KWD: { monthly: 29, annual: 290, offline: 725 },
          BHD: { monthly: 35, annual: 350, offline: 875 },
          OMR: { monthly: 35, annual: 350, offline: 875 },
          USD: { monthly: 95, annual: 950, offline: 2375 },
          JOD: { monthly: 67, annual: 670, offline: 1675 },
          IQD: { monthly: 125000, annual: 1250000, offline: 3125000 }
        }
      },
      {
        id: 2,
        level: 2,
        nameAr: "ثلاثة فروع",
        nameEn: "3 Branches",
        scopeAr: "3 فروع مطاعم متصلة بالكامل",
        scopeEn: "3 Centrally Connected Restaurant Branches",
        descriptionAr: "إدارة مركزية لثلاثة فروع مع المطبخ المركزي وحساب تكلفة الأغذية والهدر بدقة.",
        descriptionEn: "Central management for 3 branches with central prep kitchen & accurate food cost control.",
        popular: true,
        featuresAr: [
          "جميع ميزات باقة الفرع الواحد",
          "3 فروع مطاعم ومقاهي مربوطة مركزياً",
          "إدارة المطبخ المركزي وتحويلات المواد الخام",
          "حساب تكلفة الطعام (Food Cost) ونسب الهدر",
          "متابعة سائقي الدليفري وأوقات التوصيل",
          "تقارير تفصيلية لأكثر الأطباق ربحية وإقبالاً"
        ],
        featuresEn: [
          "All Single Branch features",
          "3 centrally connected branches",
          "Central prep kitchen & raw ingredient transfers",
          "Precise Food Cost tracking & waste management",
          "Delivery driver dispatch & delivery time tracking",
          "Best seller & menu engineering profitability reports"
        ],
        installationFeesEGP: 9000,
        prices: {
          EGP: { monthly: 3400, annual: 34000, offline: 58000 },
          SAR: { monthly: 749, annual: 7490, offline: 18725 },
          AED: { monthly: 789, annual: 7890, offline: 19725 },
          QAR: { monthly: 789, annual: 7890, offline: 19725 },
          KWD: { monthly: 65, annual: 650, offline: 1625 },
          BHD: { monthly: 75, annual: 750, offline: 1875 },
          OMR: { monthly: 75, annual: 750, offline: 1875 },
          USD: { monthly: 199, annual: 1990, offline: 4975 },
          JOD: { monthly: 140, annual: 1400, offline: 3500 },
          IQD: { monthly: 265000, annual: 2650000, offline: 6625000 }
        }
      },
      {
        id: 3,
        level: 3,
        nameAr: "سلسلة مطاعم",
        nameEn: "Restaurant Chain",
        scopeAr: "8 فروع · إدارة مركزية · كافة الطوابق الذكية",
        scopeEn: "8 Branches · Central F&B Hub · All Smart Modules",
        descriptionAr: "المنظومة المؤسسية الكبرى لإدارة سلاسل المطاعم والمطابخ السحابية والفروع الكبرى.",
        descriptionEn: "Enterprise ERP for F&B chains, central commissary kitchens and franchises.",
        popular: false,
        featuresAr: [
          "جميع ميزات باقة 3 فروع",
          "8 فروع ومطابخ سحابية مربوطة بالكامل",
          "مضمّن مجاناً: بوت واتساب للطلب والتوصيل الذكي",
          "مضمّن مجاناً: رادار كشف تلاعب الكاشير وإلغاء الشيكات",
          "مضمّن مجاناً: ربط تطبيقات التوصيل وتتبع المناديب",
          "مضمّن مجاناً: الموارد البشرية، الشفتات، وحضور البصمة",
          "إدارة الفرنشايز وتقارير الأداء المجمعة"
        ],
        featuresEn: [
          "All 3 Branches features",
          "8 linked branches & cloud kitchens",
          "Free Included: AI WhatsApp ordering & delivery bot",
          "Free Included: Cashier audit & bill cancellation radar",
          "Free Included: Aggregator integrations & fleet tracking",
          "Free Included: Full HR, shift scheduling & biometric punch",
          "Franchise royalties & consolidated analytics"
        ],
        installationFeesEGP: 20000,
        prices: {
          EGP: { monthly: 6900, annual: 69000, offline: 115000 },
          SAR: { monthly: 1499, annual: 14990, offline: 37475 },
          AED: { monthly: 1589, annual: 15890, offline: 39725 },
          QAR: { monthly: 1589, annual: 15890, offline: 39725 },
          KWD: { monthly: 129, annual: 1290, offline: 3225 },
          BHD: { monthly: 149, annual: 1490, offline: 3725 },
          OMR: { monthly: 149, annual: 1490, offline: 3725 },
          USD: { monthly: 399, annual: 3990, offline: 9975 },
          JOD: { monthly: 280, annual: 2800, offline: 7000 },
          IQD: { monthly: 520000, annual: 5200000, offline: 13000000 }
        }
      }
    ],
    monthlyAddonsEGP: { extraUser: 180, extraBranch: 900 },
    offlineAddonsEGP: { extraUser: 2200, extraTerminal: 3000, extraBranchPercent: 40 }
  },

  // 4. الشركات
  {
    id: "companies",
    nameAr: "الشركات والمصانع",
    nameEn: "Commercial & Manufacturing",
    subtitleAr: "جملة وتوزيع · مصانع وورش · استيراد وتصدير · خدمية · متاجر إلكترونية",
    subtitleEn: "Wholesale & Distribution · Factories · Import/Export · Services · E-Commerce",
    iconName: "Building2",
    tiers: [
      {
        id: 1,
        level: 1,
        nameAr: "أساسي",
        nameEn: "Basic Corporate",
        scopeAr: "5 مستخدمين · مخزن واحد",
        scopeEn: "5 Users · 1 Warehouse",
        descriptionAr: "تخطيط الموارد والمالية للشركات الناشئة والمكاتب التجارية مع القيود اليومية والمخزون.",
        descriptionEn: "Core ERP & financial accounts for small businesses, automated ledger and inventory.",
        popular: false,
        featuresAr: [
          "دليل الحسابات وشجرة القيود اليومية المؤتمتة",
          "إدارة المشتريات والموردين ودورات الاعتماد",
          "إدارة المخزن ومتابعة حركات الوارد والمنصرف",
          "الفواتير الإلكترونية والضريبية والاعتمادات",
          "متابعة عروض الأسعار وأوامر البيع"
        ],
        featuresEn: [
          "Chart of accounts & automated journal entries",
          "Purchases, vendors & approval cycles",
          "Warehouse in/out movements & valuation",
          "Tax & electronic invoicing compliance",
          "Quotations & sales orders tracking"
        ],
        installationFeesEGP: 6000,
        prices: {
          EGP: { monthly: 1500, annual: 15000, offline: 26000 },
          SAR: { monthly: 399, annual: 3990, offline: 9975 },
          AED: { monthly: 419, annual: 4190, offline: 10475 },
          QAR: { monthly: 419, annual: 4190, offline: 10475 },
          KWD: { monthly: 35, annual: 350, offline: 875 },
          BHD: { monthly: 39, annual: 390, offline: 975 },
          OMR: { monthly: 39, annual: 390, offline: 975 },
          USD: { monthly: 109, annual: 1090, offline: 2725 },
          JOD: { monthly: 77, annual: 770, offline: 1925 },
          IQD: { monthly: 145000, annual: 1450000, offline: 3625000 }
        }
      },
      {
        id: 2,
        level: 2,
        nameAr: "شركة",
        nameEn: "Growing Company",
        scopeAr: "12 مستخدم · 3 فروع أو مخازن",
        scopeEn: "12 Users · 3 Branches or Warehouses",
        descriptionAr: "الحل الأنسب لشركات التوزيع والمصانع ومكاتب الاستيراد مع خطوط الإنتاج والتحويلات.",
        descriptionEn: "Engineered for distributors & factories with assembly line BOM and multi-location logistics.",
        popular: true,
        featuresAr: [
          "جميع ميزات الباقة الأساسية",
          "12 مستخدماً و3 فروع أو مستودعات مستقلة",
          "أوامر التصنيع وتكاليف خطوط الإنتاج والعمالة",
          "مراكز التكلفة التفصيلية للمشاريع والأقسام",
          "إدارة مسؤولي التوزيع ومناديب المبيعات والعمولات",
          "تحليل السيولة النقدية والتدفقات المالية"
        ],
        featuresEn: [
          "All Basic Corporate features",
          "12 users & 3 branches or separate warehouses",
          "Manufacturing orders, labor & production line costs",
          "Granular cost centers for projects & divisions",
          "Fleet distribution, field sales agents & commissions",
          "Cash flow forecast & working capital liquidity analysis"
        ],
        installationFeesEGP: 14000,
        prices: {
          EGP: { monthly: 3600, annual: 36000, offline: 62000 },
          SAR: { monthly: 899, annual: 8990, offline: 22475 },
          AED: { monthly: 949, annual: 9490, offline: 23725 },
          QAR: { monthly: 949, annual: 9490, offline: 23725 },
          KWD: { monthly: 79, annual: 790, offline: 1975 },
          BHD: { monthly: 89, annual: 890, offline: 2225 },
          OMR: { monthly: 89, annual: 890, offline: 2225 },
          USD: { monthly: 240, annual: 2400, offline: 6000 },
          JOD: { monthly: 169, annual: 1690, offline: 4225 },
          IQD: { monthly: 315000, annual: 3150000, offline: 7875000 }
        }
      },
      {
        id: 3,
        level: 3,
        nameAr: "مؤسسة كبرى",
        nameEn: "Enterprise Hub",
        scopeAr: "30 مستخدم · 10 فروع · كافة الطوابق الذكية",
        scopeEn: "30 Users · 10 Branches · All Smart Modules",
        descriptionAr: "المنظومة المتكاملة للمؤسسات الصناعية والتجارية الكبرى مع المساعد الذكي وربط المقرات.",
        descriptionEn: "Full enterprise resource planning with automated intelligence, HR & omni-channel.",
        popular: false,
        featuresAr: [
          "جميع ميزات باقة الشركات",
          "10 فروع ومستودعات و30 مستخدماً مع الصلاحيات",
          "مضمّن مجاناً: نظام الموارد البشرية والرواتب وبوابة الموظف",
          "مضمّن مجاناً: المساعد الذكي ZAD AI وتحليل البيانات",
          "مضمّن مجاناً: ربط المتجر الإلكتروني وأمازون ونون",
          "مضمّن مجاناً: ربط شركات الشحن وبوت واتساب الآلي",
          "ميزانية عمومية مجمعة وقوائم مالية متوافقة مع IFRS"
        ],
        featuresEn: [
          "All Growing Company features",
          "10 branches & warehouses, 30 role-based users",
          "Free Included: Complete HR, payroll & employee self-service",
          "Free Included: ZAD AI analytics & automated insights",
          "Free Included: E-Commerce, Amazon & Noon integrations",
          "Free Included: Courier shipping & AI WhatsApp bot",
          "Consolidated balance sheets & IFRS compliant reports"
        ],
        installationFeesEGP: 28000,
        prices: {
          EGP: { monthly: 7500, annual: 75000, offline: 125000 },
          SAR: { monthly: 1799, annual: 17990, offline: 44975 },
          AED: { monthly: 1899, annual: 18990, offline: 47475 },
          QAR: { monthly: 1899, annual: 18990, offline: 47475 },
          KWD: { monthly: 159, annual: 1590, offline: 3975 },
          BHD: { monthly: 179, annual: 1790, offline: 4475 },
          OMR: { monthly: 179, annual: 1790, offline: 4475 },
          USD: { monthly: 479, annual: 4790, offline: 11975 },
          JOD: { monthly: 335, annual: 3350, offline: 8375 },
          IQD: { monthly: 625000, annual: 6250000, offline: 15625000 }
        }
      }
    ],
    monthlyAddonsEGP: { extraUser: 200, extraBranch: 900 },
    offlineAddonsEGP: { extraUser: 2800, extraTerminal: 3000, extraBranchPercent: 40 }
  },

  // 5. المقاولات والشحن (تُعرض بالسعر السنوي فقط)
  {
    id: "contracting",
    nameAr: "المقاولات والشحن",
    nameEn: "Contracting & Freight",
    subtitleAr: "شركات المقاولات والتشييد · مكاتب التخليص الجمركي · خطوط الشحن واللوجستيات",
    subtitleEn: "Contracting & Construction · Customs Clearance · Freight Forwarding & Logistics",
    iconName: "Truck",
    annualOnly: true,
    tiers: [
      {
        id: 1,
        level: 1,
        nameAr: "مكتب",
        nameEn: "Office",
        scopeAr: "3 مشاريع نشطة أو 60 حاوية شهرياً · 5 مستخدمين",
        scopeEn: "3 Active Projects or 60 Containers/mo · 5 Users",
        descriptionAr: "إدارة التكاليف والمستخلصات وحركات الحاويات والشحنات بدقة وربطها بالمحاسبة.",
        descriptionEn: "Job costing, project billing milestones, and container logistics linked to accounting.",
        popular: false,
        featuresAr: [
          "إدارة مستخلصات المقاولات وحسابات مقاولي الباطن",
          "متابعة حركة الشحنات والحاويات وأذونات الإفراج",
          "مراكز تكلفة لكل مشروع أو شحنة مستقلة",
          "الفواتير الضريبية والإلكترونية المعتمدة",
          "تقارير ربحية المشروع ونسب الإنجاز الفعلي"
        ],
        featuresEn: [
          "Contracting billing milestones & subcontractor balances",
          "Shipment tracking, bill of lading & customs release",
          "Dedicated cost centers per project or shipment",
          "Full tax & e-invoicing compliance",
          "Project profitability & completion percentage reports"
        ],
        installationFeesEGP: 30000,
        prices: {
          EGP: { annual: 45000, offline: 120000 },
          SAR: { annual: 12000, offline: 30000 },
          AED: { annual: 12900, offline: 32250 },
          QAR: { annual: 12900, offline: 32250 },
          KWD: { annual: 1050, offline: 2625 },
          BHD: { annual: 1190, offline: 2975 },
          OMR: { annual: 1190, offline: 2975 },
          USD: { annual: 3200, offline: 8000 },
          JOD: { annual: 2250, offline: 5625 },
          IQD: { annual: 4200000, offline: 10500000 }
        }
      },
      {
        id: 2,
        level: 2,
        nameAr: "شركة",
        nameEn: "Enterprise Contractor",
        scopeAr: "مشاريع وحاويات بلا حد · 12 مستخدم",
        scopeEn: "Unlimited Projects & Containers · 12 Users",
        descriptionAr: "المنظومة الاحترافية لشركات الإنشاءات الكبرى والشحن الدولي لتنظيم المستخلصات والمعدات.",
        descriptionEn: "Unrestricted volume for contracting firms & freight forwarders with equipment cost control.",
        popular: true,
        featuresAr: [
          "جميع ميزات باقة المكتب",
          "مشاريع إنشائية وحاويات شحن غير محدودة",
          "12 مستخدماً مع هيكل صلاحيات متقدم",
          "إدارة أسطول المعدات والسيارات وتكاليف الصيانة والوقود",
          "إدارة عمالة المشاريع وساعات العمل والمخصصات",
          "متابعة خطابات الضمان والودائع البنكية"
        ],
        featuresEn: [
          "All Office features",
          "Unlimited construction projects & shipping containers",
          "12 role-based system users",
          "Heavy equipment & fleet maintenance and fuel costing",
          "Labor timesheets, allowances & project allocations",
          "Bank guarantees & bid bond financial tracking"
        ],
        installationFeesEGP: 60000,
        prices: {
          EGP: { annual: 95000, offline: 240000 },
          SAR: { annual: 25000, offline: 62500 },
          AED: { annual: 26490, offline: 66225 },
          QAR: { annual: 26490, offline: 66225 },
          KWD: { annual: 2190, offline: 5475 },
          BHD: { annual: 2490, offline: 6225 },
          OMR: { annual: 2490, offline: 6225 },
          USD: { annual: 6700, offline: 16750 },
          JOD: { annual: 4700, offline: 11750 },
          IQD: { annual: 8800000, offline: 22000000 }
        }
      },
      {
        id: 3,
        level: 3,
        nameAr: "مؤسسة قابضة",
        nameEn: "Holding Group",
        scopeAr: "تعدد الشركات · 35 مستخدم · دعم بأولوية",
        scopeEn: "Multi-Company · 35 Users · Priority VIP Support",
        descriptionAr: "المنظومة المتكاملة للكيانات القابضة متعددة السجلات والمشاريع الضخمة مع دعم فوري مخصص.",
        descriptionEn: "Integrated holding group solution for multi-entity conglomerates with VIP SLA support.",
        popular: false,
        featuresAr: [
          "جميع ميزات باقة الشركات",
          "إدارة شركات وكيانات متعددة (Multi-Entity)",
          "35 مستخدماً ونظام تدقيق مالي متقدم",
          "مضمّن مجاناً: دعم فني بأولوية خاصة واستجابة مباشرة",
          "مضمّن مجاناً: المساعد الذكي ZAD AI لتحليل المخاطر",
          "مضمّن مجاناً: نظام الموارد البشرية والرواتب الشامل",
          "قوائم مالية مجمعة للمجموعة وإدارة السيولة النقدية"
        ],
        featuresEn: [
          "All Enterprise Contractor features",
          "Multi-entity holding company architecture",
          "35 users with rigorous audit trail governance",
          "Free Included: Priority VIP SLA support (4h response)",
          "Free Included: ZAD AI cashflow & project risk analytics",
          "Free Included: Comprehensive HR & payroll module",
          "Consolidated group financial statements & treasury management"
        ],
        installationFeesEGP: 100000,
        prices: {
          EGP: { annual: 180000, offline: 450000 },
          SAR: { annual: 49000, offline: 122500 },
          AED: { annual: 51900, offline: 129750 },
          QAR: { annual: 51900, offline: 129750 },
          KWD: { annual: 4290, offline: 10725 },
          BHD: { annual: 4890, offline: 12225 },
          OMR: { annual: 4890, offline: 12225 },
          USD: { annual: 13000, offline: 32500 },
          JOD: { annual: 9150, offline: 22875 },
          IQD: { annual: 17200000, offline: 43000000 }
        }
      }
    ],
    monthlyAddonsEGP: { extraUser: 350, extraBranch: 1200 },
    offlineAddonsEGP: { extraUser: 3500, extraBranchPercent: 40 }
  }
];

// ----------------------------------------------------
// Add-on Modules & Single Add-on Floor Rates (EGP Base)
// ----------------------------------------------------

export const ADDON_MODULES: AddonModule[] = [
  {
    id: "tax-invoicing",
    nameAr: "الفاتورة الإلكترونية والإقرار الضريبي",
    nameEn: "E-Invoicing & Tax Return",
    priceEGP: 450,
    priceNoteAr: "ج.م / شهرياً",
    priceNoteEn: "EGP / mo",
    includedInLevel3: true,
    descriptionAr: "ربط رسمي متوافق مع هيئة الضرائب المصرية (ETA) ومنظومة الفاتورة والإيصال الإلكتروني.",
    descriptionEn: "Official compliance with the Egyptian Tax Authority (ETA) e-invoice & e-receipt."
  },
  {
    id: "ecommerce-pos",
    nameAr: "المتجر الإلكتروني وبوابات الدفع (خط البيع)",
    nameEn: "E-Commerce & Payment Gateways",
    priceEGP: 950,
    priceNoteAr: "ج.م / شهرياً",
    priceNoteEn: "EGP / mo",
    includedInLevel3: true,
    descriptionAr: "متجر متكامل مربوط لحظياً بمخزونك مع بوابات الدفع الإلكتروني (Paymob, Fawry, Tap, البطاقات).",
    descriptionEn: "Complete online storefront synced real-time with inventory and payment gateways."
  },
  {
    id: "marketplaces",
    nameAr: "ربط أمازون ونون (Amazon & Noon)",
    nameEn: "Amazon & Noon Marketplaces Sync",
    priceEGP: 650,
    priceNoteAr: "ج.م / شهرياً",
    priceNoteEn: "EGP / mo",
    includedInLevel3: true,
    descriptionAr: "مزامنة الأسعار والأرصدة والطلبات تلقائياً مع منصتي أمازون ونون دون أي تدخل يدوي.",
    descriptionEn: "Automated synchronization of prices, stock, and orders across Amazon and Noon."
  },
  {
    id: "whatsapp-ai",
    nameAr: "بوت واتساب بالذكاء الاصطناعي (ZAD)",
    nameEn: "AI WhatsApp Business Bot",
    priceEGP: 400,
    priceNoteAr: "ج.م / شهرياً",
    priceNoteEn: "EGP / mo",
    includedInLevel3: true,
    descriptionAr: "استقبال الطلبات، الرد على أسعار المنتجات، إنشاء الفواتير، وإرسال تنبيهات الأقساط آلياً.",
    descriptionEn: "Receive orders, answer product inquiries, generate invoices and dispatch payment reminders."
  },
  {
    id: "protection-radar",
    nameAr: "الذكاء والحماية (رادار الكاشير وحماية الهامش)",
    nameEn: "Intelligence & Loss Prevention Radar",
    priceEGP: 500,
    priceNoteAr: "ج.م / شهرياً",
    priceNoteEn: "EGP / mo",
    includedInLevel3: true,
    descriptionAr: "رادار كشف السرقات، منع البيع بأقل من التكلفة، وإشعار المالك فوراً بأي تلاعب أو حذف.",
    descriptionEn: "Cashier theft detection radar, margin lock, and immediate owner alerts on suspicious voids."
  },
  {
    id: "shipping-carriers",
    nameAr: "ربط شركات الشحن (بوسطة · أرامكس · SMSA)",
    nameEn: "Courier Integration (Bosta, Aramex, SMSA)",
    priceEGP: 300,
    priceNoteAr: "ج.م / شهرياً",
    priceNoteEn: "EGP / mo",
    includedInLevel3: true,
    descriptionAr: "إنشاء البوالص وطباعتها وتتبع حالات الشحن وتسويات الدفع عند الاستلام بضغطة زر.",
    descriptionEn: "Generate waybills, print labels, and track COD settlements with major couriers in one click."
  },
  {
    id: "hr-payroll",
    nameAr: "الموارد البشرية والرواتب والبصمة وبوابة الموظف",
    nameEn: "HR, Biometric Payroll & Employee Portal",
    priceEGP: 700,
    priceNoteAr: "ج.م / شهرياً",
    priceNoteEn: "EGP / mo",
    includedInLevel3: true,
    descriptionAr: "حساب الخصومات والإضافي والغياب آلياً عبر ماكينات البصمة مع مسيرات الرواتب وسلف الموظفين.",
    descriptionEn: "Automated punch-clock sync, overtime, deductions, payroll disbursement and employee portal."
  },
  {
    id: "priority-support",
    nameAr: "دعم بأولوية (استجابة 4 ساعات وواتساب مباشر)",
    nameEn: "Priority VIP Support (4h SLA & Direct WhatsApp)",
    priceEGP: "15%",
    priceNoteAr: "من قيمة الاشتراك (حد أدنى 400 ج.م)",
    priceNoteEn: "of subscription (min 400 EGP)",
    includedInLevel3: false,
    descriptionAr: "مدير حسابات تقني مخصص، قناة واتساب مباشرة لشركتك، وضمان استجابة قصوى خلال 4 ساعات.",
    descriptionEn: "Dedicated technical account manager, direct WhatsApp VIP channel, and guaranteed 4-hour SLA."
  },
  {
    id: "offline-cloud-backup",
    nameAr: "نسخ احتياطي سحابي ونقل المنشأة لعميل الأوفلاين",
    nameEn: "Secure Cloud Backup for Offline Clients",
    priceEGP: 200,
    priceNoteAr: "ج.م شهرياً أو 2,000 ج.م سنوياً",
    priceNoteEn: "EGP/mo or 2,000 EGP/yr",
    includedInLevel3: false,
    descriptionAr: "حماية بيانات نسختك الأوفلاين بنسخ احتياطي مشفر ومؤتمت على السحابة يضمن استعادة بياناتك بأمان.",
    descriptionEn: "Safeguard your offline server database with automated encrypted cloud backups."
  }
];

// ----------------------------------------------------
// Offline License Terms & Rules
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
