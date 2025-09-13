// Vercel now supports native fetch — no need for node-fetch
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Missing query" });
    }

    const virtuosoEndpoint = "http://bike-csecu.com:8890/sparql/";

    const response = await fetch(virtuosoEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: `query=${encodeURIComponent(query)}`,
    });

    const text = await response.text();

    try {
      const data = JSON.parse(text);
      return res.status(200).json(data);
    } catch (err) {
      console.error("JSON parse error:", err);
      return res
        .status(500)
        .json({ error: "Failed to parse JSON", details: text });
    }
  } catch (err) {
    console.error("Query error:", err);
    return res
      .status(500)
      .json({ error: "Error executing query", details: err.message });
  }
}
