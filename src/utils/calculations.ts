/**
 * Pure calculation helpers extracted from ErpPage so the money maths
 * (POS totals, VAT, ROI estimates, plan recommendation) can be unit
 * tested without rendering the page, and so the page no longer owns
 * formulas that belong to the domain rather than the view.
 */

export interface PosLineItem {
  price: number;
  qty: number;
}

export interface PosTotals {
  subtotal: number;
  discountAmount: number;
  vatAmount: number;
  total: number;
}

/**
 * POS invoice totals. VAT is charged on the discounted amount, and the
 * rate comes from the active currency config (CurrencyContext), never
 * from a hard-coded per-page table — that is how the Saudi 15% rate
 * was previously missed and silently fell through to 0.
 */
export function calculatePosTotals(
  items: readonly PosLineItem[],
  discountPercent: number,
  vatRate: number
): PosTotals {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const vatAmount = (subtotal - discountAmount) * vatRate;
  return {
    subtotal,
    discountAmount,
    vatAmount,
    total: subtotal - discountAmount + vatAmount,
  };
}

/**
 * Pick the catalog level the ROI calculator recommends for a branch
 * count: 1 branch -> first level, 2-4 -> second, 5+ -> third, always
 * clamped to what the live catalog actually published.
 */
export function pickRecommendedLevel<T>(levels: readonly T[], numBranches: number): T | null {
  if (levels.length === 0) return null;
  if (numBranches >= 5) return levels[2] ?? levels[levels.length - 1];
  if (numBranches >= 2) return levels[1] ?? levels[0];
  return levels[0];
}

/** Illustrative annual savings estimate used by the ROI calculator (default 4% of turnover). */
export function calculateAnnualSavings(
  avgMonthlySales: number,
  numBranches: number,
  savingsRate = 0.04
): number {
  return Math.round(avgMonthlySales * savingsRate * numBranches * 12);
}

export interface SavingsPoint {
  month: string;
  savings: number;
}

/** Cumulative 12-month savings series for the ROI chart. */
export function buildCumulativeSavingsSeries(
  avgMonthlySales: number,
  numBranches: number,
  lang: "ar" | "en",
  savingsRate = 0.04
): SavingsPoint[] {
  const monthlySaving = Math.round(avgMonthlySales * savingsRate * numBranches);
  return Array.from({ length: 12 }, (_, i) => ({
    month: lang === "ar" ? `شهر ${i + 1}` : `M${i + 1}`,
    savings: monthlySaving * (i + 1),
  }));
}
