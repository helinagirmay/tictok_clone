"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { checkEligibility } from "@/lib/eligibility";

interface FormData {
  companyName: string;
  contactName: string;
  email: string;
  password: string;
  websiteUrl: string;
}

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    companyName: "",
    contactName: "",
    email: "",
    password: "",
    websiteUrl: "",
  });
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!form.websiteUrl.startsWith("http")) {
      setError("Please enter a valid website URL starting with https://");
      return;
    }

    setIsChecking(true);

    // Simulate async eligibility check (SEMrush in production)
    await new Promise((r) => setTimeout(r, 1800));
    const result = checkEligibility(form.websiteUrl);

    // Persist to sessionStorage for next page
    sessionStorage.setItem("brand_signup", JSON.stringify(form));
    sessionStorage.setItem("eligibility_result", JSON.stringify(result));

    setIsChecking(false);
    router.push("/eligibility");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
        <Link href="/" className="flex items-center justify-center gap-2 mb-6">
          <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-gray-900">MoonTech</span>
        </Link>
        <h1 className="text-center text-3xl font-bold text-gray-900">Create your brand account</h1>
        <p className="mt-2 text-center text-gray-600">
          We&apos;ll check your website eligibility as part of sign-up so you know right away if you&apos;re ready to launch.
        </p>
      </div>

      {/* Form Card */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Company name */}
            <div>
              <label htmlFor="companyName" className="label">Company name</label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                required
                value={form.companyName}
                onChange={handleChange}
                className="input-field"
                placeholder="Acme Clothing Co."
              />
            </div>

            {/* Contact name */}
            <div>
              <label htmlFor="contactName" className="label">Your full name</label>
              <input
                id="contactName"
                name="contactName"
                type="text"
                required
                value={form.contactName}
                onChange={handleChange}
                className="input-field"
                placeholder="Sarah Johnson"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="label">Work email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="input-field"
                placeholder="sarah@acmeclothing.com"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="label">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                value={form.password}
                onChange={handleChange}
                className="input-field"
                placeholder="Min. 8 characters"
              />
            </div>

            {/* Website URL — eligibility check trigger */}
            <div>
              <label htmlFor="websiteUrl" className="label">
                Your e-commerce website URL
                <span className="ml-1.5 text-xs text-brand-600 font-normal">Used for eligibility check</span>
              </label>
              <input
                id="websiteUrl"
                name="websiteUrl"
                type="url"
                required
                value={form.websiteUrl}
                onChange={handleChange}
                className="input-field"
                placeholder="https://www.acmeclothing.com"
              />
              <p className="mt-1.5 text-xs text-gray-500">
                We verify your website is an e-commerce store with sufficient traffic before you proceed to campaign setup.
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isChecking}
              className="btn-primary w-full mt-2"
            >
              {isChecking ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Checking your website eligibility…
                </span>
              ) : (
                "Create Account & Check Eligibility"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/dashboard" className="text-brand-600 font-medium hover:text-brand-700">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
