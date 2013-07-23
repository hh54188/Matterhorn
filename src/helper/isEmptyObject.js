define(function (require, exports, module) {
	var isEmptyObject = function (obj) {
		for (var key in obj) {
			return false;
		}

		return true;
	}

	exports.isEmptyObject = isEmptyObject
})