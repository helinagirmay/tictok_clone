import type { EligibilityResult } from "@/types";

const TRAFFIC_THRESHOLD = 5000;

/**
 * Simulates an eligibility check against SEMrush (manual process for now).
 * In production this will call SEMrush API + e-commerce detection.
 *
 * Conditions (from Mansour):
 *   1. Website must be e-commerce
 *   2. Website must have > 5,000 monthly visits
 */
export function checkEligibility(websiteUrl: string): EligibilityResult {
  // --- Simulation logic ---
  // In production: call SEMrush API + crawl for e-commerce signals
  const url = websiteUrl.toLowerCase();

  // Simulate e-commerce detection by common platform keywords
  const ecommerceSignals = [
    "shop",
    "store",
    "buy",
    "cart",
    "product",
    "shopify",
    "woocommerce",
    "magento",
    "bigcommerce",
  ];
  const isEcommerce = ecommerceSignals.some((s) => url.includes(s));

  // Simulate traffic — seed a deterministic value from the URL length
  const simulatedTraffic = (url.length * 1234) % 50000;
  const trafficMeetsThreshold = simulatedTraffic >= TRAFFIC_THRESHOLD;

  const rejectionReasons: string[] = [];
  if (!isEcommerce) {
    rejectionReasons.push(
      "Your website does not appear to be an e-commerce store. MoonTech campaigns are optimised for brands that sell products online."
    );
  }
  if (!trafficMeetsThreshold) {
    rejectionReasons.push(
      `Your website currently receives an estimated ${simulatedTraffic.toLocaleString()} monthly visits. A minimum of ${TRAFFIC_THRESHOLD.toLocaleString()} monthly visits is required to ensure campaign effectiveness.`
    );
  }

  const approved = isEcommerce && trafficMeetsThreshold;

  return {
    status: approved ? "approved" : "rejected",
    isEcommerce,
    monthlyTraffic: simulatedTraffic,
    trafficMeetsThreshold,
    rejectionReasons,
  };
}
