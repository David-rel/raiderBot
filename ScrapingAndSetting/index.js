// Require filesystem module
const fs = require("fs");

// Read the data from the file
fs.readFile("test.txt", "utf8", function (err, data) {
  if (err) throw err;

  // Split the data by newline to get an array
  var array = data.split("\n");

  // Filter out the undesired elements
  var filteredArray = array.filter(function (url) {
    return (
      !url.includes("www.linkedin.com") &&
      !url.includes("www.facebook.com") &&
      !url.includes("twitter.com")
    );
  });

  // Convert the filtered array back to a string
  var output = filteredArray.join("\n");

  // Write the filtered data to a new file
  fs.writeFile("output.txt", output, "utf8", function (err) {
    if (err) throw err;
    console.log("Successfully filtered and wrote to output.txt");
  });
});
