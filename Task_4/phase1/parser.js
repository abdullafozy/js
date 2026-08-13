function parseCSV(csvString) {
  const [header, ...rows] = csvString.split("\n");
  const headersArr = header.split(",").map((value) => value.trim());
  const res = [];

  rows.forEach((element) => {
    const values = element.split(",").map((value) => value.trim());
    const obj = {};

    for (let i = 0; i < headersArr.length; i++) {
      obj[headersArr[i]] = values[i];
    }

    res.push(obj);
  });

  return res;
}

module.exports = parseCSV;
