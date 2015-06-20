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

(function (evo) {

    evo.version = "0.1.0";

}(evo));
(function (evo) {

    // ************************************************************************
    // CONSTRUCTUR
    // ************************************************************************

    function Point2d() {
        var arr = new Array(2);
        arr[0] = 0;
        arr[1] = 0;

        if(arguments.length == 1){
            if((Object.prototype.toString.call(arguments[0]) === '[object Array]') && (typeof arguments[0][0] === 'number') && (typeof arguments[0][1] === 'number')){
                arr[0] = arguments[0][0];
                arr[1] = arguments[0][1];
            } else {
                throw "Invalid argument for Point2d."
            }
        } else if(arguments.length >= 2){
            if((typeof arguments[0] === 'number') && (typeof arguments[1] === 'number')){
                arr[0] = arguments[0];
                arr[1] = arguments[1];
            } else {
                throw "Invalid argument for Point2d."
            }
        }

        arr.__proto__ = Point2d.prototype;
        return arr;
    }

    Point2d.prototype = Object.create(Array.prototype);

    // ************************************************************************
    // METHODS
    // ************************************************************************

    Point2d.prototype.from = function(){
        try{
            var p = Point2d.apply(this, arguments);
            this[0] = p[0];
            this[1] = p[1];
        }catch(e){
            throw e;
        }
        return this;
    };

    Point2d.prototype.toString = function(){
        return "[Point2d x: " + this[0] + ", y: " + this[1] + "]";
    };

    Object.defineProperty(Point2d.prototype, 'x', {
        get: function() { return this[0]; },
        set: function(val) { this[0] = val; },
        enumerable: false
    });

    Object.defineProperty(Point2d.prototype, 'y', {
        get: function() { return this[1]; },
        set: function(val) { this[1] = val; },
        enumerable: false
    });

    evo.Point2d = Point2d;

}(evo));
/** ****************************************************************************** ***
 Matrix3
 *** ****************************************************************************** **/

// Create()							Creates a new matrix. Arguments same with Matrix3 class constructor.
// Clone(m, [result])				Returns a copy (clone) of matrix m. Optionally, sets the result in result matrix.
// Set(m, data, [rowMajor])			Returns a matrix where values have been set from data. Data may be an array or supplied as an arguments for this function. The boolean rowMajor (default: false) may be used to describe if the data order is in row major order.
// SetElement(m, i, value)			Returns a matrix where element at index i is set to specified value.
// GetElement(m, i)					Returns a matrix value from index i.
// Identity([m])					Returns a Identity matrix. If matrix is provided as an argument for this function, the matrix values are set to Identity matrix.
// Zero([m])						Returns a Zero matrix. If matrix is provided as an argument for this function, the matrix values are set to zero.
// Equals(m1, m2)					Returns true is matrix m1 equals to matrix m2.
// Add([m])							Returns a Zero matrix. If matrix is provided as an argument for this function, the matrix values are set to zero.
// Zero([m])						Returns a Zero matrix. If matrix is provided as an argument for this function, the matrix values are set to zero.
// Add(m1, m2, [result])			Returns a matrix where m1 and m2 are added together. Optionally, sets the result in result matrix.
// Sub(m1, m2, [result])			Returns a matrix where m2 is substracted from m1. Optionally, sets the result in result matrix.
// Mult(m1, m2, [result])			Returns a matrix where m1 and m2 are multiplied together. If m2 is a scalar value (number), the scalar multiplication is done. Optionally, sets the result in result matrix.
// CreateTranslate(x, y, [result])	Returns a translate transform matrix. Optionally, sets the result in result matrix.
// CreateScale(x, y, [result])		Returns a scale transform matrix. Optionally, sets the result in result matrix.
// CreateRotateX(radians, [result])	Returns a rotate transform matrix around X axis. Optionally, sets the result in result matrix.
// CreateRotateY(radians, [result])	Returns a rotate transform matrix around Y axis. Optionally, sets the result in result matrix.
// CreateRotateZ(radians, [result])	Returns a rotate transform matrix around Z axis. Optionally, sets the result in result matrix.
// Translate(m, x, y, [result])		Returns a translated matrix. Optionally, sets the result in result matrix.
// Scale(x, y, [result])			Returns a scaled matrix. Optionally, sets the result in result matrix.
// Rotate(radians, [result])		Returns a rotated matrix. Optionally, sets the result in result matrix.
// ApplyTransformToPoint(m, p)		Transforms point with x and y components with given transform matrix m.

