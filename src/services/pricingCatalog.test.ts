import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  mapCurrencyToCountry,
  getFallbackProductCatalog,
  fetchProductCatalog,
} from "./pricingCatalog";

describe("mapCurrencyToCountry", () => {
  it("maps every selectable currency to its own pricing country", () => {
    expect(mapCurrencyToCountry("EGP")).toBe("EG");
    expect(mapCurrencyToCountry("SAR")).toBe("SA");
    expect(mapCurrencyToCountry("AED")).toBe("AE");
    expect(mapCurrencyToCountry("JOD")).toBe("JO");
    expect(mapCurrencyToCountry("USD")).toBe("US");
  });

  it("passes unknown codes through so the API can answer 404", () => {
    expect(mapCurrencyToCountry("XYZ")).toBe("XYZ");
  });
});

describe("getFallbackProductCatalog", () => {
  it("speaks for the requested country, not always Egypt (regression)", () => {
    const sa = getFallbackProductCatalog("retail", "SA");
    expect(sa.country.code).toBe("SA");
    expect(sa.country.currency).toBe("SAR");
    const jo = getFallbackProductCatalog("retail", "JO");
    expect(jo.country.currency).toBe("JOD");
    const eg = getFallbackProductCatalog("retail", "EG");
    expect(eg.country.currency).toBe("EGP");
  });

  it("publishes no prices: empty levels and null addons (contact-for-price)", () => {
    const fallback = getFallbackProductCatalog("retail", "SA");
    expect(fallback.levels).toEqual([]);
    expect(fallback.addons.extraUserMonthly).toBeNull();
    expect(fallback.addons.extraBranchMonthly).toBeNull();
  });
});

describe("fetchProductCatalog", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("marks a live 404 as offerNotFound and never caches it", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue({ status: 404, ok: false, json: async () => ({}) });
    vi.stubGlobal("fetch", fetchMock);

    const first = await fetchProductCatalog("retail", "JO");
    expect(first.offerNotFound).toBe(true);
    expect(first.levels).toEqual([]);

    await fetchProductCatalog("retail", "JO");
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("returns live levels on success and serves the second call from cache", async () => {
    const payload = {
      catalogVersion: "2",
      product: { id: "retail", name: "Retail" },
      country: { code: "EG", currency: "EGP" },
      quoteAnnuallyOnly: false,
      annualEqualsMonths: 10,
      trialDays: 14,
      levels: [{ id: "L1", name: "Starter", limits: {}, currency: "EGP", monthly: 100, annual: 1000, featureGroups: [] }],
      floors: [],
      addons: { extraUserMonthly: 10, extraBranchMonthly: 20 },
    };
    const fetchMock = vi
      .fn()
      .mockResolvedValue({ status: 200, ok: true, json: async () => payload });
    vi.stubGlobal("fetch", fetchMock);

    const first = await fetchProductCatalog("supermarket", "EG");
    expect(first.levels).toHaveLength(1);
    const second = await fetchProductCatalog("supermarket", "EG");
    expect(second.levels).toHaveLength(1);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("falls back to empty levels on a network failure without caching it", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new TypeError("offline"));
    vi.stubGlobal("fetch", fetchMock);

    const first = await fetchProductCatalog("pharmacy", "EG");
    expect(first.levels).toEqual([]);
    expect(first.offerNotFound).toBe(false);

    await fetchProductCatalog("pharmacy", "EG");
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
