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
  var data, links, browser, scrapedData, uniqueData, i, page, innerText, summarizer, summary;
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
          scrapedData = []; // Prepare a Set to keep track of unique data

          uniqueData = new Set();
          i = 0;

        case 8:
          if (!(i < links.length)) {
            _context.next = 36;
            break;
          }

          _context.next = 11;
          return regeneratorRuntime.awrap(browser.newPage());

        case 11:
          page = _context.sent;
          _context.next = 14;
          return regeneratorRuntime.awrap(page["goto"](links[i], {
            waitUntil: "networkidle2"
          }));

        case 14:
          _context.next = 16;
          return regeneratorRuntime.awrap(page.evaluate(function () {
            return document.body.innerText;
          }));

        case 16:
          innerText = _context.sent;

          if (!uniqueData.has(innerText)) {
            _context.next = 22;
            break;
          }

          console.log("Data from link ".concat(i + 1, " (").concat(links[i], ") is a duplicate, skipping..."));
          _context.next = 21;
          return regeneratorRuntime.awrap(page.close());

        case 21:
          return _context.abrupt("continue", 33);

        case 22:
          // const back =
          //   "\nBoys Division\n6400 S. Lewiston Way, Aurora, CO 80016\nFax: 303.269.8134\nRegis Jesuit High School\n303.269.8000\nGirls Division\n6300 S. Lewiston Way, Aurora, CO 80016\nFax: 303.269.8133\nRegis Jesuit High School admits students of any race, color, national and ethnic origin to all the rights, privileges, programs and activities generally accorded or made available to students at the school. It does not discriminate on the basis of race, color, national and ethnic origin in administration of its educational policies, admissions policies, scholarship and loan programs, athletic and other school-administered programs.\nCONTACT & DIRECTIONS\nEMPLOYMENT\nEDUCATION VERIFICATION\nREQUEST TRANSCRIPT\nPRIVACY POLICY\nRegis Jesuit®, the Crest and RJ logos are federally registered trademarks owned by Regis Jesuit High School. All rights reserved.\nSelect Language​▼\n    \nSitemap";
          // const headerOneText =
          //   "Additional Information\nX\nThis website uses cookies to ensure you get the best experience on our website. By continuing to use this website, you consent to our use of these cookies.\n";
          //   innerText.replace(back, ' ')
          //   innerText.replace(headerOneText, ' ')
          // Add the data to our Set of unique data
          uniqueData.add(innerText); // Create a summary of the scraped data

          summarizer = new SummarizerManager(innerText, 3); // 3 sentences summary

          _context.next = 26;
          return regeneratorRuntime.awrap(summarizer.getSummaryByRank());

        case 26:
          summary = _context.sent;
          // Add the scraped data to our container
          scrapedData.push({
            number: i + 1,
            link: links[i],
            data: innerText,
            summary: summary // add the summary

          }); // Close the page to save resources

          _context.next = 30;
          return regeneratorRuntime.awrap(page.close());

        case 30:
          _context.next = 32;
          return regeneratorRuntime.awrap(delay(1000));

        case 32:
          // 1 second delay
          console.log("Finished scraping (".concat(links[i], ") ").concat(i + 1, " of ").concat(links.length, " links"));

        case 33:
          i++;
          _context.next = 8;
          break;

        case 36:
          _context.next = 38;
          return regeneratorRuntime.awrap(browser.close());

        case 38:
          // Write the scraped data to a file
          fs.writeFileSync("testTwoScrapedData.json", JSON.stringify(scrapedData, null, 2));
          console.log("Scraping finished");

        case 40:
        case "end":
          return _context.stop();
      }
    }
  });
})();