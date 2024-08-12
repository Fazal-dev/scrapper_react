import express from "express";
import cors from "cors";
import axios from "axios";
import * as cheerio from "cheerio";

const app = express();
// middleware
app.use(cors());
// server listen
app.listen(5000, () => {
  console.log("server is listen to 5000 port");
});
// get the data from website
app.get("/scraper", async (req, res) => {
  const url = req.query.url;

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const data = [];
    $("a").each((index, element) => {
      data.push({
        text: $(element).text(),
        href: $(element).attr("href"),
      });
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error accessing the URL" });
  }
});
