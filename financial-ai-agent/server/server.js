import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import stockRoutes from "./routes/stockRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/stocks", stockRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.get("/", (req, res) => {
  res.send("Financial AI Agent Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});