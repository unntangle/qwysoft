/* Sample operating data for product visuals.
   Indian fiscal year (Apr–Mar), figures in ₹ lakhs unless noted.
   Realistic on purpose: every chart should tell a true-sounding story. */

export const FY_MONTHS = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];

// Actuals through September, forecast from September onward (festive peak in Oct–Nov).
export const REVENUE_ACTUAL = [38.2, 41.0, 39.4, 44.8, 46.1, 48.2, null, null, null, null, null, null];
export const REVENUE_FORECAST = [null, null, null, null, null, 48.2, 52.6, 58.9, 54.1, 50.3, 49.0, 53.8];
export const FORECAST_LOWER = [null, null, null, null, null, 48.2, 50.1, 55.0, 50.2, 46.4, 44.8, 48.9];
export const FORECAST_UPPER = [null, null, null, null, null, 48.2, 55.0, 62.7, 58.1, 54.4, 53.3, 58.6];

export const WAREHOUSES = [
  { name: "Kochi", cover: 6, capacity: 0.92 },
  { name: "Thrissur", cover: 14, capacity: 0.71 },
  { name: "Kozhikode", cover: 18, capacity: 0.64 },
  { name: "Thiruvananthapuram", cover: 24, capacity: 0.55 },
];

// 30 days of daily orders for the dark "decisions" section.
export const DAILY_ORDERS = [
  402, 418, 395, 441, 468, 512, 498, 421, 433, 447, 452, 489, 531, 544, 470, 462, 481, 476, 502, 566, 590, 505, 497, 510,
  522, 534, 588, 612, 548, 541,
];
export const DAILY_LABELS = DAILY_ORDERS.map((_, i) => `${i + 1} Sep`);

// Repeat orders by week — the dip the AI explains.
export const REPEAT_WEEKS = ["W32", "W33", "W34", "W35", "W36", "W37", "W38", "W39"];
export const REPEAT_KOZHIKODE = [31.2, 30.8, 31.5, 30.9, 29.4, 27.1, 26.8, 27.4];
export const REPEAT_OTHERS = [30.1, 30.4, 30.2, 30.9, 31.0, 30.7, 31.2, 31.4];

// CRM funnel (this quarter).
export const FUNNEL = [
  { stage: "Leads", value: 4820 },
  { stage: "Qualified", value: 2140 },
  { stage: "Quotation sent", value: 1180 },
  { stage: "Order confirmed", value: 612 },
  { stage: "Paid", value: 571 },
];

// Customer retention cohorts: % of customers ordering again in month N.
export const COHORTS = [
  { label: "Apr", values: [100, 46, 38, 34, 31, 29] },
  { label: "May", values: [100, 48, 40, 35, 33] },
  { label: "Jun", values: [100, 51, 43, 39] },
  { label: "Jul", values: [100, 55, 47] },
  { label: "Aug", values: [100, 57] },
  { label: "Sep", values: [100] },
];

// Revenue by channel, ₹ lakhs this quarter.
export const CHANNELS = [
  { name: "Stores", value: 92.4 },
  { name: "Online", value: 31.8 },
  { name: "B2B", value: 24.6 },
  { name: "Marketplace", value: 9.1 },
];

export const SEGMENTS = [
  { name: "Loyal regulars", share: 34, color: "#5a2d8c" },
  { name: "Festive buyers", share: 27, color: "#7357e8" },
  { name: "Bulk / B2B", share: 21, color: "#ee7636" },
  { name: "New this quarter", share: 18, color: "#dcd4f8" },
];
