const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { query } = req.body;
  const virtuosoEndpoint = "http://bike-csecu.com:8890/sparql/";

  try {
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
      res.status(200).json(data);
    } catch {
      res.status(500).json({ error: "Failed to parse JSON", details: text });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
