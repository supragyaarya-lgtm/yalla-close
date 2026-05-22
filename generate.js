// Vercel serverless function — runs on the server, NOT in the browser.
// The Gemini API key lives here as an environment variable and is never
// exposed to the user's browser.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: "Server is missing GEMINI_API_KEY. Add it in Vercel → Settings → Environment Variables, then redeploy.",
    });
  }

  const lead = (req.body && req.body.lead) || {};

  const prompt = `You are a UAE-based sales assistant. Write a professional WhatsApp follow-up message in English.

Lead details:
- Name: ${lead.name || "not given"}
- Product / Interest: ${lead.interest || "not specified"}
- Pipeline stage: ${lead.stage || "New"}
- Budget: ${lead.budget ? "AED " + lead.budget : "not stated"}
- Lead source: ${lead.source || "unknown"}
- Notes: ${lead.notes || "none"}

Rules:
- 2 to 4 sentences only
- Warm but professional tone suited to UAE business culture
- Use first name if available, otherwise use Sir or Madam
- Mention what they enquired about naturally
- End with a clear, specific call to action (call, reply, visit, etc.)
- No emojis, no hashtags
- Output ONLY the message text, nothing else, no preamble`;

  try {
    const r = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await r.json();

    if (!r.ok) {
      return res.status(502).json({
        error: data?.error?.message || "Gemini request failed.",
      });
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!text) {
      return res.status(502).json({ error: "Gemini returned an empty response. Try again." });
    }

    return res.status(200).json({ text });
  } catch (e) {
    return res.status(500).json({ error: "Failed to reach the Gemini API." });
  }
}
