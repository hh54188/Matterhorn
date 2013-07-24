define(function (require, exports, module) {
    var isObject = function (obj) {
    	// http://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
    	if (Object.prototype.toString.call(obj) === "[object Object]") {
    		return true;
    	} else {
    		return false;
    	}
    }

    return isObject;
})