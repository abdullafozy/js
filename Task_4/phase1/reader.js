const fs = require("fs");
const parseCSV = require("./parser");
const csvString = fs.readFileSync("../phase2/test.CSV", "utf8");
console.log(parseCSV(csvString));