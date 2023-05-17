const puppeteer = require("puppeteer");
const fs = require("fs");

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://rjhs.instructure.com/courses/10730");

  const links = await page.evaluate(() =>
    Array.from(document.querySelectorAll("a"), (e) => e.href)
  );

  console.log(links);

  // Save links to a .txt file
  fs.writeFile("data/links.txt", links.join("\n"), (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("Links successfully written to links.txt");
    }
  });

  await browser.close();
}

run();
