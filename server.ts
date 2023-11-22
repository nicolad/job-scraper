import { createServer } from "http";
import { parse } from "url";
import next from "next";
import cron from "node-cron";
import axios from "axios";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  }).listen(port);

  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? "development" : process.env.NODE_ENV
    }`
  );

  const scrapeTask = async () => {
    console.log("Running scrape task");
    try {
      await axios.get(`http://localhost:${port}/api/linkedin`);
      console.log("Scrape task completed");
    } catch (error) {
      console.error("Error during scrape task:", error);
    }
  };

  const enrichTask = async () => {
    console.log("Running enrich task");
    try {
      await axios.get(`http://localhost:${port}/api/linkedin-enrich`);
      console.log("Enrich task completed");
    } catch (error) {
      console.error("Error during enrich task:", error);
    }
  };

  cron.schedule("*/30 * * * *", scrapeTask);
  cron.schedule("*/1 * * * *", scrapeTask);
  cron.schedule("*/1 * * * *", enrichTask);
});
