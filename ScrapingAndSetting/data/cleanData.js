const fs = require("fs");

// Reads JSON data from a file.
function readJSON(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

// Writes JSON data to a file.
function writeJSON(filename, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, JSON.stringify(data, null, 2), "utf8", (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// Main function that reads the data, removes duplicates, and writes it back to the file.
async function removeDuplicates(filename) {
  const data = await readJSON(filename);

  const uniqueData = [];
  const lookup = {};

  for (let item of data) {
    const key = JSON.stringify({
      data: item.data,
    });

    if (!lookup[key]) {
      lookup[key] = true;
      uniqueData.push(item);
    }
  }

  await writeJSON('output2.json', uniqueData);
}

// Replace 'input.json' with the path to your JSON file.
removeDuplicates("input.json").catch(console.error);
