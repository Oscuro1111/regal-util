var assert = require('assert');

describe('Array', function () {
    describe('#indexof', function () {
        it('should return -1 when value is not presant', function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});

