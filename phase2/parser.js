function parseRow(row) {
  const values = [];
  let value = "";
  let insideQuotes = false;

  for (let i = 0; i < row.length; i++) {
    const char = row[i];

    if (char === '"') {
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

  values.push(value.trim());

  return values;
}

function parseCSV(csvString) {
  const [header, ...rows] = csvString.split("\n");

  const headersArr = parseRow(header);
  const res = [];

  rows.forEach((row) => {
    const values = parseRow(row);
    const obj = {};

    for (let i = 0; i < headersArr.length; i++) {
      obj[headersArr[i]] = values[i];
    }

    res.push(obj);
  });

  return res;
}

module.exports = { parseCSV, parseRow };



//  naive split(",") result BEFORE fixing quoted fields (kept for reference):


//   { name: 'John', age: '34', email: 'john@example.com' },
//   { name: '"Doe', age: 'John"', email: '34' },
//   { name: '"She said ""hello"""', age: '28', email: 'sara@x.com' },
//   { name: 'John', age: '', email: 'john@example.com' },
//   { name: '', age: '34', email: 'john@example.com' },
//   { name: 'John', age: '34', email: '' },
//   { name: '"Doe', age: 'John"', email: '"She said ""hello"""' }