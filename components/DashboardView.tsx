"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  RefreshCw,
  Share2,
  Globe,
  Users,
  MousePointer,
  Timer,
  Search,
  Download,
  LayoutDashboard,
  Zap,
  CalendarDays,
  CheckCircle,
  Settings,
  PlusCircle,
  Database,
  TrendingUp,
  BarChart2,
  FileText,
  Terminal,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Clock,
  Smartphone,
  Laptop,
  Tablet,
  Check,
  ArrowLeft,
  Eye
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import AiInsightWidget from "./AiInsightWidget";

interface PageData {
  path: string;
  sessions: number;
  bounceRate: string;
  convRate: string;
  avgTime: string;
}

interface DashboardViewProps {
  onNavigate: (view: "landing" | "pricing" | "dashboard") => void;
}

let toastIdCounter = 0;

export default function DashboardView({ onNavigate }: DashboardViewProps) {
  // Navigation tabs of Dashboard
  const [activeTab, setActiveTab] = useState<"overview" | "realtime" | "events" | "analytics" | "reports">("overview");

  // Property list switching state
  const [activeProperty, setActiveProperty] = useState("Acme Corp Property");
  const [showPropertyDropdown, setShowPropertyDropdown] = useState(false);

  // Time filters
  const [activeRange, setActiveRange] = useState("Jun 1 - Jul 1, 2025");
  const [showRangeDropdown, setShowRangeDropdown] = useState(false);

  // Dynamic live visitor count state that fluctuates slightly
  const [liveVisitors, setLiveVisitors] = useState(47);

  // Dynamic toast notices
  const [toasts, setToasts] = useState<{ id: string; text: string; type: "success" | "info" }[]>([]);

  // Search filter inside Page Performance table
  const [searchQuery, setSearchQuery] = useState("");

  // Table Page Performance Data State
  const [tableData, setTableData] = useState<PageData[]>([
    { path: "/home", sessions: 45210, bounceRate: "24.5%", convRate: "8.2%", avgTime: "01:45" },
    { path: "/pricing", sessions: 32105, bounceRate: "42.1%", convRate: "12.4%", avgTime: "02:15" },
    { path: "/features", sessions: 28490, bounceRate: "58.2%", convRate: "4.5%", avgTime: "03:30" }
  ]);

  // Track currently edited cell path + parameter
  const [editingCell, setEditingCell] = useState<{ path: string; col: "sessions" | "bounce" | "conv" } | null>(null);
  const [editedValue, setEditedValue] = useState("");

  // Tracks cell flashes of updated values
  const [cellFlashes, setCellFlashes] = useState<{ [key: string]: boolean }>({});

  // Real-time events logging stream state
  const [realtimeLogs, setRealtimeLogs] = useState<{ id: string; time: string; event: string; path: string; browser: string }[]>([
    { id: "1", time: "16:53:11", event: "page_view", path: "/home", browser: "Chrome/Mac" },
    { id: "2", time: "16:53:23", event: "click_signup", path: "/pricing", browser: "Safari/iOS" },
    { id: "3", time: "16:53:31", event: "pricing_toggle", path: "/pricing", browser: "Firefox/Linux" }
  ]);

  // Simulated events dispatch sandbox counters
  const [customEventLogs, setCustomEventLogs] = useState<{ timestamp: string; name: string; metadata: any }[]>([]);
  const [dispatchedCount, setDispatchedCount] = useState(0);

  // Spin refresh animation
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Dynamic Upgrade Pro prompt and Modal state
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Dynamic Live Visitors fluctuate
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveVisitors((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const next = prev + delta;
        return next > 30 && next < 65 ? next : prev;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Real-time log page append simulation
  useEffect(() => {
    if (activeTab !== "realtime") return;
    const interval = setInterval(() => {
      const paths = ["/home", "/pricing", "/features", "/docs", "/blog", "/changelog"];
      const events = ["page_view", "scroll_depth", "click_cta", "api_handshake", "purchase_intent"];
      const browsers = ["Chrome/Windows", "Chrome/Mac", "Safari/iOS", "Firefox/Linux", "Safari/Mac", "Edge/Android"];

      const date = new Date();
      const timeStr = date.toTimeString().split(" ")[0];

      const newLog = {
        id: Date.now().toString(),
        time: timeStr,
        event: events[Math.floor(Math.random() * events.length)],
        path: paths[Math.floor(Math.random() * paths.length)],
        browser: browsers[Math.floor(Math.random() * browsers.length)]
      };

      setRealtimeLogs((prev) => [newLog, ...prev.slice(0, 7)]);
    }, 3000);
    return () => clearInterval(interval);
  }, [activeTab]);

  const addToast = (text: string, type: "success" | "info" = "success") => {
    const id = "toast-" + (++toastIdCounter);
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    addToast("Re-synchronizing real-time analytics data stream...", "info");

    setTimeout(() => {
      setIsRefreshing(false);
      // Randomize table stats slightly to give an ultra-dynamic live sense
      setTableData((prev) =>
        prev.map((r) => ({
          ...r,
          sessions: r.sessions + Math.floor(Math.random() * 401) - 200
        }))
      );
      addToast("Successfully loaded matching visual segments.");
    }, 1500);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast("Copied dashboard shareable link to clipboard!");
  };

  const properties = ["Acme Corp Property", "Acme Mobile Sandbox", "Acme Core staging", "Globex Global API"];

  const ranges = [
    "Jun 1 - Jul 1, 2025",
    "Last 7 Days (Telemetry)",
    "Last 30 Days (Telemetry)",
    "Today (Real-time logs)"
  ];

  const handlePropertyChange = (prop: string) => {
    setActiveProperty(prop);
    setShowPropertyDropdown(false);
    addToast(`Switched active property container to ${prop}`);
    handleRefresh();
  };

  const handleRangeChange = (range: string) => {
    setActiveRange(range);
    setShowRangeDropdown(false);
    addToast(`Dashboard timeline updated to: ${range}`);
    handleRefresh();
  };

  // Recalculate Grand Totals
  const grandTotalSessions = tableData.reduce((acc, curr) => acc + curr.sessions, 0);

  const avgBounceRate = (
    tableData.reduce((acc, curr) => acc + parseFloat(curr.bounceRate), 0) / tableData.length
  ).toFixed(1);

  const avgConvRate = (
    tableData.reduce((acc, curr) => acc + parseFloat(curr.convRate), 0) / tableData.length
  ).toFixed(1);

  // Filtering Table Data
  const filteredTableRows = tableData.filter((r) =>
    r.path.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Edit cell triggers
  const startEditing = (rowPath: string, column: "sessions" | "bounce" | "conv", initialVal: string) => {
    setEditingCell({ path: rowPath, col: column });
    setEditedValue(initialVal);
  };

  const saveCellEdit = () => {
    if (!editingCell) return;

    const { path, col } = editingCell;
    const cleanVal = editedValue.trim();

    setTableData((prev) =>
      prev.map((row) => {
        if (row.path === path) {
          if (col === "sessions") {
            const raw = parseInt(cleanVal.replace(/,/g, ""));
            const finalNum = isNaN(raw) ? row.sessions : raw;
            return { ...row, sessions: finalNum };
          } else if (col === "bounce") {
            const finalBounce = cleanVal.endsWith("%") ? cleanVal : cleanVal + "%";
            return { ...row, bounceRate: finalBounce };
          } else if (col === "conv") {
            const finalConv = cleanVal.endsWith("%") ? cleanVal : cleanVal + "%";
            return { ...row, convRate: finalConv };
          }
        }
        return row;
      })
    );

    // Trigger Success Green Confirmation Flash on edited cell
    const flashKey = `${path}-${col}`;
    setCellFlashes((prev) => ({ ...prev, [flashKey]: true }));
    setTimeout(() => {
      setCellFlashes((prev) => ({ ...prev, [flashKey]: false }));
    }, 1500);

    addToast(`Successfully saved parameters for ${path}`);
    setEditingCell(null);
  };

  // Simulating Custom Event sandbox dispatches
  const dispatchSimulatedEvent = (eventName: string, params: any) => {
    const timestamp = new Date().toISOString();
    const newEvent = { timestamp, name: eventName, metadata: params };

    setCustomEventLogs((prev) => [newEvent, ...prev.slice(0, 15)]);
    setDispatchedCount((prev) => prev + 1);

    addToast(`Dispatched simulated event: "${eventName}" to live ingestion agent!`);
  };

  // Simulating analytical charts based on property choice
  const aggregateMetrics = {
    sessions: grandTotalSessions,
    sessionsDelta: "12.5% vs last period",
    visitors: Math.floor(grandTotalSessions * 0.71),
    visitorsDelta: "8.2% vs last period",
    bounceRate: `${avgBounceRate}%`,
    bounceDelta: "1.4% vs last period",
    duration: "3m 42s",
    durationDelta: "0.5m vs last period"
  };

  // Export Table Data Simulation
  const handleExportData = () => {
    const headers = "Page Path,Sessions,Bounce Rate,Conversion Rate,Avg Time\n";
    const csvContent = tableData
      .map((r) => `${r.path},${r.sessions},${r.bounceRate},${r.convRate},${r.avgTime}`)
      .join("\n");
    const blob = new Blob([headers + csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `watchkit-top-pages-${activeProperty.toLowerCase().replace(/\s+/g, "-")}.csv`;
    a.click();
    addToast("Export complete! Sourced CSV spreadsheet ready.");
  };

  return (
    <div className="bg-[#fcf8ff] text-[#1b1a27] font-sans antialiased min-h-screen flex flex-col md:flex-row pb-12 relative select-none">
      {/* Toast notifications portal */}
      <div className="fixed top-20 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 80, scale: 0.95 }}
              className={`p-3.5 rounded-lg shadow-lg border text-xs font-bold pointer-events-auto flex items-center gap-2 max-w-sm backdrop-blur-md ${
                toast.type === "success"
                  ? "bg-emerald-500/90 text-white border-emerald-400"
                  : "bg-[#1b1a27]/90 text-white border-[#6C47FF]"
              }`}
            >
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>{toast.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* SideNavBar Panel */}
      <nav id="sidebar" className="w-full md:w-[240px] shrink-0 bg-white border-r border-[#e5e7eb] flex flex-col gap-2 p-5 z-40 shadow-[4px_0_24px_rgba(0,0,0,0.01)] relative md:fixed md:h-screen">
        {/* Brand Logo Area */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onNavigate("landing")}>
            <div className="w-8 h-8 rounded bg-[#6C47FF] flex items-center justify-center text-white shadow-md">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-[#1b1a27]">WatchKit Dash</h1>
              <div className="flex items-center gap-1.5 mt-0.5 relative">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                <p className="text-[10px] text-[#797588] tracking-tight truncate max-w-[110px]">{activeProperty}</p>
                <ChevronDown
                  className="w-3.5 h-3.5 text-[#797588] cursor-pointer hover:text-[#1b1a27]"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowPropertyDropdown(!showPropertyDropdown);
                  }}
                />

                {/* Property Dropdown Dialog */}
                {showPropertyDropdown && (
                  <div className="absolute top-5 left-0 bg-white border border-[#c9c3d9] rounded-lg shadow-xl py-1.5 z-50 w-44">
                    {properties.map((p) => (
                      <button
                        key={p}
                        onClick={() => handlePropertyChange(p)}
                        className="w-full px-3 py-1.5 text-left text-xs font-semibold hover:bg-[#6C47FF]/5 hover:text-[#6C47FF] transition-colors"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Core List Links */}
        <div className="flex flex-col gap-1 flex-1">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-3 px-3 py-2.5 text-xs font-extrabold rounded-lg transition-all border-l-4 cursor-pointer text-left ${
              activeTab === "overview"
                ? "bg-[#6C47FF]/10 text-[#6C47FF] border-[#6C47FF]"
                : "border-transparent text-[#484556] hover:bg-slate-50"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" /> Overview Summary
          </button>

          <button
            onClick={() => setActiveTab("realtime")}
            className={`flex items-center justify-between px-3 py-2.5 text-xs font-extrabold rounded-lg transition-all border-l-4 cursor-pointer text-left ${
              activeTab === "realtime"
                ? "bg-[#6C47FF]/10 text-[#6C47FF] border-[#6C47FF]"
                : "border-transparent text-[#484556] hover:bg-slate-50"
            }`}
          >
            <span className="flex items-center gap-3">
              <Zap className="w-4 h-4 text-amber-500" /> Realtime Telemetry
            </span>
            <span className="bg-green-500/20 text-green-600 text-[10px] px-1.5 py-0.5 rounded font-black animate-pulse">
              LIVE
            </span>
          </button>

          <button
            onClick={() => setActiveTab("events")}
            className={`flex items-center gap-3 px-3 py-2.5 text-xs font-extrabold rounded-lg transition-all border-l-4 cursor-pointer text-left ${
              activeTab === "events"
                ? "bg-[#6C47FF]/10 text-[#6C47FF] border-[#6C47FF]"
                : "border-transparent text-[#484556] hover:bg-slate-50"
            }`}
          >
            <Terminal className="w-4 h-4" /> Custom Events Setup
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex items-center gap-3 px-3 py-2.5 text-xs font-extrabold rounded-lg transition-all border-l-4 cursor-pointer text-left ${
              activeTab === "analytics"
                ? "bg-[#6C47FF]/10 text-[#6C47FF] border-[#6C47FF]"
                : "border-transparent text-[#484556] hover:bg-slate-50"
            }`}
          >
            <BarChart2 className="w-4 h-4" /> Traffic breakdowns
          </button>

          <button
            onClick={() => setActiveTab("reports")}
            className={`flex items-center gap-3 px-3 py-2.5 text-xs font-extrabold rounded-lg transition-all border-l-4 cursor-pointer text-left ${
              activeTab === "reports"
                ? "bg-[#6C47FF]/10 text-[#6C47FF] border-[#6C47FF]"
                : "border-transparent text-[#484556] hover:bg-slate-50"
            }`}
          >
            <FileText className="w-4 h-4" /> Executive Reports
          </button>
        </div>

        {/* User Jane Doe sidebar baseline */}
        <div className="pt-4 border-t border-[#e5e7eb] flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#6C47FF]/15 text-[#6C47FF] flex items-center justify-center font-black text-xs">
              JD
            </div>
            <div>
              <p className="text-xs font-bold text-[#1b1a27]">Jane Doe</p>
              <p className="text-[10px] text-[#797588] font-medium">Standard Admin</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate("landing")}
            className="text-[#797588] hover:text-[#6C47FF] p-1 rounded-md transition-colors"
            title="Return to Landing Page"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Main Board content container scrollable offset */}
      <main className="flex-1 md:ml-[240px] p-4 md:p-8 max-w-7xl mx-auto w-full flex flex-col gap-6 overflow-hidden">
        {/* Dynamic header row segment */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center p-5 bg-white border border-[#e5e7eb] rounded-xl shadow-sm gap-4">
          <div>
            <h2 className="text-xl font-black text-[#1b1a27] tracking-tight">Overview Dashboard</h2>
            <p className="text-xs text-[#797588] mt-0.5">Observe current metrics and friction elements</p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[11px] font-extrabold text-green-600">
              Live ({liveVisitors} active site users)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Filter timeline */}
            <div className="relative">
              <button
                className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#c9c3d9] rounded-lg text-xs font-bold text-[#484556] hover:bg-slate-50 transition-all cursor-pointer shadow-sm"
                onClick={() => setShowRangeDropdown(!showRangeDropdown)}
              >
                <CalendarDays className="w-3.5 h-3.5" />
                {activeRange}
                <ChevronDown className="w-3.5 h-3.5 text-[#797588]" />
              </button>

              {showRangeDropdown && (
                <div className="absolute top-9 right-0 bg-white border border-[#c9c3d9] rounded-lg shadow-xl py-1.5 z-50 w-52">
                  {ranges.map((r) => (
                    <button
                      key={r}
                      onClick={() => handleRangeChange(r)}
                      className="w-full px-3 py-1.5 text-left text-xs font-bold hover:bg-[#6C47FF]/5 hover:text-[#6C47FF] transition-colors"
                    >
                      {r}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Refresh segment */}
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2 bg-white border border-[#c9c3d9] rounded-lg text-[#484556] hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
              title="Refresh telemetry vectors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-[#6C47FF]" : ""}`} />
            </button>

            {/* Share segment */}
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-2 bg-[#6C47FF] hover:bg-[#5e35f1] text-white rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
          </div>
        </header>

        {/* Tab switcher view components router */}
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex flex-col gap-6"
            >
              {/* Metric Card row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Card 1: Sessions */}
                <div className="bg-white border-x border-b border-[#e5e7eb] border-t-4 border-t-[#6C47FF] rounded-xl p-5 hover:shadow-md transition-shadow relative flex flex-col justify-between h-36">
                  <div className="flex justify-between items-center text-[#797588]">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Sessions</span>
                    <Globe className="w-4 h-4 text-[#c9c3d9]" />
                  </div>
                  <div>
                    <div className="text-2xl font-black font-mono text-[#1b1a27] mt-2 mb-1">
                      {aggregateMetrics.sessions.toLocaleString()}
                    </div>
                    <span className="text-emerald-500 text-xs font-bold flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> {aggregateMetrics.sessionsDelta}
                    </span>
                  </div>
                </div>

                {/* Card 2: Unique Visitors */}
                <div className="bg-white border-x border-b border-[#e5e7eb] border-t-4 border-t-sky-500 rounded-xl p-5 hover:shadow-md transition-shadow relative flex flex-col justify-between h-36">
                  <div className="flex justify-between items-center text-[#797588]">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Unique Visitors</span>
                    <Users className="w-4 h-4 text-[#c9c3d9]" />
                  </div>
                  <div>
                    <div className="text-2xl font-black font-mono text-[#1b1a27] mt-2 mb-1">
                      {aggregateMetrics.visitors.toLocaleString()}
                    </div>
                    <span className="text-emerald-500 text-xs font-bold flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> {aggregateMetrics.visitorsDelta}
                    </span>
                  </div>
                </div>

                {/* Card 3: Bounce Rate */}
                <div className="bg-white border-x border-b border-[#e5e7eb] border-t-4 border-t-amber-500 rounded-xl p-5 hover:shadow-md transition-shadow relative flex flex-col justify-between h-36">
                  <div className="flex justify-between items-center text-[#797588]">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Bounce Rate</span>
                    <MousePointer className="w-4 h-4 text-[#c9c3d9]" />
                  </div>
                  <div>
                    <div className="text-2xl font-black font-mono text-[#1b1a27] mt-2 mb-1">
                      {aggregateMetrics.bounceRate}
                    </div>
                    <span className="text-[#ef4444] text-xs font-bold flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> {aggregateMetrics.bounceDelta}
                    </span>
                  </div>
                </div>

                {/* Card 4: Avg Duration */}
                <div className="bg-white border-x border-b border-[#e5e7eb] border-t-4 border-t-teal-600 rounded-xl p-5 hover:shadow-md transition-shadow relative flex flex-col justify-between h-36">
                  <div className="flex justify-between items-center text-[#797588]">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Avg Duration</span>
                    <Timer className="w-4 h-4 text-[#c9c3d9]" />
                  </div>
                  <div>
                    <div className="text-2xl font-black font-mono text-[#1b1a27] mt-2 mb-1">
                      {aggregateMetrics.duration}
                    </div>
                    <span className="text-emerald-500 text-xs font-bold flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> {aggregateMetrics.durationDelta}
                    </span>
                  </div>
                </div>
              </div>

              {/* Graphical sections row metrics (Chart over time & devices breakdown) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sessions over time Line area */}
                <div className="lg:col-span-2 bg-white border border-[#e5e7eb] rounded-xl p-6 flex flex-col gap-4 shadow-sm">
                  <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                    <div>
                      <h3 className="text-sm font-bold text-[#1b1a27]">Sessions over time</h3>
                      <p className="text-[10px] text-[#797588]">Daily tracking vectors</p>
                    </div>
                    <div className="flex bg-slate-100 p-1 rounded-lg border border-[#e5e7eb]">
                      <button className="px-3 py-1 text-[10px] font-bold rounded-md bg-white shadow-sm text-[#1b1a27] border border-[#e5e7eb]">
                        Weekly
                      </button>
                      <button className="px-3 py-1 text-[10px] font-bold rounded-md text-[#797588] hover:text-[#1b1a27] transition-all">
                        Monthly
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-4 text-[10px] font-mono text-[#484556] mb-2 font-bold">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#6C47FF]"></span> Current range: 124k
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#9ca3af]"></span> Previous period: 110k
                    </span>
                  </div>

                  {/* SVG Line chart graphics area */}
                  <div className="w-full h-56 relative border-l border-b border-fuchsia-50/20 pl-6 pb-6 pt-2">
                    {/* Y Axis markings */}
                    <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[9px] font-mono text-[#797588] select-none">
                      <span>5k</span>
                      <span>3k</span>
                      <span>1k</span>
                      <span>0</span>
                    </div>

                    {/* Timeline grid coordinates */}
                    <div className="absolute bottom-1 left-6 right-0 flex justify-between text-[9px] font-mono text-[#797588] select-none">
                      <span>Jun 1</span>
                      <span>Jun 12</span>
                      <span>Jun 24</span>
                      <span>Jul 1</span>
                    </div>

                    {/* Peak Point Tooltip Indicator */}
                    <div className="absolute top-[24%] left-[78%] z-15 bg-[#1b1a27] text-white text-[9px] font-bold px-2 py-1 rounded shadow-md pointer-events-none font-mono">
                      Peak: 4,890 sessions
                    </div>

                    {/* Core Line Grid SVG details */}
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 300" preserveAspectRatio="none">
                      {/* Grid Lines */}
                      <line x1="0" x2="1000" y1="0" y2="0" stroke="#f1f5f9" strokeDasharray="4" />
                      <line x1="0" x2="1000" y1="100" y2="100" stroke="#f1f5f9" strokeDasharray="4" />
                      <line x1="0" x2="1000" y1="200" y2="200" stroke="#f1f5f9" strokeDasharray="4" />

                      {/* Area Gradient Defs */}
                      <defs>
                        <linearGradient id="metricChartFade" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#6C47FF" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#6C47FF" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      {/* Area filled stroke */}
                      <path
                        d="M0 300 L0 230 L150 180 L300 240 L450 120 L600 170 L750 60 L900 80 L1000 20 L1000 300 Z"
                        fill="url(#metricChartFade)"
                      />

                      {/* Previous line pathway (Gray) */}
                      <path
                        d="M0 260 L150 220 L300 250 L450 180 L600 210 L750 150 L900 160 L1000 90"
                        fill="none"
                        stroke="#9ca3af"
                        strokeLinecap="round"
                        strokeWidth="2"
                        strokeDasharray="2 3"
                        className="opacity-60"
                      />

                      {/* Current Line pathway (Vivid Violet) */}
                      <path
                        d="M0 230 L150 180 L300 240 L450 120 L600 170 L750 60 L900 80 L1000 20"
                        fill="none"
                        stroke="#6C47FF"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3.5"
                      />

                      {/* Interactive Pulsing Node highlight */}
                      <circle cx="750" cy="60" r="5" fill="#6C47FF" />
                      <circle cx="750" cy="60" r="10" fill="none" stroke="#6C47FF" strokeWidth="1.5" className="animate-ping" style={{ transformOrigin: "750px 60px" }} />
                    </svg>
                  </div>
                </div>

                {/* Right Side breakdowns (Device breakdown & Organic referral counts) */}
                <div className="flex flex-col gap-6">
                  {/* Card Device Traffic */}
                  <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 shadow-sm">
                    <h3 className="text-xs font-bold text-[#1b1a27] mb-4">Device breakdown</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="flex items-center gap-1.5">
                            <Smartphone className="w-3.5 h-3.5 text-[#797588]" /> Mobile
                          </span>
                          <span className="font-mono">54%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5">
                          <div className="h-1.5 rounded-full bg-gradient-to-r from-[#6C47FF] to-sky-400" style={{ width: "54%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="flex items-center gap-1.5">
                            <Laptop className="w-3.5 h-3.5 text-[#797588]" /> Desktop
                          </span>
                          <span className="font-mono">42%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5">
                          <div className="h-1.5 rounded-full bg-gradient-to-r from-[#6C47FF] to-sky-400" style={{ width: "42%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="flex items-center gap-1.5">
                            <Tablet className="w-3.5 h-3.5 text-[#797588]" /> Tablet
                          </span>
                          <span className="font-mono">4%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5">
                          <div className="h-1.5 rounded-full bg-gradient-to-r from-[#6C47FF] to-sky-400" style={{ width: "4%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Traffic Sources */}
                  <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 shadow-sm flex-1">
                    <h3 className="text-xs font-bold text-[#1b1a27] mb-4">Traffic Sources</h3>
                    <div className="flex flex-col gap-3">
                      {[
                        { label: "Organic Search", pct: "45%", color: "bg-[#6C47FF]" },
                        { label: "Direct Access", pct: "25%", color: "bg-sky-500" },
                        { label: "Social Platforms", pct: "20%", color: "bg-amber-400" },
                        { label: "Referral links", pct: "10%", color: "bg-[#9ca3af]" }
                      ].map((s) => (
                        <div key={s.label} className="flex items-center justify-between text-xs font-semibold">
                          <span className="flex items-center gap-2 text-[#484556]">
                            <span className={`w-2.5 h-2.5 rounded-full ${s.color}`}></span>
                            {s.label}
                          </span>
                          <span className="font-mono text-[#1b1a27]">{s.pct}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Editable Pages performance table card layout */}
              <div className="bg-white border border-[#e5e7eb] rounded-xl shadow-sm overflow-hidden flex flex-col relative">
                {/* Table actions top bar header */}
                <div className="p-5 border-b border-[#e5e7eb] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white z-10">
                  <div>
                    <h3 className="text-base font-bold text-[#1b1a27]">Top Pages Performance</h3>
                    <p className="text-[11px] text-[#797588] mt-0.5">Click cells directly inside sessions or percentages to inline edit analytics</p>
                  </div>

                  <div className="flex gap-2.5 w-full sm:w-auto shrink-0">
                    <div className="relative flex-1 sm:flex-none">
                      <Search className="w-4 h-4 text-[#797588] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search page paths..."
                        className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-[#c9c3d9] rounded-lg text-xs font-medium focus:ring-2 focus:ring-[#6C47FF]/20 focus:border-[#6C47FF] outline-none transition-all sm:w-56 text-[#1b1a27]"
                      />
                    </div>
                    <button
                      onClick={handleExportData}
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-[#c9c3d9] text-xs font-bold rounded-lg hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Export</span>
                    </button>
                  </div>
                </div>

                {/* Actual responsive table wrapper */}
                <div className="overflow-x-auto min-w-full">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 text-[10px] font-bold text-[#484556] uppercase tracking-wider border-b border-[#e5e7eb]">
                        <th className="p-4 w-1/3">Page Path</th>
                        <th className="p-4 w-1/6 text-right">Sessions</th>
                        <th className="p-4 w-1/6 text-right">Bounce Rate (Optimizable)</th>
                        <th className="p-4 w-1/6 text-right">Conv. Rate</th>
                        <th className="p-4 w-1/6 text-right">Avg Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e5e7eb] text-[#1b1a27]">
                      {filteredTableRows.map((row) => (
                        <tr
                          key={row.path}
                          className="hover:bg-slate-50/70 transition-all group border-b border-[#e5e7eb]"
                        >
                          {/* Path name info link */}
                          <td className="p-4 font-mono font-bold text-[#6C47FF] flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#6C47FF]/40"></span>
                            {row.path}
                          </td>

                          {/* Sessions Count editable cell */}
                          <td
                            className={`p-4 text-right font-mono font-bold transition-all duration-300 relative cursor-pointer hover:bg-[#6C47FF]/5 ${
                              cellFlashes[`${row.path}-sessions`] ? "bg-emerald-50 text-emerald-700" : ""
                            }`}
                            onClick={() => startEditing(row.path, "sessions", row.sessions.toString())}
                          >
                            {editingCell?.path === row.path && editingCell.col === "sessions" ? (
                              <input
                                type="text"
                                value={editedValue}
                                onChange={(e) => setEditedValue(e.target.value)}
                                onBlur={saveCellEdit}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") saveCellEdit();
                                  if (e.key === "Escape") setEditingCell(null);
                                }}
                                className="w-24 px-2 py-1 bg-white border-2 border-[#6C47FF] rounded outline-none text-right font-mono font-bold text-[#1b1a27]"
                                autoFocus
                                onClick={(e) => e.stopPropagation()}
                              />
                            ) : (
                              <span className="flex items-center justify-end gap-1.5">
                                <span className="opacity-0 group-hover:opacity-100 text-[10px] text-[#797588]">✏️</span>
                                {row.sessions.toLocaleString()}
                              </span>
                            )}
                          </td>

                          {/* Bounce Rate editable cell */}
                          <td
                            className={`p-4 text-right font-mono font-bold transition-all duration-300 relative cursor-pointer hover:bg-[#6C47FF]/5 ${
                              cellFlashes[`${row.path}-bounce`] ? "bg-emerald-50 text-emerald-700" : ""
                            }`}
                            onClick={() => startEditing(row.path, "bounce", row.bounceRate)}
                          >
                            {editingCell?.path === row.path && editingCell.col === "bounce" ? (
                              <input
                                type="text"
                                value={editedValue}
                                onChange={(e) => setEditedValue(e.target.value)}
                                onBlur={saveCellEdit}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") saveCellEdit();
                                  if (e.key === "Escape") setEditingCell(null);
                                }}
                                className="w-24 px-2 py-1 bg-white border-2 border-[#6C47FF] rounded outline-none text-right font-mono font-bold text-[#1b1a27]"
                                autoFocus
                                onClick={(e) => e.stopPropagation()}
                              />
                            ) : (
                              <span className="flex items-center justify-end gap-1.5">
                                <span className="opacity-0 group-hover:opacity-100 text-[10px] text-[#797588] mr-1">✏️</span>
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                                    parseFloat(row.bounceRate) < 30
                                      ? "bg-green-500/10 text-green-600 border-green-500/20"
                                      : parseFloat(row.bounceRate) < 50
                                      ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
                                      : "bg-red-500/10 text-red-600 border-red-500/20"
                                  }`}
                                >
                                  {row.bounceRate}
                                </span>
                              </span>
                            )}
                          </td>

                          {/* Conversion editable rate cell */}
                          <td
                            className={`p-4 text-right font-mono font-bold transition-all duration-300 relative cursor-pointer hover:bg-[#6C47FF]/5 ${
                              cellFlashes[`${row.path}-conv`] ? "bg-emerald-50 text-emerald-700" : ""
                            }`}
                            onClick={() => startEditing(row.path, "conv", row.convRate)}
                          >
                            {editingCell?.path === row.path && editingCell.col === "conv" ? (
                              <input
                                type="text"
                                value={editedValue}
                                onChange={(e) => setEditedValue(e.target.value)}
                                onBlur={saveCellEdit}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") saveCellEdit();
                                  if (e.key === "Escape") setEditingCell(null);
                                }}
                                className="w-24 px-2 py-1 bg-white border-2 border-[#6C47FF] rounded outline-none text-right font-mono font-bold text-[#1b1a27]"
                                autoFocus
                                onClick={(e) => e.stopPropagation()}
                              />
                            ) : (
                              <span className="flex items-center justify-end gap-1.5">
                                <span className="opacity-0 group-hover:opacity-100 text-[10px] text-[#797588] mr-1">✏️</span>
                                <span className="px-2 py-0.5 bg-[#6C47FF]/10 text-[#6C47FF] rounded-full text-[10px] uppercase font-bold border border-[#6C47FF]/20">
                                  {row.convRate}
                                </span>
                              </span>
                            )}
                          </td>

                          {/* Read-only Time spent averages duration parameters */}
                          <td className="p-4 text-right font-mono text-[#797588]">
                            {row.avgTime}
                          </td>
                        </tr>
                      ))}

                      {filteredTableRows.length === 0 && (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-[#797588] font-bold">
                            ⚠️ No page paths found matching search filter context.
                          </td>
                        </tr>
                      )}
                    </tbody>

                    {/* Table Totals Footings Recalculating completely live! */}
                    <tfoot className="bg-slate-50 font-bold border-t border-[#e5e7eb] sticky bottom-0">
                      <tr>
                        <td className="p-4 text-[#1b1a27] font-extrabold uppercase text-[10px]">Grand Total</td>
                        <td className="p-4 text-right font-mono">{grandTotalSessions.toLocaleString()}</td>
                        <td className="p-4 text-right font-mono text-slate-500">Avg: {avgBounceRate}%</td>
                        <td className="p-4 text-right font-mono text-slate-500">Avg: {avgConvRate}%</td>
                        <td className="p-4 text-right font-mono text-[#797588]">-- : --</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div className="p-4 border-t border-[#e5e7eb] flex justify-between items-center text-xs bg-white">
                  <span className="text-[#797588] font-bold">Showing {filteredTableRows.length} page path rows</span>
                  <div className="flex gap-1">
                    <button className="p-1 border border-[#c9c3d9] rounded hover:bg-slate-50 disabled:opacity-50" disabled>
                      <ChevronLeft className="w-4 h-4 text-[#797588]" />
                    </button>
                    <button className="p-1 border border-[#c9c3d9] rounded hover:bg-slate-50 disabled:opacity-50" disabled>
                      <ChevronRight className="w-4 h-4 text-[#797588]" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Secure Server-Side Gemini AI Analytics Assistant Module */}
              <AiInsightWidget
                activeProperty={activeProperty}
                metrics={aggregateMetrics}
                tableData={tableData}
              />
            </motion.div>
          )}

          {/* Real-time Telemetry Tab */}
          {activeTab === "realtime" && (
            <motion.div
              key="realtime"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex flex-col gap-6"
            >
              <div className="bg-white border border-[#e5e7eb] rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 border-b border-slate-50 pb-4 mb-6">
                  <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center text-green-600 animate-pulse">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1b1a27]">Realtime Ingestion Streams</h3>
                    <p className="text-xs text-[#797588]">Observing simulated webhook packets hit the collector in milliseconds</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left Activity List */}
                  <div className="md:col-span-2 flex flex-col gap-3">
                    <h4 className="text-xs font-bold text-[#484556] uppercase tracking-wider mb-2">Ingestion logs</h4>
                    <div className="space-y-2">
                      <AnimatePresence initial={false}>
                        {realtimeLogs.map((log) => (
                          <motion.div
                            key={log.id}
                            initial={{ scale: 0.95, opacity: 0, height: 0 }}
                            animate={{ scale: 1, opacity: 1, height: "auto" }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-[#FAFAFA] border border-[#e4e0f2] p-3 rounded-lg flex items-center justify-between text-[11px] font-mono hover:border-green-500/30 transition-colors"
                          >
                            <span className="text-[#cbd5e1]">{log.time}</span>
                            <span className="bg-green-500/10 text-green-600 px-1.5 py-0.5 rounded font-bold uppercase text-[9px]">
                              {log.event}
                            </span>
                            <span className="font-bold text-[#6C47FF]">{log.path}</span>
                            <span className="text-[#484556]">{log.browser}</span>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Right circular segment simulation */}
                  <div className="bg-[#fcf8ff] border border-[#c9c3d9] p-5 rounded-xl flex flex-col gap-4">
                    <h4 className="text-xs font-bold text-[#1b1a27] uppercase tracking-wider">Stream Health</h4>
                    <div className="flex flex-col items-center py-6">
                      <div className="w-32 h-32 rounded-full border-8 border-green-500/20 border-t-green-500 flex flex-col items-center justify-center animate-spin" style={{ animationDuration: "3s" }}>
                        <div className="text-lg font-black text-[#1b1a27] select-none font-mono tracking-tight rotate-[-90deg]">
                          99.9%
                        </div>
                      </div>
                      <p className="text-[11px] font-extrabold text-[#1b1a27] mt-5">Telemetry Node Ingestion State: Healthy</p>
                      <p className="text-[10px] text-[#797588] mt-1 text-center">Webhooks processing over 50 HTTP agents per second globally.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Events Dispatch Sandbox tab */}
          {activeTab === "events" && (
            <motion.div
              key="events"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex flex-col gap-6"
            >
              <div className="bg-white border border-[#e5e7eb] rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 border-b border-indigo-50 pb-4 mb-6">
                  <div className="w-10 h-10 bg-[#6C47FF]/10 rounded-lg flex items-center justify-center text-[#6C47FF]">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1b1a27]">Custom Events Sandbox</h3>
                    <p className="text-xs text-[#797588]">Simulate custom events manually. Click to bundle web actions and post to telemetry.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left triggers */}
                  <div className="flex flex-col gap-5">
                    <h4 className="text-xs font-bold text-[#484556] uppercase tracking-wider">Triggers</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        onClick={() =>
                          dispatchSimulatedEvent("purchase_intent", {
                            sku: 'pro_annual_membership',
                            rev_cents: 29000,
                            billing_period: 'yearly'
                          })
                        }
                        className="p-4 border border-[#c9c3d9] hover:border-[#6C47FF] bg-white rounded-lg flex items-center gap-3 transition-colors text-left text-xs font-bold cursor-pointer hover:shadow-sm"
                      >
                        <PlusCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                        <div>
                          <p className="text-[#1b1a27]">Dispatched: purchase_intent</p>
                          <p className="text-[10px] text-[#797588]">Pro premium memberships</p>
                        </div>
                      </button>

                      <button
                        onClick={() =>
                          dispatchSimulatedEvent("on_click_cta", {
                            section: 'footer_join',
                            destination: '/pricing',
                            device_pixel_ratio: 1.5
                          })
                        }
                        className="p-4 border border-[#c9c3d9] hover:border-[#6C47FF] bg-white rounded-lg flex items-center gap-3 transition-colors text-left text-xs font-bold cursor-pointer hover:shadow-sm"
                      >
                        <PlusCircle className="w-5 h-5 text-[#6C47FF] shrink-0" />
                        <div>
                          <p className="text-[#1b1a27]">Dispatched: click_cta</p>
                          <p className="text-[10px] text-[#797588]">Conversion click captures</p>
                        </div>
                      </button>

                      <button
                        onClick={() =>
                          dispatchSimulatedEvent("api_handshake", {
                            latency_ms: 104,
                            endpoint_path: '/api/v1/sessions',
                            origin: 'us-east'
                          })
                        }
                        className="p-4 border border-[#c9c3d9] hover:border-[#6C47FF] bg-white rounded-lg flex items-center gap-3 transition-colors text-left text-xs font-bold cursor-pointer hover:shadow-sm"
                      >
                        <PlusCircle className="w-5 h-5 text-amber-500 shrink-0" />
                        <div>
                          <p className="text-[#1b1a27]">Dispatched: api_handshake</p>
                          <p className="text-[10px] text-[#797588]">Node segment connections</p>
                        </div>
                      </button>

                      <button
                        onClick={() =>
                          dispatchSimulatedEvent("chat_open", {
                            source: 'widget_bubble',
                            auto_trigger: false,
                            page_duration_seconds: 140
                          })
                        }
                        className="p-4 border border-[#c9c3d9] hover:border-[#6C47FF] bg-white rounded-lg flex items-center gap-3 transition-colors text-left text-xs font-bold cursor-pointer hover:shadow-sm"
                      >
                        <PlusCircle className="w-5 h-5 text-pink-500 shrink-0" />
                        <div>
                          <p className="text-[#1b1a27]">Dispatched: chat_open</p>
                          <p className="text-[10px] text-[#797588]">Interactive chatbot widgets</p>
                        </div>
                      </button>
                    </div>

                    <div className="p-4 bg-[#f6f1ff] rounded-xl border border-[#e4e0f2] flex justify-between items-center text-xs font-bold">
                      <span className="text-[#484556]">Simulated sandbox telemetry dispatches total:</span>
                      <span className="font-mono text-[#6C47FF] bg-white border border-[#c9c3d9] px-2.5 py-1 rounded text-sm shadow-inner">
                        {dispatchedCount}
                      </span>
                    </div>
                  </div>

                  {/* Right payload terminal */}
                  <div className="flex flex-col gap-3">
                    <h4 className="text-xs font-bold text-[#484556] uppercase tracking-wider">Parsed event payload</h4>
                    <div className="bg-slate-900 border border-slate-700 text-slate-100 p-4 rounded-xl font-mono text-[10px] leading-relaxed h-[300px] overflow-y-auto custom-scrollbar shadow-inner">
                      {customEventLogs.length === 0 ? (
                        <p className="text-slate-400 italic">No custom events posted in current timeline yet. Click any left trigger to dispatch simulated payload bytes.</p>
                      ) : (
                        customEventLogs.map((log, idx) => (
                          <div key={idx} className="border-b border-slate-800 pb-2.5 mb-2.5">
                            <span className="text-emerald-400 font-bold">▶ [INGESTED] {log.name}</span>
                            <span className="text-[#797588] block text-[9px]">{log.timestamp}</span>
                            <pre className="text-slate-300 mt-1 whitespace-pre max-w-full overflow-x-auto text-[9px]">
                              {JSON.stringify(log.metadata, null, 2)}
                            </pre>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Traffic Breakdowns Tab */}
          {activeTab === "analytics" && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 shadow-sm">
                <h3 className="text-xs font-bold text-[#1b1a27] mb-4 uppercase tracking-wider">Visitor Geographic Distribution</h3>
                <div className="space-y-3.5">
                  {[
                    { country: "United States (US)", pct: "48%", count: "60k sessions" },
                    { country: "Germany (DE)", pct: "18%", count: "22k sessions" },
                    { country: "United Kingdom (GB)", pct: "14%", count: "17k sessions" },
                    { country: "Canada (CA)", pct: "12%", count: "15k sessions" },
                    { country: "Others", pct: "8%", count: "10K sessions" }
                  ].map((geo) => (
                    <div key={geo.country} className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-[#484556]">{geo.country}</span>
                      <div className="flex items-center gap-3 font-mono">
                        <span className="text-[#797588] text-[10px]">{geo.count}</span>
                        <span className="bg-[#6C47FF]/10 text-[#6C47FF] font-black border border-[#6C47FF]/15 px-2 py-0.5 rounded">
                          {geo.pct}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 shadow-sm">
                <h3 className="text-xs font-bold text-[#1b1a27] mb-4 uppercase tracking-wider">Session Retention Profiles</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Instant conversion (under 10s exit)</span>
                      <span className="font-mono text-[#797588]">12% of visits</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full bg-amber-400" style={{ width: "12%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Standard consumption (10s to 2m)</span>
                      <span className="font-mono text-[#797588]">45% of visits</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full bg-[#6C47FF]" style={{ width: "45%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Deep intent browsing (above 2m)</span>
                      <span className="font-mono text-[#797588]">43% of visits</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full bg-emerald-500" style={{ width: "43%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Executive Reports Tab */}
          {activeTab === "reports" && (
            <motion.div
              key="reports"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex flex-col gap-6"
            >
              <div className="bg-white border border-[#e5e7eb] rounded-xl p-6 shadow-sm max-w-xl mx-auto w-full text-center py-12 flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#6C47FF]/10 text-[#6C47FF] flex items-center justify-center mb-2">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#1b1a27]">Generate Executive Metric Report</h3>
                <p className="text-xs text-[#797588] max-w-md">
                  Construct an immediate PDF / CSV audit outlining bounce vectors, conversions, and optimized session totals based on {activeProperty} data.
                </p>

                <div className="flex flex-col gap-2 w-full mt-4">
                  <button
                    onClick={() => {
                      addToast("Compiling executive reports. Hold standard segments...");
                      setTimeout(() => {
                        handleExportData();
                      }, 1000);
                    }}
                    className="p-3 bg-[#6C47FF] hover:bg-[#5e35f1] text-white font-bold text-xs rounded-lg shadow-md transition-colors cursor-pointer"
                  >
                    Generate Sourced CSV spreadsheet Report
                  </button>
                  <button
                    onClick={() => {
                      addToast("Compiling printer-friendly PDF parameters...", "info");
                      setTimeout(() => {
                        window.print();
                      }, 1000);
                    }}
                    className="p-2.5 border border-[#c9c3d9] hover:bg-slate-50 text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Compile Printer-friendly PDF Report
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Embedded Upgrade to Pro Banner Portal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-[#0F0E1A]/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white border border-[#c9c3d9] rounded-2xl w-full max-w-md p-6 relative shadow-2xl flex flex-col gap-4 text-center">
            <div className="w-12 h-12 bg-[#6C47FF]/10 text-[#6C47FF] rounded-full flex items-center justify-center mx-auto mb-2">
              <Sparkles className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-[#1b1a27]">Upgrade {activeProperty} to Pro</h3>
            <p className="text-xs text-[#484556] leading-relaxed">
              Unlock unlimited site properties, full 30-day index memory backups, priority alerts systems, and the full capability of our AI optimization models.
            </p>

            <div className="p-4 bg-[#f6f1ff] border border-[#e4e0f2] rounded-lg mt-2 text-left">
              <p className="text-xs font-bold text-[#6C47FF] mb-2 uppercase tracking-wide">Included in Pro Plan</p>
              <ul className="space-y-1.5 text-[11px] text-[#484556]">
                <li className="flex items-center gap-2 font-bold"><Check className="w-3.5 h-3.5 text-green-500 shrink-0" /> Up to 1M events/month</li>
                <li className="flex items-center gap-2 font-bold"><Check className="w-3.5 h-3.5 text-green-500 shrink-0" /> Cookieless detailed breakdown views</li>
                <li className="flex items-center gap-2 font-bold"><Check className="w-3.5 h-3.5 text-green-500 shrink-0" /> Priority Helpdesk integration</li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="py-2.5 border border-[#c9c3d9] rounded-lg text-xs font-bold text-[#484556] hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Maybe Later
              </button>
              <button
                onClick={() => {
                  setShowUpgradeModal(false);
                  addToast("Successfully upgraded Acme Corp Property to Pro! Welcome aboard.");
                }}
                className="py-2.5 bg-[#6C47FF] hover:bg-[#5e35f1] text-white text-xs font-bold rounded-lg shadow-md transition-colors cursor-pointer"
              >
                Confirm Upgrade ($29)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Styled sticky footer bar */}
      <div className="fixed bottom-0 left-0 w-full h-[48px] bg-white border-t border-[#e5e7eb] z-40 flex items-center justify-between px-4 md:px-8 shadow-[0_-4px_12px_rgba(0,0,0,0.02)] md:pl-[256px]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#10b981]">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
            Synced just now
          </div>
          <div className="hidden sm:block w-px h-4 bg-[#e5e7eb]"></div>
          <div className="hidden sm:block text-[11px] text-[#797588] font-mono">
            Total property events processed: <span className="font-bold text-[#6C47FF]">2.4M</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-[#797588] font-bold hidden sm:inline">Free sandbox active</span>
          <button
            onClick={() => setShowUpgradeModal(true)}
            className="px-4 py-1.5 bg-[#6C47FF] hover:bg-[#5e35f1] text-white rounded-md text-xs font-bold hover:bg-[#6c47ff]/90 transition-all shadow-sm cursor-pointer hover:scale-101 active:scale-99"
          >
            Upgrade to Pro
          </button>
        </div>
      </div>
    </div>
  );
}
