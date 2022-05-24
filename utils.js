const csv = require('csv-parser');
const fs = require('fs');

const isValidFilename = (string) => {
  if (!string || string.length > 255) {
    return false;
  }

  if (!/.+(\.csv)$/.test(string)) {
    return false;
  }

  if (string === '.' || string === '..') {
    return false;
  }

  return true;
};
const readFile = (filename) => {
  data = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filename)
      .pipe(csv())
      .on('data', (row) => {
        data.push(row);
      })
      .on('end', () => {
        resolve(data);
      })
      .on('error', function (err) {
        reject(err);
      });
  });
};

const writeJSONfile = async (filename, data) => {
  const JSONdata = JSON.stringify(data, null, 2);
  await fs.writeFileSync(filename, JSONdata);
};

const parseArgs = () => {
  const [courseFile, studentFile, testsFile, marksFile, outputFile] =
    process.argv.slice(2, 7);

  for (file of [courseFile, studentFile, testsFile, marksFile]) {
    if (!file) {
      throw new Error(`Missing a file in input!`);
    }
    if (!isValidFilename(file)) {
      throw new Error(`${file} is not a valid file`);
    }
  }
  return { courseFile, studentFile, testsFile, marksFile, outputFile };
};

const changeIdType = (objectList) => {
  for (obj of objectList) {
    obj.id = parseInt(obj.id);
  }
  return objectList;
};

const trimTeacher = (courses) => {
  for (course of courses) {
    course.teacher = course.teacher.trim();
  }
  return courses;
};
const calculateAverage = (marks, students, tests, courses) => {
  studentList = [];
  let studentCopy;
  for (student of students) {
    let totalAvg = 0;
    studentCopy = JSON.parse(JSON.stringify(student));
    studentCopy.courses = JSON.parse(JSON.stringify(courses));

    studentMarks = marks.filter((mark) => student.id == mark.student_id);

    for (course of courses) {
      courseTest = tests.filter((test) => test.course_id == course.id);
      courseMark = null;

      for (test of courseTest) {
        if (studentMarks.find((mark) => mark.test_id == test.id)) {
          if (courseMark == null) {
            courseMark =
              (studentMarks.find((mark) => mark.test_id == test.id).mark *
                test.weight) /
              100;
          } else {
            courseMark +=
              (studentMarks.find((mark) => mark.test_id == test.id).mark *
                test.weight) /
              100;
          }
        }
      }
      if (courseMark === null) {
        studentCopy.courses = studentCopy.courses.filter(
          (deleteCourse) => deleteCourse.id !== course.id
        );
      }

      if (
        studentCopy.courses.find(
          (Studentcourse) => Studentcourse.id == course.id
        )
      ) {
        studentCopy.courses.find(
          (Studentcourse) => Studentcourse.id == course.id
        ).courseAverage = Math.round(courseMark * 100) / 100;
        totalAvg += courseMark;
      }
    }
    studentCopy.totalAverage =
      Math.round((totalAvg / studentCopy.courses.length) * 100) / 100;
    studentList.push(studentCopy);
  }
  return studentList;
};

const generateReport = async () => {
  const { courseFile, studentFile, testsFile, marksFile, outputFile } =
    parseArgs();
  try {
    let courseData = await readFile(courseFile);
    let studentData = await readFile(studentFile);

    let testData = await readFile(testsFile);

    let markData = await readFile(marksFile);

    // studentData = changeIdType(studentData);
    courseData = trimTeacher(courseData);

    reportCard = calculateAverage(
      markData,
      changeIdType(studentData),
      testData,
      changeIdType(courseData)
    );
    writeJSONfile(outputFile, { students: reportCard });
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('File not found!');
    } else {
      throw err;
    }
  }
};

module.exports = {
  isValidFilename,
  readFile,
  writeJSONfile,
  changeIdType,
  trimTeacher,
  calculateAverage,
  generateReport
};
