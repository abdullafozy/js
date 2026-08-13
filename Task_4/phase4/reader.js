const fs = require("fs");

const {
  parseCSV,
  printReport
} = require("./parser");

const csv = fs.readFileSync("./test.CSV", "utf8");

const schema = {
  name: "string",
  age: "number",
  active: "boolean",
  email: "string"
};

const result = parseCSV(csv, schema);

printReport(result);