'use strict';

var caw = require('./../cf-api-wrapper');
var chai = require('chai').use(require('chai-as-promised'));
var should = chai.should();
var expect = chai.expect;

var VALID_CONTEST_ID = 374;
var INVALID_CONTEST_ID = 123123123;

var VALID_HANDLES = '14L;tourist';
var VALID_HANDLE = '14L';
var INVALID_HANDLES = 'sokogantengsekali;nontourist';
var INVALID_HANDLE = 'sokogantengsekali';

var VALID_PROBLEMS_TAG = 'dsu';

var STATUS_OK = 'OK';
var STATUS_FAILED = 'FAILED';

var checkNormal = function (result, STATUS) {
  result.should.be.json;
  result.status.should.equal(STATUS);
};

describe('Codeforces API Wrapper', function () {

  describe('contest.hacks', function() {
    it('should return list of hacks in JSON format (OK version)', function (done) {
      return caw.contest.hacks({contestId: VALID_CONTEST_ID})
        .then(function (result) {
          checkNormal(result, STATUS_OK);
          done();
        })
        .error(function (err) {
          done(err);
        });
    });

    it('should return list of hacks in JSON format (FAILED version)', function (done) {
      return caw.contest.hacks({contestId: INVALID_CONTEST_ID})
        .then(function (result) {
          checkNormal(result, STATUS_FAILED);
          done();
        })
        .error(function (err) {
          done(err);
        });
    });

    it('should throw an error in case of the absence of contestId', function () {
      return expect(caw.contest.hacks).to.throw(Error);
    });
  });

  describe('contest.list', function () {
    it('should return list of contests in JSON format (OK version)', function (done) {
      return caw.contest.list()
        .then(function (result) {
          checkNormal(result, STATUS_OK);
          done();
        })
        .error(function (err) {
          done(err);
        });
    });

    it('should return list of contests in JSON format (OK version, with params)', function (done) {
      return caw.contest.list({gym: true})
        .then(function (result) {
          checkNormal(result, STATUS_OK);
          done();
        })
        .error(function (err) {
          done(err);
        });
    });
  });

  describe('contest.ratingChanges', function () {
    it('should return list of rating changes in JSON format (OK version)', function (done) {
      caw.contest.ratingChanges({contestId: VALID_CONTEST_ID})
        .then(function (result) {
          checkNormal(result, STATUS_OK);
          done();
        })
        .error(function (err) {
          done(err);
        });
    });

    it('should return list of rating changes in JSON format (FAILED version)', function (done) {
      return caw.contest.ratingChanges({contestId: INVALID_CONTEST_ID})
        .then(function (result) {
          checkNormal(result, STATUS_FAILED);
          done();
        })
        .error(function (err) {
          done(err);
        });
    });

    it('should throw an error in case of the absence of contestId', function () {
      return expect(caw.contest.ratingChanges).to.throw(Error);
    });
  });

  describe('contest.standings', function () {
    it('should return standings in JSON format (OK version)', function (done) {
      return caw.contest.standings({contestId: VALID_CONTEST_ID})
        .then(function (result) {
          checkNormal(result, STATUS_OK);
          done();
        })
        .error(function (err) {
          done(err);
        });
    });

    it('should return standings in JSON format (FAILED version)', function (done) {
      return caw.contest.standings({contestId: INVALID_CONTEST_ID})
        .then(function (result) {
          checkNormal(result, STATUS_FAILED);
          done();
        })
        .error(function (err) {
          done(err);
        });
    });

    it('should return standings in JSON format (OK version, with params)', function (done){
      return caw.contest.standings({contestId: VALID_CONTEST_ID, from: 1, count: 5, showUnofficial: true})
        .then(function (result) {
          checkNormal(result, STATUS_OK);
          done();
        })
        .error(function (err) {
          done(err);
        });
    });

    it('should return standings in JSON format (FAILED version, with params)', function (done) {
      return caw.contest.standings({contestId: VALID_CONTEST_ID, handles: INVALID_HANDLES})
        .then(function (result) {
          checkNormal(result, STATUS_FAILED);
          done();
        })
        .error(function (err) {
          done(err);
        });
    });

    it('should throw an error in case of the absence of contestId', function () {
      return expect(caw.contest.standings).to.throw(Error);
    });
  });

  describe('contest.status', function () {
    it('should return submissions\' status in JSON format (OK version)', function (done) {
      return caw.contest.status({contestId: VALID_CONTEST_ID})
        .then(function (result) {
          checkNormal(result, STATUS_OK);
          done();
        })
        .error(function (err) {
          done(err);
        });
    });

    it('should return submissions\' status in JSON format (FAILED version)', function (done) {
      return caw.contest.status({contestId: INVALID_CONTEST_ID})
        .then(function (result) {
          checkNormal(result, STATUS_FAILED);
          done();
        })
        .error(function (err) {
          done(err);
        });
    });

    it('should return submissions\' status in JSON format (OK version, with params)', function (done) {
      return caw.contest.status({contestId: VALID_CONTEST_ID, from: 1, count: 10})
        .then(function (result) {
          checkNormal(result, STATUS_OK);
          done();
        })
        .error(function (err) {
          done(err);
        });
    });

    it('should return submissions\' status in JSON format (FAILED version, with params)', function (done) {
      return caw.contest.status({contestId: VALID_CONTEST_ID, handle: INVALID_HANDLE})
        .then(function (result) {
          checkNormal(result, STATUS_FAILED);
          done();
        })
        .error(function (err) {
          done(err);
        });
    });
  });

  describe('problemset.problems', function () {
    it('should return list of problems and problem statistics in JSON format (OK version)', function (done) {
      return caw.problemset.problems()
        .then(function (result) {
          checkNormal(result, STATUS_OK);
          done();
        })
        .error(function (err) {
          done(err);
        });
    });

    it('should return list of problems and problem statistics in JSON format (OK version, with params)', function (done) {
      return caw.problemset.problems({tags: VALID_PROBLEMS_TAG})
        .then(function (result) {
          checkNormal(result, STATUS_OK);
          done();
        })
        .error(function (err) {
          done(err);
        });
    });
  });

  describe('problemset.recentStatus', function () {
    it('should return the specified number of submission statuses in JSON format (OK version)', function (done) {
      return caw.problemset.recentStatus({count: 10})
        .then(function (result) {
          checkNormal(result, STATUS_OK);
          done();
        })
        .error(function (err) {
          done(err);
        });
    });

    it('should return the specified number of submission statuses in JSON format (FAILED version)', function (done) {
      return caw.problemset.recentStatus({count: 1001})
        .then(function (result) {
          checkNormal(result, STATUS_FAILED);
          done();
        })
        .error(function (err) {
          done(err);
        });
    });

    it('should throw an error in case of the absence of count', function () {
      return expect(caw.problemset.recentStatus).to.throw(Error);
    });
  });

  describe('user.info', function () {
    it('should return user infos in JSON format (OK version)', function (done) {
      return caw.user.info({handles: VALID_HANDLES})
        .then(function (result) {
          checkNormal(result, STATUS_OK);
          done();
        })
        .error(function (err) {
          done(err);
        });
    });

    it('should return user infos in JSON format (FAILED version)', function (done) {
      return caw.user.info({handles: INVALID_HANDLES})
        .then(function (result) {
          checkNormal(result, STATUS_FAILED);
          done();
        })
        .error(function (err) {
          done(err);
        });
    });

    it('should throw an error in case of the absence of handles', function () {
      return expect(caw.user.info).to.throw(Error);
    });
  });

  describe('user.ratedList', function () {
    it('should return list of users in JSON format (OK version) [Ignored, the JSON object is too big]', function (done) {
      return done();
      //return caw.user.ratedList()
      //  .then(function (result) {
      //    checkNormal(result, STATUS_OK);
      //    done();
      //  })
      //  .error(function (err) {
      //    done(err);
      //  });
    });

    it('should return list of users in JSON format (OK version, with params)', function (done) {
      return caw.user.ratedList({activeOnly: true})
        .then(function (result) {
          checkNormal(result, STATUS_OK);
          done();
        })
        .error(function (err) {
          done(err);
        });
    });
  });

  describe('user.rating', function () {
    it('should return rating history of a user (OK version)', function (done) {
      return caw.user.rating({handle: VALID_HANDLE})
        .then(function (result) {
          checkNormal(result, STATUS_OK);
          done();
        })
        .error(function (err) {
          done(err);
        });
    });

    it('should return rating history of a user (FAILED version)', function (done) {
      return caw.user.rating({handle: INVALID_HANDLE})
        .then(function (result) {
          checkNormal(result, STATUS_FAILED);
          done();
        })
        .error(function (err) {
          done(err);
        });
    });

    it('should throw an error in case of the absence of handle', function () {
      return expect(caw.user.rating).to.throw(Error);
    });
  });

  describe('user.status', function () {
    it('should return a list of submissions of a user in JSON format (OK version)', function (done) {
      return caw.user.status({handle: VALID_HANDLE})
        .then(function (result) {
          checkNormal(result, STATUS_OK);
          done();
        })
        .error(function (err) {
          done(err);
        });
    });

    it('should return a list of submissions of a user in JSON format (OK version, with params)', function (done) {
      return caw.user.status({handle: VALID_HANDLE, from: 1, count: 10})
        .then(function (result) {
          checkNormal(result, STATUS_OK);
          done();
        })
        .error(function (err) {
          done(err);
        });
    });

    it('should return a list of submissions of a user in JSON format (FAILED version)', function (done) {
      return caw.user.status({handle: INVALID_HANDLE})
        .then(function (result) {
          checkNormal(result, STATUS_FAILED);
          done();
        })
        .error(function (err) {
          done(err);
        });
    });

    it('should throw an error in case of the absence of handle', function () {
      return expect(caw.user.status).to.throw(Error);
    });
  });
});