(function(evo){

    var Matrix3 = {};
    
    Matrix3.type = "Float32Array";
    Matrix3.default = [
        1,0,0,
        0,1,0,
        0,0,1
    ];
    
    Matrix3.create = function() {
        var m;
        
        switch(Matrix3.type){
            case 'Array':
                m = new Array(9);
                break;
            case 'Float32Array':
            default:
                m = new Float32Array(9);
        }
        
        // Optionally, initialize our Matrix
        if(arguments.length == 1){
            
            // from array
            Matrix3.set(m,
                arguments[0][0],arguments[0][1],arguments[0][2],
                arguments[0][3],arguments[0][4],arguments[0][5],
                arguments[0][6],arguments[0][7],arguments[0][8]
            );
            
        } else if(arguments.length == 9){

            // from values
            Matrix3.set(m,
                arguments[0],arguments[1],arguments[2],
                arguments[3],arguments[4],arguments[5],
                arguments[6],arguments[7],arguments[8]
            );
            
        } else {
            
            // initialize default Matrix
            Matrix3.set(m, Matrix3.default);
            
        }
        
        return m;
    };

    Matrix3.isMatrix = function(m){
        return ((Object.prototype.toString.call(m) === '[object ' + Matrix3.type + ']') && (m.length === 9));
    };

    Matrix3.set = function(m) {

        if(arguments.length == 2){
    
            // copy values from array
            m[0] = arguments[1][0]; m[1] = arguments[1][1]; m[2] = arguments[1][2];
            m[3] = arguments[1][3]; m[4] = arguments[1][4]; m[5] = arguments[1][5];
            m[6] = arguments[1][6]; m[7] = arguments[1][7]; m[8] = arguments[1][8];

        } else if(arguments.length == 10){

            // copy values from arguments
            m[0] = arguments[1]; m[1] = arguments[2]; m[2] = arguments[3];
            m[3] = arguments[4]; m[4] = arguments[5]; m[5] = arguments[6];
            m[6] = arguments[7]; m[7] = arguments[8]; m[8] = arguments[9];

        } else {

            throw "Invalid arguments for Matrix3.set().";

        }
        
        return m;
    };

    Matrix3.clone = function(m) { return Matrix3.create(m); };
    
    Matrix3.setElement = function(m, i, value) { m[i] = value; };
    
    Matrix3.getElement = function(m, i) { return m[i]; };
    
    Matrix3.identity = function(m) {
        if(!m) {
            m = Matrix3.create(
                1,0,0,
                0,1,0,
                0,0,1
            );
        } else {
            Matrix3.set(m, 
                1,0,0,
                0,1,0,
                0,0,1
            );
        }
        return m;
    };

    Matrix3.zero = function(m) {
        if(!m) {
            m = Matrix3.create(
                0,0,0,
                0,0,0,
                0,0,0
            );
        } else {
            Matrix3.set(m,
                0,0,0,
                0,0,0,
                0,0,0
            );
        }
        return m;
    };

    Matrix3.isEqual = function(m1, m2) {
        return m1.length == m2.length &&
            m1[0] == m2[0] && m1[1] == m2[1] && m1[2] == m2[2] &&
            m1[3] == m2[3] && m1[4] == m2[4] && m1[5] == m2[5] &&
            m1[6] == m2[6] && m1[7] == m2[7] && m1[8] == m2[8];
    };

    Matrix3.add = function(m1, m2) {
        return Matrix3.create(
            m1[0] + m2[0], m1[1] + m2[1], m1[2] + m2[2],
            m1[3] + m2[3], m1[4] + m2[4], m1[5] + m2[5],
            m1[6] + m2[6], m1[7] + m2[7], m1[8] + m2[8]
        );
    };

    Matrix3.sub = function(m1, m2) {
        return Matrix3.create(
            m1[0] - m2[0], m1[1] - m2[1], m1[2] - m2[2],
            m1[3] - m2[3], m1[4] - m2[4], m1[5] - m2[5],
            m1[6] - m2[6], m1[7] - m2[7], m1[8] - m2[8]
        );
    };

    Matrix3.mult = function(m1, m2) {
        return Matrix3.create(
            m1[0] * m2[0] + m1[3] * m2[1] + m1[6] * m2[2],
            m1[1] * m2[0] + m1[4] * m2[1] + m1[7] * m2[2],
            m1[2] * m2[0] + m1[5] * m2[1] + m1[8] * m2[2],

            m1[0] * m2[3] + m1[3] * m2[4] + m1[6] * m2[5],
            m1[1] * m2[3] + m1[4] * m2[4] + m1[7] * m2[5],
            m1[2] * m2[3] + m1[5] * m2[4] + m1[8] * m2[5],

            m1[0] * m2[6] + m1[3] * m2[7] + m1[6] * m2[8],
            m1[1] * m2[6] + m1[4] * m2[7] + m1[7] * m2[8],
            m1[2] * m2[6] + m1[5] * m2[7] + m1[8] * m2[8]
        );
    };

    Matrix3.determinant = function (m) {
        var a = m[0], b = m[1], c = m[2],
            d = m[3], e = m[4], f = m[5],
            g = m[6], h = m[7], i = m[8];
        return a*e*i - a*f*h - b*d*i + b*f*g + c*d*h - c*e*g;
    };

    Matrix3.invert = function(m) {
        var t00 = m[4] * m[8] - m[7] * m[5];
        var t10 = m[7] * m[2] - m[1] * m[8];
        var t20 = m[1] * m[5] - m[4] * m[2];

        var det = m[0] * t00 + m[3] * t10 + m[6] * t20;
        if (det == 0)
            throw "EvoJS: Unable to invert matrix since determinant is zero!";

        var idet = 1 / det;

        return Matrix3.create(
            t00 * idet,
            t10 * idet,
            t20 * idet,

            (m[6] * m[5] - m[3] * m[8]) * idet,
            (m[0] * m[8] - m[6] * m[2]) * idet,
            (m[3] * m[2] - m[0] * m[5]) * idet,

            (m[3] * m[7] - m[6] * m[4]) * idet,
            (m[6] * m[1] - m[0] * m[7]) * idet,
            (m[0] * m[4] - m[3] * m[1]) * idet
        );
    };

    Matrix3.transpose = function(m) {
        var tmp;
        tmp = m[1]; m[1] = m[3]; m[3] = tmp;
        tmp = m[2]; m[2] = m[6]; m[6] = tmp;
        tmp = m[5]; m[5] = m[7]; m[7] = tmp;
        return m;
    };

    Matrix3.normal = function(m) {
        return Matrix3.transpose(Matrix3.invert(m));
    };

    Matrix3.createTranslate = function(x, y){
        return Matrix3.create(
            1,0,x,
            0,1,y,
            0,0,1
        );
    };

    Matrix3.createScale = function(x, y){
        return Matrix3.create(
            x,0,0,
            0,y,0,
            0,0,1
        );
    };

    Matrix3.createRotate = function(radians, ax, ay, az) {
        var c = Math.cos(radians);
        var d = 1 - c;
        var s = Math.sin(radians);

        return Matrix3.create(
            ax * ax * d + c, 		ax * ay * d + az * s,		ax * az * d - ay * s,
            ax * ay * d - az * s,	ay * ay * d + c,			ay * az * d + ax * s,
            ax * az * d + ay * s,	ay * az * d - ax * s,		az * az * d + c
        );
    };

    Matrix3.createRotateX = function(radians){
        var c = Math.cos(radians);
        var s = Math.sin(radians);

        return Matrix3.create(
            1, 0, 0,
            0, c, s,
            0, -s, c
        );
    };

    Matrix3.createRotateY = function(radians){
        var c = Math.cos(radians);
        var s = Math.sin(radians);

        return Matrix3.create(
            c, 0, -s,
            0, 1, 0,
            s, 0, c
        );
    };

    Matrix3.createRotateZ = function(radians){
        var c = Math.cos(radians);
        var s = Math.sin(radians);

        return Matrix3.create(
            c, s, 0,
            -s, c, 0,
            0, 0, 1
        );
    };

    Matrix3.Rotate = function(mat, radians, x, y, z) {
        var m00 = mat[0], m10 = mat[1], m20 = mat[2];
        var m01 = mat[3], m11 = mat[4], m21 = mat[5];
        var m02 = mat[6], m12 = mat[7], m22 = mat[8];

        var cosAngle = Math.cos(radians);
        var sinAngle = Math.sin(radians);
        var diffCosAngle = 1 - cosAngle;
        var r00 = x * x * diffCosAngle + cosAngle;
        var r10 = x * y * diffCosAngle + z * sinAngle;
        var r20 = x * z * diffCosAngle - y * sinAngle;

        var r01 = x * y * diffCosAngle - z * sinAngle;
        var r11 = y * y * diffCosAngle + cosAngle;
        var r21 = y * z * diffCosAngle + x * sinAngle;

        var r02 = x * z * diffCosAngle + y * sinAngle;
        var r12 = y * z * diffCosAngle - x * sinAngle;
        var r22 = z * z * diffCosAngle + cosAngle;

        return Matrix3.set(mat,
            m00 * r00 + m01 * r10 + m02 * r20,
            m10 * r00 + m11 * r10 + m12 * r20,
            m20 * r00 + m21 * r10 + m22 * r20,

            m00 * r01 + m01 * r11 + m02 * r21,
            m10 * r01 + m11 * r11 + m12 * r21,
            m20 * r01 + m21 * r11 + m22 * r21,

            m00 * r02 + m01 * r12 + m02 * r22,
            m10 * r02 + m11 * r12 + m12 * r22,
            m20 * r02 + m21 * r12 + m22 * r22
        );
    };

    Matrix3.Translate = function(m, x, y, result){
        // create and apply transform
        var transform = Matrix3.createTranslate(x,y);
        result = Matrix3.mult(m, transform);

        return result;
    };

    Matrix3.Scale = function(m, x, y, result){
        // create and apply transform
        var transform = Matrix3.createScale(x,y);
        result = Matrix3.mult(m, transform);

        return result;
    };

    Matrix3.Rotate = function(m, radians, result){
        // create and apply transform
        var transform = Matrix3.createRotate(radians);
        result = Matrix3.mult(m, transform);

        return result;
    };

    Matrix3.toString = function(m) {
        var maxLen = 0;
        for(var i=0; i<m.length; i++){
            var len = String(m[i]).length;
            if (len > maxLen) maxLen = len;
        }

        // Build the string
        var sb = [];
        for(var row=0; row<3; row++){
            sb.push('[ ');
            for(var column=0; column<3; column++){
                var strval = String(m[row*3+column]);
                var theVal = "";
                for(var padding = 0; padding<maxLen - strval.length; padding++){
                    theVal += " ";
                }
                theVal += strval + " ";
                sb.push(theVal);
            }
            sb.push(']\n');
        }
        return sb.join('');
    };


    Matrix3.ApplyTransformToPoint = function(m, p) {
        if(p && (typeof p.x !== 'undefined') && (typeof p.y !== 'undefined')) {
            p.x = p.x * m[0] + p.y * m[3] + m[2];
            p.y = p.y * m[1] + p.y * m[4] + m[5];
        }
    };

    /*
    Matrix3.contextTransform = function(ctx, m){
        ctx.transform(m[0], m[3], m[1], m[4], m[2], m[5]);
    };

    Matrix3.setContextTransform = function(ctx, m){
        ctx.setTransform(m[0], m[3], m[1], m[4], m[2], m[5]);
    };
    */

    evo.Matrix3 = Matrix3;

})(evo);