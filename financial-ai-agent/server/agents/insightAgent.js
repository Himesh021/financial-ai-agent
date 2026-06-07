export const insightAgent = async (
  groq,
  stockSymbol,
  newsAnalysis,
  trendAnalysis,
  riskAnalysis
) => {

  const completion =
    await groq.chat.completions.create({

      messages: [
        {
          role: "system",
          content: "You are a senior investment strategist."
        },
        {
          role: "user",
          content: `
Stock: ${stockSymbol}

News Analysis:
${JSON.stringify(newsAnalysis)}

Trend Analysis:
${JSON.stringify(trendAnalysis)}

Risk Analysis:
${JSON.stringify(riskAnalysis)}

Return ONLY JSON:

{
  "finalInsight": ""
}
`
        }
      ],

      model: "llama-3.3-70b-versatile"
    });

  return JSON.parse(
    completion.choices[0].message.content
  );
};