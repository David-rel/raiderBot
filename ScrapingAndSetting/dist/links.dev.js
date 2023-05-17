"use strict";

var puppeteer = require("puppeteer");

var fs = require("fs");

function run() {
  var browser, page, links;
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
          return regeneratorRuntime.awrap(page["goto"]("https://rjhs.instructure.com/courses/10730"));

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(page.evaluate(function () {
            return Array.from(document.querySelectorAll("a"), function (e) {
              return e.href;
            });
          }));

        case 10:
          links = _context.sent;
          console.log(links); // Save links to a .txt file

          fs.writeFile("data/links.txt", links.join("\n"), function (err) {
            if (err) {
              console.error("Error writing to file:", err);
            } else {
              console.log("Links successfully written to links.txt");
            }
          });
          _context.next = 15;
          return regeneratorRuntime.awrap(browser.close());

        case 15:
        case "end":
          return _context.stop();
      }
    }
  });
}

run();