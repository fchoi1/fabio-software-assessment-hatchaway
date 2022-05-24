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
    const data = await readFile('__test__/tests.csv');
    expect(data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          course_id: expect.any(String),
          weight: expect.any(String)
        })
      ])
    );
  });

  test('Able to write to json file', async () => {
    const file1 = './__test__/testFile.json';

    try {
      fs.unlinkSync(file1);
    } catch (err) {
      console.error(err);
    }
    await writeJSONfile(file1, { test: 'testing' });
    expect(fs.existsSync(file1)).toBe(true);
  });

  test('Able to change id type', async () => {
    const objList = [{ id: '1' }, { id: '2' }, { id: '3' }];
    expect(changeIdType(objList)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number)
        })
      ])
    );
  });

  test('Able to trim teacher name', async () => {
    const objList = [
      { teacher: '  test1' },
      { teacher: 'test2  ' },
      { teacher: 'test3' }
    ];

    const newObjList = trimTeacher(objList);
    expect(newObjList).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          teacher: objList[0].teacher.trim()
        }),
        expect.objectContaining({
          teacher: objList[1].teacher.trim()
        }),
        expect.objectContaining({
          teacher: objList[2].teacher.trim()
        })
      ])
    );
  });

  test('Able generate report card object', async () => {
    const marks = [{ test_id: 1, student_id: 1, mark: 90 }];
    const students = [{ id: 1, name: 'student' }];
    const tests = [{ id: 1, course_id: 1, weight: 100 }];
    const courses = [{ id: 1, name: 'course', teacher: 'teacher' }];
    const report = calculateAverage(marks, students, tests, courses);

    expect(report).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          courses: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              teacher: expect.any(String),
              courseAverage: expect.any(Number)
            })
          ])
        })
      ])
    );
  });
});
