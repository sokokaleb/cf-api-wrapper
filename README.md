# cf-api-wrapper: A Wrapper for [Codeforces API](http://codeforces.com/api/help) [![Build Status](https://travis-ci.org/sokokaleb/cf-api-wrapper.svg?branch=master)](https://travis-ci.org/sokokaleb/cf-api-wrapper)

cf-api-wrapper is a wrapper for Codeforces API which provides an easy way to use it using Node.js.

## Installation

```
npm install cf-api-wrapper
```

## Usage

cf-api-wrapper provides functions to access all provided Codeforces API.
To use them, simply call the function along with the parameter(s) as an object after `require`-ing the wrapper.

Example:

```
var caw = require('cf-api-wrapper');

caw.user.info({handles: '14L'})
  .then(function (result) {
    // result is a list of User objects
    // do something with it.
  });
```

As you see each function returns a `Promise`, which later can be handled by using `.then`, `.catch`, `.error`, etc.

Every function has a timeout of 60 seconds, after which it will throw an `Promise.TimeoutError` error. The timeout is necessary as Codeforces API may not respond with the correct JSON/not responding at all because of several reasons such as the JSON object is too big, or any other reason.

## List of Functions

A complete description of the API can be read at [Codeforces API help page](http://codeforces.com/api/help).

#### contest.hacks
Parameters: `contestId` (required)

#### contest.list
Parameters: `gym`

#### contest.ratingChanges
Parameters: `contestId` (required)

#### contest.standings
Parameters: `contestId` (required), `from`, `count`, `handles`, `room`, `showUnofficial`

#### contest.status
Parameters: `contestId` (required), `handle`, `from`, `count`

#### problemset.problems
Parameters: `tags` (required)

#### problemset.recentStatus
Parameters: `count`

#### user.info
Parameters: `handles` (required)

#### user.ratedList
Parameters: `activeOnly`

#### user.rating
Parameters: `handle` (required)

#### user.status
Parameters: `handle` (required), `from`, `count`

## Maintainer(s)

The tool is currently maintained by Pusaka Kaleb Setyabudi ([@sokokaleb](http://github.com/sokokaleb)).

## License

The tool is licensed under MIT License.
