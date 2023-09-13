const fs = require("fs");
const puppeteer = require("puppeteer");
const SummarizerManager = require("node-summarizer").SummarizerManager;

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
(async () => {
  const data = fs.readFileSync("links.txt", "utf-8");
  const links = data.split("\n");
  const browser = await puppeteer.launch();
  let scrapedData = [];
  let uniqueData = new Set();
  for (let i = 0; i < links.length; i++) {
    const page = await browser.newPage();
    await page.goto(links[i], { waitUntil: "networkidle2" });
    const innerText = await page.evaluate(() => document.body.innerText);
    if (uniqueData.has(innerText)) {
      console.log(
        `Data from link ${i + 1} (${links[i]}) is a duplicate, skipping...`
      );
      await page.close();
      continue;
    }
    uniqueData.add(innerText);
    let summarizer = new SummarizerManager(innerText, 3); // 3 sentences summary
    let summary = await summarizer.getSummaryByRank();
    scrapedData.push({
      number: i + 1,
      link: links[i],
      data: innerText,
      summary: summary, // add the summary
    });
    await page.close();
    await delay(1000); // 1 second delay
    console.log(
      `Finished scraping (${links[i]}) ${i + 1} of ${links.length} links`
    );
  }
  await browser.close();
  fs.writeFileSync(
    "testScrapedData.json",
    JSON.stringify(scrapedData, null, 2)
  );
  console.log("Scraping finished");
})();
