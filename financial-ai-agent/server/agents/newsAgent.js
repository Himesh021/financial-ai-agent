export const newsAgent = async (
  groq,
  stockSymbol,
  newsText
) => {

  const completion =
    await groq.chat.completions.create({

      messages: [
        {
          role: "system",
          content: "You are a financial news analyst."
        },
        {
          role: "user",
          content: `
Analyze this news for ${stockSymbol}.

News:
${newsText}

Return ONLY JSON:

{
  "summary": "",
  "sentiment": ""
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