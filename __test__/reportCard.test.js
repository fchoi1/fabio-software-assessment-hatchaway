const {
  isValidFilename,
  readFile,
  writeJSONfile,
  changeIdType,
  trimTeacher,
  calculateAverage,
  generateReport
} = require('../utils.js');

const fs = require('fs');

describe('Testing utility functions', () => {
  test('Check if valid CSV File', () => {
    const testFile = 'test.csv';
    const testFile2 = 'test.json';
    const testFile3 = '';

    expect(isValidFilename(testFile)).toEqual(true);
    expect(isValidFilename(testFile2)).toEqual(false);
    expect(isValidFilename(testFile3)).toEqual(false);
  });

  test('Able to read a file', async () => {
    const data = await readFile('testss.csv');
    console.log(data);
  });
});

describe('Testing Valid Student Report Card', () => {
  test('Valid JSON format', () => {});

  test('Recieved tag error for no tag supplied', () => {});
});
