"use client";

import React, { useState } from "react";
import { Sparkles, Send, Loader2, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PageData {
  path: string;
  sessions: number;
  bounceRate: string;
  convRate: string;
  avgTime: string;
}

interface AiInsightWidgetProps {
  activeProperty: string;
  metrics: {
    sessions: number;
    sessionsDelta: string;
    visitors: number;
    visitorsDelta: string;
    bounceRate: string;
    bounceDelta: string;
    duration: string;
    durationDelta: string;
  };
  tableData: PageData[];
}

export default function AiInsightWidget({ activeProperty, metrics, tableData }: AiInsightWidgetProps) {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const predefinedPrompts = [
    {
      label: "Optimize Bounce Rates",
      text: "Our bounce rates look high. Can you analyze the Top Pages performance, point out our biggest friction and bounce points, and give me 3 specific UI optimization strategies?",
    },
    {
      label: "Conversion Analysis",
      text: "Compare our conversion rates across /home, /pricing, and /features. Based on our visitor sessions, what content or flow revisions would yield the highest conversion lift?",
    },
    {
      label: "Traffic Growth Strategy",
      text: "We have 2.4 million events processed. Suggest an organic search search-intent optimization plan to funnel more organic traffic directly into high-converting paths.",
    },
  ];

  const handleSuggest = async (customPrompt?: string) => {
    const activePrompt = customPrompt || prompt;
    if (!activePrompt.trim()) return;

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: activePrompt,
          contextData: {
            property: activeProperty,
            aggregateMetrics: metrics,
            pagesPerformance: tableData,
          },
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to consult WatchKit AI. Server model returned an error.");
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setResponse(data.text);
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred while fetching AI insights.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="ai-insights-panel" className="bg-white border border-[#c9c3d9] rounded-xl shadow-sm p-6 flex flex-col gap-5 overflow-hidden">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#6C47FF]/10 flex items-center justify-center text-[#6C47FF]">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-[#1b1a27]">WatchKit AI Analytics Copilot</h3>
          <p className="text-xs text-[#484556]">Instant server-side intelligence based on live table metrics</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {predefinedPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => {
              setPrompt(p.text);
              handleSuggest(p.text);
            }}
            disabled={loading}
            className="text-xs bg-[#f6f1ff] hover:bg-[#f0ebfe] text-[#6C47FF] border border-[#e4e0f2] px-3 py-1.5 rounded-full transition-colors font-medium text-left max-w-full truncate cursor-pointer disabled:opacity-50"
          >
            💡 {p.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask AI Copilot (e.g. 'How can we improve /pricing retention?')..."
          className="flex-1 px-4 py-2 bg-[#FAFAFA] border border-[#c9c3d9] rounded-lg text-sm focus:ring-2 focus:ring-[#6C47FF]/20 focus:border-[#6C47FF] outline-none transition-all text-[#1b1a27] placeholder:text-[#797588]"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading) handleSuggest();
          }}
          disabled={loading}
        />
        <button
          onClick={() => handleSuggest()}
          disabled={loading || !prompt.trim()}
          className="bg-[#6C47FF] hover:bg-[#5e35f1] text-white p-2.5 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-5 bg-[#f6f1ff] border border-[#e4e0f2] rounded-lg flex flex-col items-center justify-center text-center gap-2"
          >
            <RefreshCw className="w-6 h-6 animate-spin text-[#6C47FF]" />
            <p className="text-xs font-semibold text-[#6C47FF]">Consulting server-side model...</p>
            <p className="text-[11px] text-[#484556] italic">
              &quot;Analyzing table data, session metrics, and checking click bottlenecks...&quot;
            </p>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium"
          >
            ⚠️ {error}
          </motion.div>
        )}

        {response && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 bg-[#fafcfc] border border-[#e4e0f2] rounded-lg text-sm text-[#1b1a27] max-h-[350px] overflow-y-auto custom-scrollbar"
          >
            <div className="flex items-center justify-between border-b border-[#e4e0f2] pb-2 mb-3">
              <span className="text-xs font-bold text-[#6C47FF] uppercase tracking-wider flex items-center gap-1">
                ✨ Live AI Intelligence Report
              </span>
              <button
                onClick={() => setResponse(null)}
                className="text-[11px] hover:underline text-[#797588]"
              >
                Dismiss
              </button>
            </div>
            <div className="prose prose-sm font-body text-xs text-[#484556] leading-relaxed whitespace-pre-line">
              {response}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
