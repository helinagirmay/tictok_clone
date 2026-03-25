"use client";

import Link from "next/link";

// Mock data representing an existing brand with active campaign
const mockCampaign = {
  name: "Summer Collection 2024",
  status: "active",
  currentPhase: 2,
  totalPhases: 3,
  budget: 10000,
  spent: 3000,
  sales: 7200,
  currentROAS: 2.4,
  targetROAS: 5,
};

export default function DashboardPage() {
  const progressPct = (mockCampaign.spent / mockCampaign.budget) * 100;
  const roasPct = Math.min((mockCampaign.currentROAS / mockCampaign.targetROAS) * 100, 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-gray-900">MoonTech</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Acme Clothing Co.</span>
            <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 text-sm font-semibold">
              A
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-1">Monitor and manage your campaigns</p>
          </div>
          <Link href="/campaigns/new" className="btn-primary">
            + Start New Campaign
          </Link>
        </div>

        {/* Active Campaign Card */}
        <div className="card mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Active
                </span>
                <span className="text-xs text-gray-400">Phase {mockCampaign.currentPhase} of {mockCampaign.totalPhases}</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">{mockCampaign.name}</h2>
            </div>
            <button className="btn-ghost text-sm">View details</button>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <MetricCard label="Total Budget" value={`$${mockCampaign.budget.toLocaleString()}`} />
            <MetricCard label="Spent" value={`$${mockCampaign.spent.toLocaleString()}`} sub={`${progressPct.toFixed(0)}% of budget`} />
            <MetricCard label="Revenue Generated" value={`$${mockCampaign.sales.toLocaleString()}`} positive />
            <MetricCard label="Current ROAS" value={`${mockCampaign.currentROAS}x`} sub={`Target: ${mockCampaign.targetROAS}x`} />
          </div>

          {/* ROAS Progress */}
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600 font-medium">Progress to target ROAS</span>
              <span className="text-brand-600 font-semibold">{mockCampaign.currentROAS}x / {mockCampaign.targetROAS}x</span>
            </div>
            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-400 to-brand-600 rounded-full transition-all"
                style={{ width: `${roasPct}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1.5">
              Your target ROAS is projected to be achieved by Phase {mockCampaign.totalPhases}
            </p>
          </div>
        </div>

        {/* Phase Timeline */}
        <div className="card">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Campaign Phases</h3>
          <div className="space-y-3">
            <PhaseRow phase={1} label="Kickstart" budget={1000} roas={1} sales={1000} status="completed" isKickstart />
            <PhaseRow phase={2} label="Phase 2" budget={2000} roas={2} sales={4000} status="active" />
            <PhaseRow phase={3} label="Phase 3" budget={3000} roas={3} sales={9000} status="upcoming" />
          </div>
        </div>
      </main>
    </div>
  );
}

function MetricCard({
  label,
  value,
  sub,
  positive,
}: {
  label: string;
  value: string;
  sub?: string;
  positive?: boolean;
}) {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <div className="text-xs text-gray-500 font-medium mb-1">{label}</div>
      <div className={`text-xl font-bold ${positive ? "text-green-600" : "text-gray-900"}`}>{value}</div>
      {sub && <div className="text-xs text-gray-400 mt-0.5">{sub}</div>}
    </div>
  );
}

function PhaseRow({
  phase,
  label,
  budget,
  roas,
  sales,
  status,
  isKickstart,
}: {
  phase: number;
  label: string;
  budget: number;
  roas: number;
  sales: number;
  status: "completed" | "active" | "upcoming";
  isKickstart?: boolean;
}) {
  const statusConfig = {
    completed: { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500", label: "Completed" },
    active: { bg: "bg-brand-100", text: "text-brand-700", dot: "bg-brand-500", label: "Active" },
    upcoming: { bg: "bg-gray-100", text: "text-gray-500", dot: "bg-gray-300", label: "Upcoming" },
  }[status];

  return (
    <div className={`flex items-center gap-4 p-4 rounded-xl ${status === "active" ? "bg-brand-50 border border-brand-200" : "bg-gray-50"}`}>
      <div className={`step-indicator ${status === "active" ? "bg-brand-600 text-white" : status === "completed" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}`}>
        {status === "completed" ? (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        ) : phase}
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">{label}</span>
          {isKickstart && (
            <span className="text-xs bg-amber-100 text-amber-700 font-semibold px-2 py-0.5 rounded-full">Kickstart</span>
          )}
        </div>
        <div className="text-sm text-gray-500 mt-0.5">
          ${budget.toLocaleString()} budget · ROAS {roas}x target · ${sales.toLocaleString()} projected sales
        </div>
      </div>

      <div className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${statusConfig.bg} ${statusConfig.text}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`} />
        {statusConfig.label}
      </div>
    </div>
  );
}
