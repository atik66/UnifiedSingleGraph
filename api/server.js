// api/execute-query.js
import fetch from "node-fetch";   // install with npm i node-fetch
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { query } = req.body;

    console.log(query);

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
      } catch (err) {
        console.error("JSON parse error:", err);
        res.status(500).json({ error: "Failed to parse JSON", details: text });
      }
    } catch (err) {
      console.error("Query error:", err);
      res.status(500).json({ error: "Error executing query", details: err.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

const response = await fetch("/api/execute-query", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query })
});