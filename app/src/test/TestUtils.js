const chakram = require('chakram');
const utils = require('../utils.js');

expect = chakram.expect;

// Testing Utils.js functions.
describe("Testing Utils.js", () => {

    it("should return a JSON object", () => {
        // Create an object.
        obj = {result: "hello", err: null};

        // Convert to a JSON object.
        res = utils.ObjToJSON(obj);

        // Check can read JSON.
        expect(res["result"]).to.equal("hello");
        expect(res["err"]).to.equal(null);
    });
});
