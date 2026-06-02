"use client";

import React, { useState } from "react";
import MarketingView from "../components/MarketingView";
import PricingView from "../components/PricingView";
import DashboardView from "../components/DashboardView";

export default function Home() {
  const [view, setView] = useState<"landing" | "pricing" | "dashboard">("landing");

  return (
    <div id="app-viewport" className="min-h-screen bg-[#fcf8ff]">
      {view === "landing" && <MarketingView onNavigate={setView} />}
      {view === "pricing" && <PricingView onNavigate={setView} />}
      {view === "dashboard" && <DashboardView onNavigate={setView} />}
    </div>
  );
}
