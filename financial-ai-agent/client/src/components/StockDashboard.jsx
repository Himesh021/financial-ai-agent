import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

import { fetchStockData } from "../services/stockService";
import { fetchNews } from "../services/newsService";
import { analyzeStock } from "../services/aiService";
import { saveToWatchlist } from "../services/watchlistService";
import { supabase } from "../supabaseClient";

const StockDashboard = () => {
  const [symbol, setSymbol] = useState("");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };
  const handleSearch = async () => {
    try {
      setLoading(true);

      const data = await fetchStockData(symbol);

      const newsData = await fetchNews(symbol);

      const aiResult = await analyzeStock(
        symbol,
        newsData.articles.slice(0, 5),
      );

      setAiAnalysis(aiResult);

      const timeSeries = data["Time Series (Daily)"];

      const formattedData = Object.entries(timeSeries)
        .slice(0, 7)
        .map(([date, values]) => ({
          date,
          close: parseFloat(values["4. close"]),
        }))
        .reverse();

      setChartData(formattedData);

      setNews(newsData.articles.slice(0, 5));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await saveToWatchlist({
        symbol,

        summary: aiAnalysis.newsAnalysis.summary,

        sentiment: aiAnalysis.newsAnalysis.sentiment,

        insight: aiAnalysis.finalInsight.finalInsight,

        risk: aiAnalysis.riskAnalysis.risk,
      });

      alert("Saved to Watchlist ✅");
    } catch (error) {
      console.log(error);

      alert("Failed to Save");
    }
  };
  const handleLogout = async () => {
    await supabase.auth.signOut();

    navigate("/login");
  };

  const performanceData = [
    { value: 30 },
    { value: 50 },
    { value: 40 },
    { value: 80 },
    { value: 65 },
    { value: 90 },
    { value: 75 },
  ];

  const transactionData = [
    { value: 10 },
    { value: 25 },
    { value: 18 },
    { value: 40 },
    { value: 28 },
    { value: 55 },
    { value: 35 },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-72 bg-[#050816] border-r border-white/5 p-8 flex flex-col justify-between">
        <div>
          {/* LOGO */}
          <div className="flex items-center gap-3 mb-16">
            <div className="w-5 h-5 bg-cyan-400 rounded-md shadow-[0_0_25px_#22d3ee]" />

            <h1 className="text-3xl font-black tracking-wide">FinAI</h1>
          </div>

          {/* NAV */}
          <div className="space-y-4">
            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-white/[0.03] hover:bg-cyan-400/10 transition-all duration-300 cursor-pointer border border-transparent hover:border-cyan-400/20"
            >
              <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_#22d3ee]" />

              <p className="text-gray-200 font-medium text-lg">Dashboard</p>
            </div>

            <div
              onClick={() => navigate("/ai-agents")}
              className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-white/[0.03] hover:bg-cyan-400/10 transition-all duration-300 cursor-pointer border border-transparent hover:border-cyan-400/20"
            >
              <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_#22d3ee]" />

              <p className="text-gray-200 font-medium text-lg">AI Agents</p>
            </div>

            <div
              onClick={() => navigate("/market-analysis")}
              className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-white/[0.03] hover:bg-cyan-400/10 transition-all duration-300 cursor-pointer border border-transparent hover:border-cyan-400/20"
            >
              <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_#22d3ee]" />

              <p className="text-gray-200 font-medium text-lg">
                Market Analysis
              </p>
            </div>
          </div>

          <div
            onClick={() => navigate("/watchlist")}
            className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-white/[0.03] hover:bg-cyan-400/10 transition-all duration-300 cursor-pointer border border-transparent hover:border-cyan-400/20"
          >
            <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_#22d3ee]" />

            <p className="text-gray-200 font-medium text-lg">Watchlist</p>
          </div>

          <div
            onClick={() => navigate("/reports")}
            className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-white/[0.03] hover:bg-cyan-400/10 transition-all duration-300 cursor-pointer border border-transparent hover:border-cyan-400/20"
          >
            <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_#22d3ee]" />

            <p className="text-gray-200 font-medium text-lg">Reports</p>
          </div>

          <div
            onClick={() => navigate("/settings")}
            className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-white/[0.03] hover:bg-cyan-400/10 transition-all duration-300 cursor-pointer border border-transparent hover:border-cyan-400/20"
          >
            <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_#22d3ee]" />

            <p className="text-gray-200 font-medium text-lg">Settings</p>
          </div>
        </div>

        {/* USER CARD */}
        {/*  */}
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-8 overflow-y-auto bg-gradient-to-br from-[#020617] via-black to-[#03121a]">
        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-5xl font-black mb-3">Financial AI Dashboard</h1>

            <p className="text-gray-400 text-lg">
              Multi-Agent Market Intelligence Platform
            </p>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search Stock (AAPL)"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              className="bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 w-80 text-white outline-none focus:border-cyan-400"
            />

            <button
              onClick={handleSearch}
              className="bg-cyan-400 text-black px-8 py-4 rounded-2xl font-black hover:scale-105 transition-all shadow-[0_0_30px_#22d3ee]"
            >
              Analyze
            </button>
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-center text-cyan-400 text-2xl font-black mb-10">
            AI Agents Processing Market Data...
          </div>
        )}

        {/* TOP DASHBOARD */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
          {/* MAIN CHART */}
          <div className="xl:col-span-2 bg-[#070b1d] border border-white/5 rounded-[32px] p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-3xl font-black mb-2">Market Overview</h2>

                <p className="text-gray-400">Yield & Price Trend Analysis</p>
              </div>

              <button
                onClick={handleSave}
                className="bg-cyan-400 text-black px-6 py-3 rounded-2xl font-bold shadow-[0_0_20px_#22d3ee]"
              >
                Save Insight
              </button>
            </div>

            <div className="bg-black/20 rounded-3xl p-6 h-[420px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" stroke="#111827" />

                  <XAxis dataKey="date" stroke="#6b7280" />

                  <YAxis stroke="#6b7280" />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="close"
                    stroke="#22d3ee"
                    fillOpacity={1}
                    fill="url(#colorClose)"
                    strokeWidth={4}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* STATS */}
          <div className="space-y-6">
            {/* CARD 1 */}
            <div className="bg-[#070b1d] border border-white/5 rounded-[32px] p-6">
              <div className="mb-6">
                <p className="text-gray-400 mb-3">AI Confidence</p>

                <h2 className="text-5xl font-black text-cyan-400 drop-shadow-[0_0_15px_#22d3ee]">
                  96.5%
                </h2>
              </div>

              <div className="h-24">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
                    <Bar
                      dataKey="value"
                      fill="#22d3ee"
                      radius={[10, 10, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="bg-[#070b1d] border border-white/5 rounded-[32px] p-6">
              <div className="mb-6">
                <p className="text-gray-400 mb-3">Transactions</p>

                <h2 className="text-5xl font-black text-cyan-400">552</h2>
              </div>

              <div className="h-24">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={transactionData}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#22d3ee"
                      strokeWidth={4}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* SIDE PANEL */}
          <div className="space-y-6">
            <div className="bg-[#070b1d] border border-white/5 rounded-[32px] p-6">
              <p className="text-gray-400 mb-4">Total Market Value</p>

              <h2 className="text-5xl font-black mb-6">$30,983</h2>

              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <Line
                      type="monotone"
                      dataKey="close"
                      stroke="#22d3ee"
                      strokeWidth={4}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-[#070b1d] border border-white/5 rounded-[32px] p-6">
              <p className="text-gray-400 mb-3">AI Agents Active</p>

              <h2 className="text-6xl font-black text-cyan-400">4</h2>
            </div>
          </div>
        </div>

        {/* AI AGENTS */}
        {aiAnalysis && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* NEWS */}
            <div className="bg-[#070b1d] border border-white/5 rounded-[32px] p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-black">News Agent</h2>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-bold
                  ${
                    aiAnalysis.newsAnalysis.sentiment === "Positive"
                      ? "bg-green-500/20 text-green-400"
                      : aiAnalysis.newsAnalysis.sentiment === "Negative"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {aiAnalysis.newsAnalysis.sentiment}
                </span>
              </div>

              <p className="text-gray-300 leading-8 text-lg">
                {aiAnalysis.newsAnalysis.summary}
              </p>
            </div>

            {/* TREND */}
            <div className="bg-[#070b1d] border border-white/5 rounded-[32px] p-8">
              <h2 className="text-3xl font-black mb-6">Trend Agent</h2>

              <h3 className="text-5xl font-black text-cyan-400 mb-4">
                {aiAnalysis.trendAnalysis.trend}
              </h3>

              <p className="text-gray-300 leading-8 text-lg">
                {aiAnalysis.trendAnalysis.marketSignal}
              </p>
            </div>

            {/* RISK */}
            <div className="bg-[#070b1d] border border-white/5 rounded-[32px] p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-black">Risk Agent</h2>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-bold
                  ${
                    aiAnalysis.riskAnalysis.risk === "Low"
                      ? "bg-green-500/20 text-green-400"
                      : aiAnalysis.riskAnalysis.risk === "Medium"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {aiAnalysis.riskAnalysis.risk}
                </span>
              </div>

              <p className="text-gray-300 leading-8 text-lg">
                {aiAnalysis.riskAnalysis.reason}
              </p>
            </div>

            {/* INSIGHT */}
            <div className="bg-cyan-400 text-black rounded-[32px] p-8 shadow-[0_0_40px_#22d3ee]">
              <h2 className="text-3xl font-black mb-6">Insight Agent</h2>

              <p className="leading-9 text-xl font-medium">
                {aiAnalysis.finalInsight.finalInsight}
              </p>
            </div>
          </div>
        )}

        {/* NEWS SECTION */}
        {news.length > 0 && (
          <div className="bg-[#070b1d] border border-white/5 rounded-[32px] p-8 mb-8">
            <h2 className="text-4xl font-black mb-8">Financial News</h2>

            <div className="space-y-5">
              {news.map((article, index) => (
                <div
                  key={index}
                  className="bg-black/20 border border-white/5 rounded-3xl p-6 hover:border-cyan-400/20 transition-all"
                >
                  <h3 className="text-2xl font-bold mb-4">{article.title}</h3>

                  <p className="text-gray-400 leading-8 mb-4">
                    {article.description}
                  </p>

                  <a
                    href={article.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 font-bold"
                  >
                    Read Article →
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default StockDashboard;
