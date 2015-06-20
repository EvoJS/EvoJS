var evo = require('../../build/evojs.js');
var assert = require("assert");

describe('Matrix3', function(){
    describe('#create', function(){
        var m1 = evo.Matrix3.create();
        var m2 = evo.Matrix3.create(
            1,2,3,
            4,5,6,
            7,8,9
        );
        var m3 = evo.Matrix3.create([
            1,2,3,
            4,5,6,
            7,8,9
        ]);
        it('Should create empty (default) matrix without arguments', function(){
            assert.equal(9, m1.length);
            assert.equal(evo.Matrix3.default[0], m1[0]);
            assert.equal(evo.Matrix3.default[1], m1[1]);
            assert.equal(evo.Matrix3.default[2], m1[2]);
            assert.equal(evo.Matrix3.default[3], m1[3]);
            assert.equal(evo.Matrix3.default[4], m1[4]);
            assert.equal(evo.Matrix3.default[5], m1[5]);
            assert.equal(evo.Matrix3.default[6], m1[6]);
            assert.equal(evo.Matrix3.default[7], m1[7]);
            assert.equal(evo.Matrix3.default[8], m1[8]);
        });
        it('Initialize matrix from values given via arguments', function(){
            assert.equal(9, m2.length);
            assert.equal(1, m2[0]);
            assert.equal(2, m2[1]);
            assert.equal(3, m2[2]);
            assert.equal(4, m2[3]);
            assert.equal(5, m2[4]);
            assert.equal(6, m2[5]);
            assert.equal(7, m2[6]);
            assert.equal(8, m2[7]);
            assert.equal(9, m2[8]);
        });
        it('Initialize matrix from an array given via arguments', function(){
            assert.equal(9, m3.length);
            assert.equal(1, m3[0]);
            assert.equal(2, m3[1]);
            assert.equal(3, m3[2]);
            assert.equal(4, m3[3]);
            assert.equal(5, m3[4]);
            assert.equal(6, m3[5]);
            assert.equal(7, m3[6]);
            assert.equal(8, m3[7]);
            assert.equal(9, m3[8]);
        });
    })
});