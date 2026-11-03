import { useState, useEffect, useCallback, useMemo } from "react";
import {
  ProductCatalogResponse,
  CatalogProduct,
  fetchProductCatalog,
  DEFAULT_PRODUCTS,
  PRODUCT_EN_METADATA,
  mapCurrencyToCountry,
  getFallbackProductCatalog,
} from "./services/pricingCatalog";

export function usePricingCatalog(currencyCode: string = "EGP", initialProduct: string = "retail") {
  const [selectedProduct, setSelectedProduct] = useState<string>(initialProduct);
  const countryCode = useMemo(() => mapCurrencyToCountry(currencyCode), [currencyCode]);

  const [catalog, setCatalog] = useState<ProductCatalogResponse>(() =>
    getFallbackProductCatalog(initialProduct, countryCode)
  );
  const allProducts: CatalogProduct[] = DEFAULT_PRODUCTS;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // True when the last fetch answered 404: no published pricing offer for
  // the selected product/country. The UI shows a contact message instead
  // of the generic error/retry state, which would read as a broken site.
  const [offerNotFound, setOfferNotFound] = useState<boolean>(false);

  // The product list is static metadata (DEFAULT_PRODUCTS): the full
  // catalog endpoint returns roughly 900 kB and was previously fetched
  // on idle on every visit only to refresh product names. Prices are
  // still always fetched live per product below; if the backend adds
  // a product, adding it to DEFAULT_PRODUCTS is a one-line change.

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
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      console.error(`Failed to load pricing for ${selectedProduct}/${countryCode}:`, err);
      setError(err instanceof Error ? err.message : "Failed to load pricing");
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
