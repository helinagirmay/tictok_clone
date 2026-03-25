import type {
  CalculatorResult,
  ConfidenceLevel,
  Phase,
  StarterPack,
} from "@/types";

const KICKSTART_BUDGET = 1000;
const MAX_INITIAL_PHASES = 3;

// ─── Confidence Scoring ───────────────────────────────────────────────────────

/**
 * Calculates confidence level for achieving the desired ROAS.
 *
 * Logic:
 *  - We build the 3 initial ramp-up phases (ROAS 1 → 2 → 3).
 *  - Whatever budget remains after those phases must generate the
 *    remaining sales at a higher ROAS.
 *  - The required ROAS on that remaining budget determines confidence.
 *
 * Thresholds (aligned with Mansour's note — only High or Mid can proceed):
 *   High  → required remaining ROAS ≤ 5
 *   Mid   → required remaining ROAS ≤ 10
 *   Low   → required remaining ROAS > 10  (blocked from proceeding)
 */
export function calculateConfidence(
  budget: number,
  targetROAS: number
): ConfidenceLevel {
  if (budget < KICKSTART_BUDGET) return "low";

  const { requiredROASForRemaining } = buildStarterPack(budget, targetROAS);

  if (requiredROASForRemaining <= 5) return "high";
  if (requiredROASForRemaining <= 10) return "mid";
  return "low";
}

function confidenceReason(
  level: ConfidenceLevel,
  targetROAS: number,
  budget: number
): string {
  switch (level) {
    case "high":
      return `Your target of ROAS ${targetROAS}x on a $${budget.toLocaleString()} budget is highly achievable. We project strong results across your phased campaigns.`;
    case "mid":
      return `Your target of ROAS ${targetROAS}x on a $${budget.toLocaleString()} budget is achievable with the right execution. We recommend proceeding with the phased plan.`;
    case "low":
      return `Your target of ROAS ${targetROAS}x on a $${budget.toLocaleString()} budget is outside our current confidence range. Try lowering your ROAS target or increasing your budget.`;
  }
}

export function runCalculator(
  budget: number,
  targetROAS: number
): CalculatorResult {
  const confidence = calculateConfidence(budget, targetROAS);
  return {
    budget,
    targetROAS,
    targetSales: budget * targetROAS,
    confidence,
    confidenceReason: confidenceReason(confidence, targetROAS, budget),
  };
}

// ─── Starter Pack (Phased Campaign) ──────────────────────────────────────────

/**
 * Builds a Starter Pack of up to MAX_INITIAL_PHASES campaigns.
 *
 * Phase allocation (based on Mansour's example with $10k / ROAS 5):
 *   Phase 1 (Kickstart): $1,000  at ROAS 1  → emphasis on entry point
 *   Phase 2:             20% of budget at ROAS 2
 *   Phase 3:             30% of budget at ROAS 3
 *
 * The remaining budget (≈40%) is consumed by additional campaigns
 * at a higher ROAS computed to meet the overall target.
 * The last segment uses the smallest budget slice (Mansour: "last campaign
 * should have lowest budget since ROAS is super high").
 */
export function buildStarterPack(
  budget: number,
  targetROAS: number
): StarterPack {
  const targetSales = budget * targetROAS;
  const phases: Phase[] = [];

  // Phase 1 — Kickstart
  const p1Budget = Math.min(KICKSTART_BUDGET, budget);
  phases.push(makePhase(1, "Kickstart", p1Budget, 1, true));

  if (budget > KICKSTART_BUDGET) {
    // Phase 2
    const p2Budget = Math.round(budget * 0.2);
    phases.push(makePhase(2, "Phase 2", p2Budget, 2, false));

    const usedAfterP2 = p1Budget + p2Budget;
    if (budget > usedAfterP2 && phases.length < MAX_INITIAL_PHASES) {
      // Phase 3 — use 30% of original budget
      const p3Budget = Math.round(budget * 0.3);
      phases.push(makePhase(3, "Phase 3", p3Budget, 3, false));
    }
  }

  const usedBudget = phases.reduce((s, p) => s + p.budget, 0);
  const generatedSales = phases.reduce((s, p) => s + p.projectedSales, 0);

  const remainingBudget = budget - usedBudget;
  const remainingSales = targetSales - generatedSales;
  const requiredROASForRemaining =
    remainingBudget > 0 ? remainingSales / remainingBudget : 0;

  // Find which phase the target ROAS is first "achieved"
  let cumulativeSales = 0;
  let roasAchievedAtPhase = phases.length;
  for (const phase of phases) {
    cumulativeSales += phase.projectedSales;
    const cumulativeBudget = phases
      .slice(0, phase.phaseNumber)
      .reduce((s, p) => s + p.budget, 0);
    const runningROAS = cumulativeSales / cumulativeBudget;
    if (runningROAS >= targetROAS) {
      roasAchievedAtPhase = phase.phaseNumber;
      break;
    }
  }

  const totalProjectedSales = phases.reduce((s, p) => s + p.projectedSales, 0);

  return {
    phases,
    totalBudget: budget,
    totalProjectedSales,
    roasAchievedAtPhase,
    remainingBudgetAfterPhases: remainingBudget,
    requiredROASForRemaining: Math.round(requiredROASForRemaining * 10) / 10,
  };
}

function makePhase(
  phaseNumber: number,
  label: string,
  budget: number,
  targetROAS: number,
  isKickstart: boolean
): Phase {
  return {
    phaseNumber,
    label,
    budget,
    targetROAS,
    projectedSales: budget * targetROAS,
    isKickstart,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
