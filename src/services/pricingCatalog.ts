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
  /** null means no published price for this country: show contact-for-price, never invent a number. */
  extraUserMonthly: number | null;
  extraBranchMonthly: number | null;
}

export interface ProductCatalogResponse {
  catalogVersion: string;
  product: CatalogProduct;
  country: CatalogCountry;
  quoteAnnuallyOnly: boolean;
  annualEqualsMonths: number;
  trialDays: number;
  /**
   * Launch offer, when the live API publishes one. Absent on every
   * response served before the backend deploys it — the UI renders
   * nothing then, never an invented discount.
   */
  launchOffer?: { percentOffFirstYear: number; firstYearOnly: boolean; newCustomersOnly: boolean };
  /** False when the API says displayed prices exclude VAT; absent on the error fallback. */
  vatIncluded?: boolean;
  /**
   * True only when the API answered 404: no published offer exists for
   * this product/country. Absent/false on every other response, including
   * network failures. A 404 fallback is never cached, so a later published
   * offer is picked up on the next fetch.
   */
  offerNotFound?: boolean;
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
  },
  warehousing: {
    nameEn: "Warehousing & Storage",
    subtitleEn: "Warehouses, stock locations, stock transfers",
    subtitleAr: "إدارة المستودعات والتحويلات المخزنية",
    icon: "Building2"
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
  { id: "ecommerce", name: "برنامج المتاجر الإلكترونية والبيع أونلاين", pos: true, sellOffline: false },
  { id: "contracting", name: "نظام المقاولات وإدارة المشاريع الإنشائية", pos: false, sellOffline: false },
  { id: "maritime", name: "نظام الشحن والتخليص والخدمات اللوجستية", pos: false, sellOffline: false },
  { id: "warehousing", name: "برنامج إدارة المستودعات والتحويلات المخزنية", pos: false, sellOffline: true },
];

// In-memory cache for live responses
const cache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes cache

// Map app currencyCode to API country code. Every selectable currency
// maps to its own country: a visitor who picks JOD sees Jordan's offer
// (or the no-offer contact state when Jordan has none), never Egypt's
// prices. Unknown codes pass through unchanged so the API answers 404
// and the UI shows the contact state instead of another country's
// prices. (Previously JOD/IQD/USD fell back to EG here, which showed
// Egypt's EGP cards to visitors from blocked/unsupported countries and
// made the no-offer state unreachable from the currency selector.)
export function mapCurrencyToCountry(currencyCode: string): string {
  switch (currencyCode) {
    case "SAR": return "SA";
    case "AED": return "AE";
    case "QAR": return "QA";
    case "KWD": return "KW";
    case "BHD": return "BH";
    case "OMR": return "OM";
    case "JOD": return "JO";
    case "IQD": return "IQ";
    case "USD": return "US";
    case "EGP": return "EG";
    default: return currencyCode;
  }
}

/**
 * Fallback when the live API is unreachable: empty levels, never stale
 * prices. The UI shows an error/retry state instead of selling on old
 * bundled prices. Product names come from the static DEFAULT_PRODUCTS list.
 */
export function getFallbackProductCatalog(
  product: string = "retail",
  country: string = "EG"
): ProductCatalogResponse {
  const known = DEFAULT_PRODUCTS.find((p) => p.id === product) || DEFAULT_PRODUCTS[0];
  return {
    catalogVersion: "1.0",
    product: known,
    country: { code: country, currency: "EGP", requiresWrittenDisclosure: false },
    quoteAnnuallyOnly: false,
    annualEqualsMonths: 10,
    trialDays: 14,
    levels: [],
    floors: [],
    addons: { extraUserMonthly: 0, extraBranchMonthly: 0 },
  };
}

/**
 * Fetch catalog for a specific product and country.
 * Fetches the live API directly; on failure returns an empty-levels
 * catalog so the UI can show an error/retry state.
 */
export async function fetchProductCatalog(
  product: string = "retail",
  country: string = "EG",
  signal?: AbortSignal
): Promise<ProductCatalogResponse> {
  const cacheKey = `single_${product}_${country}`;
  const now = Date.now();

  if (cache[cacheKey] && now - cache[cacheKey].timestamp < CACHE_TTL_MS) {
    return cache[cacheKey].data as ProductCatalogResponse;
  }

  const query = `product=${encodeURIComponent(product)}&country=${encodeURIComponent(country)}`;
  // Direct API only: the Vite /api proxy exists in development only, so in
  // production the proxy URL 404s and wastes a request on every load.
  const url = `https://app.zsystemai.com/api/public/pricing-catalog?${query}`;
  // Set only when the API itself answers 404 (no published offer for this
  // product/country). A proxy or network failure leaves it false, so the
  // UI keeps the generic error/retry state for those cases.
  let offerNotFound = false;
  try {
    const res = await fetch(url, { signal });
    if (res.status === 404) {
      offerNotFound = true;
    }
    if (res.ok) {
      const data: ProductCatalogResponse = await res.json();
      if (data && data.levels && data.levels.length > 0) {
        cache[cacheKey] = { data, timestamp: now };
        return data;
      }
    }
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") throw err;
    // Fall through to bundled fallback below.
  }

  // Live API unreachable, or no published offer (404): empty levels so
  // the UI shows an error state, never stale bundled prices. Failures are
  // never cached: the Retry button must refetch immediately instead of
  // replaying the empty result until the cache TTL expires. The 404 flag
  // rides on the fallback so the UI can tell "no offer for this country"
  // apart from a technical failure.
  const fallbackData = getFallbackProductCatalog(product, country);
  return { ...fallbackData, offerNotFound };
}

/**
 * Fetch full catalog (all products & countries)
 */
export async function fetchFullCatalog(signal?: AbortSignal): Promise<FullCatalogResponse> {
  const cacheKey = "full_catalog";
  const now = Date.now();

  if (cache[cacheKey] && now - cache[cacheKey].timestamp < CACHE_TTL_MS) {
    return cache[cacheKey].data as FullCatalogResponse;
  }

  const url = "https://app.zsystemai.com/api/public/pricing-catalog";
  try {
    const res = await fetch(url, { signal });
    if (res.ok) {
      const data: FullCatalogResponse = await res.json();
      if (data && data.products && data.products.length > 0) {
        cache[cacheKey] = { data, timestamp: now };
        return data;
      }
    }
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") throw err;
    // Fall through to bundled fallback below.
  }

  // Live API unreachable: empty catalog, never cached, so a retry
  // refetches immediately instead of replaying the empty result.
  const fallbackFull: FullCatalogResponse = {
    version: "1.0",
    products: DEFAULT_PRODUCTS,
    countries: [],
    catalog: [],
  };
  return fallbackFull;
}
