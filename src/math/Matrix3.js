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
    
    Matrix3.identity = function(m) {
        m = Matrix3.create(
            1,0,0,
            0,1,0,
            0,0,1
        );
        return m;
    };

    Matrix3.zero = function(m) {
        m = Matrix3.create(
            0,0,0,
            0,0,0,
            0,0,0
        );
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

    // ************************************************************************
    // create rotate, translate and scale
    // ************************************************************************

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

    Matrix3.createRotate = function(radians, x, y, z) {
        var c = Math.cos(radians);
        var s = Math.sin(radians);
        var d = 1 - c;

        return Matrix3.create(
            x * x * d + c, 		x * y * d + z * s,		x * z * d - y * s,
            x * y * d - z * s,	y * y * d + c,			y * z * d + x * s,
            x * z * d + y * s,	y * z * d - x * s,		z * z * d + c
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

    // ************************************************************************
    // rotate, translate and scale
    // ************************************************************************

    Matrix3.rotate = function(m, radians, x, y, z) {
        // create transform matrix
        var tm = Matrix3.createRotate(radians, x, y, z);

        // apply transform matrix
        m = Matrix3.mult(m, tm);

        return m;
    };

    Matrix3.translate = function(m, x, y){
        // create transform matrix
        var tm = Matrix3.createTranslate(x,y);

        // apply transform matrix
        m = Matrix3.mult(m, tm);

        return m;
    };

    Matrix3.scale = function(m, x, y){
        // create transform matrix
        var tm = Matrix3.createScale(x,y);

        // apply transform matrix
        m = Matrix3.mult(m, tm);

        return m;
    };

    // ************************************************************************
    // helpers
    // ************************************************************************

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