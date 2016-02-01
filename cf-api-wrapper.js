'use strict';

/*global process*/

require('dotenv').config();
var _ = require('lodash');
var Promise = require('bluebird');
var querystring = require('querystring');
var randomstring = require('randomstring');
var request = Promise.promisify(require('request'));
Promise.promisifyAll(request);
var sha512 = require('js-sha512').sha512;

// Don't escape any character. It will break the handles parameter.
querystring.escape = function (str) {
  return str;
};

var CF_API_URL = 'http://codeforces.com/api';
var DEFAULT_WRAPPER_TIMEOUT = 60000;

/**
 * Generates URL for any request to Codeforces API.
 * The format of the URL is following the rules described here: http://codeforces.com/api/help
 *
 * @param {string} baseURL - Codeforces API base URL (http://codeforces.com/api)
 * @param {string} target - The target method to call
 * @returns {string} - The valid URL format to call `target` method
 */
var generateURL = function (baseURL, target, args) {
  args.time = Math.floor(Date.now() / 1000);
  args.apiKey = process.env.CF_KEY;

  var randomString = randomstring.generate(6);

  // Sort argument's keys
  args = _.chain(args)
    .toPairs()
    .sortBy(function (a) {
      return a[0];
    })
    .fromPairs()
    .value();

  var apiSig = randomString + '/' + target + '?' + querystring.stringify(args) + '#' + process.env.CF_SECRET;
  apiSig = sha512(apiSig);

  args.apiSig = randomString + apiSig;
  var result = baseURL + '/' + target + '?' + querystring.stringify(args);
  return result;
};

/**
 * Checks whether `args` contains every key specified in array `arr`.
 *
 * @param {object} args - The object to be checked
 * @param {array} arr - An array containing the required keys name
 * @throws Will throw an error if any of the required keys isn't found in `args`.
 */
var checkRequired = function (args, arr) {
  for (var i = 0; i < arr.length; ++i) {
    if (typeof args[arr[i]] === 'undefined') {
      throw new Error(arr[i] + ' is not specified.');
    }
  }
};

/**
 * Prepares and sends request to Codeforces API.
 *
 * @param {string} target - The target method to call
 * @param {array} requiredArgs - An array of string containing the required keys to call target method
 * @param {object} args - An object containing parameters for the API method call
 * @returns {Promise} A promise that holds a JSON object related to the API method call.
 */
var sendRequest = function (target, requiredArgs, args) {
  args = args || {};
  checkRequired(args, requiredArgs);

  var url = generateURL(CF_API_URL, target, args);

  var requestOpt = {
    uri: url,
    simple: false,
    json: true
  };

  return request(requestOpt)
    .timeout(process.env.WRAPPER_TIMEOUT || DEFAULT_WRAPPER_TIMEOUT)
    .then(function (result) {
      return result.body;
    });
};

module.exports = {
  contest: {
    hacks: sendRequest.bind(this, 'contest.hacks', ['contestId']),
    list: sendRequest.bind(this, 'contest.list', []),
    ratingChanges: sendRequest.bind(this, 'contest.ratingChanges', ['contestId']),
    standings: sendRequest.bind(this, 'contest.standings', ['contestId']),
    status: sendRequest.bind(this, 'contest.status', ['contestId'])
  },
  problemset: {
    problems: sendRequest.bind(this, 'problemset.problems', []),
    recentStatus: sendRequest.bind(this, 'problemset.recentStatus', ['count'])
  },
  user: {
    info: sendRequest.bind(this, 'user.info', ['handles']),
    ratedList: sendRequest.bind(this, 'user.ratedList', []),
    rating: sendRequest.bind(this, 'user.rating', ['handle']),
    status: sendRequest.bind(this, 'user.status', ['handle'])
  }
};
