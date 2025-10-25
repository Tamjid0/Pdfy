import express from "express";
import { scrapeChat } from "./scraper.js";
import cors from 'cors';

const app = express();
app.use(cors());

app.get("/scrape", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).send("Missing URL");

  try {
    const data = await scrapeChat(url);
    res.json(data);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));
