export const trendAgent = async (
  groq,
  stockSymbol
) => {

  const completion =
    await groq.chat.completions.create({

      messages: [
        {
          role: "system",
          content: "You are a stock trend analyst."
        },
        {
          role: "user",
          content: `
Analyze stock momentum for ${stockSymbol}.

Return ONLY JSON:

{
  "trend": "",
  "marketSignal": ""
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