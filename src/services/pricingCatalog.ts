// Service to fetch live pricing catalog from Z Systems API
// Endpoint: https://app.zsystemai.com/api/public/pricing-catalog

export interface CatalogProduct {
  id: string;
  name: string;
  pos?: boolean;
  sellOffline?: boolean;
}

export interface CatalogCountry {
  code: string;
  currency: string;
  requiresWrittenDisclosure?: boolean;
}

export interface CatalogLevelLimits {
  branches?: number | null;
  posTerminals?: number | null;
  users?: number | null;
  activeProjects?: number | null;
  containersPerMonth?: number | null;
  multiCompany?: boolean;
}

export interface CatalogFeatureGroup {
  name: string;
  items: string[];
}

export interface CatalogLevel {
  id: "L1" | "L2" | "L3" | string;
  name: string;
  limits: CatalogLevelLimits;
  currency: string;
  monthly: number;
  annual: number;
  featureGroups: CatalogFeatureGroup[];
  sectorFeatures?: string[];
}

export interface CatalogFloor {
  id: string;
  name: string;
  monthly: number | null;
  contactForPrice: boolean;
  includedFromLevel: string | null;
  pricingRule?: string;
}

export interface CatalogAddons {
  extraUserMonthly: number;
  extraBranchMonthly: number;
}

export interface ProductCatalogResponse {
  catalogVersion: string;
  product: CatalogProduct;
  country: CatalogCountry;
  quoteAnnuallyOnly: boolean;
  annualEqualsMonths: number;
  trialDays: number;
  levels: CatalogLevel[];
  floors: CatalogFloor[];
  addons: CatalogAddons;
}

export interface FullCatalogResponse {
  version: string;
  products: CatalogProduct[];
  countries: CatalogCountry[];
  catalog: ProductCatalogResponse[];
}

