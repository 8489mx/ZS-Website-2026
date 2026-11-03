import { describe, it, expect } from "vitest";
import {
  calculatePosTotals,
  pickRecommendedLevel,
  calculateAnnualSavings,
  buildCumulativeSavingsSeries,
} from "./calculations";

describe("calculatePosTotals", () => {
  it("sums items, applies the discount, then charges VAT on the discounted amount", () => {
    const totals = calculatePosTotals(
      [
        { price: 100, qty: 2 },
        { price: 50, qty: 1 },
      ],
      10,
      0.14
    );
    expect(totals.subtotal).toBe(250);
    expect(totals.discountAmount).toBe(25);
    expect(totals.vatAmount).toBeCloseTo(31.5);
    expect(totals.total).toBeCloseTo(256.5);
  });

  it("charges the Saudi 15% VAT rate (regression: SAR used to fall through to 0)", () => {
    const totals = calculatePosTotals([{ price: 200, qty: 1 }], 0, 0.15);
    expect(totals.vatAmount).toBeCloseTo(30);
    expect(totals.total).toBeCloseTo(230);
  });

  it("handles an empty cart and a zero-VAT currency", () => {
    expect(calculatePosTotals([], 10, 0.15)).toEqual({
      subtotal: 0,
      discountAmount: 0,
      vatAmount: 0,
      total: 0,
    });
    expect(calculatePosTotals([{ price: 90, qty: 1 }], 0, 0).total).toBe(90);
  });
});

describe("pickRecommendedLevel", () => {
  const levels = ["L1", "L2", "L3"];

  it("maps branch counts to levels", () => {
    expect(pickRecommendedLevel(levels, 1)).toBe("L1");
    expect(pickRecommendedLevel(levels, 2)).toBe("L2");
    expect(pickRecommendedLevel(levels, 4)).toBe("L2");
    expect(pickRecommendedLevel(levels, 5)).toBe("L3");
    expect(pickRecommendedLevel(levels, 40)).toBe("L3");
  });

  it("clamps to the levels the catalog actually published", () => {
    expect(pickRecommendedLevel(["only"], 9)).toBe("only");
    expect(pickRecommendedLevel(["a", "b"], 9)).toBe("b");
  });

  it("returns null when the catalog is empty (no invented plan or price)", () => {
    expect(pickRecommendedLevel([], 3)).toBeNull();
  });
});

describe("ROI savings helpers", () => {
  it("calculates annual savings at 4% of turnover across branches", () => {
    expect(calculateAnnualSavings(100_000, 2)).toBe(96_000);
    expect(calculateAnnualSavings(0, 3)).toBe(0);
  });

  it("builds a cumulative 12-month series in both languages", () => {
    const en = buildCumulativeSavingsSeries(50_000, 1, "en");
    expect(en).toHaveLength(12);
    expect(en[0]).toEqual({ month: "M1", savings: 2_000 });
    expect(en[11]).toEqual({ month: "M12", savings: 24_000 });
    const ar = buildCumulativeSavingsSeries(50_000, 1, "ar");
    expect(ar[0].month).toBe("شهر 1");
  });
});
