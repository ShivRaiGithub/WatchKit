"use client";

import React, { useState } from "react";
import { Check, Minus, Plus, Eye, ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PricingViewProps {
  onNavigate: (view: "landing" | "pricing" | "dashboard") => void;
}

export default function PricingView({ onNavigate }: PricingViewProps) {
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const pricingTiers = [
    {
      name: "Starter",
      description: "For personal projects",
      price: "$0",
      period: "/mo",
      cta: "Get Started Free",
      features: [
        { label: "Up to 10k events/month", active: true },
        { label: "1 Project dashboard", active: true },
        { label: "7-day data retention", active: true },
        { label: "Custom alert systems", active: false }
      ],
      featured: false,
      enterprise: false
    },
    {
      name: "Pro",
      description: "For growing teams",
      price: isAnnual ? "$24" : "$29",
      period: isAnnual ? "/mo, billed annually" : "/mo",
      cta: "Start free trial",
      features: [
        { label: "Up to 1M events/month", active: true },
        { label: "Unlimited key dashboards", active: true },
        { label: "30-day data retention", active: true },
        { label: "Advanced custom alerts", active: true },
        { label: "Priority email helpdesks", active: true }
      ],
      featured: true,
      enterprise: false
    },
    {
      name: "Enterprise",
      description: "For large scale operations",
      price: "Custom",
      period: "",
      cta: "Talk to us",
      features: [
        { label: "Unlimited parsed events", active: true },
        { label: "Custom data retention periods", active: true },
        { label: "SAML SSO security configurations", active: true },
        { label: "Dedicated Customer Success Manager", active: true }
      ],
      featured: false,
      enterprise: true
    }
  ];

  const faqs = [
    {
      q: "Can I easily switch plans later?",
      a: "Absolutely. You can upgrade, downgrade, or cancel your active plan at any time. Prorated charges or credits matching your remaining term will be processed immediately."
    },
    {
      q: "What happens if I temporarily exceed my plan limit?",
      a: "We notify you at 80% and 100% of event milestones. We grant a forgiving overage buffer for spontaneous traffic spikes, but sequential monthly overages will prompt a friendly plan migration request."
    },
    {
      q: "Do you offer any discounts for non-profit operations?",
      a: "Yes! We offer a full 50% discount on all tiers for verified non-profit and public-education organizations. Simply contact our support desk with your paperwork to verify."
    },
    {
      q: "Is GDPR and cookie consent required with WatchKit?",
      a: "No! Since WatchKit uses absolute cookieless telemetry and secures data anonymously, you do not need cookie notices or banner consent prompts under standard European data laws."
    }
  ];

  return (
    <div className="bg-[#fcf8ff] text-[#1b1a27] font-sans antialiased min-h-screen">
      {/* Navigation header */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-[#e5e7eb] px-4 md:px-10 py-4 shadow-sm">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-2 cursor-pointer active:opacity-75" onClick={() => onNavigate("landing")}>
            <Eye className="text-[#6C47FF] w-6 h-6" />
            <span className="text-xl font-bold text-[#6C47FF] tracking-tight">WatchKit</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => onNavigate("landing")}
              className="text-[#484556] hover:text-[#6C47FF] transition-colors cursor-pointer text-sm font-semibold"
            >
              Features
            </button>
            <button
              onClick={() => onNavigate("pricing")}
              className="text-[#6C47FF] font-bold hover:opacity-85 transition-opacity cursor-pointer text-sm"
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

      <main className="pt-32 pb-20">
        {/* Header Hero segment */}
        <section className="text-center px-4 max-w-4xl mx-auto mb-16 relative py-10 rounded-3xl overflow-hidden bg-[radial-gradient(circle_at_50%_0%,rgba(108,71,255,0.08)_0%,transparent_60%)]">
          <div className="inline-block px-3.5 py-1 bg-[#f0ebfe] text-[#6C47FF] font-bold text-xs rounded-full mb-6 border border-[#e4e0f2] uppercase tracking-wider">
            Pricing Plans
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1b1a27] mb-6">
            Simple pricing.<br />No surprises.
          </h1>
          <p className="text-sm md:text-base text-[#484556] mb-10 max-w-lg mx-auto leading-relaxed">
            Choose the perfect plan for your tracking volume. Instant upgrades, downgrades, or self-cancellations anytime.
          </p>

          <div className="flex items-center justify-center gap-4 relative">
            <div
              className="pill-toggle-container flex bg-[#e4e0f2] rounded-full p-1 border border-[#c9c3d9] relative cursor-pointer"
              onClick={() => setIsAnnual(!isAnnual)}
            >
              {/* Sliding Highlight */}
              <div
                className={`absolute top-1 bottom-1 bg-white rounded-full transition-all shadow-md duration-300 ${
                  isAnnual ? "left-[calc(50%+2px)] w-[calc(50%-6px)]" : "left-1.5 w-[calc(50%-6px)]"
                }`}
              ></div>
              <button
                className={`px-4 py-1.5 text-xs font-bold rounded-full relative z-10 transition-colors ${
                  !isAnnual ? "text-[#1b1a27]" : "text-[#484556]"
                }`}
              >
                Monthly
              </button>
              <button
                className={`px-4 py-1.5 text-xs font-bold rounded-full relative z-10 transition-colors ${
                  isAnnual ? "text-[#1b1a27]" : "text-[#484556]"
                }`}
              >
                Annually
              </button>
            </div>

            <div className="absolute left-[calc(50%+76px)] -top-10 rotate-12 hidden md:flex flex-col items-center pointer-events-none">
              <span className="bg-[#10B981] text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md whitespace-nowrap">
                Save 20%
              </span>
              <svg className="w-5 h-5 text-[#10B981] -mt-1 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
              </svg>
            </div>
          </div>
        </section>

        {/* Dynamic Tier Cards */}
        <section className="max-w-7xl mx-auto px-4 md:px-10 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-2">
            {pricingTiers.map((tier, idx) => (
              <div
                key={idx}
                className={`rounded-2xl flex flex-col h-full bg-white border transition-all duration-300 relative overflow-hidden ${
                  tier.featured
                    ? "border-[#6C47FF] shadow-[0_12px_40px_rgba(108,71,255,0.2)] md:-translate-y-4"
                    : "border-[#e5e7eb] shadow-sm hover:translate-y-[-4px] hover:shadow-md"
                }`}
              >
                {tier.featured && (
                  <div className="absolute top-4 right-4 bg-[#6C47FF] text-white px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider z-10 border border-white/20">
                    Most Popular
                  </div>
                )}

                {/* Card Header area */}
                <div className={`p-8 ${tier.enterprise ? "bg-[#0F0E1A] text-white" : ""}`}>
                  <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                  <p className={`text-xs ${tier.enterprise ? "text-slate-300" : "text-[#484556]"}`}>
                    {tier.description}
                  </p>
                  <div className="mt-6 flex items-baseline">
                    <span className="text-4xl font-extrabold tracking-tight">{tier.price}</span>
                    {tier.period && (
                      <span className={`text-xs ml-2 font-medium ${tier.enterprise ? "text-slate-300" : "text-[#797588]"}`}>
                        {tier.period}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Features List Area */}
                <div className="p-8 flex-grow flex flex-col bg-white border-t border-[#e5e7eb]">
                  <ul className="space-y-4 text-xs text-[#1b1a27] flex-grow mb-8">
                    {tier.features.map((f, fidx) => (
                      <li key={fidx} className="flex items-start gap-3">
                        {f.active ? (
                          <Check className="w-4 h-4 text-[#6C47FF] shrink-0 mt-0.5" />
                        ) : (
                          <Minus className="w-4 h-4 text-[#c9c3d9] shrink-0 mt-0.5" />
                        )}
                        <span className={f.active ? "" : "text-opacity-45 text-[#1b1a27]"}>{f.label}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => onNavigate("dashboard")}
                    className={`w-full py-3 px-4 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      tier.featured
                        ? "bg-[#6C47FF] hover:bg-[#5e35f1] text-white shadow-lg"
                        : "border border-[#c9c3d9] hover:bg-slate-50 text-[#1b1a27]"
                    }`}
                  >
                    {tier.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Detailed Comparison Matrix */}
        <section className="max-w-7xl mx-auto px-4 md:px-10 mb-20">
          <div className="text-center mb-10">
            <div className="inline-block px-3 py-1 bg-[#f0ebfe] text-[#6C47FF] font-bold text-xs rounded-full mb-4 border border-[#e4e0f2] uppercase tracking-wider">
              Detailed Comparison
            </div>
            <h2 className="text-2xl font-bold text-[#1b1a27]">Compare plans in detail</h2>
          </div>

          <div className="overflow-x-auto border border-[#e5e7eb] rounded-xl shadow-sm bg-white">
            <table className="w-full text-left border-collapse min-w-[800px] text-xs">
              <thead>
                <tr className="bg-[#FAFAFA] border-b border-[#e5e7eb] text-[#484556]">
                  <th className="p-4 font-bold">Feature Name</th>
                  <th className="p-4">Starter</th>
                  <th className="p-4 bg-[#6C47FF]/5 text-[#6C47FF] font-bold border-x border-[#6C47FF]/10">Pro</th>
                  <th className="p-4">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e7eb] text-[#1b1a27]">
                <tr className="bg-[#FAFAFA]/60 font-semibold text-slate-500">
                  <td className="p-3 uppercase tracking-wider pl-4" colSpan={4}>Core Capabilities</td>
                </tr>
                <tr>
                  <td className="p-4">Monthly Account Events</td>
                  <td className="p-4">10k Events</td>
                  <td className="p-4 bg-[#6C47FF]/5 text-[#6C47FF] font-semibold border-x border-[#6C47FF]/10">1M Events</td>
                  <td className="p-4 font-bold text-slate-900">Unlimited</td>
                </tr>
                <tr>
                  <td className="p-4">Data Retention Periods</td>
                  <td className="p-4">7 Days</td>
                  <td className="p-4 bg-[#6C47FF]/5 text-[#6C47FF] font-semibold border-x border-[#6C47FF]/10">30 Days</td>
                  <td className="p-4">Fully SLA Custom</td>
                </tr>
                <tr>
                  <td className="p-4">Allowed Site Containers</td>
                  <td className="p-4">1 Dashboard</td>
                  <td className="p-4 bg-[#6C47FF]/5 text-[#6C47FF] font-semibold border-x border-[#6C47FF]/10">Unlimited</td>
                  <td className="p-4">Unlimited</td>
                </tr>
                <tr className="bg-[#FAFAFA]/60 font-semibold text-slate-500">
                  <td className="p-3 uppercase tracking-wider pl-4" colSpan={4}>Support & Security</td>
                </tr>
                <tr>
                  <td className="p-4">Assigned Support SLA</td>
                  <td className="p-4 text-[#797588]">Community Forum</td>
                  <td className="p-4 bg-[#6C47FF]/5 text-[#6C47FF] font-semibold border-x border-[#6C47FF]/10">Priority Email</td>
                  <td className="p-4">24/7 Dedicated Support Phone</td>
                </tr>
                <tr>
                  <td className="p-4">SAML Single Sign-On (SSO)</td>
                  <td className="p-4 text-[#797588]">—</td>
                  <td className="p-4 bg-[#6C47FF]/5 text-[#6C47FF] font-semibold border-x border-[#6C47FF]/10">—</td>
                  <td className="p-4"><Check className="w-4 h-4 text-green-500" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQs Accordion drops */}
        <section className="max-w-3xl mx-auto px-4 mb-12">
          <div className="text-center mb-10">
            <div className="inline-block px-3 py-1 bg-[#f0ebfe] text-[#6C47FF] font-bold text-xs rounded-full mb-4 border border-[#e4e0f2] uppercase tracking-wider">
              FAQ Section
            </div>
            <h2 className="text-2xl font-bold text-[#1b1a27]">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((f, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden shadow-sm hover:border-[#c9c3d9] transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex justify-between items-center text-sm font-semibold text-[#1b1a27] hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#6C47FF]" />
                    {f.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#797588] transition-transform duration-300 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-[#e5e7eb]"
                    >
                      <div className="p-5 text-xs text-[#484556] bg-[#FAFAFA] leading-relaxed">
                        {f.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Styled simple footer */}
      <footer className="bg-white border-t border-[#e5e7eb] py-12 px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2" onClick={() => onNavigate("landing")}>
            <Eye className="text-[#6C47FF] w-5 h-5" />
            <span className="text-base font-bold text-[#1b1a27] tracking-tight">WatchKit</span>
          </div>
          <p className="text-xs text-[#797588]">© {new Date().getFullYear()} WatchKit Inc. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-[#484556]">
            <span className="hover:text-[#6C47FF] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#6C47FF] cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#6C47FF] cursor-pointer">Security SLAs</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
