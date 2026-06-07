import axios from "axios";

const API = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/watchlist` : "http://localhost:5000/api/watchlist";

export const saveToWatchlist = async (stockData) => {
  const response = await axios.post(API, stockData);
  return response.data;
};

export const fetchWatchlist = async (userId) => {

  const response =
    await axios.get(`${API}?user_id=${userId}`);

  return response.data;
};