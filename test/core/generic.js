var evo = require('../../build/evojs.js');
var assert = require("assert");

describe('Core', function(){
    describe('#version', function(){
        it('Should return the version number as semver string', function(){
            assert.equal("string", typeof evo.version);
            assert.equal(3, evo.version.split(".").length);
        })
    })
});