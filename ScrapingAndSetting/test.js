const puppeteer = require("puppeteer");

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // await page.goto("https://rjhs-3729.vercel.app/");
  await page.goto(
    "https://www.regisjesuit.com/%E2%80%9CThanks%20to%20the%20benevolence%20of%20the%20Regis%20community,%20our%20sons%20have%20benefited%20from%20an%20outstanding%20education%20and%20have%20developed%20lifelong%20friendships.%E2%80%9D%20%20%E2%80%94Sarah%20Tierney,%20mother%20of%20Ryan%20%E2%80%9920%20and%20Matthew%20%E2%80%9922%20%20%3E%3ERead%20more%20about%20the%20Tierney%20family%20and%20other%20inspiring%20stories%20of%20generosity%20and%20impact%20here."
  );
  //await page.goto("https://www.traversymedia.com");

  //await page.screenshot({ path: "example.png" });
  //await page.screenshot({ path: "example.png", fullPage: true });
  //await page.pdf({ path: "example.pdf", format: 'A4' });

  //gets all html
  const html = await page.content()

  //gets all of the text
  //const title = await page.evaluate(() => document.title)

  //gets all text
  //const text = await page.evaluate(() => document.body.innerText)

  //query sleector all links node list
  // const links = await page.evaluate(() =>
  //   Array.from(document.querySelectorAll("a"), (e) => e.href)
  // );

  console.log(html);

  await browser.close();
}

run();
