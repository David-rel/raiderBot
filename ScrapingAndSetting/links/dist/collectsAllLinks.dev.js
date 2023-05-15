"use strict";

var puppeteer = require("puppeteer");

var fs = require("fs");

function extractLinksFromPage(page, url) {
  var links;
  return regeneratorRuntime.async(function extractLinksFromPage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(page["goto"](url));

        case 2:
          _context.next = 4;
          return regeneratorRuntime.awrap(page.evaluate(function () {
            return Array.from(document.querySelectorAll("a"), function (e) {
              return e.href;
            });
          }));

        case 4:
          links = _context.sent;
          return _context.abrupt("return", links.filter(function (link) {
            return link !== "" && link.includes("https://www.regisjesuit.com/");
          }));

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}

function run() {
  var browser, page, urls, allLinks, visitedUrls, i, mainUrl, mainPageLinks, j, link, childPageLinks;
  return regeneratorRuntime.async(function run$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(puppeteer.launch());

        case 2:
          browser = _context2.sent;
          _context2.next = 5;
          return regeneratorRuntime.awrap(browser.newPage());

        case 5:
          page = _context2.sent;
          // Read URLs from a text file, each URL should be on a new line
          urls = fs.readFileSync("links.txt", "utf-8").split("\n");
          allLinks = new Set();
          visitedUrls = new Set();
          i = 0;

        case 10:
          if (!(i < urls.length)) {
            _context2.next = 52;
            break;
          }

          mainUrl = urls[i];

          if (!visitedUrls.has(mainUrl)) {
            _context2.next = 15;
            break;
          }

          console.log("Skipping URL ".concat(i + 1, " of ").concat(urls.length, ": ").concat(mainUrl, " (already visited)"));
          return _context2.abrupt("continue", 49);

        case 15:
          _context2.prev = 15;
          console.log("Processing URL ".concat(i + 1, " of ").concat(urls.length, ": ").concat(mainUrl));
          _context2.next = 19;
          return regeneratorRuntime.awrap(extractLinksFromPage(page, mainUrl));

        case 19:
          mainPageLinks = _context2.sent;
          mainPageLinks.forEach(function (link) {
            return allLinks.add(link);
          });
          visitedUrls.add(mainUrl);
          j = 0;

        case 23:
          if (!(j < mainPageLinks.length)) {
            _context2.next = 44;
            break;
          }

          link = mainPageLinks[j];

          if (!visitedUrls.has(link)) {
            _context2.next = 28;
            break;
          }

          console.log("Skipping link ".concat(j + 1, " of ").concat(mainPageLinks.length, ": ").concat(link, " (already visited)"));
          return _context2.abrupt("continue", 41);

        case 28:
          _context2.prev = 28;
          console.log("Extracting links from ".concat(link, " (").concat(j + 1, " of ").concat(mainPageLinks.length, ")"));
          _context2.next = 32;
          return regeneratorRuntime.awrap(extractLinksFromPage(page, link));

        case 32:
          childPageLinks = _context2.sent;
          childPageLinks.forEach(function (childLink) {
            return allLinks.add(childLink);
          });
          visitedUrls.add(link);
          console.log("Finished copying links from ".concat(link));
          _context2.next = 41;
          break;

        case 38:
          _context2.prev = 38;
          _context2.t0 = _context2["catch"](28);
          console.error("Error visiting ".concat(link, ":"), _context2.t0);

        case 41:
          j++;
          _context2.next = 23;
          break;

        case 44:
          _context2.next = 49;
          break;

        case 46:
          _context2.prev = 46;
          _context2.t1 = _context2["catch"](15);
          console.error("Error visiting ".concat(mainUrl, ":"), _context2.t1);

        case 49:
          i++;
          _context2.next = 10;
          break;

        case 52:
          fs.writeFile("newLinks.txt", Array.from(allLinks).join("\n"), function (err) {
            if (err) {
              console.error("Error writing to file:", err);
            } else {
              console.log("Links successfully written to links.txt");
            }
          });
          _context2.next = 55;
          return regeneratorRuntime.awrap(browser.close());

        case 55:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[15, 46], [28, 38]]);
}

run();