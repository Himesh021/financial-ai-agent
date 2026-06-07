import axios from "axios";

const API = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/stocks` : "http://localhost:5000/api/stocks";

export const fetchStockData = async (symbol) => {
  const response = await axios.get(`${API}/${symbol}`);
  return response.data;
};