export const riskAgent = async (
  groq,
  stockSymbol,
  newsText
) => {

  const completion =
    await groq.chat.completions.create({

      messages: [
        {
          role: "system",
          content: "You are a financial risk analyst."
        },
        {
          role: "user",
          content: `
Analyze investment risk for ${stockSymbol}.

News:
${newsText}

Return ONLY JSON:

{
  "risk": "",
  "reason": ""
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