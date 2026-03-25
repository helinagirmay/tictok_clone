"use client";

import { useState } from "react";
import Link from "next/link";
import { runCalculator, buildStarterPack, formatCurrency } from "@/lib/calculations";
import type {
  WizardStep,
  CampaignSpecs,
  CalculatorResult,
  StarterPack,
  Phase,
} from "@/types";

// ─── Step Order ───────────────────────────────────────────────────────────────

const STEPS: WizardStep[] = [
  "campaign_type",
  "basic_specs",
  "calculator",
  "starter_pack",
  "payment",
  "integration",
  "ready",
];

const STEP_LABELS: Record<WizardStep, string> = {
  campaign_type: "Campaign Type",
  basic_specs: "Basic Specs",
  calculator: "Budget & ROAS",
  starter_pack: "Starter Pack",
  payment: "Payment",
  integration: "Integration",
  ready: "Launch",
};

// ─── Root Wizard Component ────────────────────────────────────────────────────

export default function NewCampaignPage() {
  const [step, setStep] = useState<WizardStep>("campaign_type");
  const [specs, setSpecs] = useState<CampaignSpecs | null>(null);
  const [calcResult, setCalcResult] = useState<CalculatorResult | null>(null);
  const [starterPack, setStarterPack] = useState<StarterPack | null>(null);

  const currentIndex = STEPS.indexOf(step);

  function goNext() {
    if (currentIndex < STEPS.length - 1) {
      setStep(STEPS[currentIndex + 1]);
    }
  }
  function goBack() {
    if (currentIndex > 0) {
      setStep(STEPS[currentIndex - 1]);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-gray-900">MoonTech</span>
          </Link>
          <Link href="/dashboard" className="btn-ghost text-sm">
            ← Back to Dashboard
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-10">
        {/* Progress steps */}
        {step !== "ready" && (
          <div className="mb-10">
            <div className="flex items-center justify-between relative">
              {/* Connecting line */}
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 z-0">
                <div
                  className="h-full bg-brand-500 transition-all duration-500"
                  style={{ width: `${(currentIndex / (STEPS.length - 2)) * 100}%` }}
                />
              </div>

              {STEPS.filter((s) => s !== "ready").map((s, i) => {
                const isDone = i < currentIndex;
                const isCurrent = s === step;
                return (
                  <div key={s} className="flex flex-col items-center z-10">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-colors
                        ${isDone ? "bg-brand-600 border-brand-600 text-white" :
                          isCurrent ? "bg-white border-brand-600 text-brand-600" :
                          "bg-white border-gray-200 text-gray-400"}`}
                    >
                      {isDone ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : i + 1}
                    </div>
                    <span className={`mt-1.5 text-xs font-medium hidden sm:block ${isCurrent ? "text-brand-600" : isDone ? "text-gray-500" : "text-gray-400"}`}>
                      {STEP_LABELS[s]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step content */}
        {step === "campaign_type" && <StepCampaignType onNext={goNext} />}
        {step === "basic_specs" && (
          <StepBasicSpecs
            onNext={(data) => { setSpecs(data); goNext(); }}
            onBack={goBack}
          />
        )}
        {step === "calculator" && (
          <StepCalculator
            onNext={(result, pack) => { setCalcResult(result); setStarterPack(pack); goNext(); }}
            onBack={goBack}
          />
        )}
        {step === "starter_pack" && starterPack && calcResult && (
          <StepStarterPack
            pack={starterPack}
            calcResult={calcResult}
            specs={specs}
            onNext={goNext}
            onBack={goBack}
          />
        )}
        {step === "payment" && calcResult && starterPack && (
          <StepPayment
            kickstartAmount={starterPack.phases[0]?.budget ?? 1000}
            onNext={goNext}
            onBack={goBack}
          />
        )}
        {step === "integration" && (
          <StepIntegration onNext={goNext} onBack={goBack} />
        )}
        {step === "ready" && <StepReady specs={specs} />}
      </main>
    </div>
  );
}

// ─── Step 1: Campaign Type ────────────────────────────────────────────────────

function StepCampaignType({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Start a New Campaign</h2>
        <p className="text-gray-500 mt-1">Choose the campaign type that fits your goals.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* E-commerce Sales — active */}
        <button
          onClick={onNext}
          className="card text-left group hover:border-brand-400 hover:shadow-md transition-all cursor-pointer border-2 border-transparent"
        >
          <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center mb-4 group-hover:bg-brand-200 transition-colors">
            <svg className="w-6 h-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900">E-commerce Sales</h3>
            <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">ROAS Guaranteed</span>
          </div>
          <p className="text-sm text-gray-600">
            Drive measurable sales with a phased approach. Your ROAS target is guaranteed through our starter pack model.
          </p>
          <div className="mt-4 text-brand-600 text-sm font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
            Select <span>→</span>
          </div>
        </button>

        {/* Awareness — coming soon */}
        <div className="card opacity-60 cursor-not-allowed border-2 border-transparent relative overflow-hidden">
          <div className="absolute top-3 right-3 text-xs bg-gray-100 text-gray-500 font-semibold px-2 py-0.5 rounded-full">
            Coming Soon
          </div>
          <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-500 mb-1">Awareness Campaign</h3>
          <p className="text-sm text-gray-400">
            Grow brand visibility and reach new audiences. This campaign type is coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Step 2: Basic Specs ──────────────────────────────────────────────────────

function StepBasicSpecs({
  onNext,
  onBack,
}: {
  onNext: (data: CampaignSpecs) => void;
  onBack: () => void;
}) {
  const [form, setForm] = useState<CampaignSpecs>({
    name: "",
    productCategory: "",
    targetAudience: "",
    targetRegion: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onNext(form);
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Campaign Details</h2>
        <p className="text-gray-500 mt-1">Tell us about what you&apos;re promoting.</p>
      </div>
      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="label">Campaign name</label>
            <input
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g. Summer Sale 2024"
            />
          </div>
          <div>
            <label className="label">Product category</label>
            <select name="productCategory" required value={form.productCategory} onChange={handleChange} className="input-field">
              <option value="">Select a category…</option>
              <option value="fashion">Fashion & Apparel</option>
              <option value="beauty">Beauty & Personal Care</option>
              <option value="electronics">Electronics & Gadgets</option>
              <option value="home">Home & Living</option>
              <option value="sports">Sports & Outdoors</option>
              <option value="food">Food & Beverages</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="label">Target audience</label>
            <input
              name="targetAudience"
              type="text"
              required
              value={form.targetAudience}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g. Women aged 25–40, interested in fitness"
            />
          </div>
          <div>
            <label className="label">Target region</label>
            <select name="targetRegion" required value={form.targetRegion} onChange={handleChange} className="input-field">
              <option value="">Select a region…</option>
              <option value="uae">United Arab Emirates</option>
              <option value="ksa">Saudi Arabia</option>
              <option value="gcc">GCC (All countries)</option>
              <option value="levant">Levant Region</option>
              <option value="mena">MENA</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onBack} className="btn-secondary flex-1">Back</button>
            <button type="submit" className="btn-primary flex-1">Continue</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Step 3: Calculator ───────────────────────────────────────────────────────

function StepCalculator({
  onNext,
  onBack,
}: {
  onNext: (result: CalculatorResult, pack: StarterPack) => void;
  onBack: () => void;
}) {
  const [budget, setBudget] = useState("");
  const [targetROAS, setTargetROAS] = useState("");
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [pack, setPack] = useState<StarterPack | null>(null);

  function calculate() {
    const b = parseFloat(budget);
    const r = parseFloat(targetROAS);
    if (isNaN(b) || isNaN(r) || b <= 0 || r <= 0) return;
    const res = runCalculator(b, r);
    const p = buildStarterPack(b, r);
    setResult(res);
    setPack(p);
  }

  const confidenceConfig = result
    ? {
        high: { color: "text-green-700", bg: "bg-green-50 border-green-200", badge: "bg-green-100 text-green-700", label: "High Confidence" },
        mid: { color: "text-amber-700", bg: "bg-amber-50 border-amber-200", badge: "bg-amber-100 text-amber-700", label: "Mid Confidence" },
        low: { color: "text-red-700", bg: "bg-red-50 border-red-200", badge: "bg-red-100 text-red-700", label: "Low Confidence" },
      }[result.confidence]
    : null;

  const canProceed = result && (result.confidence === "high" || result.confidence === "mid");

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Budget & ROAS Calculator</h2>
        <p className="text-gray-500 mt-1">
          Enter your total budget and target Return on Ad Spend. We&apos;ll calculate your confidence level and phase plan.
        </p>
      </div>

      <div className="card mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
          <div>
            <label className="label">Total Campaign Budget (USD)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
              <input
                type="number"
                min={1000}
                step={500}
                value={budget}
                onChange={(e) => { setBudget(e.target.value); setResult(null); }}
                className="input-field pl-8"
                placeholder="e.g. 10,000"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">Minimum $1,000</p>
          </div>
          <div>
            <label className="label">Target ROAS</label>
            <div className="relative">
              <input
                type="number"
                min={1}
                step={0.5}
                value={targetROAS}
                onChange={(e) => { setTargetROAS(e.target.value); setResult(null); }}
                className="input-field pr-8"
                placeholder="e.g. 5"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">x</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Target return for every $1 spent</p>
          </div>
        </div>

        <button onClick={calculate} disabled={!budget || !targetROAS} className="btn-primary w-full">
          Calculate Confidence
        </button>
      </div>

      {result && confidenceConfig && (
        <div className={`card border mb-4 ${confidenceConfig.bg}`}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold mb-2 ${confidenceConfig.badge}`}>
                {result.confidence === "high" && (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                {result.confidence === "mid" && (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                )}
                {result.confidence === "low" && (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                {confidenceConfig.label}
              </div>
              <p className={`text-sm ${confidenceConfig.color}`}>{result.confidenceReason}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/60">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{formatCurrency(result.budget)}</div>
              <div className="text-xs text-gray-500">Total Budget</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{result.targetROAS}x</div>
              <div className="text-xs text-gray-500">Target ROAS</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{formatCurrency(result.targetSales)}</div>
              <div className="text-xs text-gray-500">Target Sales</div>
            </div>
          </div>

          {result.confidence === "low" && (
            <div className="mt-4 p-3 bg-white/70 rounded-lg text-sm text-red-700">
              <strong>You cannot proceed with this configuration.</strong> Try increasing your budget or lowering your ROAS target.
            </div>
          )}
        </div>
      )}

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-secondary flex-1">Back</button>
        <button
          onClick={() => pack && result && onNext(result, pack)}
          disabled={!canProceed}
          className="btn-primary flex-1"
        >
          View My Starter Pack
        </button>
      </div>
    </div>
  );
}

// ─── Step 4: Starter Pack ─────────────────────────────────────────────────────

function StepStarterPack({
  pack,
  calcResult,
  specs,
  onNext,
  onBack,
}: {
  pack: StarterPack;
  calcResult: CalculatorResult;
  specs: CampaignSpecs | null;
  onNext: () => void;
  onBack: () => void;
}) {
  const totalInitialBudget = pack.phases.reduce((s, p) => s + p.budget, 0);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Your Starter Pack</h2>
        <p className="text-gray-500 mt-1">
          Here&apos;s how we&apos;ll scale {specs?.name ? `"${specs.name}"` : "your campaign"} to reach your {calcResult.targetROAS}x ROAS target.
        </p>
      </div>

      {/* Goal summary banner */}
      <div className="bg-brand-50 border border-brand-200 rounded-2xl p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span className="font-semibold text-brand-800">Campaign Goal</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-xl font-bold text-gray-900">{formatCurrency(calcResult.budget)}</div>
            <div className="text-xs text-gray-500">Total Budget</div>
          </div>
          <div>
            <div className="text-xl font-bold text-gray-900">{calcResult.targetROAS}x ROAS</div>
            <div className="text-xs text-gray-500">Target Return</div>
          </div>
          <div>
            <div className="text-xl font-bold text-green-600">{formatCurrency(calcResult.targetSales)}</div>
            <div className="text-xs text-gray-500">Target Sales</div>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-brand-200 text-sm text-brand-700">
          Your expected ROAS will be achieved in{" "}
          <strong>Phase {pack.roasAchievedAtPhase}</strong>.
        </div>
      </div>

      {/* Phase cards */}
      <div className="space-y-3 mb-6">
        {pack.phases.map((phase) => (
          <PhaseCard key={phase.phaseNumber} phase={phase} isFirst={phase.phaseNumber === 1} />
        ))}

        {/* Remaining budget summary */}
        {pack.remainingBudgetAfterPhases > 0 && (
          <div className="card border border-dashed border-gray-200 bg-gray-50 opacity-75">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">Remaining Budget</div>
                <div className="text-xs text-gray-400 mt-0.5">
                  Additional phases will be suggested after initial phases complete
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-700">{formatCurrency(pack.remainingBudgetAfterPhases)}</div>
                <div className="text-xs text-gray-400">at ~{pack.requiredROASForRemaining}x ROAS</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pay first phase CTA */}
      <div className="card bg-gradient-to-r from-brand-600 to-brand-700 border-0 text-white mb-4">
        <h3 className="font-bold text-lg mb-1">Ready to get started?</h3>
        <p className="text-brand-200 text-sm mb-4">
          To launch your Kickstart phase and begin building momentum, pay{" "}
          <strong className="text-white">{formatCurrency(pack.phases[0]?.budget ?? 1000)}</strong> to activate Phase 1.
          The full plan uses {formatCurrency(totalInitialBudget)} across {pack.phases.length} initial phases.
        </p>
        <button onClick={onNext} className="bg-white text-brand-700 font-semibold px-6 py-2.5 rounded-lg hover:bg-brand-50 transition-colors">
          Proceed to Payment →
        </button>
      </div>

      <button onClick={onBack} className="btn-ghost w-full">Back to Calculator</button>
    </div>
  );
}

function PhaseCard({ phase, isFirst }: { phase: Phase; isFirst: boolean }) {
  return (
    <div className={`card border-2 transition-all ${isFirst ? "border-amber-300 bg-amber-50 shadow-md" : "border-transparent"}`}>
      <div className="flex items-start gap-4">
        {/* Phase number */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm
          ${isFirst ? "bg-amber-500 text-white" : "bg-brand-100 text-brand-700"}`}>
          {isFirst ? "★" : phase.phaseNumber}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-gray-900">{phase.label}</span>
            {isFirst && (
              <span className="text-xs bg-amber-200 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                KICKSTART — Start here
              </span>
            )}
          </div>
          <div className="grid grid-cols-3 gap-3 mt-2">
            <div>
              <div className="text-base font-bold text-gray-900">{formatCurrency(phase.budget)}</div>
              <div className="text-xs text-gray-500">Budget</div>
            </div>
            <div>
              <div className="text-base font-bold text-gray-900">{phase.targetROAS}x</div>
              <div className="text-xs text-gray-500">Target ROAS</div>
            </div>
            <div>
              <div className="text-base font-bold text-green-600">{formatCurrency(phase.projectedSales)}</div>
              <div className="text-xs text-gray-500">Projected Sales</div>
            </div>
          </div>
        </div>
      </div>

      {isFirst && (
        <div className="mt-3 pt-3 border-t border-amber-200 text-xs text-amber-700">
          This is your entry point. It sets the foundation and validates momentum before scaling budget and ROAS.
        </div>
      )}
    </div>
  );
}

// ─── Step 5: Payment ──────────────────────────────────────────────────────────

function StepPayment({
  kickstartAmount,
  onNext,
  onBack,
}: {
  kickstartAmount: number;
  onNext: () => void;
  onBack: () => void;
}) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  async function handlePay(e: React.FormEvent) {
    e.preventDefault();
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsProcessing(false);
    onNext();
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Payment</h2>
        <p className="text-gray-500 mt-1">
          Pay for your Kickstart phase to activate your campaign.
        </p>
      </div>

      {/* Amount summary */}
      <div className="card bg-brand-50 border border-brand-200 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-gray-900">Kickstart Phase — Phase 1</div>
            <div className="text-sm text-gray-500 mt-0.5">ROAS 1x target · Entry campaign</div>
          </div>
          <div className="text-2xl font-bold text-brand-700">{formatCurrency(kickstartAmount)}</div>
        </div>
      </div>

      {/* Payment form */}
      <div className="card">
        <form onSubmit={handlePay} className="space-y-5">
          <div>
            <label className="label">Cardholder name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              placeholder="Sarah Johnson"
            />
          </div>
          <div>
            <label className="label">Card number</label>
            <input
              type="text"
              required
              maxLength={19}
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim())}
              className="input-field font-mono"
              placeholder="4242 4242 4242 4242"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Expiry</label>
              <input
                type="text"
                required
                maxLength={5}
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="input-field font-mono"
                placeholder="MM/YY"
              />
            </div>
            <div>
              <label className="label">CVV</label>
              <input
                type="text"
                required
                maxLength={4}
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="input-field font-mono"
                placeholder="123"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onBack} className="btn-secondary flex-1" disabled={isProcessing}>
              Back
            </button>
            <button type="submit" className="btn-primary flex-1" disabled={isProcessing}>
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Processing…
                </span>
              ) : (
                `Pay ${formatCurrency(kickstartAmount)}`
              )}
            </button>
          </div>
        </form>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-gray-400">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Secured with 256-bit SSL encryption
        </div>
      </div>
    </div>
  );
}

// ─── Step 6: Integration ──────────────────────────────────────────────────────

function StepIntegration({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Integration Setup</h2>
        <p className="text-gray-500 mt-1">
          We need to connect with your e-commerce system to track campaign performance and revenue.
        </p>
      </div>

      {/* What this involves */}
      <div className="card mb-4">
        <h3 className="font-semibold text-gray-900 mb-3">What we&apos;ll set up</h3>
        <div className="space-y-3">
          <IntegrationItem
            icon="🔗"
            title="E-commerce system integration"
            description="Connect your store (Shopify, WooCommerce, or custom) to track orders and revenue attributed to MoonTech campaigns."
          />
          <IntegrationItem
            icon="🎟️"
            title="Coupon acquisition"
            description="We&apos;ll work with your team to create and manage discount coupons used in campaign tracking."
          />
          <IntegrationItem
            icon="📊"
            title="Revenue attribution"
            description="Set up tracking to measure the direct impact of each campaign phase on your sales and ROAS."
          />
        </div>
      </div>

      {/* Manual outreach notice */}
      <div className="card border border-blue-200 bg-blue-50 mb-6">
        <div className="flex gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
            <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-blue-800">
              Our team will reach out to you to complete the setup with your system in order to track the impact of MoonTech campaigns on your sales and revenue.
            </p>
            <p className="text-sm text-blue-700 mt-2">
              If our team doesn&apos;t reach out within{" "}
              <strong>two business days</strong>, please contact us at{" "}
              <a href="mailto:integrations@moontech.io" className="underline font-medium">
                integrations@moontech.io
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Acknowledgement */}
      <label className="flex items-start gap-3 cursor-pointer mb-6">
        <input
          type="checkbox"
          checked={acknowledged}
          onChange={(e) => setAcknowledged(e.target.checked)}
          className="mt-1 w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
        />
        <span className="text-sm text-gray-700">
          I understand that the MoonTech team will contact me to complete the technical integration before the campaign goes live.
        </span>
      </label>

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-secondary flex-1">Back</button>
        <button onClick={onNext} disabled={!acknowledged} className="btn-primary flex-1">
          Continue
        </button>
      </div>
    </div>
  );
}

function IntegrationItem({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3 p-3 bg-gray-50 rounded-xl">
      <span className="text-xl flex-shrink-0">{icon}</span>
      <div>
        <div className="font-medium text-gray-900 text-sm">{title}</div>
        <div className="text-xs text-gray-500 mt-0.5">{description}</div>
      </div>
    </div>
  );
}

// ─── Step 7: Campaign Ready ───────────────────────────────────────────────────

function StepReady({ specs }: { specs: CampaignSpecs | null }) {
  return (
    <div className="text-center py-8">
      {/* Success animation */}
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6 animate-bounce">
        <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        Campaign is ready to run!
      </h2>
      <p className="text-gray-500 mb-2">
        {specs?.name ? `"${specs.name}" has` : "Your campaign has"} been set up successfully.
        Your Kickstart phase is ready — our team will reach out within 2 business days to finalize your integration.
      </p>
      <p className="text-sm text-gray-400 mb-10">
        Once integration is complete, your campaign will go live and start generating results.
      </p>

      {/* Next steps */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10 text-left">
        <div className="card text-center">
          <div className="text-2xl mb-2">📬</div>
          <div className="font-medium text-gray-900 text-sm">Check your email</div>
          <div className="text-xs text-gray-500 mt-1">Confirmation and next steps sent to your inbox</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl mb-2">🤝</div>
          <div className="font-medium text-gray-900 text-sm">Team outreach</div>
          <div className="text-xs text-gray-500 mt-1">We&apos;ll contact you within 2 business days for integration</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl mb-2">🚀</div>
          <div className="font-medium text-gray-900 text-sm">Campaign goes live</div>
          <div className="text-xs text-gray-500 mt-1">Track performance directly in your dashboard</div>
        </div>
      </div>

      <Link href="/dashboard" className="btn-primary text-base px-10 py-4">
        Go to Dashboard →
      </Link>
    </div>
  );
}
