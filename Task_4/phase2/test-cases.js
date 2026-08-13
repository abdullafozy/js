const { parseRow } = require("./parser");
const testCases = [
    {
        input: 'John,34,john@example.com',
        expected: ['John', '34', 'john@example.com']
    },

    {
        input: '"Doe, John",34,john@x.com',
        expected: ['Doe, John', '34', 'john@x.com']
    },

    {
        input: '"She said ""hello"""',
        expected: ['She said "hello"']
    },

    {
        input: 'John,,john@example.com',
        expected: ['John', '', 'john@example.com']
    },

    {
        input: ',34,john@example.com',
        expected: ['', '34', 'john@example.com']
    },

    {
        input: 'John,34,',
        expected: ['John', '34', '']
    },

    {
        input: '"Doe, John","She said ""hello""",34',
        expected: ['Doe, John', 'She said "hello"', '34']
    }
];

testCases.forEach((testCase, index) => {
  const actual = parseRow(testCase.input);
  const actualStr = JSON.stringify(actual);
  const expectedStr = JSON.stringify(testCase.expected);

  if (actualStr === expectedStr) {
    console.log(`Test ${index + 1}: passed`);
  } else {
    console.log(`Test ${index + 1}: failed`);
    console.log(`  expected: ${expectedStr}`);
    console.log(`  actual:   ${actualStr}`);
  }
});