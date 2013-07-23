define(function (require, exports, module) {
    var isObject = function (obj) {
        Object.prototype.toString.call(obj) === "[object Object]"
    }

    exports.isObject = isObject;
})