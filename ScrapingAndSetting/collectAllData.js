


const puppeteer = require("puppeteer");
const fs = require("fs");

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.regisjesuit.com/");

  const links = await page.evaluate(() =>
    Array.from(document.querySelectorAll("a"), (e) => e.href)
  );

  for (let i = 0; i <= links.length; i++) {
    try {
      //gets all of the text
      const newPage = await browser.newPage();
      await newPage.goto(`${links[i]}`, {
        waitUntil: "networkidle2",
        timeout: 30000,
      });
      const text = await newPage.evaluate(() => document.body.innerText);

      fs.writeFile(`data/${i}.txt`, text, (err) => {
        if (err) {
          console.error("Error writing to file:", err);
        } else {
          console.log(`Text successfully written to ${links[i]} ${i}.txt`);
        }
      });
    } catch (err) {
      console.error(`Error processing link ${i}:`, err);
    }
  }

  await browser.close();
}

run();
