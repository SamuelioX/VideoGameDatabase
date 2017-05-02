var chai = require('chai');

var assert = chai.assert;

describe('Array', function() {
  it('should start empty', function() {
    var arr = [];

    assert.equal(arr.length, 0);
  });
});
//describe('Array', function() {
//  describe('#indexOf()', function() {
//    it('should return -1 when the value is not present', function() {
//      assert.equal(-1, [1,2,3].indexOf(4));
//    });
//  });
//});

//describe("Answers", function(){
//    it("should be 42", function(){
//        assert.equal(42, 42);
//    });
//});