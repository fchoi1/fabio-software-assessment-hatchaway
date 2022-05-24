# fabio-back-software-assessment-hatchaway

## Description
This is a software application to get generate report carsd.

## Installation

Navigate to root directiory and run the following command, 

```
npm install
```

## Usage

In root directory run the command below. It will require multiple inputs.
This will generate a report card.
```
node index {path-to-courses-file} {path-to-students-file} {path-to-tests-file} {path-to-marks-file}
{path-to-output-file}
```

Example command:

```
node index.js Example1/courses.csv Example1/students.csv Example1/tests.csv Example1/marks.csv output.json
```

## Tests

The tests are using the jest library to test the utility functions and the route functions

To run all the tests use the command

```
npm test
```


## License

This application is under the MIT License  
For more information please view here: [MIT Description](https://choosealicense.com/licenses/mit/)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
