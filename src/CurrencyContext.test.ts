import { describe, it, expect } from "vitest";
import { CURRENCY_CONFIGS, resolveDetectedCurrency } from "./CurrencyContext";

describe("currency VAT rates", () => {
  it("carries the standard VAT rate for every currency, Saudi Arabia included", () => {
    expect(CURRENCY_CONFIGS.EGP.vatRate).toBe(0.14);
    expect(CURRENCY_CONFIGS.SAR.vatRate).toBe(0.15);
    expect(CURRENCY_CONFIGS.AED.vatRate).toBe(0.05);
    expect(CURRENCY_CONFIGS.BHD.vatRate).toBe(0.1);
    expect(CURRENCY_CONFIGS.OMR.vatRate).toBe(0.05);
    expect(CURRENCY_CONFIGS.JOD.vatRate).toBe(0.16);
    expect(CURRENCY_CONFIGS.QAR.vatRate).toBe(0);
    expect(CURRENCY_CONFIGS.KWD.vatRate).toBe(0);
    expect(CURRENCY_CONFIGS.IQD.vatRate).toBe(0);
  });

  it("uses 3 fraction digits for the three-decimal currencies", () => {
    expect(CURRENCY_CONFIGS.KWD.fractionDigits).toBe(3);
    expect(CURRENCY_CONFIGS.BHD.fractionDigits).toBe(3);
    expect(CURRENCY_CONFIGS.OMR.fractionDigits).toBe(3);
    expect(CURRENCY_CONFIGS.JOD.fractionDigits).toBe(3);
    expect(CURRENCY_CONFIGS.EGP.fractionDigits).toBe(2);
    expect(CURRENCY_CONFIGS.SAR.fractionDigits).toBe(2);
  });
});

describe("resolveDetectedCurrency", () => {
  it("adopts the detected currency when the visitor has no saved choice", () => {
    expect(
      resolveDetectedCurrency({
        savedCurrency: null,
        storedCountryCode: "",
        detectedCountryCode: "SA",
        detectedCountryName: "Saudi Arabia",
      })
    ).toBe("SAR");
  });

  it("keeps a saved choice while the visitor stays in the same country", () => {
    expect(
      resolveDetectedCurrency({
        savedCurrency: "SAR",
        storedCountryCode: "SA",
        detectedCountryCode: "SA",
        detectedCountryName: "Saudi Arabia",
      })
    ).toBeNull();
  });

  it("reconciles a saved choice when the detected country changed", () => {
    expect(
      resolveDetectedCurrency({
        savedCurrency: "EGP",
        storedCountryCode: "EG",
        detectedCountryCode: "SA",
        detectedCountryName: "Saudi Arabia",
      })
    ).toBe("SAR");
  });

  it("never overwrites a saved choice for an unsupported detected country (regression: EGP default)", () => {
    expect(
      resolveDetectedCurrency({
        savedCurrency: "SAR",
        storedCountryCode: "SA",
        detectedCountryCode: "MA",
        detectedCountryName: "Morocco",
      })
    ).toBeNull();
    expect(
      resolveDetectedCurrency({
        savedCurrency: null,
        storedCountryCode: "",
        detectedCountryCode: "LB",
        detectedCountryName: "Lebanon",
      })
    ).toBeNull();
  });
});
