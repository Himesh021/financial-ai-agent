import axios from "axios";

const API = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/ai` : "http://localhost:5000/api/ai";

export const analyzeStock = async (
  stockSymbol,
  news
) => {

  const response = await axios.post(
    `${API}/analyze`,
    {
      stockSymbol,
      news
    }
  );

  return response.data;
};