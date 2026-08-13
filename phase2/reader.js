const fs = require("fs");
const { parseCSV } = require("./parser");
const csv = fs.readFileSync("./test.CSV", "utf8");

const result = parseCSV(csv);

console.log(JSON.stringify(result, null, 2));