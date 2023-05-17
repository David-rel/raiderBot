"use strict";

var fs = require("fs");

var puppeteer = require("puppeteer");

var SummarizerManager = require("node-summarizer").SummarizerManager; // Function to delay the process


var delay = function delay(ms) {
  return new Promise(function (res) {
    return setTimeout(res, ms);
  });
};

(function _callee() {
  var data, links, browser, scrapedData, i, page, innerText, summarizer, summary;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // Read the text file with the links
          data = fs.readFileSync("links.txt", "utf-8"); // Split the text file into an array of links

          links = data.split("\n"); // Launch the browser

          _context.next = 4;
          return regeneratorRuntime.awrap(puppeteer.launch());

        case 4:
          browser = _context.sent;
          // Prepare a container for our scraped data
          scrapedData = [];
          i = 0;

        case 7:
          if (!(i < links.length)) {
            _context.next = 29;
            break;
          }

          _context.next = 10;
          return regeneratorRuntime.awrap(browser.newPage());

        case 10:
          page = _context.sent;
          _context.next = 13;
          return regeneratorRuntime.awrap(page["goto"](links[i], {
            waitUntil: "networkidle2"
          }));

        case 13:
          _context.next = 15;
          return regeneratorRuntime.awrap(page.evaluate(function () {
            return document.body.innerText;
          }));

        case 15:
          innerText = _context.sent;
          // Create a summary of the scraped data
          summarizer = new SummarizerManager(innerText, 3); // 3 sentences summary

          _context.next = 19;
          return regeneratorRuntime.awrap(summarizer.getSummaryByRank());

        case 19:
          summary = _context.sent;
          // Add the scraped data to our container
          scrapedData.push({
            number: i + 1,
            link: links[i],
            data: innerText,
            summary: summary // add the summary

          }); // Close the page to save resources

          _context.next = 23;
          return regeneratorRuntime.awrap(page.close());

        case 23:
          _context.next = 25;
          return regeneratorRuntime.awrap(delay(1000));

        case 25:
          // 1 second delay
          console.log("Finished scraping (".concat(links[i], ") ").concat(i + 1, " of ").concat(links.length, " links"));

        case 26:
          i++;
          _context.next = 7;
          break;

        case 29:
          _context.next = 31;
          return regeneratorRuntime.awrap(browser.close());

        case 31:
          // Write the scraped data to a file
          fs.writeFileSync("testTwoScrapedData.json", JSON.stringify(scrapedData, null, 2));
          console.log("Scraping finished");

        case 33:
        case "end":
          return _context.stop();
      }
    }
  });
})();