/**
 * The main container for evo library
 **/
var evo = {};

if ( typeof module === 'object' ) {
    module.exports = evo;
} else if (typeof define === 'function' && define.amd) {
    define(function () {
        return evo;
    });
} else {
    window.evo = evo;
}
