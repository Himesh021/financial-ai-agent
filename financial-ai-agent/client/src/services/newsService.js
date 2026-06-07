import axios from "axios";

const API = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/news` : "http://localhost:5000/api/news";

export const fetchNews = async (symbol) => {
  const response = await axios.get(`${API}/${symbol}`);
  return response.data;
};