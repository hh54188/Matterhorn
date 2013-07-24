define(function (require, exports, module) {
    var isArray = require('helper/isArray');
    var isObject = require('helper/isObject');

    function copyArray(target, Parent) {
        for (var i = 0; i < Parent.length; i++) {
            target[i] = Parent[i];
        }
    }

    function extend(target, Parent) {
        var F = function () {}
        F.prototype = Parent.prototype;
        target.prototype = new F();

        // deepCopy
        for (var key in Parent) {
            if (isObject(Parent[key])) {
                target[key] = {};
                extend(target[key], Parent[key]);
            } else if (isArray(Parent[key])) {
                target[key] = [];
                // 为什么这里不直接用for in去遍历数组，会产生难以预料的问题:
                // http://stackoverflow.com/questions/500504/why-is-using-for-in-with-array-iteration-such-a-bad-idea
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in
                copyArray(target[key], Parent[key]);
            } else {
                target[key] = Parent[key];    
            }
            
        }

        return target;
    }

    return extend;
})