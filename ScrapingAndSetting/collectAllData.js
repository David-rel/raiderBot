const fs = require("fs");
const puppeteer = require("puppeteer");

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

  // Prepare a Set to keep track of unique data
  let uniqueData = new Set();

  for (let i = 0; i < links.length; i++) {
    const page = await browser.newPage();

    // Navigate to the link
    await page.goto(links[i], { waitUntil: "networkidle2" });

    // Scrape the data
    const innerText = await page.evaluate(() => document.body.innerText);

    // If we have already scraped this data, skip it
    if (uniqueData.has(innerText)) {
      console.log(
        `Data from link ${i + 1} (${links[i]}) is a duplicate, skipping...`
      );
      await page.close();
      continue;
    }

    // Add the data to our Set of unique data
    uniqueData.add(innerText);

    // Add the scraped data to our container
    scrapedData.push({
      number: i + 1,
      link: links[i],
      data: innerText,
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
  fs.writeFileSync("testScrapedData.json", JSON.stringify(scrapedData, null, 2));

  console.log("Scraping finished");
})();
