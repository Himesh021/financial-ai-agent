import express from "express";
import dotenv from "dotenv";
import Groq from "groq-sdk";
import { newsAgent } from "../agents/newsAgent.js";
import { trendAgent } from "../agents/trendAgent.js";
import { riskAgent } from "../agents/riskAgent.js";
import { insightAgent } from "../agents/insightAgent.js";

dotenv.config();

const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

router.post("/analyze", async (req, res) => {

  try {

    const { news, stockSymbol } = req.body;

    const newsText = news
      .map(article =>
        article.title + " " + article.description
      )
      .join("\n");
const newsAnalysis = await newsAgent(
  groq,
  stockSymbol,
  newsText
);

const trendAnalysis = await trendAgent(
  groq,
  stockSymbol
);

const riskAnalysis = await riskAgent(
  groq,
  stockSymbol,
  newsText
);

const finalInsight = await insightAgent(
  groq,
  stockSymbol,
  newsAnalysis,
  trendAnalysis,
  riskAnalysis
);

res.json({
  newsAnalysis,
  trendAnalysis,
  riskAnalysis,
  finalInsight
});

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message
    });
  }

});

export default router;