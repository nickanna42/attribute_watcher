// Nicholas Anna.
// Dec 2017
// A package that emulates much of the function of NumPy with plain JS arrays.

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

        if (Array.isArray(x) && Array.isArray(y)) {
            var xSize = this.arraySize(x);
            var ySize = this.arraySize(y);
            if (!this.equals(xSize, ySize)) {
                return undefined;
            }
            var output = this.zeros(xSize, 0);
            for (var i = 0; i < xSize[0]; i++) {
                output[i] = this.multiply(x[i], y[i]);
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
    },

    equals : function(x, y) {
        if (typeof x != 'object' && typeof y != 'object') {
            return x === y;
        } else if (Array.isArray(x) && Array.isArray(y)) {
            if (x.length != y.length) {
                return false;
            }
            for (var i = 0; i < x.length; i++) {
                if (!this.equals(x[i], y[i])) {
                    return false;
                }
            }
            return true;
        } else if (typeof x == 'object' && !Array.isArray(x) && typeof y == 'object' && !Array.isArray(y)){
            if (this.equals(Object.keys(x), Object.keys(y)) && this.equals(Object.values(x), Object.values(y))) {
                return true;
            }
            return false;
        } else {
            return false;
        }
    },

    add : function(x, y) {
        if (typeof x == 'number' && typeof y == 'number') {
            return x + y;
        } else if (typeof x == 'number' && Array.isArray(y)) {
            var ySize = this.arraySize(y);
            var output = this.zeros(ySize, 0);
            for (var i = 0; i < ySize[0]; i++) {
                output[i] = this.add(x, y[i])
            }
            return output;
        } else if (Array.isArray(x) && typeof y == 'number') {
            var xSize = this.arraySize(x);
            var output = this.zeros(xSize, 0);
            for (var i = 0; i < xSize[0]; i++) {
                output[i] = this.add(x[i], y);
            }
        } else if (Array.isArray(x) && Array.isArray(y)) {
            if (!this.equals(this.arraySize(x), this.arraySize(y))) {
                return undefined;
            }
            var outputSize = this.arraySize(x);
            var output = this.zeros(outputSize, 0);
            for (var i = 0; i < outputSize[0]; i++) {
                output[i] = this.add(x[i], y[i])
            }
            return output;
        } else {
            return undefined;
        }
    },

    subtract : function(x, y) {
        if (typeof x == 'number' && typeof y == 'number') {
            return x - y;
        } else if (typeof x == 'number' && Array.isArray(y)) {
            var ySize = this.arraySize(y);
            var output = this.zeros(ySize, 0);
            for (var i = 0; i < ySize[0]; i++) {
                output[i] = this.subtract(x, y[i]);
            }
            return output;
        } else if (Array.isArray(x) && typeof y == 'number') {
            var xSize = this.arraySize(x);
            var output = this.zeros(xSize, 0);
            for (var i = 0; i < xSize[0]; i++) {
                output[i] = this.subtract[x[i], y]
            }
        } else if (Array.isArray(x) && Array.isArray(y)) {
            if (!this.equals(this.arraySize(x), this.arraySize(y))) {
                return undefined;
            }
            var outputSize = this.arraySize(x);
            var output = this.zeros(outputSize, 0);
            for (var i = 0; i < outputSize[0]; i++) {
                output[i] = this.subtract(x[i], y[i]);
            }
            return output;
        } else {
            return undefined;
        }
    },

    copy : function(input) {
        var output = null;
        if (Array.isArray(input)) {
            output = []
            for (var i = 0; i < input.length; i++) {
                output.push(this.copy(input[i]));
            }
        } else if (typeof input == 'object') {
            output = {};
            for (var i in input) {
                output[i] = this.copy(input[i]);
            }
        } else {
            output = input;
        }
        return output;
    }
};
