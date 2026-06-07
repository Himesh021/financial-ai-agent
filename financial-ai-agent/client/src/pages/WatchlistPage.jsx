import { useEffect, useState } from "react";

import { fetchWatchlist } from "../services/watchlistService";
import { supabase } from "../supabaseClient";
const WatchlistPage = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const loadWatchlist = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        const data = await fetchWatchlist(user.id);

        setStocks(data);
      } catch (error) {
        console.log(error);
      }
    };

    loadWatchlist();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Saved AI Insights ⭐</h1>

        <div className="grid gap-6">
          {stocks.map((stock) => (
            <div key={stock.id} className="bg-white p-6 rounded-2xl shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{stock.symbol}</h2>

                <span
                  className={`px-4 py-2 rounded-full text-white font-semibold
                  ${
                    stock.sentiment === "Positive"
                      ? "bg-green-500"
                      : stock.sentiment === "Negative"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                  }`}
                >
                  {stock.sentiment}
                </span>
              </div>

              <p className="mb-4 text-gray-700">{stock.summary}</p>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">Investment Insight</h3>

                <p className="text-gray-700">{stock.insight}</p>
              </div>

              <div>
                <span
                  className={`px-4 py-2 rounded-full text-white font-semibold
                  ${
                    stock.risk === "Low"
                      ? "bg-green-500"
                      : stock.risk === "Medium"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                >
                  Risk: {stock.risk}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchlistPage;
