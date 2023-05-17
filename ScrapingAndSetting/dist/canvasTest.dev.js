"use strict";

var puppeteer = require("puppeteer");

(function _callee() {
  var browser, page;
  return regeneratorRuntime.async(function _callee$(_context) {
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
          return regeneratorRuntime.awrap(page["goto"]("https://your.canvas.url/login"));

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(page.type("#username_or_email_field_id", "your_username_or_email"));

        case 10:
          _context.next = 12;
          return regeneratorRuntime.awrap(page.type("#password_field_id", "your_password"));

        case 12:
          _context.next = 14;
          return regeneratorRuntime.awrap(Promise.all([page.waitForNavigation(), // The promise resolves after navigation has finished
          page.click("#login_button_id") // Clicking the link will indirectly cause a navigation
          ]));

        case 14:
          _context.next = 16;
          return regeneratorRuntime.awrap(page["goto"]("https://your.canvas.url/the_page_you_need"));

        case 16:
          _context.next = 18;
          return regeneratorRuntime.awrap(browser.close());

        case 18:
        case "end":
          return _context.stop();
      }
    }
  });
})();