// English metadata for products to support multi-language seamlessly
export const PRODUCT_EN_METADATA: Record<string, { nameEn: string; subtitleEn: string; subtitleAr: string; icon: string }> = {
  supermarket: {
    nameEn: "Supermarket & Grocery",
    subtitleEn: "Fast POS, scales, barcode, expiry tracking",
    subtitleAr: "كاشير سريع، موازين إلكترونية، باركود، ومتابعة الصلاحيات",
    icon: "ShoppingBag"
  },
  retail: {
    nameEn: "General Retail & Boutiques",
    subtitleEn: "Inventory, sales, customer loyalty, barcode",
    subtitleAr: "محلات التجزئة، الهدايا، الإكسسوارات، والأنشطة التجارية",
    icon: "Store"
  },
  spices: {
    nameEn: "Spices & Roasteries",
    subtitleEn: "Herbs, weight units, fractional pricing",
    subtitleAr: "العطارة والمحامص والبهارات والوزنيات بدقة الغرام",
    icon: "Carrot"
  },
  fashion: {
    nameEn: "Fashion & Footwear",
    subtitleEn: "Matrix sizes, colors, seasonal collections",
    subtitleAr: "الملابس والأحذية، مصفوفة المقاسات والألوان ومواسم الموضة",
    icon: "Layers"
  },
  perfumes: {
    nameEn: "Perfumes & Cosmetics",
    subtitleEn: "Blends, formulas, luxury packaging",
    subtitleAr: "العطور ومستحضرات التجميل، نسب الخلط والتركيبات الخاصة",
    icon: "Award"
  },
  pharmacy: {
    nameEn: "Pharmacies & Medical",
    subtitleEn: "Active ingredients, expiry, insurance, POS",
    subtitleAr: "الصيدليات والمستلزمات، المادة الفعالة، والربط التأميني",
    icon: "Activity"
  },
  electronics: {
    nameEn: "Electronics & Mobile",
    subtitleEn: "Serial numbers (IMEI), maintenance tickets, warranty",
    subtitleAr: "الموبايلات والإلكترونيات، السيريال والـ IMEI وإيصالات الصيانة",
    icon: "Zap"
  },
  appliances_installments: {
    nameEn: "Appliances & Installments",
    subtitleEn: "Installment schedule, guarantor, debt collection",
    subtitleAr: "معارض الأجهزة والأثاث، جداول الأقساط، والضامنين والتحصيل",
    icon: "CalendarCheck"
  },
  restaurant: {
    nameEn: "Restaurants & Cafes",
    subtitleEn: "KDS kitchen screens, tables, recipes, QR orders",
    subtitleAr: "المطاعم والكافيهات، شاشات المطبخ، الطاولات، وقوائم الـ QR",
    icon: "Utensils"
  },
  wholesale: {
    nameEn: "Wholesale & Distribution",
    subtitleEn: "Sales reps, price tiers, credit limits, vans",
    subtitleAr: "الجملة والتوزيع، مناديب المبيعات، شرائح الأسعار، وجرد السيارات",
    icon: "Truck"
  },
  manufacturing: {
    nameEn: "Manufacturing & Workshops",
    subtitleEn: "BOM bill of materials, production stages, scrap",
    subtitleAr: "المصانع والمعامل، أوامر التشغيل، معادلات التصنيع والهوالك",
    icon: "Building2"
  },
  import_export: {
    nameEn: "Import & Export",
    subtitleEn: "Customs, shipping containers, multi-currency LC",
    subtitleAr: "الاستيراد والتصدير، تكلفة الحاوية والجمارك والاعتمادات",
    icon: "Globe"
  },
  services: {
    nameEn: "Professional Services",
    subtitleEn: "Timesheets, contracts, billing milestones",
    subtitleAr: "الشركات الخدمية والمكاتب الاستشارية، العقود والمطالبات",
    icon: "FileText"
  },
  ecommerce: {
    nameEn: "E-Commerce & Online Stores",
    subtitleEn: "Live sync, shipping courier integration, payment",
    subtitleAr: "المتاجر الإلكترونية، مزامنة المخزون اللحظية، والربط مع الشحن",
    icon: "CreditCard"
  },
  contracting: {
    nameEn: "Contracting & Construction",
    subtitleEn: "Extracts, project cost, subcontractors, equipment",
    subtitleAr: "المقاولات والإنشاءات، المستخلصات، مراكز التكلفة، ومقاولو الباطن",
    icon: "Truck"
  },
  maritime: {
    nameEn: "Shipping & Logistics",
    subtitleEn: "Bill of lading, clearance, transport tracking",
    subtitleAr: "الشحن والتخليص الجمركي، بوالص الشحن، وإدارة الأسطول",
    icon: "Globe"
  }
};

export const DEFAULT_PRODUCTS: CatalogProduct[] = [
  { id: "retail", name: "برنامج محلات التجزئة العامة", pos: true, sellOffline: true },
  { id: "supermarket", name: "برنامج السوبرماركت والبقالة والمواد الغذائية", pos: true, sellOffline: true },
  { id: "pharmacy", name: "برنامج الصيدليات والمستلزمات الطبية", pos: true, sellOffline: true },
  { id: "restaurant", name: "برنامج المطاعم والكافيهات", pos: true, sellOffline: true },
  { id: "fashion", name: "برنامج الملابس والأزياء والأحذية", pos: true, sellOffline: true },
  { id: "spices", name: "برنامج العطارة والمحامص والمطاحن والبهارات", pos: true, sellOffline: true },
  { id: "perfumes", name: "برنامج العطور ومستحضرات التجميل والتركيبات", pos: true, sellOffline: true },
  { id: "electronics", name: "برنامج الموبايلات والإلكترونيات والصيانة", pos: true, sellOffline: true },
  { id: "appliances_installments", name: "برنامج معارض الأجهزة والأثاث بالتقسيط", pos: true, sellOffline: true },
  { id: "wholesale", name: "برنامج الجملة والتوزيع", pos: true, sellOffline: true },
  { id: "manufacturing", name: "برنامج المصانع والمعامل والورش", pos: false, sellOffline: true },
  { id: "import_export", name: "برنامج الاستيراد والتصدير والتجارة الدولية", pos: false, sellOffline: true },
  { id: "services", name: "برنامج الشركات الخدمية والمكاتب الاستشارية", pos: false, sellOffline: true },
  { id: "ecommerce", name: "برنامج المتاجر الإلكترونية والبيع أونلاين", pos: true, sellOffline: true },
  { id: "contracting", name: "نظام المقاولات وإدارة المشاريع الإنشائية", pos: false, sellOffline: false },
  { id: "maritime", name: "نظام الشحن والتخليص والخدمات اللوجستية", pos: false, sellOffline: false },
];

