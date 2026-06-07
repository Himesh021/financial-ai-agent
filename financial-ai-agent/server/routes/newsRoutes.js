import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/:symbol", async (req, res) => {
  try {

    const symbol = req.params.symbol;

    const response = await axios.get(
      "https://newsapi.org/v2/everything",
      {
        params: {
          q: symbol,
          language: "en",
          sortBy: "publishedAt",
          apiKey: process.env.NEWS_API_KEY
        }
      }
    );

    res.json(response.data);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error fetching news"
    });
  }
});

export default router;