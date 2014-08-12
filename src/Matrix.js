Matrix3 = function ( n11, n12, n13, n21, n22, n23, n31, n32, n33 ) {

    console.log (this.elements);
    
    this.elements = new Float32Array(9);

    console.log (this.elements);

    this.set(

        ( n11 !== undefined ) ? n11 : 1, n12 || 0, n13 || 0,
        n21 || 0, ( n22 !== undefined ) ? n22 : 1, n23 || 0,
        n31 || 0, n32 || 0, ( n33 !== undefined ) ? n33 : 1

    );

    console.log (this.elements);
};

Matrix3.prototype = {

    constructor: Matrix3,

    set: function ( n11, n12, n13, n21, n22, n23, n31, n32, n33 ) {

        var te = this.elements;

        te[0] = n11; te[3] = n12; te[6] = n13;
        te[1] = n21; te[4] = n22; te[7] = n23;
        te[2] = n31; te[5] = n32; te[8] = n33;

        return this;

    }
};