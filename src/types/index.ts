// ─── Brand & Auth ─────────────────────────────────────────────────────────────

export interface Brand {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  websiteUrl: string;
  isNew: boolean;
  eligibilityStatus: EligibilityStatus;
}

export type EligibilityStatus = "pending" | "approved" | "rejected";

export interface EligibilityResult {
  status: EligibilityStatus;
  isEcommerce: boolean;
  monthlyTraffic: number;
  trafficMeetsThreshold: boolean;
  rejectionReasons: string[];
}

// ─── Campaign ─────────────────────────────────────────────────────────────────

export type CampaignType = "ecommerce_sales" | "awareness";

export interface CampaignSpecs {
  name: string;
  productCategory: string;
  targetAudience: string;
  targetRegion: string;
}

export type ConfidenceLevel = "high" | "mid" | "low";

export interface CalculatorResult {
  budget: number;
  targetROAS: number;
  targetSales: number;
  confidence: ConfidenceLevel;
  confidenceReason: string;
}

// ─── Starter Pack / Phased Campaign ───────────────────────────────────────────

export interface Phase {
  phaseNumber: number;
  label: string;
  budget: number;
  targetROAS: number;
  projectedSales: number;
  isKickstart: boolean;
}

export interface StarterPack {
  phases: Phase[];
  totalBudget: number;
  totalProjectedSales: number;
  roasAchievedAtPhase: number;
  remainingBudgetAfterPhases: number;
  requiredROASForRemaining: number;
}

// ─── Campaign Wizard State ────────────────────────────────────────────────────

export type WizardStep =
  | "campaign_type"
  | "basic_specs"
  | "calculator"
  | "starter_pack"
  | "payment"
  | "integration"
  | "ready";

export interface WizardState {
  step: WizardStep;
  campaignType?: CampaignType;
  specs?: CampaignSpecs;
  calculatorResult?: CalculatorResult;
  starterPack?: StarterPack;
  paymentComplete?: boolean;
}
