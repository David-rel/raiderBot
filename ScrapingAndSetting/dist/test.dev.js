"use strict";

var puppeteer = require("puppeteer");

function run() {
  var browser, page, html;
  return regeneratorRuntime.async(function run$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(puppeteer.launch());

        case 2:
          browser = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(browser.newPage());

        case 5:
          page = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(page["goto"]("https://www.regisjesuit.com/%E2%80%9CThanks%20to%20the%20benevolence%20of%20the%20Regis%20community,%20our%20sons%20have%20benefited%20from%20an%20outstanding%20education%20and%20have%20developed%20lifelong%20friendships.%E2%80%9D%20%20%E2%80%94Sarah%20Tierney,%20mother%20of%20Ryan%20%E2%80%9920%20and%20Matthew%20%E2%80%9922%20%20%3E%3ERead%20more%20about%20the%20Tierney%20family%20and%20other%20inspiring%20stories%20of%20generosity%20and%20impact%20here."));

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(page.content());

        case 10:
          html = _context.sent;
          //gets all of the text
          //const title = await page.evaluate(() => document.title)
          //gets all text
          //const text = await page.evaluate(() => document.body.innerText)
          //query sleector all links node list
          // const links = await page.evaluate(() =>
          //   Array.from(document.querySelectorAll("a"), (e) => e.href)
          // );
          console.log(html);
          _context.next = 14;
          return regeneratorRuntime.awrap(browser.close());

        case 14:
        case "end":
          return _context.stop();
      }
    }
  });
}

run();