# fabio-back-end-assessment-hatchaway

## Description
This is a backend application to get blog posts based on tag parameters.

## Installation

Navigate to root directiory and run the following command

```
npm install
```

## Usage
This will start the backend Express server. The default port is configured to 3001 for localhost
```
npm start
```

## Tests

The tests are using the jest library to test the utility functions and the route functions

To run all the tests use the command

```
npm test
```

## Bonus (Caching)

For caching, this is to make repetitive calls faster. To do so, it uses memory cache library to store a key and value. A middleware function is created to intercept the url request and check if a key exists for the request url. If it exist, then return the cache data. If a key doesn't exist, store the next response.json call into the cache. 

A duration is also set because values and results can be updated. Therefore a duration input (seconds) is used to delete the cached data once the duration is complete. 

As seen below, caching has significantly reduced the response time.


### First Time calling (375ms)  
<img src="cache-first-time.png" width="600">

### Second Time calling (3ms)   
 <img src="cache-second-time.png" width="600">   

## License

This application is under the MIT License  
For more information please view here: [MIT Description](https://choosealicense.com/licenses/mit/)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
