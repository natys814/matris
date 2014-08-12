/**
    Vector3 Class
**/

var Vector3 = function( x, y, z ){

                var x = x || 0;
                this.init(x, y || x, z || x);

            };

Vector3.prototype = {
    init: function( x, y, z ){
        this.x = x;
        this.y = y;
        this.z = z;

        return this;
    },
    add: function(v) {
        if (v instanceof Vector3)
            return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
        else
            return new Vector3(this.x + v, this.y + v, this.z + v);
    }
};

Vector3.prototype.substract = function(){

};