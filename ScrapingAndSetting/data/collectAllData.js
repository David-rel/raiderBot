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

    // const back =
    //   "\nBoys Division\n6400 S. Lewiston Way, Aurora, CO 80016\nFax: 303.269.8134\nRegis Jesuit High School\n303.269.8000\nGirls Division\n6300 S. Lewiston Way, Aurora, CO 80016\nFax: 303.269.8133\nRegis Jesuit High School admits students of any race, color, national and ethnic origin to all the rights, privileges, programs and activities generally accorded or made available to students at the school. It does not discriminate on the basis of race, color, national and ethnic origin in administration of its educational policies, admissions policies, scholarship and loan programs, athletic and other school-administered programs.\nCONTACT & DIRECTIONS\nEMPLOYMENT\nEDUCATION VERIFICATION\nREQUEST TRANSCRIPT\nPRIVACY POLICY\nRegis Jesuit®, the Crest and RJ logos are federally registered trademarks owned by Regis Jesuit High School. All rights reserved.\nSelect Language​▼\n    \nSitemap";

    // const headerOneText =
    //   "Additional Information\nX\nThis website uses cookies to ensure you get the best experience on our website. By continuing to use this website, you consent to our use of these cookies.\n";

    //   innerText.replace(back, ' ')
    //   innerText.replace(headerOneText, ' ')

    // Add the data to our Set of unique data
    uniqueData.add(innerText);

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
    "testScrapedData.json",
    JSON.stringify(scrapedData, null, 2)
  );

  console.log("Scraping finished");
})();
