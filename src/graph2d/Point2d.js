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