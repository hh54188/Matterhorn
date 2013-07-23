define(function (require, exports, module) {
    var isArray = function (obj) {
        if (Array.isArray) {
            return Array.isArray(obj)
        }

        if( Object.prototype.toString.call(obj) === '[object Array]' ) {
            return true
        } else {
            return false
        }
    }

    exports.isArray = isArray;
})