const puppeteer = require("puppeteer");

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // await page.goto("https://rjhs-3729.vercel.app/");
  await page.goto("https://www.regisjesuit.com/");
  //await page.goto("https://www.traversymedia.com");

  await page.screenshot({ path: "example.png" });
  //await page.screenshot({ path: "example.png", fullPage: true });
  //await page.pdf({ path: "example.pdf", format: 'A4' });

  //gets all html
  //const html = await page.content()

  //gets all of the text
  //const title = await page.evaluate(() => document.title)

  //gets all text
  //const text = await page.evaluate(() => document.body.innerText)

  //query sleector all links node list
  const links = await page.evaluate(() =>
    Array.from(document.querySelectorAll("a"), (e) => e.href)
  );

  console.log(links);

  await browser.close();
}

run();
