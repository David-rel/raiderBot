// Importing required modules
const fs = require("fs");
const util = require("util");

// Promisifying fs methods for better error handling
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

async function processFile() {
  try {
    // Reading the file
    const data = await readFile("links.txt", "utf-8");

    // Splitting the file content into an array
    let array = data.split("\n");

    // Removing duplicates
    let uniqueArray = Array.from(new Set(array));

    // Writing the unique array elements back into a new file
    await writeFile("nonRedundantLinks.txt", uniqueArray.join("\n"));

    console.log(
      "Successfully processed the file and stored unique elements in output.txt"
    );
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Run the function
processFile();