// In-memory cache for live responses
const cache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes cache

import catalogRawData from "./catalogData.json";

// Map app currencyCode to API country code
export function mapCurrencyToCountry(currencyCode: string): string {
  switch (currencyCode) {
    case "SAR": return "SA";
    case "AED": return "AE";
    case "QAR": return "QA";
    case "KWD": return "KW";
    case "BHD": return "BH";
    case "OMR": return "OM";
    case "EGP": default: return "EG";
  }
}

/**
 * Synchronous fallback catalog data directly from the official API dump
 */
export function getFallbackProductCatalog(
  product: string = "retail",
  country: string = "EG"
): ProductCatalogResponse {
  const full = catalogRawData as unknown as FullCatalogResponse;
  const found = full.catalog?.find(
    (c) => c.product.id === product && c.country.code === country
  );
  if (found) return found;

  const foundAnyCountry = full.catalog?.find((c) => c.product.id === product);
  if (foundAnyCountry) return foundAnyCountry;

  return full.catalog[0];
}

/**
 * Fetch catalog for a specific product and country.
 * Tries local Vite proxy first (to avoid browser CORS issues), then direct API,
 * then falls back to official bundled catalog data so UI never shows empty cards.
 */
export async function fetchProductCatalog(
  product: string = "retail",
  country: string = "EG"
): Promise<ProductCatalogResponse> {
  const cacheKey = `single_${product}_${country}`;
  const now = Date.now();

  if (cache[cacheKey] && now - cache[cacheKey].timestamp < CACHE_TTL_MS) {
    return cache[cacheKey].data as ProductCatalogResponse;
  }

  const query = `product=${encodeURIComponent(product)}&country=${encodeURIComponent(country)}`;
  const endpoints = [
    `/api/public/pricing-catalog?${query}`,
    `https://app.zsystemai.com/api/public/pricing-catalog?${query}`,
  ];

  for (const url of endpoints) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const data: ProductCatalogResponse = await res.json();
        if (data && data.levels && data.levels.length > 0) {
          cache[cacheKey] = { data, timestamp: now };
          return data;
        }
      }
    } catch {
      // Continue to next endpoint or fallback
    }
  }

  // Graceful fallback to bundled catalog
  const fallbackData = getFallbackProductCatalog(product, country);
  cache[cacheKey] = { data: fallbackData, timestamp: now };
  return fallbackData;
}

/**
 * Fetch full catalog (all products & countries)
 */
export async function fetchFullCatalog(): Promise<FullCatalogResponse> {
  const cacheKey = "full_catalog";
  const now = Date.now();

  if (cache[cacheKey] && now - cache[cacheKey].timestamp < CACHE_TTL_MS) {
    return cache[cacheKey].data as FullCatalogResponse;
  }

  const endpoints = [
    "/api/public/pricing-catalog",
    "https://app.zsystemai.com/api/public/pricing-catalog",
  ];

  for (const url of endpoints) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const data: FullCatalogResponse = await res.json();
        if (data && data.products && data.products.length > 0) {
          cache[cacheKey] = { data, timestamp: now };
          return data;
        }
      }
    } catch {
      // Continue to next endpoint
    }
  }

  const fallbackFull = catalogRawData as unknown as FullCatalogResponse;
  cache[cacheKey] = { data: fallbackFull, timestamp: now };
  return fallbackFull;
}
