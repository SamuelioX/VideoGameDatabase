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
    it('should return a 200 response', function (done) {
        server.get('/getGameList')
                .set('Accept', 'app/routes')
                .expect(200, done);
    });
});