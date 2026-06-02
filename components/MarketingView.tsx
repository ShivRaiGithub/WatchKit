"use client";

import React, { useState } from "react";
import {
  Eye,
  Bolt,
  ShieldCheck,
  LayoutDashboard,
  Code2,
  Users2,
  Cpu,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Check,
  Minus
} from "lucide-react";
import { motion } from "motion/react";

interface MarketingViewProps {
  onNavigate: (view: "landing" | "pricing" | "dashboard") => void;
}

export default function MarketingView({ onNavigate }: MarketingViewProps) {
  const [activeTab, setActiveTab] = useState<"React" | "Next.js" | "Vue" | "Nuxt">("React");

  const codeSnippets = {
    React: `// 1. Install package
npm install @watchkit/react-sdk

// 2. Initialize in App.tsx
import { WatchKitProvider } from "@watchkit/react-sdk";

export default function App() {
  return (
    <WatchKitProvider apiKey="wk_live_53e6..." siteId="acme-corp">
      <MainApp />
    </WatchKitProvider>
  );
}`,
    "Next.js": `// 1. Install package
npm install @watchkit/nextjs

// 2. Wrap in app/layout.tsx
import { WatchKitAnalytics } from "@watchkit/nextjs";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <WatchKitAnalytics siteId="acme-corp" />
      </body>
    </html>
  );
}`,
    Vue: `// 1. Install package
npm install @watchkit/vue-sdk

// 2. Register plugin in main.js
import { createApp } from "vue";
import { WatchKitPlugin } from "@watchkit/vue-sdk";

const app = createApp(App);
app.use(WatchKitPlugin, {
  apiKey: "wk_live_53e6...",
  siteId: "acme-corp"
});`,
    Nuxt: `// 1. Install package
npm install @watchkit/nuxt-module

// 2. Add to nuxt.config.ts
export default defineNuxtConfig({
  modules: ["@watchkit/nuxt-module"],
  watchkit: {
    siteId: "acme-corp"
  }
});`
  };

  return (
    <div className="bg-[#fcf8ff] text-[#1b1a27] font-sans antialiased min-h-screen">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-[#e5e7eb] px-4 md:px-10 py-4 shadow-sm">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-2 cursor-pointer active:opacity-75" onClick={() => onNavigate("landing")}>
            <Eye className="text-[#6C47FF] w-6 h-6" />
            <span className="text-xl font-bold text-[#6C47FF] tracking-tight">WatchKit</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => onNavigate("landing")}
              className="text-[#6C47FF] font-bold hover:opacity-80 transition-opacity cursor-pointer text-sm"
            >
              Features
            </button>
            <button
              onClick={() => onNavigate("pricing")}
              className="text-[#484556] hover:text-[#6C47FF] transition-colors cursor-pointer text-sm font-semibold"
            >
              Pricing
            </button>
            <button
              onClick={() => onNavigate("dashboard")}
              className="text-[#484556] hover:text-[#6C47FF] transition-colors cursor-pointer text-sm font-semibold"
            >
              Dashboard Demo
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate("dashboard")}
              className="text-sm font-bold text-[#484556] hover:text-[#6C47FF] cursor-pointer transition-colors"
            >
              Log In
            </button>
            <button
              onClick={() => onNavigate("dashboard")}
              className="bg-[#6C47FF] hover:bg-[#5e35f1] text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-all shadow-[0_4px_12px_rgba(108,71,255,0.35)] cursor-pointer"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-10 max-w-5xl mx-auto text-center relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#e4e0f2_1px,transparent_1px)] [background-size:32px_32px] opacity-40 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]"></div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#eae6f8] border border-[#c9c3d9] text-xs font-semibold text-[#484556] mb-6 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Live · Real-time analytics, now in production
        </div>

        <h1 className="text-4xl md:text-[64px] font-extrabold tracking-tight text-[#1b1a27] leading-[1.1] max-w-4xl mx-auto mb-6">
          Analytics that don&apos;t{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C47FF] to-[#3B9EFF]">
            lie to you.
          </span>
        </h1>

        <p className="text-base md:text-lg text-[#484556] max-w-2xl mx-auto mb-8">
          WatchKit gives your team clear, fast, and private-first analytics. Stop guessing and start acting on data you can trust.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-semibold text-[#484556]/80 uppercase tracking-widest mb-10">
          <div className="flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-[#6C47FF]" /> 124K+ active sites
          </div>
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9c3d9]"></span>
          <div className="flex items-center gap-1.5">
            <Bolt className="w-4 h-4 text-[#6C47FF]" /> 2.4B events tracked
          </div>
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9c3d9]"></span>
          <div className="flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-[#6C47FF]" /> &lt; 200ms dashboard load
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
          <button
            onClick={() => onNavigate("dashboard")}
            className="bg-[#6C47FF] hover:bg-[#5e35f1] text-white font-bold text-sm px-7 py-3.5 rounded-lg shadow-[0_4px_16px_rgba(108,71,255,0.35)] w-full sm:w-auto text-center transition-transform hover:-translate-y-0.5 cursor-pointer"
          >
            Get started free
          </button>
          <a
            href="#demo"
            className="border border-[#c9c3d9] text-[#1b1a27] bg-white font-bold text-sm px-7 py-3.5 rounded-lg hover:bg-slate-50 transition-colors w-full sm:w-auto text-center flex items-center justify-center gap-2 group cursor-pointer"
          >
            View live demo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Hero Mockup Card */}
        <div id="demo" className="relative max-w-4xl mx-auto bg-white border border-[#e5e7eb] rounded-xl shadow-xl overflow-hidden mb-12">
          <div className="bg-[#f3f4f6] border-b border-[#e5e7eb] h-10 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ef4444]"></div>
            <div className="w-3 h-3 rounded-full bg-[#f59e0b]"></div>
            <div className="w-3 h-3 rounded-full bg-[#10b981]"></div>
            <span className="text-xs text-[#9ca3af] ml-2 font-mono font-bold">watchkit-live-mockup</span>
          </div>

          <div className="p-6 bg-white grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {/* Left Metrics column */}
            <div className="flex flex-col gap-4">
              <div className="p-4 border border-[#e5e7eb] rounded-xl bg-[#FAFAFA]">
                <p className="text-xs font-bold text-[#484556] mb-1">Total Visitors</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold font-mono text-[#1b1a27]">24,592</p>
                </div>
                <span className="text-[#10b981] text-xs font-semibold mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +12% this week
                </span>
              </div>
              <div className="p-4 border border-[#e5e7eb] rounded-xl bg-[#FAFAFA]">
                <p className="text-xs font-bold text-[#484556] mb-1">Bounce Rate</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold font-mono text-[#1b1a27]">42.1%</p>
                </div>
                <span className="text-[#ef4444] text-xs font-semibold mt-2 flex items-center gap-1">
                  <TrendingDown className="w-3.5 h-3.5" /> -3% vs legacy
                </span>
              </div>
            </div>

            {/* Right Chart column */}
            <div className="col-span-1 md:col-span-2 border border-[#e5e7eb] rounded-xl bg-[#FAFAFA] p-5 flex flex-col h-full min-h-[220px] relative overflow-hidden">
              <p className="text-xs font-bold text-[#484556] mb-4">Traffic Overview (Live Streamed)</p>
              <div className="flex-grow flex items-end justify-between gap-3 px-2 pb-2">
                <div className="w-full bg-[#6C47FF]/20 h-[45%] rounded-md transition-all hover:bg-[#6C47FF]"></div>
                <div className="w-full bg-[#6C47FF]/20 h-[65%] rounded-md transition-all hover:bg-[#6C47FF]"></div>
                <div className="w-full bg-[#6C47FF]/20 h-[35%] rounded-md transition-all hover:bg-[#6C47FF]"></div>
                <div className="w-full bg-[#6C47FF]/20 h-[85%] rounded-md transition-all hover:bg-[#6C47FF]"></div>
                <div className="w-full bg-[#6C47FF]/30 h-[55%] rounded-md transition-all hover:bg-[#6C47FF]"></div>
                <div className="w-full bg-[#6C47FF] h-[95%] rounded-md relative shadow-md">
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#1b1a27] text-white text-[10px] font-mono px-1.5 py-0.5 rounded font-bold">
                    Peak
                  </div>
                </div>
                <div className="w-full bg-[#6C47FF]/20 h-[75%] rounded-md transition-all hover:bg-[#6C47FF]"></div>
                <div className="w-full bg-[#6C47FF]/20 h-[40%] rounded-md transition-all hover:bg-[#6C47FF]"></div>
              </div>

              {/* Responsive overlay curve vector */}
              <svg className="absolute inset-0 h-full w-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M5,75 Q25,50 45,85 T80,35 T95,15" fill="none" stroke="#6C47FF" strokeWidth="2.5" vectorEffect="non-scaling-stroke"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Framework Snippet Switcher */}
        <div className="max-w-xl mx-auto rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm text-left">
          <p className="text-xs font-bold text-[#6C47FF] uppercase tracking-wider mb-3">Simple 2-Minute SDK Integration</p>
          <div className="flex border-b border-[#e5e7eb] gap-2 mb-4">
            {["React", "Next.js", "Vue", "Nuxt"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-3 py-1.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                  activeTab === tab ? "border-[#6C47FF] text-[#6C47FF]" : "border-transparent text-[#484556]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <pre className="p-3.5 bg-slate-900 text-slate-100 rounded-lg text-[11px] font-mono overflow-x-auto whitespace-pre leading-relaxed shadow-inner">
            {codeSnippets[activeTab]}
          </pre>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 border-y border-[#e5e7eb] bg-[#f6f1ff] text-center">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-[11px] font-bold tracking-widest text-[#6C47FF] uppercase mb-8">
            TRUSTED BY FORWARD-THINKING HIGH-PERFORMANCE TEAMS
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 text-[#6B7280] font-sans">
            <span className="text-2xl font-bold tracking-tighter hover:text-[#1b1a27] transition-colors">Nomad</span>
            <span className="text-2xl font-semibold italic hover:text-[#1b1a27] transition-colors">Reframe</span>
            <span className="text-2xl font-black uppercase tracking-tight hover:text-[#1b1a27] transition-colors">LOXO</span>
            <span className="text-xl font-extrabold tracking-widest hover:text-[#1b1a27] transition-colors">ACME CORP</span>
            <span className="text-2xl font-light hover:text-[#1b1a27] transition-colors">Globex</span>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="py-20 max-w-7xl mx-auto px-4 text-center">
        <p className="text-xs font-bold text-[#6C47FF] uppercase tracking-widest mb-3">Core Features</p>
        <h2 className="text-3xl font-extrabold text-[#1b1a27] mb-4">Everything you need. Nothing you don&apos;t.</h2>
        <p className="text-sm text-[#484556] max-w-xl mx-auto mb-16">
          Designed for maximum accuracy, absolute GDPR compliance, and ultra-fast page speeds.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Item 1 */}
          <div className="bg-white border border-[#e5e7eb] border-t-4 border-t-[#6C47FF] rounded-xl p-6 shadow-sm text-left hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-full bg-[#6C47FF]/10 flex items-center justify-center text-[#6C47FF] mb-4">
              <Bolt className="w-5 h-5" />
            </div>
            <h3 className="text-[#1b1a27] text-base font-bold mb-2">Real-time Data Streams</h3>
            <p className="text-xs text-[#484556] leading-relaxed">
              Observe user events as they happen on any page in milliseconds. No data staging latency or batch delays.
            </p>
          </div>

          {/* Item 2 */}
          <div className="bg-white border border-[#e5e7eb] border-t-4 border-t-blue-500 rounded-xl p-6 shadow-sm text-left hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-[#1b1a27] text-base font-bold mb-2">Privacy-First Architecture</h3>
            <p className="text-xs text-[#484556] leading-relaxed">
              GDPR, CCPA, and PECR compliant out of the box. Absolutely cookieless tracking that maintains complete user trust.
            </p>
          </div>

          {/* Item 3 */}
          <div className="bg-white border border-[#e5e7eb] border-t-4 border-t-green-500 rounded-xl p-6 shadow-sm text-left hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 mb-4">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <h3 className="text-[#1b1a27] text-base font-bold mb-2">Instant Configured Boards</h3>
            <p className="text-xs text-[#484556] leading-relaxed">
              Instantly view sessions, bounce states, conversions, and averages matching the metrics that actually matter.
            </p>
          </div>

          {/* Item 4 */}
          <div className="bg-white border border-[#e5e7eb] border-t-4 border-t-amber-500 rounded-xl p-6 shadow-sm text-left hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600 mb-4">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-[#1b1a27] text-base font-bold mb-2">Developer Friendly APIs</h3>
            <p className="text-xs text-[#484556] leading-relaxed">
              Integrate with light NPM packages, query via comprehensive REST API, and track custom variables natively as code.
            </p>
          </div>

          {/* Item 5 */}
          <div className="bg-white border border-[#e5e7eb] border-t-4 border-t-pink-500 rounded-xl p-6 shadow-sm text-left hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-600 mb-4">
              <Users2 className="w-5 h-5" />
            </div>
            <h3 className="text-[#1b1a27] text-base font-bold mb-2">Smooth Team Access</h3>
            <p className="text-xs text-[#484556] leading-relaxed">
              Share real-time dashboard links, generate PDF / CSV reports, and assign custom properties with strict visual controls.
            </p>
          </div>

          {/* Item 6 */}
          <div className="bg-white border border-[#e5e7eb] border-t-4 border-t-teal-500 rounded-xl p-6 shadow-sm text-left hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-600 mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-[#1b1a27] text-base font-bold mb-2">Ultra-light 2KB Script</h3>
            <p className="text-xs text-[#484556] leading-relaxed">
              Our lightweight gzipped telemetry client is under 2KB. Never drop your site core vitals or speed parameters.
            </p>
          </div>
        </div>
      </section>

      {/* Head-to-Head Comparison Table */}
      <section className="py-16 bg-[#FAFAFA] border-t border-[#e5e7eb]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs font-bold text-[#6C47FF] uppercase tracking-widest mb-3">Compare Matrix</p>
          <h2 className="text-2xl font-bold mb-10 text-[#1b1a27]">Why choose WatchKit?</h2>

          <div className="overflow-hidden border border-[#e5e7eb] rounded-xl shadow-sm bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#fcf8ff] text-xs font-bold text-[#484556] border-b border-[#e5e7eb]">
                  <th className="p-4 w-2/5">Feature Option</th>
                  <th className="p-4 text-center w-1/4 bg-slate-50">Legacy Analytics</th>
                  <th className="p-4 text-center w-1/4 bg-[#6C47FF]/5 text-[#6C47FF] font-black relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-950 font-bold px-3 py-0.5 rounded-full text-[9px] shadow-sm tracking-normal whitespace-nowrap">
                      ⭐ BEST CHOICE
                    </div>
                    WatchKit Pro
                  </th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-[#e5e7eb] text-[#484556]">
                <tr>
                  <td className="p-4 font-bold">Data Telemetry Speeds</td>
                  <td className="p-4 text-center bg-slate-50">24 to 48 hour batch lag</td>
                  <td className="p-4 text-center bg-[#6C47FF]/5 text-[#6C47FF] font-semibold">Real-time Stream</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">Privacy Controls</td>
                  <td className="p-4 text-center bg-slate-50">Invasive IP & Third-party cookies</td>
                  <td className="p-4 text-center bg-[#6C47FF]/5 text-[#6C47FF] font-semibold">GDPR Cookieless</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">Script Footprint size</td>
                  <td className="p-4 text-center bg-slate-50">45KB to 120KB+ heavy bulk</td>
                  <td className="p-4 text-center bg-[#6C47FF]/5 text-[#6C47FF] font-semibold">&lt; 2KB raw gzipped</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">Setup Difficulty</td>
                  <td className="p-4 text-center bg-slate-50">Complex tag manager configurations</td>
                  <td className="p-4 text-center bg-[#6C47FF]/5 text-[#6C47FF] font-semibold">2 Minutes Integration</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button
            onClick={() => onNavigate("pricing")}
            className="mt-8 bg-[#6C47FF] hover:bg-[#5e35f1] text-white font-bold text-xs px-6 py-3 rounded-lg shadow-md transition-all cursor-pointer"
          >
            Switch to WatchKit today
          </button>
        </div>
      </section>

      {/* Deep Banner CTA */}
      <section className="py-20 bg-[#6C47FF] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:20px_20px] opacity-15"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] bg-[#8B6BFF]/40 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[120%] bg-blue-400/30 rounded-full blur-[100px]"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10 px-4">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Ready to see the truth?</h2>
          <p className="text-xs md:text-sm text-slate-100 max-w-lg mx-auto mb-8">
            Join thousands of developers and product operators tracking clean performance data without compromising user credentials.
          </p>
          <button
            onClick={() => onNavigate("dashboard")}
            className="bg-white text-[#6C47FF] hover:bg-slate-50 font-bold px-8 py-3.5 rounded-lg shadow-lg hover:-translate-y-0.5 transition-transform cursor-pointer text-xs uppercase"
          >
            Start your free trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#e5e7eb] py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-3">
            <span className="text-lg font-bold text-[#1b1a27] tracking-tight">WatchKit</span>
            <p className="text-xs text-[#797588]">© {new Date().getFullYear()} WatchKit Inc. All rights reserved.</p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-[#1b1a27] uppercase mb-1">Product</span>
            <span onClick={() => onNavigate("landing")} className="text-xs text-[#484556] hover:text-[#6C47FF] cursor-pointer">Features</span>
            <span onClick={() => onNavigate("pricing")} className="text-xs text-[#484556] hover:text-[#6C47FF] cursor-pointer">Pricing</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-[#1b1a27] uppercase mb-1">Legal</span>
            <span className="text-xs text-[#484556] hover:text-[#6C47FF] cursor-pointer">Privacy Policy</span>
            <span className="text-xs text-[#484556] hover:text-[#6C47FF] cursor-pointer">Terms of Service</span>
            <span className="text-xs text-[#484556] hover:text-[#6C47FF] cursor-pointer">Security Settings</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-[#1b1a27] uppercase mb-1">Company</span>
            <span className="text-xs text-[#484556] hover:text-[#6C47FF] cursor-pointer">About Us</span>
            <span className="text-xs text-[#484556] hover:text-[#6C47FF] cursor-pointer">Company Blog</span>
            <span className="text-xs text-[#484556] hover:text-[#6C47FF] cursor-pointer">Contact Desk</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
