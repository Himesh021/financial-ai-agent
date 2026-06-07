import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import StockDashboard from "./components/StockDashboard";
import WatchlistPage from "./pages/WatchlistPage";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import MarketAnalysis from "./pages/MarketAnalysis";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import AIAgents from "./pages/AIAgents";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<StockDashboard />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ai-agents" element={<ProtectedRoute session={session}><AIAgents /></ProtectedRoute>}/>
        <Route path="/market-analysis" element={<ProtectedRoute session={session}><MarketAnalysis /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute session={session}><Reports /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute session={session}><Settings /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
