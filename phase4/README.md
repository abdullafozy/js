# CSV Parser and Validator

This project implements a small CSV parsing and validation system in JavaScript.
It reads a CSV file, parses each row while handling quoted values and escaped quotes, validates values against a schema, and prints a summary of valid vs invalid rows.

## Features

- Parses CSV rows with support for commas inside quoted values
- Handles escaped quotes like `""` inside strings
- Validates data against a field schema (`string`, `number`, `boolean`)
- Reports missing columns, unexpected columns, malformed rows, and type mismatches
- Produces a readable report for debugging and QA

## Project files

- `parser.js` — CSV parsing logic, validators, and reporting
- `reader.js` — loads the CSV file and runs validation using a schema
- `test.CSV` — sample input file used to test the parser

## How it works

The parser exports:

- `parseRow(row)` — splits a single CSV row into cells
- `parseCSV(csvString, schema)` — parses the whole CSV text and validates each row
- `printReport(result)` — prints a summary of valid and invalid records

Example schema:

```js
const schema = {
  name: "string",
  age: "number",
  active: "boolean",
  email: "string"
};
```

## Run the project

From the `phase4` folder, run:

```bash
node reader.js
```

This will read the contents of `test.CSV`, validate every row, and print the report to the console.

## Example output

```bash
Total rows processed: 5
Valid rows: 4
Failed rows: 1

Errors:
Row 3: age — Expected number, got "abc"
```

## Notes

- The parser trims values before validation.
- Quoted fields are supported, including values like `"Doe, John"` and `"She said ""hello"""`.
- Empty values are allowed only when the schema permits them; numeric fields reject blank strings.
