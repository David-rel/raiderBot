const fs = require("fs");
const puppeteer = require("puppeteer");
const SummarizerManager = require("node-summarizer").SummarizerManager;

// Function to delay the process
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

(async () => {
  // Read the text file with the links
  const data = fs.readFileSync("links.txt", "utf-8");

  // Split the text file into an array of links
  const links = data.split("\n");

  // Launch the browser
  const browser = await puppeteer.launch();

  // Prepare a container for our scraped data
  let scrapedData = [];

  for (let i = 0; i < links.length; i++) {
    const page = await browser.newPage();

    // Navigate to the link
    await page.goto(links[i], { waitUntil: "networkidle2" });

    // Scrape the data
    const innerText = await page.evaluate(() => document.body.innerText);

    // Create a summary of the scraped data
    let summarizer = new SummarizerManager(innerText, 3); // 3 sentences summary
    let summary = await summarizer.getSummaryByRank();

    // Add the scraped data to our container
    scrapedData.push({
      number: i + 1,
      link: links[i],
      data: innerText,
      summary: summary, // add the summary
    });

    // Close the page to save resources
    await page.close();

    // Delay before moving on to the next link
    await delay(1000); // 1 second delay

    console.log(
      `Finished scraping (${links[i]}) ${i + 1} of ${links.length} links`
    );
  }

  // Close the browser
  await browser.close();

  // Write the scraped data to a file
  fs.writeFileSync(
    "testTwoScrapedData.json",
    JSON.stringify(scrapedData, null, 2)
  );

  console.log("Scraping finished");
})();
