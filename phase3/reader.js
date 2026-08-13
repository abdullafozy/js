const fs = require("fs");
const { parseCSV } = require("./parser"); 
const csv = fs.readFileSync("./test.CSV", "utf8");

const schema = {
  name: "string",
  age: "number",
  active: "boolean",
  email: "string"
};

const result = parseCSV(csv, schema);

console.log(JSON.stringify(result, null, 2));