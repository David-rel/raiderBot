"use strict";

var fs = require("fs"); // Reads JSON data from a file.


function readJSON(filename) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filename, "utf8", function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
} // Writes JSON data to a file.


function writeJSON(filename, data) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(filename, JSON.stringify(data, null, 2), "utf8", function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
} // Main function that reads the data, removes duplicates, and writes it back to the file.


function removeDuplicates(filename) {
  var data, uniqueData, lookup, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, key;

  return regeneratorRuntime.async(function removeDuplicates$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(readJSON(filename));

        case 2:
          data = _context.sent;
          uniqueData = [];
          lookup = {};
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 8;

          for (_iterator = data[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            item = _step.value;
            key = JSON.stringify({
              data: item.data
            });

            if (!lookup[key]) {
              lookup[key] = true;
              uniqueData.push(item);
            }
          }

          _context.next = 16;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](8);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 16:
          _context.prev = 16;
          _context.prev = 17;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 19:
          _context.prev = 19;

          if (!_didIteratorError) {
            _context.next = 22;
            break;
          }

          throw _iteratorError;

        case 22:
          return _context.finish(19);

        case 23:
          return _context.finish(16);

        case 24:
          _context.next = 26;
          return regeneratorRuntime.awrap(writeJSON('output2.json', uniqueData));

        case 26:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[8, 12, 16, 24], [17,, 19, 23]]);
} // Replace 'input.json' with the path to your JSON file.


removeDuplicates("input.json")["catch"](console.error);