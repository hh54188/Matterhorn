define(function (require, exports, module) {
    var isArray = function (obj) {
        if (Array.isArray) {
            return Array.isArray(obj);
        }

        // http://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
        if( Object.prototype.toString.call(obj) === '[object Array]' ) {
            return true;
        } else {
            return false;
        }
    }

    return isArray;
})