"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { EligibilityResult } from "@/types";

export default function EligibilityPage() {
  const router = useRouter();
  const [result, setResult] = useState<EligibilityResult | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [showMoreInfoForm, setShowMoreInfoForm] = useState(false);
  const [moreInfo, setMoreInfo] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("eligibility_result");
    const brandRaw = sessionStorage.getItem("brand_signup");
    if (!raw) {
      router.replace("/signup");
      return;
    }
    setResult(JSON.parse(raw) as EligibilityResult);
    if (brandRaw) {
      const brand = JSON.parse(brandRaw);
      setCompanyName(brand.companyName || "");
    }
  }, [router]);

  if (!result) return null;

  const isApproved = result.status === "approved";

  function handleSubmitMoreInfo(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-gray-900">MoonTech</span>
        </Link>

        <div className="card text-center">
          {isApproved ? (
            <>
              {/* Approved */}
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {companyName ? `${companyName} is approved!` : "You're approved!"}
              </h1>
              <p className="text-gray-600 mb-6">
                Your website meets our requirements. You&apos;re all set to create your first campaign.
              </p>

              {/* Stats row */}
              <div className="flex justify-center gap-8 py-4 border-y border-gray-100 mb-6">
                <div>
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">E-commerce</span>
                  </div>
                  <div className="text-xs text-gray-500">Verified</div>
                </div>
                <div className="w-px bg-gray-100" />
                <div>
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">
                      {result.monthlyTraffic.toLocaleString()} visits/mo
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">Above 5,000 threshold</div>
                </div>
              </div>

              <Link href="/dashboard" className="btn-primary w-full">
                Continue to Dashboard
              </Link>
            </>
          ) : (
            <>
              {/* Rejected */}
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Not eligible yet
              </h1>
              <p className="text-gray-600 mb-6">
                Your website doesn&apos;t currently meet our campaign eligibility requirements. Here&apos;s what we found:
              </p>

              {/* Rejection reasons */}
              <div className="space-y-3 mb-6 text-left">
                {/* E-commerce check */}
                <div className={`flex gap-3 p-3 rounded-lg ${result.isEcommerce ? "bg-green-50" : "bg-red-50"}`}>
                  <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${result.isEcommerce ? "bg-green-200" : "bg-red-200"}`}>
                    {result.isEcommerce ? (
                      <svg className="w-3 h-3 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <div className={`text-sm font-medium ${result.isEcommerce ? "text-green-800" : "text-red-800"}`}>
                      E-commerce store
                    </div>
                    <div className={`text-xs mt-0.5 ${result.isEcommerce ? "text-green-700" : "text-red-700"}`}>
                      {result.isEcommerce
                        ? "Your website was identified as an e-commerce store."
                        : "Your website does not appear to be an e-commerce store."}
                    </div>
                  </div>
                </div>

                {/* Traffic check */}
                <div className={`flex gap-3 p-3 rounded-lg ${result.trafficMeetsThreshold ? "bg-green-50" : "bg-red-50"}`}>
                  <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${result.trafficMeetsThreshold ? "bg-green-200" : "bg-red-200"}`}>
                    {result.trafficMeetsThreshold ? (
                      <svg className="w-3 h-3 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <div className={`text-sm font-medium ${result.trafficMeetsThreshold ? "text-green-800" : "text-red-800"}`}>
                      Monthly traffic
                    </div>
                    <div className={`text-xs mt-0.5 ${result.trafficMeetsThreshold ? "text-green-700" : "text-red-700"}`}>
                      {result.trafficMeetsThreshold
                        ? `${result.monthlyTraffic.toLocaleString()} visits/mo — above the 5,000 minimum.`
                        : `Estimated ${result.monthlyTraffic.toLocaleString()} visits/mo — minimum required is 5,000.`}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit more info */}
              {!submitted ? (
                <>
                  {!showMoreInfoForm ? (
                    <div className="space-y-3">
                      <button
                        onClick={() => setShowMoreInfoForm(true)}
                        className="btn-primary w-full"
                      >
                        Submit more information
                      </button>
                      <Link href="/signup" className="btn-ghost w-full">
                        Go back to sign-up
                      </Link>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitMoreInfo} className="text-left space-y-3">
                      <label className="label">
                        Tell us more about your business and why you believe you meet the requirements
                      </label>
                      <textarea
                        required
                        value={moreInfo}
                        onChange={(e) => setMoreInfo(e.target.value)}
                        rows={4}
                        className="input-field resize-none"
                        placeholder="e.g. We recently re-platformed to Shopify. Our Google Analytics shows 8,000+ monthly users…"
                      />
                      <button type="submit" className="btn-primary w-full">
                        Submit for Manual Review
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowMoreInfoForm(false)}
                        className="btn-ghost w-full"
                      >
                        Cancel
                      </button>
                    </form>
                  )}
                </>
              ) : (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium">Request submitted!</p>
                  <p className="text-xs text-blue-700 mt-1">
                    Our team will review your information and get back to you within 2 business days.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
