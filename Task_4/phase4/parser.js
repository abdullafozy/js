function printReport(result) {
  const failedRows = new Set(
    result.errors.map((error) => error.row)
  ).size;

  const totalRows = result.valid.length + failedRows;

  console.log(`Total rows processed: ${totalRows}`);
  console.log(`Valid rows: ${result.valid.length}`);
  console.log(`Failed rows: ${failedRows}`);

  if (result.errors.length > 0) {
    console.log("\nErrors:");

    result.errors.forEach((error) => {
      console.log(
        `Row ${error.row}: ${error.field} — ${error.message}`
      );
    });
  }
}
function parseRow(row) {
  const values = [];
  let value = "";
  let insideQuotes = false;

  for (let i = 0; i < row.length; i++) {
    const char = row[i];

    if (char === '"') {
      // Escaped quote: ""
      if (insideQuotes && row[i + 1] === '"') {
        value += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === "," && !insideQuotes) {
      values.push(value.trim());
      value = "";
    } else {
      value += char;
    }
  }

  // Add the last field
  values.push(value.trim());

  return values;
}


// Validators

function validateString(value) {
  return {
    valid: true,
    value: value
  };
}

function validateNumber(value) {
  if (value === "") {
    return {
      valid: false
    };
  }

  const number = Number(value);

  if (Number.isNaN(number)) {
    return {
      valid: false
    };
  }

  return {
    valid: true,
    value: number
  };
}

function validateBoolean(value) {
  if (value === "true") {
    return {
      valid: true,
      value: true
    };
  }

  if (value === "false") {
    return {
      valid: true,
      value: false
    };
  }

  return {
    valid: false
  };
}


// Higher-order function

function getValidator(type) {
  if (type === "string") {
    return validateString;
  }

  if (type === "number") {
    return validateNumber;
  }

  if (type === "boolean") {
    return validateBoolean;
  }

  return null;
}


function parseCSV(csvString, schema) {
  const [header, ...rows] = csvString.trim().split("\n");

  const headers = parseRow(header);

  const valid = [];
  const errors = [];


  // Check missing columns
  for (const field in schema) {
    if (!headers.includes(field)) {
      errors.push({
        row: 1,
        field: field,
        message: "Missing column"
      });
    }
  }


  // Check extra columns
  for (const header of headers) {
    if (!(header in schema)) {
      errors.push({
        row: 1,
        field: header,
        message: "Unexpected column"
      });
    }
  }


  // Validate rows
  rows.forEach((row, index) => {
    const rowNumber = index + 2;

    const values = parseRow(row);
    const obj = {};
    const rowErrors = [];


    // Check row column count
    if (values.length !== headers.length) {
      errors.push({
        row: rowNumber,
        field: "_row",
        message: `Expected ${headers.length} columns, got ${values.length}`
      });

      return;
    }


    // Validate each field
    for (let i = 0; i < headers.length; i++) {
      const field = headers[i];
      const value = values[i];


      // Skip columns that don't exist in schema
      if (!(field in schema)) {
        continue;
      }


      const type = schema[field];
      const validator = getValidator(type);


      if (!validator) {
        rowErrors.push({
          row: rowNumber,
          field: field,
          message: `Unsupported type "${type}"`
        });

        continue;
      }


      const result = validator(value);


      if (!result.valid) {
        rowErrors.push({
          row: rowNumber,
          field: field,
          message: `Expected ${type}, got "${value}"`
        });

        continue;
      }


      obj[field] = result.value;
    }


    // Put row in errors or valid
    if (rowErrors.length > 0) {
      errors.push(...rowErrors);
    } else {
      valid.push(obj);
    }
  });


  return {
    valid,
    errors
  };
}


module.exports = { parseCSV, parseRow, printReport };