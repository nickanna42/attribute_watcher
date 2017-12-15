'use strict';
var linAlg = {
    arrayDims : function(x) {
        var output = 0;
        if (!Array.isArray(x)) {
            return undefined;
        }
        if (x.length == 0) {
            output++;
            return output;
        } else {
            output++;
        }
        if (Array.isArray(x[0])) {
            output = output + this.arrayDims(x[0]);
            return output;
        } else {
            return output;
        }
    },

    arraySize : function(x) {
        var output = [];
        if (!Array.isArray(x)) {
            return undefined;
        }
        output.push(x.length);
        if (x.length >= 1) {
            if (Array.isArray(x[0])) {
                output = output.concat(this.arraySize(x[0]));
            }
        }
        return output;
    },

    multiply : function(x, y) {
        var output = [];
        if (typeof x == 'number' && typeof y == 'number') {
            return x * y;
        }
        if (typeof x == 'number' && Array.isArray(y)) {
            if (y.length == 0) {
                return output;
            }
            for (var i = 0; i < y.length; i++) {
                if (typeof y[i] == 'number') {
                    output.push(x * y[i]);
                } else if (Array.isArray(y[i])) {
                    output.push(this.multiply(x, y[i]));
                }
            }
            return output;
        }
        if (Array.isArray(x) && typeof y == 'number') {
            if (x.length == 0) {
                return output;
            }
            for (var i = 0; i < x.length; i++) {
                if (typeof x[i] == 'number') {
                    output.push(y * x[i]);
                } else if (Array.isArray(x[i])) {
                    output.push(this.multiply(y, x[i]));
                }
            }
            return output;
        }
    },

    zeros : function(x, zero) {
        var output = [];
        var y = [];
        if (x.length > 1) {
            for (var i = 1; i < x.length; i++) {
                y.push(x[i]);
            }
            for (var i = 0; i < x[0]; i++) {
                output.push(this.zeros(y, zero));
            }
            return output;
        } else {
            for (var i = 0; i < x[0]; i++) {
                output.push(zero);
            }
            return output;
        }
    }
};
