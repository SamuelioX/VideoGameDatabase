var chai = require('chai');
var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;
var supertest = require("supertest");
var server = supertest.agent("http://localhost:3000");


//test to see if unit testing works
describe('Array', function () {
    it('should start empty', function () {
        var arr = [];

        assert.equal(arr.length, 0);
    });
});
// UNIT test begin

describe("Test Game List", function () {
    it('the first game should be Mega Man X2', function (done) {
        server.get('/getGameList')
                .expect(200)
                .end(function (err, res) {
//                    expect(res.body).to.have.lengthOf(1);
                    assert.equal("Mega Man X2", res.body[0].name);
                    done(err);
                });
    });
});

describe("Test Game Info", function () {
    it('testing if game info can be retreived', function (done) {
        server.get('/getGameInfo')
                .expect(200)
                .query({gameId: 1})
                .end(function (err, res) {
//                    expect(res.body).to.have.lengthOf(1);
                    assert.equal("Mega Man X2", res.body[0].name);
                    done(err);
                });
    });
});

describe("Test Search Game", function () {
    it('this should search for mega man', function (done) {
        server.get('/searchGame')
                .query({gamename: "Mega Man"})
                .end(function (err, res) {
                    assert.equal("Mega Man", res.body[0].name);
                    done(err);
                });
    });
});

describe("Test User List", function () {
    it('should a list of 2', function (done) {
        server.get('/getUserList')
                .set('Accept', 'app/routes')
                .expect(200)
                .end(function (err, res) {
//                    expect(res.body).to.have.lengthOf(2);
                    done(err);
                });
    });
});

describe("Test First User in List", function () {
    it('this should be admin', function (done) {
        server.get('/getUserList')
                .set('Accept', 'app/routes')
                .expect(200)
                .end(function (err, res) {
//                    expect(res.body).to.have.lengthOf(1);
                    assert.equal("admin", res.body[0].username);
                    done(err);
                });
    });
});