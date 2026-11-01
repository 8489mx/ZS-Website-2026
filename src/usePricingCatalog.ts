import { useState, useEffect, useCallback, useMemo } from "react";
import {
  ProductCatalogResponse,
  CatalogProduct,
  fetchProductCatalog,
  fetchFullCatalog,
  DEFAULT_PRODUCTS,
  PRODUCT_EN_METADATA,
  mapCurrencyToCountry,
  getFallbackProductCatalog,
  CatalogLevel,
  CatalogFloor
} from "./services/pricingCatalog";

export function usePricingCatalog(currencyCode: string = "EGP", initialProduct: string = "retail") {
  const [selectedProduct, setSelectedProduct] = useState<string>(initialProduct);
  const countryCode = useMemo(() => mapCurrencyToCountry(currencyCode), [currencyCode]);

  const [catalog, setCatalog] = useState<ProductCatalogResponse>(() =>
    getFallbackProductCatalog(initialProduct, countryCode)
  );
  const [allProducts, setAllProducts] = useState<CatalogProduct[]>(DEFAULT_PRODUCTS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // True when the last fetch answered 404: no published pricing offer for
  // the selected product/country. The UI shows a contact message instead
  // of the generic error/retry state, which would read as a broken site.
  const [offerNotFound, setOfferNotFound] = useState<boolean>(false);

  // Idle load: the full catalog (~900 kB) only refreshes product names
  // from the live source; the static DEFAULT_PRODUCTS list already
  // covers all 17 products. Fetching it on mount delayed first paint,
  // so it stays deferred until the browser is idle.
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    let idleHandle: number | undefined;
    let timeoutHandle: number | undefined;

    const loadFullCatalog = () => {
      if (!isMounted) return;
      fetchFullCatalog(controller.signal)
        .then((fullData) => {
          if (isMounted && fullData.products?.length > 0) {
            setAllProducts(fullData.products);
          }
        })
        .catch((err) => {
          if (err?.name !== "AbortError") {
            console.warn("Could not fetch full products list:", err);
          }
        });
    };

    // requestIdleCallback is not in this project's DOM lib types, so
    // feature-detect it through a narrow cast instead of window.* calls.
    const idleWindow = window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    if (idleWindow.requestIdleCallback) {
      idleHandle = idleWindow.requestIdleCallback(loadFullCatalog, { timeout: 4000 });
    } else {
      timeoutHandle = window.setTimeout(loadFullCatalog, 1200);
    }

    return () => {
      isMounted = false;
      controller.abort();
      if (idleHandle !== undefined && idleWindow.cancelIdleCallback) {
        idleWindow.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle !== undefined) {
        window.clearTimeout(timeoutHandle);
      }
    };
  }, []);

  // Fetch product catalog whenever product or countryCode changes
  const loadProductCatalog = useCallback(async (signal?: AbortSignal) => {
    setIsLoading(true);
    setError(null);
    setOfferNotFound(false);
    try {
      const data = await fetchProductCatalog(selectedProduct, countryCode, signal);
      if (signal?.aborted) return;
      setCatalog(data);
      setOfferNotFound(data.offerNotFound === true);
    } catch (err: any) {
      if (err?.name === "AbortError") return;
      console.error(`Failed to load pricing for ${selectedProduct}/${countryCode}:`, err);
      setError(err?.message || "Failed to load pricing");
      setOfferNotFound(false);
    } finally {
      if (!signal?.aborted) setIsLoading(false);
    }
  }, [selectedProduct, countryCode]);

  useEffect(() => {
    const controller = new AbortController();
    loadProductCatalog(controller.signal);
    return () => controller.abort();
  }, [loadProductCatalog]);

  // Enhanced product object with multilingual metadata
  const currentProductMeta = useMemo(() => {
    const meta = PRODUCT_EN_METADATA[selectedProduct] || {
      nameEn: selectedProduct,
      subtitleEn: "Enterprise Solution",
      subtitleAr: "حلول مؤسسية متخصصة",
      icon: "Building2"
    };

    return {
      id: selectedProduct,
      nameAr: catalog?.product?.name || selectedProduct,
      nameEn: meta.nameEn,
      subtitleAr: meta.subtitleAr,
      subtitleEn: meta.subtitleEn,
      icon: meta.icon,
      pos: catalog?.product?.pos ?? true,
      quoteAnnuallyOnly: catalog?.quoteAnnuallyOnly ?? false,
      trialDays: catalog?.trialDays ?? 14,
      annualEqualsMonths: catalog?.annualEqualsMonths ?? 10,
    };
  }, [selectedProduct, catalog]);

  return {
    catalog,
    levels: catalog?.levels || [],
    floors: catalog?.floors || [],
    // Null addon fields pass through: no published price for this country
    // means contact-for-price in the UI, never an invented default.
    addons: catalog?.addons ?? { extraUserMonthly: null, extraBranchMonthly: null },
    allProducts,
    currentProductMeta,
    selectedProduct,
    setSelectedProduct,
    countryCode,
    isLoading,
    error,
    offerNotFound,
    refetch: loadProductCatalog,
  };
}
