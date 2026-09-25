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

  // Initial load: Fetch all products list and initial product pricing
  useEffect(() => {
    let isMounted = true;

    // Fetch full catalog once to get the complete products list
    fetchFullCatalog()
      .then((fullData) => {
        if (isMounted && fullData.products?.length > 0) {
          setAllProducts(fullData.products);
        }
      })
      .catch((err) => {
        console.warn("Could not fetch full products list:", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch product catalog whenever product or countryCode changes
  const loadProductCatalog = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchProductCatalog(selectedProduct, countryCode);
      setCatalog(data);
    } catch (err: any) {
      console.error(`Failed to load pricing for ${selectedProduct}/${countryCode}:`, err);
      setError(err?.message || "Failed to load pricing");
    } finally {
      setIsLoading(false);
    }
  }, [selectedProduct, countryCode]);

  useEffect(() => {
    loadProductCatalog();
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
    addons: catalog?.addons || { extraUserMonthly: 120, extraBranchMonthly: 450 },
    allProducts,
    currentProductMeta,
    selectedProduct,
    setSelectedProduct,
    countryCode,
    isLoading,
    error,
    refetch: loadProductCatalog,
  };
}
