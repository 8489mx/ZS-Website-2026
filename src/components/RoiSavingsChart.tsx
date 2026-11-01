import React from "react";

export interface RoiChartPoint {
  month: string;
  savings: number;
}

interface RoiSavingsChartProps {
  data: RoiChartPoint[];
  currencySymbol: string;
  lang: "ar" | "en";
}

/**
 * Hand-rolled SVG bar chart for the 12-month cumulative-savings series.
 * Replaces recharts (351 kB) for this single chart. Bars scale to the
 * maximum value; each bar carries a native <title> for hover values.
 */
export default function RoiSavingsChart({ data, currencySymbol, lang }: RoiSavingsChartProps) {
  const width = 600;
  const height = 256;
  const paddingLeft = 48;
  const paddingRight = 12;
  const paddingTop = 12;
  const paddingBottom = 28;
  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;
  const maxValue = Math.max(1, ...data.map((d) => d.savings));
  const slotWidth = data.length > 0 ? chartWidth / data.length : chartWidth;
  const barWidth = Math.min(40, slotWidth * 0.6);

  const formatAxis = (value: number) =>
    value >= 1000 ? `${Math.round(value / 1000)}k` : `${value}`;

  const gridValues = [0, 0.25, 0.5, 0.75, 1];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height={256}
      role="img"
      aria-label={lang === "ar" ? "رسم بياني للتوفير التراكمي خلال 12 شهراً" : "Cumulative savings chart over 12 months"}
      className="text-xs"
      dir="ltr"
    >
      {gridValues.map((fraction) => {
        const y = paddingTop + chartHeight * (1 - fraction);
        const value = maxValue * fraction;
        return (
          <g key={fraction}>
            <line x1={paddingLeft} x2={width - paddingRight} y1={y} y2={y} stroke="#e2e8f0" strokeDasharray="3 3" />
            <text x={paddingLeft - 6} y={y + 3} textAnchor="end" fontSize={10} fill="#64748b">
              {formatAxis(value)}
            </text>
          </g>
        );
      })}
      {data.map((point, index) => {
        const barHeight = (point.savings / maxValue) * chartHeight;
        const x = paddingLeft + slotWidth * index + (slotWidth - barWidth) / 2;
        const y = paddingTop + chartHeight - barHeight;
        const labelX = paddingLeft + slotWidth * index + slotWidth / 2;
        return (
          <g key={point.month}>
            <rect x={x} y={y} width={barWidth} height={Math.max(0, barHeight)} rx={4} fill="#10b981">
              <title>{`${point.month}: ${point.savings.toLocaleString()} ${currencySymbol}`}</title>
            </rect>
            <text x={labelX} y={height - 8} textAnchor="middle" fontSize={10} fill="#64748b">
              {point.month}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
