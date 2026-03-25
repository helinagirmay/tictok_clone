import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-brand-950 via-brand-800 to-brand-600 px-4">
      <div className="text-center max-w-2xl">
        {/* Logo */}
        <div className="inline-flex items-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">MoonTech</span>
        </div>

        <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
          Guaranteed ROAS.<br />Real Results.
        </h1>
        <p className="text-brand-200 text-lg mb-10 leading-relaxed">
          Launch performance-driven e-commerce campaigns with a phased approach
          designed to scale your sales predictably.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup" className="btn-primary bg-white text-brand-700 hover:bg-brand-50">
            Start as a New Brand
          </Link>
          <Link href="/dashboard" className="btn-secondary bg-transparent text-white border-white/30 hover:bg-white/10">
            Existing Brand? Log In
          </Link>
        </div>
      </div>

      {/* Social proof */}
      <div className="mt-20 flex items-center gap-8 text-brand-300 text-sm">
        <div className="text-center">
          <div className="text-3xl font-bold text-white">500+</div>
          <div>Brands launched</div>
        </div>
        <div className="w-px h-10 bg-white/20" />
        <div className="text-center">
          <div className="text-3xl font-bold text-white">4.8x</div>
          <div>Average ROAS</div>
        </div>
        <div className="w-px h-10 bg-white/20" />
        <div className="text-center">
          <div className="text-3xl font-bold text-white">$12M+</div>
          <div>In brand revenue</div>
        </div>
      </div>
    </main>
  );
}
