import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/:symbol", async (req, res) => {
  try {
    const symbol = req.params.symbol;

    const response = await axios.get(
      "https://www.alphavantage.co/query",
      {
        params: {
          function: "TIME_SERIES_DAILY",
          symbol: symbol,
          apikey: process.env.ALPHA_VANTAGE_API_KEY
        }
      }
    );

    res.json(response.data);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error fetching stock data"
    });
  }
});

export default router;