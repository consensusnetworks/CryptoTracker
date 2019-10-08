//Run the tests by running:
//node test/tests.js

const test = require('tape'); // assign the tape library to the variable "test"
const index = require('../index.js');

// test('should return -1 when the value is not present in Array', function (t) {
//   t.equal(-1, [1,2,3].indexOf(4)); // 4 is not present in this array so passes
//   t.end();
// });

test("Given an array and a goal of 5, return 4, the closest number", function (t) {
    var counts = [4, 9, 15, 6, 2];
    var goal = 5;
    
    //actual, expected
    t.equal(index.closestTimeStamp(counts, goal), 4);
    t.end();
})
