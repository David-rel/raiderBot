const puppeteer = require("puppeteer");
const fs = require("fs");

async function extractLinksFromPage(page, url) {
  await page.goto(url);

  const links = await page.evaluate(() =>
    Array.from(document.querySelectorAll("a"), (e) => e.href)
  );

  return links.filter(
    (link) => link !== "" && link.includes("https://rjhs-3729.vercel.app/")
  );
}

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Read URLs from a text file, each URL should be on a new line
  const urls = fs.readFileSync("links.txt", "utf-8").split("\n");

  let allLinks = new Set();
  let visitedUrls = new Set();

  for (let i = 0; i < urls.length; i++) {
    let mainUrl = urls[i];

    if (visitedUrls.has(mainUrl)) {
      console.log(
        `Skipping URL ${i + 1} of ${urls.length}: ${mainUrl} (already visited)`
      );
      continue;
    }

    try {
      console.log(`Processing URL ${i + 1} of ${urls.length}: ${mainUrl}`);

      const mainPageLinks = await extractLinksFromPage(page, mainUrl);
      mainPageLinks.forEach((link) => allLinks.add(link));
      visitedUrls.add(mainUrl);

      for (let j = 0; j < mainPageLinks.length; j++) {
        let link = mainPageLinks[j];

        if (visitedUrls.has(link)) {
          console.log(
            `Skipping link ${j + 1} of ${
              mainPageLinks.length
            }: ${link} (already visited)`
          );
          continue;
        }

        try {
          console.log(
            `Extracting links from ${link} (${j + 1} of ${
              mainPageLinks.length
            })`
          );
          const childPageLinks = await extractLinksFromPage(page, link);
          childPageLinks.forEach((childLink) => allLinks.add(childLink));
          visitedUrls.add(link);
          console.log(`Finished copying links from ${link}`);
        } catch (error) {
          console.error(`Error visiting ${link}:`, error);
        }
      }
    } catch (error) {
      console.error(`Error visiting ${mainUrl}:`, error);
    }
  }

  fs.writeFile("newLinks.txt", Array.from(allLinks).join("\n"), (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("Links successfully written to links.txt");
    }
  });

  await browser.close();
}

run();
